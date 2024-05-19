import { connect } from 'react-redux'
import { setToken, fetchUser, fetchOrganisations, resetToken } from 'store/auth'
import { fetchReference } from 'store/reference'
import Component from './App.js'

export const mapState = ({ auth }) => ({
  user: auth.user || {},
  token: auth.token
})

export const mapDispatch = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchOrganisations: () => dispatch(fetchOrganisations()),
  setToken: (data) => dispatch(setToken(data)),
  resetToken: () => dispatch(resetToken()),
  fetchReference: () => dispatch(fetchReference())
})

export default connect(mapState, mapDispatch)(Component)
