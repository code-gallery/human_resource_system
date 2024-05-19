import React from 'react'
import moment from 'moment'

/**
 * Get icon display props based on verification status;
 * @param status {string} Verification status;
 * @return {*}
 */
export const getIconDisplayProps = status => {

  const statuses = {
    verified: {
      tooltip: 'Verified',
      tooltipClass: 'tooltip-success',
      blockClass: 'profile-verified-status'
    },
    'pending_verification': {
      tooltip: 'Pending verification',
      tooltipClass: 'tooltip-warning',
      blockClass: 'profile-pending-status'
    },
    not_verified: {
      tooltip: 'Not verified',
      tooltipClass: 'tooltip-dark',
      blockClass: 'profile-unverified-status'
    },
    'not verified': {
      tooltip: 'Not verified',
      tooltipClass: 'tooltip-dark',
      blockClass: 'profile-unverified-status'
    },
    declined: {
      tooltip: 'Rejected',
      tooltipClass: 'tooltip-dark',
      blockClass: 'profile-rejected-status'
    }
  }
  return statuses[status]
}

export const getEntityName = status => {
  const statuses = {
    job: {
      state: 'jobs',
      single: 'job',
      endpoint: 'jobs'
    },
    education: {
      state: 'education',
      single: 'education',
      endpoint: 'educations'
    },
    award: {
      state: 'award',
      single: 'award',
      endpoint: 'awards'
    }
  }
  return statuses[status]
}

/**
 * Get props for Overview section.
 * @param entities {object} User related entities like jobs, education etc.
 * @return {{}}
 */
export const getVerificationProps = (entities) => {
  let totalClaims = 0
  let totalVerified = 0
  let accumulator = {}
  Object.keys(entities).forEach(type => {
    if (type === 'educations' || type === 'jobs' || type === 'log') {
      const total = entities[type].length
      const verified = entities[type].filter(entity => entity.verified).length
      const verifiedPercentage = Math.round((verified / total) * 100) || 0
      totalClaims += total
      totalVerified += verified
      accumulator[type] = {
        total,
        verified,
        verifiedPercentage
      }
    } else if (type === 'allAwards') {
      const additionalFields = [ 'award', 'cpd', 'project', 'certificate' ]
      additionalFields.forEach(field => {
        const total = entities.allAwards[field].length
        const verified = entities.allAwards[field].filter(
          entity => entity.verified
        ).length
        const verifiedPercentage = Math.round((verified / total) * 100) || 0
        totalClaims += total
        totalVerified += verified
        accumulator[field] = {
          total,
          verified,
          verifiedPercentage
        }
      })
    }
  })
  const totalPercentage = Math.round((totalVerified / totalClaims) * 100) || 0
  accumulator = {
    ...accumulator,
    totalClaims,
    totalVerified,
    totalPercentage
  }
  return accumulator
}

export const getActivityItemDisplayProps = (activity) => {
  let verb, displayDate, statusClassName, status, color
  switch (activity.status) {
    case 'pending_verification':
      verb = 'is'
      statusClassName = 'Activity-pending'
      status = 'pending verification'
      break
    case 'not_verified':
      verb = 'is'
      statusClassName = 'Activity-unverified'
      status = 'not verified'
      break
    case 'rejected':
      verb = 'was'
      statusClassName = 'Activity-rejected'
      status = 'rejected'
      break
    case 'verified':
      verb = 'was'
      statusClassName = 'Activity-verified'
      status = 'verified'
      break
    default:
      return {}
  }
  if (moment(activity.date).isSame(moment(), 'd')) {
    displayDate = 'Today'
  } else if (moment(activity.date).isSame(moment().subtract(1, 'days'), 'd')) {
    displayDate = 'Yesterday'
  } else {
    displayDate = moment(activity.date).format('Do MMMM YY')
  }
  return { displayDate, verb, status, statusClassName, color }
}

export const getProfileItemEditDisplayProps = (status) => {
  const statuses = {
    verified: {
      headingClassName: 'edit-status edit-verified-status',
      headingText: 'Verified',
      locked: true,
      renderDesc: false
    },
    pending_verification: {
      headingClassName: 'edit-status edit-pending-status',
      headingText: 'This request is pending.',
      locked: true,
      renderDesc: false
    },
    not_verified: {
      headingClassName: 'edit-status edit-unverified-status',
      headingText: 'This is currently unverified, add details and submit for verification.',
      locked: false,
      renderDesc: false
    },
    rejected: {
      headingClassName: 'edit-status edit-rejected-status',
      headingText: 'This submission was rejected.',
      locked: false,
      renderDesc: true
    }
  }
  return statuses[status]
}

export const renderPendingIcon = function(tooltip, tooltipClass) {
  const css = `profile-status-ico tooltip-position-top tooltip-movable ${tooltipClass}`
  return (
    <i
      className={css}
      data-tooltip={tooltip}
    >
      &nbsp;
    </i>
  )
}
