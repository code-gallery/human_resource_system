import { connect } from 'react-redux'
import { fetchOtherUserProfile } from 'store/userProfile'
import Component from './NotFound.js'

export const mapState = ({ userProfile }) => ({
  userProfile
})

export const mapDispatch = (dispatch) => ({
  fetchOtherUserProfile: (...args) => dispatch(fetchOtherUserProfile(...args))
})

export default connect(mapState, mapDispatch)(Component)
