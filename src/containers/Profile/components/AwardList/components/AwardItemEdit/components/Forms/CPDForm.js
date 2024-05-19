import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import _isNil from 'lodash/isNil'
import Autocomplete from 'react-google-autocomplete'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
import BaseForm from './BaseForm'

class CPDForm extends BaseForm {
  render() {
    const {
      description,
      name,
      cpd_type,
      duration,
      location,
      date_to,
      date_from,
      organisation,
      invalidFields,
      invalidDates
    } = this.props
    const options = [
      { text: 'Formal' },
      { text: 'Informal' }
    ]
    const locationPlaceholder = (_isNil(location) || location === '') ?
      'Enter a location' : location

    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'name')}>Name</label>
          <input type="text" name="name" defaultValue={name} onChange={v => this.onTextChange('name', v)} />
        </div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'description')}>Description</label>
          <input
            type="text"
            name="description"
            defaultValue={description}
            onChange={v => this.onTextChange('description', v)}
          />
        </div>
        <div className="form-group active">
          <label className={renderValidation(invalidFields, 'organisation')}>Organisation</label>
          <Select.Async
            loadOptions={this.getOptions}
            autosize={false}
            labelKey="name"
            valueKey="name"
            value={{ name: organisation }}
            onChange={this.selectAsyncChange}
            onBlur={this.selectAsyncBlur}
            onBlurResetsInput={false}
            autoBlur={true}
            optionRenderer={this.optionRenderer}
            noResultsText="Can't find your organisation? Add it manually and we’ll investigate."
          />
        </div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'cpd_type')}>CPD Type</label>
          <Select
            name="select-content"
            options={options}
            labelKey="text"
            valueKey="text"
            value={{ text: cpd_type || '' }}
            onChange={v => this.handleChange(v ? v.text : '', 'cpd_type')}
          />
        </div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'duration')}>Duration</label>
          <input type="text" name="duration" defaultValue={duration} onChange={v => this.onTextChange('duration', v)} />
        </div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'location')}>Location</label>
          <Autocomplete
            onPlaceSelected={res => this.onTextChange('location', res)}
            placeholder={locationPlaceholder}
            types={[ '(cities)' ]}
          />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <CustomDatePicker
              handleDate={this.handleChange}
              invalid={invalidFields.indexOf('date_from') !== -1}
              date={date_from}
              title="date_from"
              label="Date From"
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <CustomDatePicker
              handleDate={this.handleChange}
              invalid={invalidFields.indexOf('date_to') !== -1}
              date={date_to}
              title="date_to"
              label="Date To"
              endDate
            />
          </div>
        </div>
        {invalidDates && (<div className="required-error">Date To can not be earlier than Date From</div>)}
      </div>
    )
  }
}

CPDForm.propTypes = {
  invalidFields: PropTypes.array,
  organisation: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  cpd_type: PropTypes.string,
  duration: PropTypes.string,
  location: PropTypes.string,
  date_to: PropTypes.string,
  date_from: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  invalidDates: PropTypes.bool,
  orgRegistered: PropTypes.func.isRequired
}

export default CPDForm
