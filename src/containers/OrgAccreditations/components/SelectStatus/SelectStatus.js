import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectStatus = (props) => {
  const options = [
    { value: 0, label: 'Inactive' },
    { value: 1, label: 'Active' }
  ]
  const { value, onChangeInput } = props

  return (
    <div className="form-group">
      <label>Status</label>
      <Select
        name="select-enabled"
        placeholder="Select status (Active/Inactive)"
        options={options}
        value={value}
        onChange={(obj) => {
          onChangeInput({
            target: {
              name: 'enabled',
              value: (obj) ? parseInt(obj.value, 10) : ''
            }
          })
        }}
      />
    </div>
  )
}

SelectStatus.propTypes = {
  value: PropTypes.number,
  onChangeInput: PropTypes.func.isRequired
}

export default SelectStatus
