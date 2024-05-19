import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Layout from 'containers/Layout'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import ExCandidates from 'components/ExCandidates'

class ExternalOrganisationCandidates extends Component {
  state = {
    searchCandidate: ''
  }
  componentDidMount() {
    const orgId = this.getOrganisationId()
    const search = this.getSearch()
    this.props.requestCandidates(orgId, search)
  }
  componentDidUpdate() {
    if(this.state.searchCandidate !== this.props.match.params.candidate){
      const orgId = this.getOrganisationId()
      this.props.requestCandidates(orgId, this.props.match.params.candidate)
      this.setState({searchCandidate: this.props.match.params.candidate})
    }
  }
  getSearch() {
    return this.props.match.params.candidate
  }

  componentWillReceiveProps(nextProps) {
    const nextOrgId = this.getOrganisationId(nextProps)
    if (this.getOrganisationId() !== nextOrgId) {
      this.props.requestCandidates(nextOrgId)
    }
  }

  getOrganisationId(props = this.props) {
    return parseInt(props.match.params.orgId, 10)
  }

  handleSearch = (searchQuery) => {
    const {search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page} = searchQuery

    const {
      match,
      history,
      resetCandidates,
      requestCandidates
    } = this.props
    const orgId = this.getOrganisationId()
    resetCandidates()
    requestCandidates(orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page)

    if(search){
      history.push(`/organisations/${orgId}/externalCandidates/search/${search}`)
    }
  }

  render() {
    const {
      externalcandidates,
      searchQuery,
      loading,
      error
    } = this.props

    /** @NOTE: Fetch error redirects to homepage ATM. */
    if (error) {
      return <Redirect to="/profile" />
    }

    const orgId = this.getOrganisationId()
    const title = searchQuery ? `Search Results for "${searchQuery}"` : 'External Candidates'
    const isLoading = loading || (externalcandidates === null)

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <ExCandidates
          organisationId={orgId}
          title={title}
          candidates={externalcandidates}
          onSearch={this.handleSearch}
          loading={isLoading}
          searchCandidate={this.getSearch()}
          closePath='externalCandidates'
        />
      </Layout>
    )
  }
}

ExternalOrganisationCandidates.propTypes = {
  requestCandidates: PropTypes.func.isRequired,
  searchCandidates: PropTypes.func.isRequired,
  candidates: PropTypes.array,
  searchedCandidates: PropTypes.array,
  searchQuery: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool
}

export default ExternalOrganisationCandidates
