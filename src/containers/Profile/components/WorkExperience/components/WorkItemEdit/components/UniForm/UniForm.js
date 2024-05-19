import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import _isNil from 'lodash/isNil'
import Autocomplete from 'react-google-autocomplete'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
import BaseForm from 'containers/Profile/components/AwardList/components/AwardItemEdit/components/Forms/BaseForm'
import WorkExperienceAchievement from 'containers/Profile/components/WorkExperienceAchievement'

export default class UniForm extends BaseForm {
  render() {
    const {
      position,
      location,
      achievements,
      start_date,
      end_date,
      industry,
      industries,
      invalidFields,
      invalidDates,
      invalidMessage,
      onFieldChange,
      employment_type
    } = this.props
    const locationPlaceholder = (_isNil(location) || location === '') ?
      'Enter a location' : location

    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'position')}>Position</label>
          <input type="text" name="position" value={position || ''} onChange={v => this.onTextChange('position', v)} />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label>Location</label>
              <Autocomplete
                onPlaceSelected={res => this.onTextChange('location', res)}
                placeholder={locationPlaceholder}
                types={[ '(cities)' ]}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label className={renderValidation(invalidFields, 'industry')}>Industry</label>
              <Select
                name="select-content"
                options={industries}
                labelKey="text"
                valueKey="text"
                value={{ text: industry || '' }}
                onChange={v => this.handleChange(v ? v.text : '', 'industry')}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                handleDate={this.handleChange}
                invalid={invalidFields.indexOf('start_date') !== -1}
                date={start_date}
                title="start_date"
                label="Start Date"
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                handleDate={this.handleChange}
                invalid={invalidFields.indexOf('end_date') !== -1}
                date={end_date}
                title="end_date"
                label="End Date"
                endDate
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label className={renderValidation(invalidFields, 'employment_type')}>Employment Type</label>
              <Select
                name="select-content"
                options={[
                  {
                    value: 'permanent',
                    label: 'Permanent Employee'
                  },
                  {
                    value: 'contractor',
                    label: 'Contractor'
                  }
                ]}
                value={employment_type}
                onChange={v => this.handleChange(v ? v.value : '', 'employment_type')}
              />
            </div>
          </div>
        </div>
        <WorkExperienceAchievement achievements={achievements} onFieldChange={onFieldChange} />
        {invalidDates && (<div className="required-error">{invalidMessage}</div>)}
      </div>
    )
  }
}

UniForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  achievements: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  position: PropTypes.string,
  location: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  industry: PropTypes.string,
  industries: PropTypes.array,
  invalidFields: PropTypes.array,
  invalidDates: PropTypes.bool,
  invalidMessage: PropTypes.string,
  employment_type: PropTypes.string
}
