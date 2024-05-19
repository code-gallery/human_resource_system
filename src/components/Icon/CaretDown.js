import React from 'react'
import PropTypes from 'prop-types'

const CaretDown = ({ className, color }) => (
  <svg className={className} viewBox="0 0 8 8">
    <path fill={color} d="M0 2l4 4 4-4h-8z"></path>
  </svg>
)

CaretDown.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

CaretDown.defaultProps = {
  className: ''
}

export default CaretDown
