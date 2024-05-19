import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const imageStyle = (width, height) => {
  return {
    width,
    height,
    objectFit: 'cover'
  }
}

const Image = (props) => {
  const { src, isSelected, onImageClick } = props
  const cssResponsive = classNames('responsive', { 'selected': isSelected })
  const cssThumbnail = classNames('thumbnail', { 'selected': isSelected })
  return (
    <div className={cssResponsive}
      onClick={onImageClick}>
      <img src={src}
        alt="thumbnail"
        className={cssThumbnail}
        style={imageStyle(150, 150)}
      />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onImageClick: PropTypes.func.isRequired
}

export default Image
