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

const Candidate = ({ orgId, vOrgId, candidate, loading, organisationBalance, children, requestId, deleteCandidate, deletedData, isCandidateDelete, assignWorkpass, assignButtonStatus, showReturnBtn, activeSection, openNoteForm }) => {
  if (loading) {
    return <LoadingCandidate />
  }

  const name = candidate.userId !== null
    ? `${candidate.firstName} ${candidate.lastName}`
    : candidate.email
  let breadCrumbs = [
    {
      name: 'All Candidates',
      url: `/organisations/${orgId}/candidates`,
      active: false,
      redirectTo: 'candidates'
    },
    {
      name,
      url: `/organisations/${orgId}/candidates/${candidate.id}`,
      active: true,
      redirectTo: 'candidateRequests'
    }
  ]
  if (vOrgId && vOrgId != orgId) {
    breadCrumbs = [
      {
        name: 'All External Candidates',
        url: `/organisations/${vOrgId}/externalcandidates`,
        active: false,
        redirectTo: 'candidates'
      },
      {
        name,
        url: `/organisations/${vOrgId}/verifyingorganisations/${orgId}/externalCandidates/${candidate.id}`,
        active: true,
        redirectTo: 'candidateRequests'
      }
    ]
  }

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
        vOrgId={vOrgId}
        organisationBalance={organisationBalance}
        hasRequests={hasRequests}
        deleteCandidate={deleteCandidate}
        deletedData={deletedData}
        isCandidateDelete={isCandidateDelete}
        assignWorkpass={assignWorkpass}
        assignButtonStatus={assignButtonStatus}
        requestId={requestId}
        showReturnBtn={showReturnBtn}
        activeSection={activeSection}
        openNoteForm={openNoteForm}
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
  requestId: PropTypes.number,
  assignButtonStatus: PropTypes.bool
}

export default Candidate
