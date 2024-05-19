import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/** Must be used inside a table element */
const TableData = ({ children, top, className, ...rest }) => (
  <td
    className={classNames('TableData', { 'TableData--top': top }, className)}
    {...rest}
  >
    {children}
  </td>
)

TableData.defaultProps = {
  top: false,
  className: ''
}

TableData.propTypes = {
  top: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
}

export default TableData
