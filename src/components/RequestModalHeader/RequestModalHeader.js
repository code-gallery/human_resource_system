import React from 'react'
import PropTypes from 'prop-types'
import LinkedAvatar from 'components/LinkedAvatar'
import './style.css'

const RequestModalHeader = ({
  organisationAvatar,
  userAvatar,
  title,
  position,
  date,
  location,
  id,
  className
}) => (
  <header className={`RequestModalHeader ${className}`}>
    <h1 className="RequestModalHeader__header RequestModalHeader__header--1">
      {title}
    </h1>

    <LinkedAvatar
      className="RequestModalHeader__avatars"
      msg="sent"
      avatarLeft={{
        src: organisationAvatar,
        alt: 'Sender avatar'
      }}
      avatarRight={{
        src: userAvatar,
        alt: 'User avatar'
      }}
    />

    <h2 className="RequestModalHeader__header RequestModalHeader__header--2">{position}</h2>

    <p className="RequestModalHeader__info">
      {date}
      <span className="RequestModalHeader__info-separator">|</span>
      {location}
      <span className="RequestModalHeader__info-separator">|</span>
      {id}
    </p>
  </header>
)

RequestModalHeader.defaultProps = {
  className: ''
}

RequestModalHeader.propTypes = {
  organisationAvatar: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  title: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default RequestModalHeader
