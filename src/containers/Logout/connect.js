import { connect } from 'react-redux'
import { resetToken } from 'store/auth'
import Component from './Logout.js'

export const mapDispatch = (dispatch) => ({
  resetToken: () => dispatch(resetToken())
})

export default connect(null, mapDispatch)(Component)
