import React from 'react'
import PropTypes from 'prop-types'

const TextArea = (props) => {
  const { name, label, onChange } = props
  const defaultValue = props.defaultValue || ''
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        name={name}
        className="form-textarea"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextArea
