import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const SelectAccreditationDuration = ({ value, onChangeInput }) => {
  const options = [
    { value: '', label: 'Not Applicable' }
  ]

  for (let dur = 0.5; dur <= 12; dur += 0.5) {
    options.push({
      value: dur,
      label: dur + ' hours'
    })
  }

  return (
    <div className="form-group">
      <label>Duration</label>
      <Select
        name="select-accr-duration"
        placeholder="Choose duration"
        options={options}
        value={value}
        onChange={(obj) => {
          onChangeInput({
            target: {
              name: 'award_duration',
              value: (obj) ? obj.value : ''
            }
          })
        }}
      />
    </div>
  )
}

SelectAccreditationDuration.propTypes = {
  value: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired
}

export default SelectAccreditationDuration
