import React from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import ChevronDown from './ChevronDown'
import ChevronUp from './ChevronUp'
import CaretDown from './CaretDown'
import Menu from './Menu'
import Appii from './Appii'
import Close from './Close'

const mapping = {
  search: Search,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  caretDown: CaretDown,
  menu: Menu,
  appii: Appii,
  close: Close
}

const Icon = ({ type, color, className }) => React.createElement(
  mapping[type],
  {
    color,
    className
  }
)

Icon.defaultProps = {
  color: '#fff',
  className: ''
}

Icon.propTypes = {
  type: PropTypes.oneOf([
    'search',
    'chevronDown',
    'chevronUp',
    'caretDown',
    'menu',
    'appii',
    'close'
  ]).isRequired,
  color: PropTypes.string,
  className: PropTypes.string
}

export default Icon
