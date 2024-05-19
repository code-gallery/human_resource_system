import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT, ROUTE_URL, getApiUrl } from 'containers/constants'
import Form from 'components/Abstract/Form'
import httpFetch from 'utils/httpFetch'
import 'containers/Register/style.css'

class ResetPassword extends Form {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      confirmPassword: ''
    }

    this.genericError = 'An error occured. Please try again.'
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('login-page')
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page')
  }

  onSubmit(event) {
    event.preventDefault()
    const { password, confirmPassword } = this.state
    const { token } = this.props.match.params

    if (password !== '' && confirmPassword !== '' && password === confirmPassword) {
      httpFetch(getApiUrl('resetPassword'), {
        method: 'POST',
        body: JSON.stringify({
          token,
          password
        })
      })
        .then((data) => {
          if (data.status === 'success') {
            notify.show(data.message, 'success', NOTIFICATION_TIMEOUT)
          } else {
            const msg = (data.errors) ? data.errors[0].message : this.genericError
            notify.show(msg, 'error', NOTIFICATION_TIMEOUT)
          }
        })
        .catch(() => {
          notify.show(this.genericError, 'error', NOTIFICATION_TIMEOUT)
        })
    } else {
      notify.show('Please enter matching passwords', 'error', NOTIFICATION_TIMEOUT)
    }
    this.setState({
      password: '',
      confirmPassword: ''
    })
  }

  render() {
    const { password, confirmPassword } = this.state
    return (
      <form className="Login-page">
        <Notifications />
        <section className="Login-block">
          <h1 className="Login-logo">
            {/* external link - not react route - leave <a> */}
            <a href={ROUTE_URL.publicSiteHome}><span>APPII</span></a>
          </h1>
          <p className="Login-title">Reset your password</p>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <button className="border-btn" onClick={this.onSubmit}>
              Reset
            </button>
          </div>
          <div className="form-group">
            <p className="form-devider">or</p>
          </div>
          <div className="form-group">
            <Link to={ROUTE_URL.login} className="border-btn">
              Login
            </Link>
          </div>
        </section>
      </form>
    )
  }
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
}

export default ResetPassword
