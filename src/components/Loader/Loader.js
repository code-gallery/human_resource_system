import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ className, size, color }) => {
  const $size = typeof size === 'undefined' ? '100%' : `${size}px`

  return (
    <svg
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width={$size} height={$size}
      viewBox="0 0 50 50"
      xmlSpace="preserve"
    >
      <path
        fill={color}
        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
      >
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

Loader.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

Loader.defaultProps = {
  className: '',
  color: '#000',
  size: null
}

export default Loader
