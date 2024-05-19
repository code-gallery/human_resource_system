import React from 'react'
import PropTypes from 'prop-types'

const Close = ({ color, className }) => (
  <svg
    className={className}
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-958 -160)" stroke={color} strokeWidth="3">
        <g transform="rotate(-45 678.966 -1065.095)">
          <path d="M10,0 L10,20" id="Path-4" />
          <path d="M0,10 L20,10" id="Path-4" />
        </g>
      </g>
    </g>
  </svg>
)

Close.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

Close.defaultProps = {
  className: ''
}

export default Close
