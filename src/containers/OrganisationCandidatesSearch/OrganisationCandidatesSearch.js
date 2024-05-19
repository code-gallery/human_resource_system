import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Candidates from 'components/Candidates'
import Layout from 'containers/Layout'

class OrganisationCandidatesSearch extends Component {
  componentDidMount() {
    const orgId = this.getOrganisationId()
    const search = this.getSearch()
    this.props.requestCandidates(orgId, search)
  }

  getSearch() {
    return this.props.match.params.candidate
  }

  getOrganisationId() {
    return parseInt(this.props.match.params.orgId, 10)
  }

  handleSearch = (searchQuery) => {
    if (searchQuery.length < 2) {
      return null
    }

    const {
      history,
      match,
      requestCandidates
    } = this.props

    const orgId = this.getOrganisationId()
    const url = match.path
      .replace(':orgId', orgId)
      .replace(':candidate', searchQuery)
    requestCandidates(orgId, searchQuery)
  }

  render() {
    const {
      candidates,
      loading,
      error
    } = this.props

    /** @NOTE: Fetch error redirects to homepage ATM. */
    if (error) {
      return <Redirect to="/profile" />
    }

    const isLoading = loading || (candidates === null)
    const orgId = this.getOrganisationId()
    const searchQuery = this.getSearch()

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <Candidates
          title={`Search Results for "${searchQuery}"`}
          organisationId={orgId}
          candidates={candidates}
          onSearch={this.handleSearch}
          loading={isLoading}
        />
      </Layout>
    )
  }
}

OrganisationCandidatesSearch.propTypes = {
  loading: PropTypes.bool.isRequired,
  candidates: PropTypes.array,
  requestCandidates: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.bool
}

export default OrganisationCandidatesSearch
