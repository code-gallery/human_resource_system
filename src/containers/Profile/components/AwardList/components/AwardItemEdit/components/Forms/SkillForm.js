import React from 'react'
import PropTypes from 'prop-types'
import InputRange from 'react-input-range'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
import BaseForm from './BaseForm'

class SkillForm extends BaseForm {
  componentDidMount() {
    if (!this.props.proficiency) {
      this.handleChange(3, 'proficiency')
    }
  }

  render() {
    const {
      description,
      name,
      proficiency,
      invalidFields,
      date
    } = this.props
    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'name')}>Name</label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            onChange={v => this.onTextChange('name', v)}
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
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'proficiency')}>Skill Level</label>
          <div className="col-xs-12 col-md-6">
            <InputRange
              maxValue={5}
              minValue={1}
              value={parseInt(proficiency, 10)}
              onChange={value => this.handleChange(value, 'proficiency')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
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

SkillForm.defaultProps = {
  invalidFields: []
}

SkillForm.propTypes = {
  invalidFields: PropTypes.array,
  proficiency: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired
}

export default SkillForm
