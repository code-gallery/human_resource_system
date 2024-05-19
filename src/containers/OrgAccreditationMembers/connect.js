import { connect } from 'react-redux'
import { fetch } from 'containers/OrgAccreditationQRCode/reducer'
import Component from './OrgAccreditationMembers'

export const mapState = ({ orgAccreditation }) => ({
  orgAccreditation: orgAccreditation || {}
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data))
})

export default connect(mapState, mapDispatch)(Component)
