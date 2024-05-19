import { connect } from 'react-redux'
import { getRequest } from '../reducer'
import RequestChecks from './RequestChecks'

const mapStateToProps = ({ externalcandidate }, { requestId }) => ({
  checks: (externalcandidate.getRequest[requestId] || {}).checks || externalcandidate.getRequest[requestId],
  biometric_data: (externalcandidate.getRequest[requestId] || {}).BiometricDetails || externalcandidate.getRequest[requestId]
})

const mapDispatchToProps = {
  getRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestChecks)
