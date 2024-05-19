import React from 'react'
import PropTypes from 'prop-types'

const ChevronUp = ({ color, className }) => (
  <svg
    className={className}
    viewBox="0 0 18 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-1326 -576)" stroke={color} strokeWidth="3">
        <polyline
          id="Path-3"
          transform="rotate(-180 1335.486 582.995)"
          points="1328 579 1335.7685 586.99 1342.97118 579"
        />
      </g>
    </g>
  </svg>
)

ChevronUp.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

ChevronUp.defaultProps = {
  className: ''
}

export default ChevronUp
