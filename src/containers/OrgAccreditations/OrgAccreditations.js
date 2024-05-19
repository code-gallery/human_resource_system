import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notifications, { notify } from 'react-notify-toast'
import { Link } from 'react-router-dom'
import _find from 'lodash/find'
import { NOTIFICATION_TIMEOUT, ROUTE_URL } from 'containers/constants'
import LoadingIndicator from 'components/LoadingIndicator'
import PageTitle from 'components/PageTitle'
import Layout from 'containers/Layout'
import ContentCard from 'components/ContentCard'
import List from './components/List'
import AccreditationsForm from './components/AccreditationsForm'
import './style.css'

class OrgAccreditations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }

  componentWillMount() {
    const { orgId } = this.props.match.params
    this.props.fetch({ orgId })
  }

  componentWillReceiveProps(nextProps) {
    const nextOrgId = nextProps.match.params.orgId
    if (this.props.match.params.orgId !== nextOrgId) {
      this.props.fetch({ orgId: nextOrgId })
    }

    const nextOrgAccr = nextProps.orgAccreditations
    const orgAccr = this.props.orgAccreditations
    if (orgAccr.errorMsg !== nextOrgAccr.errorMsg && nextOrgAccr.errorMsg !== null) {
      notify.show(nextOrgAccr.errorMsg, 'error', NOTIFICATION_TIMEOUT)
    } else if (orgAccr.successMsg !== nextOrgAccr.successMsg && nextOrgAccr.successMsg !== null) {
      notify.show(nextOrgAccr.successMsg, 'success', NOTIFICATION_TIMEOUT)
    }
  }

  deleteAccreditation = (id) => {
    const { orgId } = this.props.match.params
    this.props.deleteAccreditation({
      orgId,
      id
    })
  }

  save = (data) => {
    const { orgId } = this.props.match.params
    this.props.saveAccreditation({ orgId, data })
  }

  cancel = () => {
    this.setState({ showForm: false })
  }

  toggleForm = (e) => {
    e.preventDefault()
    const { showForm } = this.state
    this.setState({ showForm: !showForm })
  }

  renderNewAccreditation() {
    return (
      <div className="row">
        <ContentCard title="Add new">
          <button
            className="btn blue-btn"
            onClick={this.toggleForm}>
            Create Accreditation
          </button>
        </ContentCard>
      </div>
    )
  }

  renderList() {
    const { awards, awardTypes, pending } = this.props.orgAccreditations
    return (
      <List
        awards={awards}
        awardTypes={awardTypes}
        pending={pending}
        deleteAccreditation={this.deleteAccreditation}
      />
    )
  }

  renderPageLoading() {
    return (
      <Layout>
        <LoadingIndicator size="80" />
      </Layout>
    )
  }

  renderUserNotAuthorised() {
    return (
      <Layout>
        <ContentCard title="Unauthorised" className="ContentCard-marginTop">
          <p>Your account is not associated with this organisation. You cannot see this page.</p>
        </ContentCard>
      </Layout>
    )
  }

  renderAccreditationForm() {
    const { orgAccreditations } = this.props

    return (
      <div className="row">
        <AccreditationsForm
          orgAccreditations={orgAccreditations}
          save={this.save}
          cancel={this.cancel}
        />
      </div>
    )
  }

  render() {
    const { organisations, pending } = this.props
    const { showForm } = this.state
    const { orgId } = this.props.match.params
    const organisation = _find(organisations, { id: parseInt(orgId, 10) })
    let link = ROUTE_URL.orgProfile

    if (pending) {
      return this.renderPageLoading()
    }

    if (!organisation) {
      // user is not admin for this org
      return this.renderUserNotAuthorised()
    }

    link = link.replace(':orgId', organisation.id)

    return (
      <Layout>
        <Notifications />
        <PageTitle type="type2">
          <span>Accreditations for <Link to={link}>{organisation.name}</Link></span>
        </PageTitle>
        <div className="container OrgAccreditations">
          {
            showForm ?
              this.renderAccreditationForm() :
              this.renderNewAccreditation()
          }

          <div className="row">
            { this.renderList() }
          </div>
        </div>
      </Layout>
    )
  }
}

OrgAccreditations.propTypes = {
  deleteAccreditation: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  orgAccreditations: PropTypes.shape({
    awards: PropTypes.array,
    awardTypes: PropTypes.object,
    pending: PropTypes.string,
    errorMsg: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    successMsg: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }),
  organisations: PropTypes.array,
  pending: PropTypes.bool,
  saveAccreditation: PropTypes.func.isRequired
}

export default OrgAccreditations
