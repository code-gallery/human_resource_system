import React from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import Autocomplete from 'react-google-autocomplete'
import _isNil from 'lodash/isNil'
import moment from 'moment'
import { renderValidation } from 'containers/Profile/utils/validation'
import TwitterInput from '../TwitterInput'

const EditProfile = (props) => {
  const {
    onChangeProfileField,
    invalidFields,
    user: {
      first_name,
      last_name,
      twitter,
      tagline,
      public_email,
      mobile,
      town,
      country,
      dob
    }
  } = props
  const locationPlaceholder = ((_isNil(town) || town === '') && (_isNil(country) || country === '')) ?
    'Enter your address' : `${town}, ${country}`
  const dateValue = (dob) ? moment(dob) : ''

  return (
    <div className="profile-overview-edit">
      <p className="profile-block-title">Details</p>
      <div className="form-group">
        <label className={renderValidation(invalidFields, 'first_name')}>First Name</label>
        <input
          name="first_name"
          type="text"
          defaultValue={first_name}
          onChange={e => onChangeProfileField('first_name', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className={renderValidation(invalidFields, 'last_name')}>Last Name</label>
        <input
          name="last_name"
          type="text"
          defaultValue={last_name}
          onChange={e => onChangeProfileField('last_name', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>About</label>
        <textarea
          name="tagline"
          value={tagline || ''}
          onChange={e => onChangeProfileField('tagline', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <Autocomplete
          onPlaceSelected={res => onChangeProfileField('location', res)}
          placeholder={locationPlaceholder}
          types={[ '(cities)' ]}
        />
      </div>
      <div className="form-group">
        <label>Twitter</label>
        <TwitterInput
          value={twitter}
          onChangeInput={val => onChangeProfileField('twitter', val)} />
      </div>
      <div className="form-group">
        <label>Public Email</label>
        <input
          name="public_email"
          type="text"
          defaultValue={public_email}
          onChange={e => onChangeProfileField('public_email', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Public Telephone</label>
        <input
          name="mobile"
          type="text"
          defaultValue={mobile}
          onChange={e => onChangeProfileField('mobile', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <Datetime
          name="dob"
          value={dateValue}
          dateFormat="DD/MM/YYYY"
          timeFormat={false}
          onChange={(date) => {
            if (date && date.format) {
              onChangeProfileField('dob', date.format('YYYY-MM-DD'))
            }
          }}
        />
      </div>
    </div>
  )
}

EditProfile.propTypes = {
  user: PropTypes.object,
  onChangeProfileField: PropTypes.func.isRequired,
  invalidFields: PropTypes.array.isRequired
}

export default EditProfile
