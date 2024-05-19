import React from 'react'
import PropTypes from 'prop-types'

/** The classic hamburger icon used in Navbar */
const Menu = ({ className, color }) => (
  <svg className={className} viewBox="0 0 8 8">
    <path
      fill={color}
      d="M0 1v1h8v-1h-8zm0 2.969v1h8v-1h-8zm0 3v1h8v-1h-8z"
    ></path>
  </svg>
)

Menu.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

Menu.defaultProps = {
  className: ''
}

export default Menu
