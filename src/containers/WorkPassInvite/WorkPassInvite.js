import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import config from 'store'
import { isLoaded } from 'store/auth'
import { ROUTE_URL } from 'containers/constants'
import Loader from 'components/Loader'
import * as api from './api'

class WorkPassInvite extends Component {
  state = {
    loading: true,
    redirectPath: null
  }

  componentDidMount() {
    this.handleInvite()
  }

  /** :: () -> string */
  getToken() {
    return queryString.parse(this.props.location.search).token
  }

  /** :: () -> boolean */
  isAuthenticated() {
    const { store } = config
    return isLoaded(store.getState())
  }

  /** User is logged in */
  async handleAuthenticated() {
    const token = this.getToken()

    const inviteInfo = await api.getInviteInfo(token)
    const isCandidateUser = (typeof inviteInfo.instance.candidate.user_id === 'number')

    this.setState({
      loading: false,
      redirectPath: isCandidateUser
        ? '/profile'
        : `/invite/work_pass/accept?token=${token}`
    })
  }

  /** User needs to login/register before we can move forward with the invite */
  handleUnAuthenticated() {
    this.setState({
      loading: false,
      redirectPath: `${ROUTE_URL.register}?token=${this.getToken()}`
    })
  }

  handleInvite() {
    if (this.isAuthenticated()) {
      this.handleAuthenticated()
    } else {
      this.handleUnAuthenticated()
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <main style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Loader size={65} color="#72d371" />
        </main>
      )
    }

    return <Redirect to={this.state.redirectPath} />
  }
}

WorkPassInvite.propTypes = {
  location: PropTypes.object.isRequired
}

export default WorkPassInvite
