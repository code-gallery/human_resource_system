import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { VISIBILITY_OPTIONS } from 'containers/constants'

const ProfileVisibility = (props) => {
  const options = VISIBILITY_OPTIONS
  const { value, onChangeInput } = props

  return (
    <div className="form-group">
      <h2 className="form-group">Profile visibility</h2>
      <ul>
        <div className="form-group text-center">
          <span className="pull-left settings-item-text">Who can see your profile</span>
          <div className="pull-right col-xs-12 col-md-3">
            <Select
              name="select-profile-visibility"
              placeholder="Select setting"
              options={options}
              value={value}
              onChange={(obj) => {
                onChangeInput({
                  target: {
                    name: 'profileVisibility',
                    value: obj.value
                  }
                })
              }}
            />
          </div>
        </div>
      </ul>
    </div>
  )
}

ProfileVisibility.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default ProfileVisibility
