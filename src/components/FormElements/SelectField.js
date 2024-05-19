import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const SelectField = (props) => {
  const { label, name, options, value, onChange } = props
  const placeholder = props.placeholder || 'Select...'

  return (
    <div className="form-group">
      <label>{label}</label>
      <Select
        name={name}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default SelectField
