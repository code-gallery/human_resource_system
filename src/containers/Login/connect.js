import { connect } from 'react-redux'
import {
  setToken, fetchOrganisations,
  loginSuccess, loginFailed
} from 'store/auth'
import { fetchReference } from 'store/reference'
import Component from './Login.js'

export const mapState = ({ auth, workPassInviteDetails }) => ({
  auth,
  inviteNotFound: workPassInviteDetails.notFound,
  inviteEmail: workPassInviteDetails.requestInfo && workPassInviteDetails.requestInfo.instance && workPassInviteDetails.requestInfo.instance.candidate.email,
  inviteAccepted: workPassInviteDetails.inviteAccepted
})

export const mapDispatch = (dispatch) => ({
  fetchOrganisations: () => dispatch(fetchOrganisations()),
  fetchReference: () => dispatch(fetchReference()),
  loginSuccess: () => dispatch(loginSuccess()),
  loginFailed: (data) => dispatch(loginFailed(data)),
  setToken: (data) => dispatch(setToken(data))
})

export default connect(mapState, mapDispatch)(Component)
