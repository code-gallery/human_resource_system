import React from 'react'
import PropTypes from 'prop-types'

/** Must be used inside a table element */
const TableHeading = ({ children }) => (
  <th className="TableHeading">
    {children}
  </th>
)

TableHeading.propTypes = {
  children: PropTypes.node
}

export default TableHeading
