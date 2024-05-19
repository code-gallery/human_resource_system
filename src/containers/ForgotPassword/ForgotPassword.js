import React from 'react'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT, ROUTE_URL, getApiUrl } from 'containers/constants'
import Form from 'components/Abstract/Form'
import httpFetch from 'utils/httpFetch'
import 'containers/Register/style.css'

class ForgotPassword extends Form {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      sending: false
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
    const { email } = this.state
    if (email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1) {
      this.setState({ sending: true })
      httpFetch(getApiUrl('resetPasswordRequest'), {
        method: 'POST',
        body: JSON.stringify({
          email
        })
      })
        .then((data) => {
          if (data.status === 'success') {
            notify.show(data.message, 'success', NOTIFICATION_TIMEOUT)
          } else {
            const msg = data.message || this.genericError
            notify.show(msg, 'error', NOTIFICATION_TIMEOUT)
          }
          this.setState({ sending: false })
        })
        .catch(() => {
          notify.show(this.genericError, 'error', NOTIFICATION_TIMEOUT)
          this.setState({ sending: false })
        })
    } else {
      notify.show('Please enter an email', 'error', NOTIFICATION_TIMEOUT)
    }
  }

  render() {
    const { email, sending } = this.state

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
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <button className="border-btn" onClick={this.onSubmit} disabled={sending}>
              {!sending ? 'Send' : 'Please wait'}
            </button>
          </div>
        </section>
      </form>
    )
  }
}

export default ForgotPassword
