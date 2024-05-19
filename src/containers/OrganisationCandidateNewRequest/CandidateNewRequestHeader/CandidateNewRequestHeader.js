import React from 'react'
import PropTypes from 'prop-types'
import BreadCrumb from 'components/BreadCrumb'
import './style.css'

const CandidateNewRequestHeader = ({
  candidateName,
  candidate,
  candidateId,
  organisationId,
  className
}) => {
  const links = [
    {
      name: 'All Candidates',
      url: `/organisations/${organisationId}/candidates`,
      active: false
    },
    {
      name: candidateName,
      url: `/organisations/${organisationId}/candidates/${candidateId}`,
      active: false
    },
    {
      name: 'New Request',
      url: '#',
      active: true
    }
  ]

  return (
    <div>
      <BreadCrumb links={links} className='Candidate__breadcrumb'/>
      {/* <header className='CandidateHeader Candidate__header'>
      <CandidateInfo
        info={candidate}
      />
      <LinkedButton
        className="NewRequestsHeader__btn "
        color="red"
        to={`/organisations/${organisationId}/candidates/${candidateId}`}
      >Cancel</LinkedButton>

      </header> */}
    </div>
  )
}

CandidateNewRequestHeader.propTypes = {
  candidateName: PropTypes.string.isRequired,
  candidateId: PropTypes.number.isRequired,
  organisationId: PropTypes.number.isRequired,
  className: PropTypes.string
}

CandidateNewRequestHeader.defaultProps = {
  className: ''
}

export default CandidateNewRequestHeader
