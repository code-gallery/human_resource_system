import React from 'react'
import PropTypes from 'prop-types'
import StatusBadge from 'components/StatusBadge'

const StatusInfo = (props) => {
  const { user_signature, organisation_signature, status } = props.item
  const userKey = (user_signature) ? 'accepted' : 'unverified'
  const orgKey = (organisation_signature) ? 'accepted' : 'unverified'

  return (
    <td className="col-xs-12 col-md-3">
      <StatusBadge type={userKey} showLabel={true} />
      <StatusBadge type={orgKey} showLabel={true} />
      <StatusBadge type={status} showLabel={true} />
    </td>
  )
}

StatusInfo.propTypes = {
  item: PropTypes.shape({
    organisation_signature: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    user_signature: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    status: PropTypes.string
  })
}

export default StatusInfo
