import { connect } from 'react-redux'
import Component from './OrganisationCandidatesSearch'
import { requestCandidates } from '../OrganisationCandidates/reducer'

export const mapState = ({ candidates }) => ({
  candidates: candidates.candidates,
  loading: candidates.isFetching,
  error: candidates.error
})

export const mapDispatch = {
  requestCandidates
}

export default connect(mapState, mapDispatch)(Component)
