import React from 'react'
import PropTypes from 'prop-types'

const ChevronDown = ({ color, className }) => (
  <svg
    className={className}
    viewBox="0 0 19 12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <g
        transform="translate(-1197 -286)"
        stroke={color}
        strokeWidth="3"
      >
        <g transform="translate(1056 271)">
          <polyline id="Path-3" points="143 16 150.768503 23.9899998 157.971182 16" />
        </g>
      </g>
    </g>
  </svg>
)

ChevronDown.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

ChevronDown.defaultProps = {
  className: ''
}

export default ChevronDown
