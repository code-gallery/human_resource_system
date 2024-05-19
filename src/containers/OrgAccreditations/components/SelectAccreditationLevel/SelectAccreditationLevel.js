import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectAccreditationLevel = ({ value, onChangeInput }) => {
  const options = [
    { value: '', label: 'Not Applicable' },
    { value: 'Level 1', label: 'Level 1' },
    { value: 'Level 2', label: 'Level 2' },
    { value: 'Level 3', label: 'Level 3' },
    { value: 'Level 4', label: 'Level 4' },
    { value: 'Level 5', label: 'Level 5' },
    { value: 'Level 6', label: 'Level 6' },
    { value: 'Level 7', label: 'Level 7' },
    { value: 'Level 8', label: 'Level 8' }
  ]

  return (
    <div className="form-group">
      <label>Level</label>
      <Select
        name="select-accr-level"
        placeholder="Choose level (1-8)"
        options={options}
        value={value}
        onChange={(obj) => {
          onChangeInput({
            target: {
              name: 'level',
              value: (obj) ? obj.value : ''
            }
          })
        }}
      />
    </div>
  )
}

SelectAccreditationLevel.propTypes = {
  value: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired
}

export default SelectAccreditationLevel
