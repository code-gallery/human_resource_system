import { connect } from 'react-redux'
import { searchCandidate, addCandidate, resetAddCandidate } from './reducer'
import OrganisationAddCandidate from './OrganisationAddCandidate'

const mapStateToProps = ({ addCandidate }) => ({
  loading: addCandidate.loading,
  users: addCandidate.users,
  findError: addCandidate.error,
  unknownUser: addCandidate.unknownUser
})

const mapDispatchToProps = {
  searchCandidate,
  addCandidate,
  resetAddCandidate
}

const OrganisationAddCandidateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationAddCandidate)

export default OrganisationAddCandidateContainer
