import { connect } from 'react-redux'
import { setUser, setToken } from 'store/auth'
import Component from './ConfirmEmail.js'

export const mapDispatch = (dispatch) => ({
  setUser: (data) => dispatch(setUser(data)),
  setToken: (data) => dispatch(setToken(data))
})

export default connect(null, mapDispatch)(Component)
