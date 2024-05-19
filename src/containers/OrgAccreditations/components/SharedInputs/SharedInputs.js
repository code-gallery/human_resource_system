import React from 'react'
import PropTypes from 'prop-types'
import Input from 'components/FormElements/Input'
import SelectDeliveryType from '../SelectDeliveryType'
import DateTimeInputs from '../DateTimeInputs'
import SelectStatus from '../SelectStatus'
import LocationMap from '../LocationMap'
import './style.css'

const SharedInputs = (props) => {
  const { onChangeInput, data } = props

  const toggleLocationEnable = () => {
    onChangeInput({
      target: {
        name: 'location_enable',
        value: !data.location_enable
      }
    })
  }

  return (
    <div className="separator">
      <h4>Accreditation Details</h4>
      <div className="row">
        <div className="col-md-6">
          <SelectStatus
            value={parseInt(data.enabled, 10)}
            onChangeInput={onChangeInput}
          />
        </div>
        <div className="col-md-6">
          <Input name="link" value={data.link} label="Link" onChange={onChangeInput} placeholder="https://..." />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <SelectDeliveryType
            value={data.delivery_type}
            onChangeInput={onChangeInput}
          />
        </div>
      </div>
      <div className="separator">
        <h4>Validity</h4>
        <DateTimeInputs data={data} start={true} onChangeInput={onChangeInput} />
        <DateTimeInputs data={data} start={false} onChangeInput={onChangeInput} />

        <div className="row">
          <div className="col-md-6">
            <div className="form-group location-enable">
              <div onClick={toggleLocationEnable}>
                <input
                  name="location_enable"
                  checked={data.location_enable}
                  type="checkbox"
                  onChange={toggleLocationEnable}
                />
                <label>
                  Restrict by location
                </label>
              </div>
            </div>
          </div>
        </div>

        { !!data.location_enable && <LocationMap data={data} onChangeInput={onChangeInput} /> }
      </div>
    </div>
  )
}

SharedInputs.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default SharedInputs
