import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/$Avatar'
import './style.css'

const LinkedAvatar = ({
  msg,
  msgColor,
  avatarLeft,
  avatarRight,
  className
}) => (
  <section className={`LinkedAvatar ${className}`}>
    <div className="LinkedAvatar__line" />
    <span
      className="LinkedAvatar__msg"
      style={{ backgroundColor: msgColor }}
    >
      {msg}
    </span>

    <div className="LinkedAvatar__avatar">
      <Avatar imgUrl={avatarLeft.src} alt={avatarLeft.alt} shadow={true} />
    </div>
    <div className="LinkedAvatar__avatar">
      <Avatar imgUrl={avatarRight.src} alt={avatarRight.alt} shadow={true} />
    </div>
  </section>
)

LinkedAvatar.defaultProps = {
  msgColor: '#72d371',
  className: ''
}

const avatarProp = PropTypes.shape({
  src: PropTypes.string,
  alt: PropTypes.string.isRequired
}).isRequired

LinkedAvatar.propTypes = {
  avatarLeft: avatarProp,
  avatarRight: avatarProp,
  msg: PropTypes.string.isRequired,
  msgColor: PropTypes.string,
  className: PropTypes.string
}

export default LinkedAvatar
