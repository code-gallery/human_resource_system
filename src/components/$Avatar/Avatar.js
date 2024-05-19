import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isString from 'lodash/isString'
import AssignAvatarImg from '../../assets/images/avatar-1.png'
import './style.css'

const DEFAULT_AVATAR = 'https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar-768x768.png'

const Avatar = ({ shadow, imgUrl, alt, className, status }) => {
  const src = isString(imgUrl) ? imgUrl : status ? AssignAvatarImg : DEFAULT_AVATAR

  return (
    <img
      className={classNames('$Avatar', className, { 'has-shadow': shadow })}
      src={src}
      alt={alt}
    />
  )
}

Avatar.propTypes = {
  shadow: PropTypes.bool,
  imgUrl: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  status: PropTypes.bool
}

Avatar.defaultProps = {
  shadow: false,
  alt: 'Profile photo',
  className: ''
}

export default Avatar
