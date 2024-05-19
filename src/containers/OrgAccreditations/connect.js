import { connect } from 'react-redux'
import { fetch, deleteAccreditation, saveAccreditation } from './reducer'
import Component from './OrgAccreditations.js'

export const mapState = ({ orgAccreditations, auth }) => ({
  orgAccreditations,
  organisations: auth.organisations,
  pending: auth.pending
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data)),
  deleteAccreditation: (data) => dispatch(deleteAccreditation(data)),
  saveAccreditation: (data) => dispatch(saveAccreditation(data))
})

export default connect(mapState, mapDispatch)(Component)
