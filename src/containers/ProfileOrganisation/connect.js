import { connect } from 'react-redux'
import { fetch, fetchEmployees, fetchAdmins, fetchVerifiedStudents, save } from './reducer'
import { fetchReference } from 'store/reference'
import { setEditMode } from 'store/layout'
import Component from './ProfileOrganisation'

export const mapState = ({ organisation, reference }) => ({
  organisation,
  reference
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data)),
  fetchEmployees: (data) => dispatch(fetchEmployees(data)),
  fetchAdmins: (data) => dispatch(fetchAdmins(data)),
  fetchVerifiedStudents: (data) => dispatch(fetchVerifiedStudents(data)),
  fetchReference: () => dispatch(fetchReference()),
  save: (data) => dispatch(save(data)),
  setEditMode: (data) => dispatch(setEditMode(data))
})

export default connect(mapState, mapDispatch)(Component)
