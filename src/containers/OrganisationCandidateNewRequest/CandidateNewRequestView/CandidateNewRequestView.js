import React from 'react'
import PropTypes from 'prop-types'
import isNull from 'lodash/isNull'
import CandidateNewRequestHeader from '../CandidateNewRequestHeader'
import CandidateNewRequest from '../CandidateNewRequest'
import Loader from 'components/Loader'
import WorkPassMain from 'components/WorkPassMain'
import './style.css'

const CandidateNewRequestView = ({
  loading,
  candidate,
  candidateId,
  organisationId,
  checks,
  postNewRequest,
  className,
  client_org,
  fetchUserPersona,
  workPassPersonas,
  fetchUserChecks,
  workPassChecks,
  fetchClientOrganisations,
  clientOrganisationsfilter
}) => {
  if (loading) {
    return (
      <WorkPassMain className={`CandidateNewRequestsView is-loading ${className}`}>
        <Loader size={65} color="#72d371" />
      </WorkPassMain>
    )
  }

  const name = isNull(candidate.userId)
    ? candidate.email
    : `${candidate.firstName} ${candidate.lastName}`

  return (
    <WorkPassMain className={`CandidateNewRequestsView ${className}`}>
      <CandidateNewRequestHeader
        className="CandidateNewRequestsView__header"
        candidateName={name}
        candidateId={candidateId}
        organisationId={organisationId}
        candidate={candidate}
      />

      <CandidateNewRequest
        organisationId={organisationId}
        candidateId={candidateId}
        candidate={candidate}
        checks={checks}
        postNewRequest={postNewRequest}
        client_org={client_org}
        fetchUserPersona={fetchUserPersona}
        workPassPersonas={workPassPersonas}
        fetchUserChecks={fetchUserChecks}
        workPassChecks={workPassChecks}
        fetchClientOrganisations={fetchClientOrganisations}
        clientOrganisationsfilter={clientOrganisationsfilter}
      />
    </WorkPassMain>
  )
}

CandidateNewRequestView.propTypes = {
  checks: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  candidate: PropTypes.object,
  candidateId: PropTypes.number.isRequired,
  organisationId: PropTypes.number.isRequired,
  postNewRequest: PropTypes.func.isRequired
}

CandidateNewRequestView.defaultProps = {
  className: ''
}

export default CandidateNewRequestView
