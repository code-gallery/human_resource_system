import { connect } from 'react-redux'
import { fetch } from './reducer'
import Component from './UserVerifications.js'

export const mapState = ({ userVerifications }) => ({
  userVerifications
})

export const mapDispatch = (dispatch) => ({
  fetch: () => dispatch(fetch())
})

export default connect(mapState, mapDispatch)(Component)
