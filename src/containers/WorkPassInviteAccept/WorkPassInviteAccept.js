import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import Layout from 'containers/Layout'
import Button from 'components/Button'
import Loader from 'components/Loader'
import WorkPassInviteDetails from 'containers/WorkPassInviteDetails'
import './style.css'

class WorkPassInviteAccept extends Component {

  getToken() {
    const { location } = this.props
    const { token } = queryString.parse(location.search)
    return token
  }

  render() {
    const { loading, inviteAccepted, acceptInvite } = this.props

    /** User has accepted and backend has submission is successful */
    if (inviteAccepted) {
      return <Redirect to="/profile" />
    }

    /** User has clicked Accept Invite */
    if (loading) {
      return (
        <Layout>
          <div className="WorkPassInviteAccept">
            <div className="WorkPassInviteAccept__wrap" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Loader size={65} color="#72d371" />
            </div>
          </div>
        </Layout>
      )
    }

    const token = this.getToken()

    return (
      <Layout>
        <div className="WorkPassInviteAccept">

          <div className="WorkPassInviteAccept__wrap">
            <WorkPassInviteDetails token={token} />

            <div className="WorkPassInviteAccept__btn">
              <Button onClick={() => acceptInvite(token)}>
                Accept Invite
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

WorkPassInviteAccept.propTypes = {
  location: PropTypes.object.isRequired,
  inviteAccepted: PropTypes.bool.isRequired,
  acceptInvite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default WorkPassInviteAccept
