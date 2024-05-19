import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import isNull from 'lodash/isNull'
import Candidate from './Candidate'
import CandidateRequestsTable from './CandidateRequestsTable'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Layout from 'containers/Layout'

class OrganisationCandidate extends Component {
  componentDidMount() {
    const { orgId,vOrgId, candidateId } = this.getUrlParams()
    this.props.requestCandidate(vOrgId, candidateId)
  }

  getUrlParams() {
    const { orgId,vOrgId,candidateId } = this.props.match.params

    return {
      orgId: parseInt(orgId, 10),
      vOrgId: parseInt(vOrgId, 10),
      candidateId: parseInt(candidateId, 10)
    }
  }

  isLoading() {
    const { loading, candidate, organisationBalance } = this.props

    return loading ||
      organisationBalance.loading ||
      (organisationBalance.balance === null) ||
      (candidate === null)
  }

  render() {
    const {
      candidate,
      error,
      organisationBalance
    } = this.props

    if (!isNull(error)) {
      return <Redirect to="/profile" />
    }

    const { orgId, vOrgId, candidateId } = this.getUrlParams()
    const isLoading = this.isLoading()

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <Candidate
          orgId={orgId}
          vOrgId={vOrgId}
          organisationBalance={organisationBalance.balance || 0}
          candidate={candidate}
          loading={isLoading}
        >
          {!isLoading &&
            <CandidateRequestsTable
              orgId={orgId}
              vOrgId={vOrgId}
              candidateId={candidateId}
              requests={candidate.requests}
              location={this.props.location}
            />
          }
        </Candidate>
      </Layout>
    )
  }
}

OrganisationCandidate.propTypes = {
  match: PropTypes.object.isRequired,
  requestCandidate: PropTypes.func.isRequired,
  candidate: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  organisationBalance: PropTypes.object.isRequired
}

export default OrganisationCandidate
