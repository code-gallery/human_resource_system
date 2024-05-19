import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const OrganisationForm = (props) => {
  const { name, onChangeInput, save, errors, success } = props

  return (
    <div>
      <h2 className="form-group">Tell us about an organisation</h2>
      <p className="form-group">
        APPII team will use the information below to onboard an organisation on our system.<br />
        The fields with * are mandatory.
      </p>
      <form>
        <div
          className={classNames('form-group', {
            'has-error': errors.indexOf('name') !== -1
          })}
        >
          <label>Organisation name *</label>
          <input
            name="name"
            type="text"
            onChange={onChangeInput}
          />
        </div>

        <div
          className={classNames('form-group', {
            'has-error': errors.indexOf('contactName') !== -1
          })}
        >
          <label>Contact name *</label>
          <input
            name="contactName"
            type="text"
            onChange={onChangeInput}
          />
        </div>

        <div
          className={classNames('form-group', {
            'has-error': errors.indexOf('contactEmail') !== -1
          })}
        >
          <label>Contact email *</label>
          <input
            name="contactEmail"
            type="text"
            onChange={onChangeInput}
          />
        </div>

        <div
          className={classNames('form-group', {
            'has-error': errors.indexOf('websiteUrl') !== -1
          })}
        >
          <label>Website url *</label>
          <input
            name="websiteUrl"
            type="text"
            onChange={onChangeInput}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn profile url</label>
          <input
            name="linkedInUrl"
            type="text"
            onChange={onChangeInput}
          />
        </div>

        <div className="form-group">
          <button
            className="form-btn save"
            onClick={save}
          >
            Send
          </button>
        </div>
      </form>
      {success &&
        <p className="form-group">
          Thanks, we will create a profile for {name} and seek a verification administrator as quickly as we can
        </p>
      }
    </div>
  )
}

OrganisationForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired,
  name: PropTypes.string
}

export default OrganisationForm
