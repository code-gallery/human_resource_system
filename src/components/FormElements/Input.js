import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const { name, placeholder, label,
    onChange, required, type
  } = props
  const placeholderText = placeholder || label
  const value = props.value || ''

  return (
    <div className={`form-group ${props.className}`}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholderText}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

Input.defaultProps = {
  required: false,
  className: '',
  type: 'text'
}

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string
}

export default Input
