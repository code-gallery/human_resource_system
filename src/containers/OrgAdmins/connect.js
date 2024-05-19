import { connect } from 'react-redux'
import { fetchOrgAdmins, fetchOrgEmployees, addAdmin, deleteAdmin } from './reducer'
import Component from './OrgAdmins.js'

export const mapState = ({ orgAdmins }) => ({
  orgAdmins
})

export const mapDispatch = (dispatch) => ({
  fetchOrgAdmins: (data) => dispatch(fetchOrgAdmins(data)),
  fetchOrgEmployees: (data) => dispatch(fetchOrgEmployees(data)),
  deleteAdmin: (data) => dispatch(deleteAdmin(data)),
  addAdmin: (data) => dispatch(addAdmin(data))
})

export default connect(mapState, mapDispatch)(Component)
