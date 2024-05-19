import { connect } from 'react-redux'
import Component from './OrganisationCandidates'
import { requestCandidates, resetCandidates, searchCandidates } from './reducer'

export const mapState = state => ({
  externalcandidates: state.externalcandidates.candidates,
  searchedCandidates: state.externalcandidates.searchedCandidates,
  searchQuery: state.externalcandidates.searchQuery,
  loading: state.externalcandidates.isFetching,
  error: state.externalcandidates.error
})

export const mapDispatch = {
  requestCandidates,
  resetCandidates,
  searchCandidates
}

export default connect(mapState, mapDispatch)(Component)