import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const ColorButton = ({ className, children, color, onClick, type }) => (
  <button
    className={`ColorButton is-${color} ${className}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
)

ColorButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([ 'green', 'blue', 'red' ]),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string
}

ColorButton.defaultProps = {
  color: 'green',
  className: '',
  type: 'button'
}

export default ColorButton
