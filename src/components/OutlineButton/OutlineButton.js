import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const OutlineButton = ({ className, children, color, onClick, type }) => (
  <button
    className={`OutlineButton is-${color} ${className}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
)

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([ 'green', 'blue', 'red' ]),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string
}

OutlineButton.defaultProps = {
  color: 'green',
  className: '',
  type: 'button'
}

export default OutlineButton
