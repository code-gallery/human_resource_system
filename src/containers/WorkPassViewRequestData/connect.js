import { connect } from 'react-redux'
import { getRequest, requestCandidate } from '../OrganisationCandidate/reducer'
import WorkPassViewRequestData from './WorkPassViewRequestData'

const mapStateToProps = ({ candidate, organisationBalance }, { match }) => ({
  organisationBalance,
  candidate: candidate.entity,
  fetchingCandidate: candidate.isFetching,
  error: candidate.error,
  request: candidate.getRequest[match.params.requestId]
})

const mapDispatchToProps = {
  getRequest,
  requestCandidate
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkPassViewRequestData)
