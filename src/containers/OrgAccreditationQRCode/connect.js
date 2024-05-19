import { connect } from 'react-redux'
import { fetch } from './reducer'
import Component from './OrgAccreditationQRCode'

export const mapState = ({ orgAccreditation }) => ({
  orgAccreditation: orgAccreditation || {}
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data))
})

export default connect(mapState, mapDispatch)(Component)
