import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Layout from 'containers/Layout'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Candidates from 'components/Candidates'

class OrganisationCandidates extends Component {
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
      history.push(`/organisations/${orgId}/candidates/search/${search}`)
    }
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

    const orgId = this.getOrganisationId()
    const isLoading = loading || (candidates === null)

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <Candidates
          organisationId={orgId}
          candidates={candidates}
          onSearch={this.handleSearch}
          loading={isLoading}
          searchCandidate={this.getSearch()}
          closePath='organisationCandidates'
        />
      </Layout>
    )
  }
}

OrganisationCandidates.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  requestCandidates: PropTypes.func.isRequired,
  resetCandidates: PropTypes.func.isRequired,
  candidates: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool
}

export default OrganisationCandidates
