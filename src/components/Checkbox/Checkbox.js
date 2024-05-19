import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.css'

const Checkbox = ({ checked, onChange, className }) => {
  const labelStyles = classNames(
    'Checkbox__label',
    { 'is-checked': checked }
  )

  return (
    <div className={`Checkbox ${className}`}>
      <label className={labelStyles}>
        <input
          className="Checkbox__input"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

Checkbox.defaultProps = {
  checked: false,
  className: ''
}

export default Checkbox
