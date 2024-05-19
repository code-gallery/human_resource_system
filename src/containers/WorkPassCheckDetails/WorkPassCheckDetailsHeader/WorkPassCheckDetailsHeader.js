import React from 'react'
import PropTypes from 'prop-types'
import CandidateInfo from 'containers/OrganisationCandidate/CandidateInfo/CandidateInfo.js'
import BreadCrumb from 'components/BreadCrumb'
import LinkedButton from 'components/LinkedButton'
import './style.css'

const WorkPassCheckDetailsHeader = ({
  candidateName,
  candidate,
  candidateId,
  requestId,
  organisationId,
  vOrgId,
  className
}) => {

  let url = `/organisations/${organisationId}/candidates/${candidateId}`
  let links = [
    {
      name: 'All Candidates',
      url: `/organisations/${organisationId}/candidates`,
      active: false,
      redirectTo: 'candidates' 
    },
    {
      name: candidateName,
      url,
      active: false,
      redirectTo: 'candidateRequests' 
    },
    {
      name: `Request ${requestId}`,
      url,
      active: true,
      redirectTo: 'requestNum'
    }
  ]
  if (vOrgId && vOrgId != organisationId) {
    url = `/organisations/${vOrgId}/verifyingorganisations/${organisationId}/externalCandidates/${candidateId}`
    links = [
      {
        name: 'All External Candidates',
        url: `/organisations/${vOrgId}/externalcandidates`,
        active: false,
        redirectTo: 'candidates'
      },
      {
        name: candidateName,
        url,
        active: false,
        redirectTo: 'candidateRequests'
      },
      {
        name: `Request ${requestId}`,
        url,
        active: true,
        redirectTo: 'requestNum'
      }
    ]
  }

  return (
    <div>
      <BreadCrumb links={links} className="Candidate__breadcrumb" requestId={requestId} />
      <header className="CandidateHeader Candidate__header">
        <CandidateInfo
          info={candidate}
        />
        {/* <LinkedButton
        className="CandidateNewRequestsHeader__btn"
        color="blue"
        to={`/organisations/${organisationId}/candidates/${candidateId}`}>Return to {requestId}</LinkedButton> */}

        <LinkedButton
          className="CandidateNewRequestsHeader__btn"
          color="blue"
          to={{
            pathname: url,
            state: { 'requestId': requestId, 'redirectTo': 'requestNum' }
          }}>Return to {requestId}</LinkedButton>
      </header>
    </div>
  )
}

WorkPassCheckDetailsHeader.propTypes = {
  candidateName: PropTypes.string.isRequired,
  candidateId: PropTypes.number.isRequired,
  organisationId: PropTypes.number.isRequired,
  requestId: PropTypes.string.isRequired,
  className: PropTypes.string
}

WorkPassCheckDetailsHeader.defaultProps = {
  className: ''
}

export default WorkPassCheckDetailsHeader
