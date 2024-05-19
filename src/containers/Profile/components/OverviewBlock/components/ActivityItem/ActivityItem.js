import React from 'react'
import PropTypes from 'prop-types'
import { getActivityItemDisplayProps } from 'utils/verification'

const ActivityItem = (props) => {
  const {
    verb,
    displayDate,
    status,
    statusClassName
  } = getActivityItemDisplayProps(props)
  const { assertion, organisation } = props
  return (
    <li>
      <strong><em>{displayDate}</em></strong>
      <p>{assertion} at {organisation} {verb} <span className={statusClassName}>{status}</span>.</p>
    </li>
  )
}

ActivityItem.propTypes = {
  assertion: PropTypes.string,
  organisation: PropTypes.string
}

export default ActivityItem
