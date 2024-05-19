import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import VerificationList from './components/VerificationList'
import './style.css'

class UserVerifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // if processed is not empty - user will see this straight away
      // and the data will be fetched in the background
      loading: props.userVerifications.processed.length === 0
    }
  }

  componentWillMount() {
    this.props.fetch()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.userVerifications.loading
    })
  }

  renderContent() {
    const { processed } = this.props.userVerifications
    const isEmpty = processed.length === 0

    if (isEmpty) {
      return (
        <div>There are no verifications at the moment</div>
      )
    }

    return this.renderVerifications()
  }

  renderVerifications() {
    const { processed } = this.props.userVerifications
    return (
      <VerificationList data={processed} />
    )
  }

  render() {
    const { loading } = this.state
    return (
      <Layout>
        <div className="container UserVerifications">
          <div className="row">
            {loading ?
              <LoadingIndicator size="80" /> :
              <ContentCard title="Verifications">
                {this.renderContent()}
              </ContentCard>
            }
          </div>
        </div>
      </Layout>
    )
  }
}

UserVerifications.propTypes = {
  userVerifications: PropTypes.shape({
    processed: PropTypes.array,
    loading: PropTypes.bool
  }),
  fetch: PropTypes.func.isRequired
}

export default UserVerifications
