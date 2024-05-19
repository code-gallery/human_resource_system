import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const mapping = {
  complete: <span className="RequestStatus RequestStatus--complete">Complete</span>,
  submitted: <span className="RequestStatus RequestStatus--pending">Submitted</span>,
  pending: <span className="RequestStatus RequestStatus--pending">Incomplete</span>,
  failed: <span className="RequestStatus RequestStatus--declined">Failed</span>,
  ready: <span className="RequestStatus RequestStatus--pending">Ready</span>,
  awaiting_response: <span className="RequestStatus RequestStatus--pending">Awaiting Response</span>,
  admin: <span className="RequestStatus RequestStatus--pending">Admin</span>
}

const RequestStatus = ({ status }) => mapping[status] ? mapping[status] : <span className="RequestStatus RequestStatus--pending">{status}</span>

/*RequestStatus.propTypes = {
  status: PropTypes.oneOf([
    'pending',
    'submitted',
    'complete',
    'failed',
    'ready',
    'awaiting_response',
    'admin'
  ]).isRequired
}*/

export default RequestStatus
