import React from 'react'
import PropTypes from 'prop-types'

const ChangePassword = (props) => {
  const {
    currentPassword,
    newPassword,
    retypedNewPassword,
    onChangeInput,
    onChangePassword
  } = props

  return (
    <div>
      <h2 className="form-group">Change Password</h2>

      <form>
        <div className="form-group">
          <label>Current Password</label>
          <input
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <label>Retype New Password</label>
          <input
            name="retypedNewPassword"
            type="password"
            value={retypedNewPassword}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-group">
          <button
            className="form-btn save"
            onClick={onChangePassword}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

ChangePassword.propTypes = {
  currentPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  retypedNewPassword: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired
}

export default ChangePassword
