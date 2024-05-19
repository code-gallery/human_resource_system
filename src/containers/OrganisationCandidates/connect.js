import { connect } from 'react-redux'
import Component from './OrganisationCandidates'
import { requestCandidates, resetCandidates } from './reducer'

export const mapState = state => ({
  candidates: state.candidates.candidates,
  loading: state.candidates.isFetching,
  error: state.candidates.error
})

export const mapDispatch = {
  requestCandidates,
  resetCandidates
}

export default connect(mapState, mapDispatch)(Component)
