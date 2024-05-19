import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Assets from 'components/AvatarBig/assets'
import './style.css'

const Avatar = (props) => {
  const { imageUrl, theme, size, label, icon } = props
  const image = (imageUrl && imageUrl.indexOf('https://') !== -1) ?
    imageUrl : Assets.placeholder
  const cssAvatar = classNames(`Avatar Avatar-${theme} Avatar-size-${size}`, {
    'Avatar-withLabel': label
  })
  const altText = (label) || 'logo'

  return (
    <div className={cssAvatar}>
      <img src={image} alt={altText} />
      {icon !== '' &&
        <span className={`Avatar-icon-${icon}`}>&nbsp;</span>
      }
      {label &&
        <span>{props.label}</span>
      }
    </div>
  )
}

Avatar.defaultProps = {
  theme: 'white',
  size: '40',
  icon: ''
}

Avatar.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.string
}

export default Avatar
