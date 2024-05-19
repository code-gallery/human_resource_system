import React from 'react'
import PropTypes from 'prop-types'
import CandidateHeader from '../CandidateHeader'
import BreadCrumb from 'components/BreadCrumb'
import Loader from 'components/Loader'
import WorkPassMain from 'components/WorkPassMain'
import './style.css'

const LoadingCandidate = () => (
  <WorkPassMain className="Candidate is-loading">
    <Loader size={65} color="#72d371" />
  </WorkPassMain>
)

const Candidate = ({ orgId, vOrgId, candidate, loading, organisationBalance, children, requestId }) => {
  if (loading) {
    return <LoadingCandidate />
  }

  const name = candidate.userId !== null
    ? `${candidate.firstName} ${candidate.lastName}`
    : candidate.email

  const breadCrumbs = [
    {
      name: 'All External Candidates',
      url: `/organisations/${orgId}/externalcandidates`,
      active: false,
      redirectTo: 'candidates'
    },

    {
      name,
      url: `/organisations/${orgId}/verifyingorganisations/${vOrgId}/externalCandidates/${candidate.id}`,
      active: true,
      redirectTo: 'candidateRequests'
    }
  ]

  const isInvitationPending = candidate.userId === null
  const hasRequests = candidate.requests.length > 0

  return (
    <WorkPassMain>
      <BreadCrumb className="Candidate__breadcrumb" links={breadCrumbs} requestId={requestId}/>

      <CandidateHeader
        className="Candidate__header"
        candidate={candidate}
        invitationPending={isInvitationPending}
        orgId={orgId}
        organisationBalance={organisationBalance}
        hasRequests={hasRequests}
      />

      {children}
    </WorkPassMain>
  )
}

Candidate.propTypes = {
  orgId: PropTypes.number.isRequired,
  candidate: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  organisationBalance: PropTypes.number.isRequired,
  children: PropTypes.node,
  requestId: PropTypes.number
}

export default Candidate
