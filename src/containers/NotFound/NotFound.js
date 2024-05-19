import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Layout from 'containers/Layout'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

class NotFound extends Component {
  constructor(props) {
    super(props)
    let notFound = true
    const { pathname } = window.location
    const tmp = pathname.split('/')
    this.key = tmp[1]
    if (this.key && tmp.length === 2 && this.key !== 'profile') {
      notFound = false
      this.props.fetchOtherUserProfile(tmp[1])
    }
    this.state = {
      notFound
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, pending, error } = nextProps.userProfile
    if (user && !pending && error === '') {
      if (user.unique_key && user.unique_key === this.key) {
        const redirectUrl = `${ROUTE_URL.profile}/${this.key}`
        this.props.history.push(redirectUrl)
      } else {
        this.setState({ notFound: true })
      }
    } else if (!pending && error !== '') {
      this.setState({ notFound: true })
    }
  }

  renderNotFound() {
    const { status } = this.props
    return (
      <Layout>
        <div className="container NotFound text-center">
          <div className="row">
            <div className="col-xs-12">
              <h1>We lost you!</h1>
              <p className="NotFound-info">
                Sorry we can&apos;t seem to find the page you&apos;re<br /> looking for. (Error code {status})
              </p>
              <p>
                <Link to={ROUTE_URL.profile}>Take me back to safety</Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  render() {
    const { notFound } = this.state

    if (notFound) {
      return this.renderNotFound()
    }

    return null
  }
}

NotFound.defaultProps = {
  status: 404
}

NotFound.propTypes = {
  status: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      unique_key: PropTypes.string
    }),
    error: PropTypes.string,
    pending: false
  }),
  fetchOtherUserProfile: PropTypes.func.isRequired
}

export default NotFound
