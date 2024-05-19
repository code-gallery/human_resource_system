import { connect } from 'react-redux'
import WorkPassInviteAccept from './WorkPassInviteAccept'
import { acceptInvite } from './reducer'

const mapStateToProps = ({ workPassInviteAccept, workPassInviteDetails, auth }) => ({
  loading: workPassInviteAccept.loading || auth.pending,
  inviteAccepted: workPassInviteDetails.inviteAccepted
})

const mapDispatchToProps = {
  acceptInvite
}

const WorkPassInviteAcceptContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkPassInviteAccept)

export default WorkPassInviteAcceptContainer
