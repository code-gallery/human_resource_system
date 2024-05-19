import React from 'react'
import PropTypes from 'prop-types'
import CandidateInfo from '../CandidateInfo'
import './style.css'

const CandidateHeader = ({
  candidate,
  orgId,
  organisationBalance,
  invitationPending,
  hasRequests,
  className
}) => {
  const orgIsPoor = organisationBalance <= 0
  const title = orgIsPoor
    ? 'You have no balance to create a new candidate request'
    : 'New Request'

  return (
    <header className={`CandidateHeader ${className}`}>
      <CandidateInfo
        invitationPending={invitationPending}
        hasRequests={hasRequests}
        info={candidate}
      />
    </header>
  )
}

CandidateHeader.propTypes = {
  orgId: PropTypes.number.isRequired,
  candidate: PropTypes.object.isRequired,
  invitationPending: PropTypes.bool.isRequired,
  organisationBalance: PropTypes.number.isRequired,
  className: PropTypes.string,
  hasRequests: PropTypes.bool.isRequired
}

CandidateHeader.defaultProps = {
  className: ''
}

export default CandidateHeader
