import { connect } from 'react-redux'
import { getRequest } from '../../OrganisationCandidate/reducer'
import ChecksView from './ChecksView'

const mapStateToProps = ({ candidate }, { requestId }) => ({
  checks: (candidate.getRequest[requestId] || {}).checks || candidate.getRequest[requestId]
})

const mapDispatchToProps = {
  getRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecksView)
