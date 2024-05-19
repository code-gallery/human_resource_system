import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'components/FormElements/SelectField'
import AccreditationsForm from './Form'
import SelectAccreditationLevel from '../SelectAccreditationLevel'
import SelectAccreditationDuration from '../SelectAccreditationDuration'

const Cpd = (props) => {
  const { onChangeInput, data } = props
  const optionsType = [
    { value: 'Formal', label: 'Formal' },
    { value: 'Informal', label: 'Informal' }
  ]

  return (
    <AccreditationsForm {...props} title="CPD Details">
      <div className="row">
        <div className="col-md-6">
          <SelectField
            name="select-cpd-type"
            label="Type"
            placeholder="Choose type (Formal/Informal)"
            value={data.award_cpd_type}
            options={optionsType}
            onChange={(obj) => {
              onChangeInput({
                target: {
                  name: 'award_cpd_type',
                  value: (obj) ? obj.value : ''
                }
              })
            }}
          />
        </div>

        <div className="col-md-6">
          <SelectAccreditationLevel
            value={data.level}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <SelectAccreditationDuration
            value={data.award_duration}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>
    </AccreditationsForm>
  )
}

Cpd.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default Cpd
