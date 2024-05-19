import React from 'react'
import PropTypes from 'prop-types'

const DeleteAccount = (props) => {

  const onClickHandler = (e) => {
    e.preventDefault()
    props.deleteUserAccount()
  }

  return (
    <div>
      <h2 className="form-group delete-account-title">Close your APPII account</h2>

      <form className="delete-account-form">
        <p className={`delete-account-subtitle ${props.errorMessage ? 'required-error' : ''}`}>
          Let us know why you are closing your account:
        </p>

        <ul className="delete-account-list">
          <li>
            <label>
              <input
                name="delete"
                type="radio"
                value="I have a duplicate account"
                checked={props.reason === 'I have a duplicate account'}
                onChange={props.selectReason}
              />I have a duplicate account
            </label>
          </li>
          <li>
            <label>
              <input
                name="delete"
                type="radio"
                value="I have a privacy concern"
                checked={props.reason === 'I have a privacy concern'}
                onChange={props.selectReason}
              />I have a privacy concern
            </label>
          </li>
          <li>
            <label>
              <input
                name="delete"
                type="radio"
                value="I’m not getting any value"
                checked={props.reason === 'I’m not getting any value'}
                onChange={props.selectReason}
              />I’m not getting any value
            </label>
          </li>
          <li>
            <label>
              <input
                name="delete"
                type="radio"
                value="Other"
                checked={props.reason === 'Other'}
                onChange={props.selectReason}
              />Other
            </label>
          </li>
        </ul>
        { /* <p className="required-error">{props.errorMessage}</p> */ }
        <button className="form-btn delete" onClick={onClickHandler}>
          Delete Account
        </button>
      </form>
    </div>
  )
}

DeleteAccount.propTypes = {
  deleteUserAccount: PropTypes.func.isRequired
}

export default DeleteAccount
