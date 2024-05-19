import React from 'react'
import Select from 'react-select'
import { renderValidation } from 'containers/Profile/utils/validation'
import LinkedButton from 'components/LinkedButton'
import BaseForm from 'containers/Profile/components/AwardList/components/AwardItemEdit/components/Forms/BaseForm'
import Datetime from 'react-datetime'
import moment from 'moment'

export default class PersonalForm extends BaseForm {

  renderAuthButton = () => {
    const {
      gender,
      title,
      forename,
      surname,
      national_insurance_number,
      phone
    } = this.props
    if ((gender === null || gender === '') || (phone === null || phone === '') ||
    (title === null || title === '') || (forename === null || forename === '') || (surname === null || surname === '') || (national_insurance_number === null || national_insurance_number === '')) {
      return (<LinkedButton
        className="border-btn checkButton incomplete"
        to='#'>INCOMPLETE
      </LinkedButton>)
    } else {
      return (<LinkedButton
        className="border-btn checkButton"
        color="blue"
        to='#'>COMPLETE
      </LinkedButton>)
    }
  }

  render() {
    const {
      gender,
      dob,
      title,
      forename,
      middle_names,
      surname,
      national_insurance_number,
      phone,
      place_of_birth,
      mothermaidenname,
      criminal_record_check_ref,
      email,
      is_disable,
      emergency_contact_name,
      emergencyName2,
      emergency_contact_number,
      invalidFields,
      invalidDates,
      invalidMessage,
      onFieldChange
    } = this.props
    const renderAuthButton = this.renderAuthButton()
    const dateValue = (dob) ? moment(dob) : ''
    return (
      <div className="card">
        <div className="card-header-gray">
          <div className="col-md-6">Personal Information</div>
          <div className="col-md-6 noPadding">
            {renderAuthButton}
          </div>
        </div>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-md-12 col-form-label">Please <span className="required-error">fill in all</span> of the following personal information. All field are required.</label>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'gender')}`}>Gender</label>
            <div className="col-md-3">
              <div className="form-check-inline">
                <label className="col-form-label">
                  <input type="radio" className="form-check-input" name="gender"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={v => this.onTextChange('gender', v)}
                  />Male
                </label>
              </div>
              <div className="form-check-inline">
                <label className="col-form-label">
                  <input type="radio" className="form-check-input" name="gender" 
                    value="Female"
                    checked={gender === "Female"}
                    onChange={v => this.onTextChange('gender', v)}
                  />Female
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'title')}`}>Title</label>
            <div className="col-md-3">
              <Select
                name="select-content"
                options={[
                  {
                    value: 'Baron',
                    label: 'Baron'
                  },
                  {
                    value: 'Baroness',
                    label: 'Baroness'
                  },
                  {
                    value: 'Brigadier',
                    label: 'Brigadier'
                  },
                  {
                    value: 'Canon',
                    label: 'Canon'
                  },
                  {
                    value: 'Captain',
                    label: 'Captain'
                  },
                  {
                    value: 'Dr',
                    label: 'Dr'
                  },
                  {
                    value: 'Duchess',
                    label: 'Duchess'
                  },
                  {
                    value: 'Duke',
                    label: 'Duke'
                  },
                  {
                    value: 'Esq',
                    label: 'Esq'
                  },
                  {
                    value: 'Father',
                    label: 'Father'
                  },
                  {
                    value: 'Hon',
                    label: 'Hon'
                  },
                  {
                    value: 'Inspector',
                    label: 'Inspector'
                  },
                  {
                    value: 'Lady',
                    label: 'Lady'
                  },
                  {
                    value: 'Lord',
                    label: 'Lord'
                  },
                  {
                    value: 'Lt Col',
                    label: 'Lt Col'
                  },
                  {
                    value: 'Major',
                    label: 'Major'
                  },
                  {
                    value: 'Miss',
                    label: 'Miss'
                  },
                  {
                    value: 'Most Rever',
                    label: 'Most Rever'
                  },
                  {
                    value: 'Mr',
                    label: 'Mr'
                  },
                  {
                    value: 'Mrs',
                    label: 'Mrs'
                  },
                  {
                    value: 'Ms',
                    label: 'Ms'
                  },
                  {
                    value: 'Pastor',
                    label: 'Pastor'
                  },
                  {
                    value: 'Professor',
                    label: 'Professor'
                  },
                  {
                    value: 'Rabbi',
                    label: 'Rabbi'
                  },
                  {
                    value: 'Rev Dr',
                    label: 'Rev Dr'
                  },
                  {
                    value: 'Reverend',
                    label: 'Reverend'
                  },
                  {
                    value: 'Rt Reveren',
                    label: 'Rt Reveren'
                  },
                  {
                    value: 'Sir',
                    label: 'Sir'
                  },
                  {
                    value: 'Sister',
                    label: 'Sister'
                  },
                  {
                    value: 'Squadron L',
                    label: 'Squadron L'
                  },
                  {
                    value: 'Wg Cdr',
                    label: 'Wg Cdr'
                  }
                ]}
                value={title}
                onChange={v => this.handleChange(v ? v.value : '', 'title')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'forename'), renderValidation(invalidFields, 'surname')}`}>Your Name</label>
            <div className="col-md-3">
              <input type="text" 
                className="form-control" name="forename" value={forename || ''} onChange={v => {this.onTextChange('forename', v)} }/>
              <small className="form-text helper">First</small>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="middle_names" value={middle_names || ''} onChange={v => this.onTextChange('middle_names', v)}/>
              <small className="form-text helper">Middle(Optional)</small>
            </div>
            <div className="col-md-3">
              <input type="text" className={`form-control`} name="surname" value={surname || ''} onChange={v => this.onTextChange('surname', v)}/>
              <small className="form-text helper">Last</small>
            </div>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'dob')}`}>Date of Birth</label>
            <div className="col-md-3">
              <Datetime
                name="dob"
                value={dateValue}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                onChange={(date) => {
                  if (date && date.format) {
                    onFieldChange('dob', date.format('YYYY-MM-DD'))
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'national_insurance_number')}`} >National Insurance No.</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="national_insurance_number" value={national_insurance_number || ''} onChange={v => this.onTextChange('national_insurance_number', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'phone')}`}>Telephone No.</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="phone" value={phone || ''} onChange={v => this.onTextChange('phone', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Emergency Contact Name</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="emergency_contact_name" value={emergency_contact_name || ''} onChange={v => this.onTextChange('emergency_contact_name', v)}/>
              <small className="form-text helper">First</small>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="emergencyName2" value={emergencyName2 || ''} onChange={v => this.onTextChange('emergencyName2', v)}/>
              <small className="form-text helper">Last</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Emergency Contact No.</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="emergency_contact_number" value={emergency_contact_number || ''} onChange={v => this.onTextChange('emergency_contact_number', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Place of Birth</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="place_of_birth" value={place_of_birth || ''} onChange={v => this.onTextChange('place_of_birth', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Mother's Maiden Name</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="mothermaidenname" value={mothermaidenname || ''} onChange={v => this.onTextChange('mothermaidenname', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Email</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="email" value={email || ''} onChange={v => this.onTextChange('email', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Criminal Record Check Reference</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="criminal_record_check_ref" value={criminal_record_check_ref || ''} onChange={v => this.onTextChange('criminal_record_check_ref', v)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label">Do you have any health issues or a disability relevant to the position or the role ?</label>
            <div className="col-md-3">
              <input type="text" className="form-control" name="is_disable" value={is_disable || ''} onChange={v => this.onTextChange('is_disable', v)}/>
            </div>
          </div>
          {invalidDates }
        </div>
      </div>
    )
  }
}

PersonalForm.propTypes = {
//   onFieldChange: PropTypes.func.isRequired,
//   achievements: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.object
//   ]),
//   position: PropTypes.string,
//   location: PropTypes.string,
//   start_date: PropTypes.string,
//   end_date: PropTypes.string,
//   industry: PropTypes.string,
//   industries: PropTypes.array,
//   invalidFields: PropTypes.array,
//   invalidDates: PropTypes.bool,
//   invalidMessage: PropTypes.string,
//   employment_type: PropTypes.string
}
