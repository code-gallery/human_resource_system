import { connect } from 'react-redux'
import { fetch } from 'containers/OrgAccreditationQRCode/reducer'
import { saveAccreditation } from 'containers/OrgAccreditations/reducer'
import Component from './OrgAccreditationEdit.js'

export const mapState = ({ orgAccreditation }) => ({
  orgAccreditation: orgAccreditation || {}
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data)),
  saveAccreditation: (data) => dispatch(saveAccreditation(data))
})

export default connect(mapState, mapDispatch)(Component)
