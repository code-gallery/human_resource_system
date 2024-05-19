import { connect } from 'react-redux'
import { getRequest } from '../reducer'
import RequestChecks from './RequestChecks'

const mapStateToProps = ({ candidate }, { requestId }) => ({
  checks: (candidate.getRequest[requestId] || {}).checks || candidate.getRequest[requestId],
  biometric_data: (candidate.getRequest[requestId] || {}).BiometricDetails || candidate.getRequest[requestId]
})

const mapDispatchToProps = {
  getRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestChecks)
