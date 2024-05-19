import { connect } from 'react-redux'
import {
  setToken,
  loginSuccess
} from 'store/auth'
import Component from './Register.js'

export const mapState = ({ workPassInviteDetails }) => ({
  inviteNotFound: workPassInviteDetails.notFound,
  inviteEmail: workPassInviteDetails.requestInfo && workPassInviteDetails.requestInfo.instance && workPassInviteDetails.requestInfo.instance.candidate.email,
  inviteAccepted: workPassInviteDetails.inviteAccepted
})

export const mapDispatch = (dispatch) => ({
  loginSuccess: () => dispatch(loginSuccess()),
  setToken: (data) => dispatch(setToken(data))
})

export default connect(mapState, mapDispatch)(Component)
