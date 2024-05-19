import React from 'react'
import PropTypes from 'prop-types'
import Assets from './assets'
import './style.css'

const StatusBadge = (props) => {
  const statusMap = {
    accepted: { text: 'Request confirmed', icon: 'greenIcon' },
    awaiting_signature: { text: 'Awaiting signature', icon: 'yellowIcon' },
    declined: { text: 'Rejected by organisation', icon: 'redIcon' },
    pending: { text: 'Pending', icon: 'yellowIcon' },
    unverified: { text: 'Unverified on profile', icon: 'grayIcon' }
  }
  const { type, showLabel } = props
  const icon = statusMap[type].icon

  return (
    <div className={`StatusBadge StatusBadge-${type}`}>
      <img src={Assets[icon]} alt={statusMap[type].text} />
      {showLabel &&
        statusMap[type].text
      }
    </div>
  )
}

StatusBadge.defaultProps = {
  type: 'unverified',
  showLabel: false
}

StatusBadge.propTypes = {
  type: PropTypes.string,
  showLabel: PropTypes.bool
}

export default StatusBadge
