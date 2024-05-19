import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import './style.css'

const LabeledSelectInput = ({ className, label, onValueChange, options, value, placeholder,required }) => {
  let selectElem

  const handleChange = () => {
    onValueChange(selectElem.value)
  }

  const handleInputElem = (elem) => {
    selectElem = elem
  }

  return (
    <label className={`LabeledSelectInput ${className}`}>
      <span className="LabeledSelectInput__txt">{label}</span>
      <Icon className="LabeledSelectInput__icon" type="caretDown" color="44484c" />

      <select
        className="LabeledSelectInput__select"
        onChange={handleChange}
        ref={handleInputElem}
        value={value}
        required={required}
      >
		 {placeholder !== undefined ?
        <option className="placeholder__Text" key={placeholder} value="" disabled>{placeholder}</option>
        :null}																																		  
        {
          Object.entries(options).map(([ value, name ]) => (
            <option key={value} value={value}>{name}</option>
          ))
        }
      </select>
    </label>
  )
}

LabeledSelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
}

LabeledSelectInput.defaultProps = {
  className: '',
  required:false
}

export default LabeledSelectInput
