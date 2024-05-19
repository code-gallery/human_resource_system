import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import queryString from 'query-string'
import { NOTIFICATION_TIMEOUT, ROUTE_URL, STORAGE_KEY, getApiUrl } from 'containers/constants'
import Form from 'components/Abstract/Form'
import httpFetch from 'utils/httpFetch'
import 'containers/Register/style.css'
import LoginForm from './components/LoginForm'
import WorkPassInviteDetails from 'containers/WorkPassInviteDetails'

class Login extends Form {
  constructor(props) {
    super(props)

    const { inviteEmail, inviteAccepted } = props
    this.state = {
      email: inviteEmail || '',
      password: '',
      emailDisabled: !!inviteAccepted
    }
    this.onLogin = this.onLogin.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('login-page')
  }

  componentWillReceiveProps(nextProps) {
    const { auth, inviteEmail, inviteAccepted } = nextProps
    if (auth.error !== '') {
      notify.show(auth.error, 'error', NOTIFICATION_TIMEOUT)
    }

    if (inviteEmail) {
      this.setState({
        email: inviteEmail,
        emailDisabled: inviteAccepted
      })
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page')
  }

  getToken() {
    const { token } = queryString.parse(this.props.location.search)
    return token
  }

  onLogin(event) {
    event.preventDefault()
    const { email, password } = this.state

    const token = this.getToken()

    httpFetch(getApiUrl('login'), {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        invite_token: token
      })
    })
      .then((data) => {
        if (data.token) {
          this.props.loginSuccess()
          this.props.setToken({
            token: data.token
          })
          this.props.fetchOrganisations()
          this.props.fetchReference()

          window.localStorage.setItem(STORAGE_KEY.token, data.token)
          window.localStorage.setItem(STORAGE_KEY.appBanner, 'true')

          this.props.history.push(ROUTE_URL.profile)
        } else {
          const error = data.error ? data.error : 'Unable to sign in. Please check credentials and try again.'
          this.props.loginFailed(error)
          // throw Error('Unable to login')
        }
      })
      .catch(() => {
        this.props.loginFailed('Unable to sign in')
      })
  }

  renderInviteNotFound() {
    return (
      <div className="Login-page">
        <section className="Login-block">
          <h1 className="Login-logo">
            {/* external link - not react route - leave <a> */}
            <a href={ROUTE_URL.publicSiteHome}><span className="Login-block-span">APPII</span></a>
          </h1>
          <p className="Login-title Login-title-error">Invalid invite token. Please click on the link you were sent in the email.</p>
        </section>
      </div>
    )
  }

  render() {
    const { email, password, emailDisabled } = this.state

    const { inviteNotFound, inviteEmail, inviteAccepted } = this.props
    if (inviteNotFound) {
      return this.renderInviteNotFound()
    }

    const token = inviteAccepted ? null : this.getToken()

    return (
      <div className="Login-page">
        <Notifications />
        <section className="Login-block">
          <h1 className="Login-logo">
            {/* external link - not react route - leave <a> */}
            <a href={ROUTE_URL.publicSiteHome}><span>APPII</span></a>
          </h1>
          { token &&
            <WorkPassInviteDetails token={token} light={true} />
          }
          { inviteAccepted &&
            <p className="Login-title Login-title-error">This invite has already been accepted. Please log in as {inviteEmail}</p>
          }
          <p className="Login-title">Ready to maximise your potential?</p>
          <LoginForm
            email={email}
            emailDisabled={emailDisabled}
            password={password}
            login={this.onLogin}
            onChangeInput={this.onChangeInput}
            isInvite={!!token}
          />
          <div className="form-group text-center">
            <Link className="block-link" to={ROUTE_URL.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          { !inviteAccepted &&
            <div>
              <div className="form-group">
                <p className="form-devider">or</p>
              </div>
              <div className="form-group">
                <Link to={ROUTE_URL.register + this.props.location.search} className="border-btn">
                  Create Account
                </Link>
              </div>
            </div>
          }
        </section>
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    error: PropTypes.string,
    pending: PropTypes.bool
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  fetchOrganisations: PropTypes.func.isRequired,
  fetchReference: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  loginFailed: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  inviteAccepted: PropTypes.bool,
  inviteEmail: PropTypes.string,
  inviteNotFound: PropTypes.bool.isRequired
}

export default withRouter(Login)

export { Login as LoginComponent }
