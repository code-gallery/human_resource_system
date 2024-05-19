import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants'
import _find from 'lodash/find'
import _isNil from 'lodash/isNil'
import Layout from 'containers/Layout'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import PageTitle from 'components/PageTitle'
import VerificationList from 'containers/UserVerifications/components/VerificationList'
import RequestList from './components/RequestList'

class OrgVerifications extends Component {
  componentWillMount() {
    const { orgId } = this.props.match.params
    this.props.fetch({ orgId })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.orgVerifications.pending && _isNil(nextProps.orgVerifications.organisation.id)) {
      const { orgId } = nextProps.match.params
      this.props.fetch({ orgId })
    }
  }

  onVerify = (id) => {
    const { orgId } = this.props.match.params
    this.props.acceptVerification({
      id,
      orgId
    })
  }

  onReject = (id, reasons) => {
    const { orgId } = this.props.match.params
    this.props.declineVerification({
      id,
      orgId,
      reasons
    })
  }

  renderProcessed() {
    const { processed } = this.props.orgVerifications
    return (
      <VerificationList data={processed} showOrganisation={false} />
    )
  }

  renderRequests() {
    const { requests } = this.props.orgVerifications
    return (
      <RequestList
        data={requests}
        onVerify={this.onVerify}
        onReject={this.onReject}
      />
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

  renderPageLoading() {
    return (
      <Layout>
        <LoadingIndicator size="80" />
      </Layout>
    )
  }

  render() {
    const { organisations, pending } = this.props
    const { organisation } = this.props.orgVerifications
    const { orgId } = this.props.match.params
    let link = ROUTE_URL.orgProfile
    const organisationFound = _find(organisations, { id: parseInt(orgId, 10) })

    if (pending || this.props.orgVerifications.pending) {
      return this.renderPageLoading()
    }

    if (!organisationFound) {
      // user is not admin for this org
      return this.renderUserNotAuthorised()
    }

    link = link.replace(':orgId', organisation.id)

    return (
      <Layout>
        <div className="container">
          <PageTitle type="type2">
            <span>Verifications for <Link to={link}>{organisation.name}</Link></span>
          </PageTitle>

          <div className="row">
            <ContentCard title="Verifications">
              {this.renderRequests()}
            </ContentCard>

            <ContentCard title="Verifications">
              {this.renderProcessed()}
            </ContentCard>
          </div>
        </div>
      </Layout>
    )
  }
}

OrgVerifications.propTypes = {
  orgVerifications: PropTypes.shape({
    processed: PropTypes.array,
    requests: PropTypes.array,
    organisation: PropTypes.object,
    pending: PropTypes.bool
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  fetch: PropTypes.func.isRequired,
  acceptVerification: PropTypes.func.isRequired,
  declineVerification: PropTypes.func.isRequired,
  organisations: PropTypes.array,
  pending: PropTypes.bool
}

export default OrgVerifications
