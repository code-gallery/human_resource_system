import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import isObject from 'lodash/isObject'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import WorkPassMain from 'components/WorkPassMain'
import SearchBox from 'components/SearchBox'
import Loader from 'components/Loader'
import UserAddCard from './UserAddCard'
import NoUserAddCard from './NoUserAddCard'
import Layout from 'containers/Layout'
import { ROUTE_URL } from 'containers/constants'
import './style.css'
import Notifications, { notify } from "react-notify-toast";
import { NOTIFICATION_TIMEOUT } from "containers/constants";

/** :: () -> boolean */
const usersFound = users => !isNull(users) && users.length > 0

class OrganisationAddCandidate extends Component {
  componentDidMount() {
    this.props.resetAddCandidate()
  }

  getUnknownUserInfo() {
    const { unknownUser } = this.props
    const loading = unknownUser === 'loading'
    const added = isObject(unknownUser)
    let candidateEmail
    let newRequestLink

    if (added) {
      const { orgId } = this.props.match.params

      candidateEmail = unknownUser.candidate.email
      newRequestLink = ROUTE_URL.organisationCandidateNewRequest
        .replace(':orgId', orgId)
        .replace(':candidateId', unknownUser.candidate.id)
    }

    return {
      loading,
      added,
      candidateEmail,
      newRequestLink
    }
  }

  render() {
    const {
      match,
      searchCandidate,
      addCandidate,
      users,
      loading
    } = this.props

    const orgId = parseInt(match.params.orgId, 10)

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <Notifications></Notifications>
        <WorkPassMain>
          <div className="OrganisationAddCandidate">
            <div className="OrganisationAddCandidate__wrap">
              <h1 className="OrganisationAddCandidate__header">
                Add Candidate {loading && <Loader size={36} color="#72d371" />}
              </h1>
              <p className="OrganisationAddCandidate__info-txt">
                Add candidates to create requests. If you can&apos;t see the candidate
                you&apos;re looking for, you can invite them to complete a request via
                email.
              </p>

              <SearchBox
                className="OrganisationAddCandidate__search"
                placeholder="Search by name, phone or email"
                onSearch={query => searchCandidate(orgId, query)}
              />

              { /** Search finds known APPII users */
                usersFound(users) && users.map((user, idx) => {
                  const isFirst = idx === 0
                  const isAdded = Boolean(user.candidate)
                  const name = `${user.first_name} ${user.last_name}`
                  const candidateInfo = {
                    user_id: user.id
                  }

                  return (
                    <UserAddCard
                      key={user.id}
                      top={isFirst}
                      added={isAdded}
                      name={name}
                      profileImage={user.profile_image}
                      tagline={user.tagline}
                      onAdd={() => addCandidate(orgId, candidateInfo)}
                    />
                  )
                })
              }

              {/** Admin could not find the given user */}
              <br />
              {
                !isNull(users) && (
                  <NoUserAddCard
                    {...this.getUnknownUserInfo()}
                    onAdd={email => addCandidate(orgId, { email },
                      () => {
                        notify.show(
                          "The email is already taken",
                          "error",
                          NOTIFICATION_TIMEOUT
                        );
                      },
                    )}
                  />
                )
              }
            </div>
          </div>
        </WorkPassMain>
      </Layout>
    )
  }
}

OrganisationAddCandidate.propTypes = {
  match: PropTypes.object.isRequired,
  searchCandidate: PropTypes.func.isRequired,
  users: PropTypes.array,
  addCandidate: PropTypes.func.isRequired,
  resetAddCandidate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  unknownUser: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default OrganisationAddCandidate
