import { connect } from 'react-redux'
import WorkPassInviteDetails from './WorkPassInviteDetails'
import { requestInfo } from './reducer'

const mapStateToProps = ({ workPassInviteDetails, auth }) => ({
  loading: workPassInviteDetails.loading || auth.pending,
  user: auth.user,
  info: workPassInviteDetails.requestInfo
})

const mapDispatchToProps = {
  requestInfo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkPassInviteDetails)
