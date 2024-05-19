import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { renderValidation } from 'containers/Profile/utils/validation'
import languages from 'utils/languages'
import proficiencyOptions from 'utils/languagesProficiency'
import BaseForm from './BaseForm'

class LanguageForm extends BaseForm {
  componentDidMount() {
    if (!this.props.proficiency) {
      this.handleChange(5, 'proficiency')
    }
  }

  render() {
    const {
      description,
      name,
      proficiency,
      invalidFields
    } = this.props

    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'name')}>Name</label>
          <Select
            name="select-language"
            placeholder={name}
            options={languages}
            ignoreCase={true}
            matchProp="label"
            matchPos="any"
            value={name}
            onChange={(obj) => {
              this.onTextChange('name', {
                target: {
                  value: obj.label
                }
              })
            }}
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
          <Select
            name="select-proficiency"
            options={proficiencyOptions}
            ignoreCase={true}
            matchProp="label"
            matchPos="any"
            value={parseInt(proficiency, 10)}
            onChange={(obj) => {
              if (obj && obj.value) {
                this.handleChange(obj.value, 'proficiency')
              }
            }}
          />
        </div>
      </div>
    )
  }
}

LanguageForm.defaultProps = {
  invalidFields: []
}

LanguageForm.propTypes = {
  invalidFields: PropTypes.array,
  name: PropTypes.string,
  description: PropTypes.string,
  proficiency: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onFieldChange: PropTypes.func.isRequired
}

export default LanguageForm
