import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import { Link } from 'react-router-dom'
import { ROUTE_URL, getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import './style.css'

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      confirmed: false,
      error: ''
    }
    this.genericError = 'An error has occured. Please try again'
  }

  componentWillMount() {
    document.body.classList.add('confirm-page')
    const { token } = this.props.match.params
    httpFetch(getApiUrl('confirmEmail'), {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
      .then((json) => {
        if (json.status === 'success') {
          this.props.setToken({
            token: json.data.userToken
          })
          this.props.setUser(json.data.user)
          this.setState({
            loading: false,
            confirmed: true
          })
        } else {
          this.setState({
            loading: false,
            error: json.errors[0].error,
            errorCode: json.errors[0].error_code
          })
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: this.genericError
        })
      })
  }

  componentWillUnmount() {
    document.body.classList.remove('confirm-page')
  }

  renderContent() {
    const { error, errorCode, loading, confirmed } = this.state

    if (loading) {
      return (
        <p className="info">
          Please wait while we confirm your email.
        </p>
      )
    }

    if (errorCode === 'INVALID_TOKEN') {
      return (
        <p className="info">Your email address has already been confirmed</p>
      )
    }

    if (error) {
      return (
        <p className="info">Your email could not be confirmed because: {error}</p>
      )
    }

    if (confirmed) {
      return (
        <p className="info">
          Thank you, your email has been confirmed.
          You may now proceed to
          <br />
          <Link to={ROUTE_URL.profile}>Your Profile</Link>
        </p>
      )
    }

    return null
  }

  render() {
    const user = {}

    return (
      <div className="ConfirmEmail">
        <Header user={user} responsive={true} hasNotification={false} />
        {this.renderContent()}
      </div>
    )
  }
}

ConfirmEmail.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
}

export default ConfirmEmail
