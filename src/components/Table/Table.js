import React from 'react'
import PropTypes from 'prop-types'

const Table = ({ children, className }) => (
  <table className={`Table ${className}`}>
    {children}
  </table>
)

Table.defaultProps = {
  className: ''
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
}

export default Table
