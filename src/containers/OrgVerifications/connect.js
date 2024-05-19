import { connect } from 'react-redux'
import { fetch, acceptVerification, declineVerification } from './reducer'
import Component from './OrgVerifications.js'

export const mapState = ({ orgVerifications, auth }) => ({
  orgVerifications,
  organisations: auth.organisations,
  pending: auth.pending
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data)),
  acceptVerification: (data) => dispatch(acceptVerification(data)),
  declineVerification: (data) => dispatch(declineVerification(data))
})

export default connect(mapState, mapDispatch)(Component)
