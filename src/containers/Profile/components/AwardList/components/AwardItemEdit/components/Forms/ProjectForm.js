import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
import BaseForm from './BaseForm'

class ProjectForm extends BaseForm {
  render() {
    const {
      description,
      name,
      organisation,
      date_to,
      date_from,
      invalidFields,
      invalidDates
    } = this.props
    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'name')}>Name</label>
          <input type="text" name="name" defaultValue={name} onChange={v => this.onTextChange('name', v)} />
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
          <label className={renderValidation(invalidFields, 'description')}>Description</label>
          <input
            type="text"
            name="description"
            defaultValue={description}
            onChange={v => this.onTextChange('description', v)}
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

ProjectForm.propTypes = {
  invalidFields: PropTypes.array,
  organisation: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  date_to: PropTypes.string,
  date_from: PropTypes.string,
  invalidDates: PropTypes.bool,
  onFieldChange: PropTypes.func.isRequired,
  orgRegistered: PropTypes.func.isRequired
}

export default ProjectForm
