import React from 'react'
import PropTypes from 'prop-types'
import IntercomIntegration from 'react-intercom'

const Intercom = ({ user }) => {
  if (!user || !user.id) {
    return null
  }

  const icUser = {
    appID: process.env.NODE_ENV === 'production' ? 'ana928c7' : 'c5qk0sk0',
    user_id: user.id,
    email: user.email,
    name: `${user.first_name} ${user.last_name}`,
    created_at: Math.floor(new Date(user.created_at) / 1000),
    has_mobile: !!user.mobile_address
  }

  if (user.requests) {
    icUser.work_pass_requests = user.requests.length
  }

  return <IntercomIntegration {...icUser} />
}

Intercom.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Intercom
