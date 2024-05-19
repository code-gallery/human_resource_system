import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notifications, { notify } from 'react-notify-toast'
import Select from 'react-select'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'

class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAdmin: {
        user: null,
        primary: null
      }
    }
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, NOTIFICATION_TIMEOUT)
  }

  optionRenderer = (option) => {
    return (
      <div className="institution-select">
        <img src={option.profile_image} alt={option.first_name} />
        <p>{`${option.first_name} ${option.last_name}`}</p>
      </div>
    )
  }

  selectAdmin = (value) => {
    this.setState({
      selectedAdmin: {
        user: value
      }
    })
  }

  isSelectedAdminPrimary = (value) => {
    this.setState({
      selectedAdmin: {
        ...this.state.selectedAdmin,
        primary: value
      }
    })
  }

  addAdminHandler = (e) => {
    e.preventDefault()

    const { selectedAdmin } = this.state

    if (!selectedAdmin.user) {
      this.notifyFn('Select user first', 'error')
    } else {
      this.props.addAdmin({
        orgId: this.props.orgId,
        user_id: selectedAdmin.user.id,
        primary: selectedAdmin.primary && selectedAdmin.primary.label === 'Yes'
      })
    }
  }

  render() {
    const { showForm, employees, closeForm } = this.props
    const { user, primary } = this.state.selectedAdmin

    if (!showForm) {
      return null
    }

    return (
      <form className="admin">
        <Notifications />

        <div className="col-md-3">
          <div className="form-group">
            <label>Users</label>
            <Select
              options={employees}
              labelKey="first_name"
              valueKey="first_name"
              value={{ first_name: user ? `${user.first_name} ${user.last_name}` : 'Select...' }}
              optionRenderer={this.optionRenderer}
              onChange={this.selectAdmin}
            />
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label>Primary Contact</label>
            <Select
              valueKey="label"
              value={{ label: primary ? primary.label : 'Select...' }}
              options={[ { label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' } ]}
              onChange={this.isSelectedAdminPrimary}
              disabled={!user} />
          </div>
        </div>

        <div className="col-md-6">
          <button className="btn green-btn admin-form-btn" onClick={this.addAdminHandler}>
            Confirm
          </button>

          <button className="btn grey-btn admin-form-btn admin-form-btn" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    )
  }
}

AdminForm.propTypes = {
  showForm: PropTypes.bool,
  orgId: PropTypes.string,
  employees: PropTypes.array,
  closeForm: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired
}

export default AdminForm
