import React from 'react'
import PropTypes from 'prop-types'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
import BaseForm from './BaseForm'

export default class AchievementForm extends BaseForm {
  render() {
    const {
      date,
      description,
      name,
      invalidFields
    } = this.props

    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'name')}>Name</label>
          <input type="text" name="name" defaultValue={name} onChange={v => this.onTextChange('name', v)} />
        </div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'description')}>Description</label>
          <input type="text" defaultValue={description} onChange={v => this.onTextChange('description', v)} />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <CustomDatePicker
              handleDate={this.handleChange}
              invalid={invalidFields.indexOf('date') !== -1}
              date={date}
              title="date"
              label="Date" />
          </div>
        </div>
      </div>
    )
  }
}

AchievementForm.propTypes = {
  invalidFields: PropTypes.array,
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  onFieldChange: PropTypes.func
}
