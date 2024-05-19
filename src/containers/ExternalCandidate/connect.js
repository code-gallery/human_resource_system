import { connect } from 'react-redux'
import OrganisationCandidate from './OrganisationCandidate'
import { requestCandidate } from './reducer'

const mapStateToProps = ({ externalcandidate, organisationBalance }) => ({
  organisationBalance,
  candidate: externalcandidate.entity,
  loading: externalcandidate.isFetching,
  error: externalcandidate.error
})

const mapDispatchToProps = {
  requestCandidate
}

const OrganisationCandidateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationCandidate)

export default OrganisationCandidateContainer
