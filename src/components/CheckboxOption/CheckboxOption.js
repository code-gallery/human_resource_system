import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'components/Checkbox'
import './style.css'

const CheckboxOption = ({ checked, text, onChange, className }) => (
  <div className={`CheckboxOption ${className}`}>
    <Checkbox
      className="CheckboxOption__input"
      checked={checked}
      onChange={onChange}
    />

    <p className="CheckboxOption__text">{text}</p>

  </div>

)

CheckboxOption.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

CheckboxOption.defaultProps = {
  className: '',
  checked: false
}

export default CheckboxOption
