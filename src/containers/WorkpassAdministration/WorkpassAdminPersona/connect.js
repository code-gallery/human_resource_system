import { connect } from 'react-redux'
import {fetchOrganisations,fetchClientOrganisations,fetchOrganisationsModal, fetchChecksModal, deleteCompany,fetchUserPersona, deletePersona, fetchUserChecks, deleteChecks,verifyCompany,verifyChecks,verifyPersona} from 'store/auth'
import Component from './workpassAdminPersona'

// export const mapState = ({ auth }) => ({
//   auth : auth.fetchOrganisations
// })

export const mapStateToProps = ({test, auth, userProfile, organisationBalance}, { match }) => ({
  organisations:!match.params.uid ? auth.organisations : userProfile.organisations,
  user: auth.user,
  pending_org: auth.pending_org,
  pending_persona : auth.pending_persona,
  pending_checks: auth.pending_checks,
  workPassPersonas : auth.workPassPersonas,
  workPassChecks : auth.workPassChecks,
  organisationsModal : auth.organisationsModal,
  checksModal: auth.checksModal,
  client_org: auth.client_org,
  organisationBalance,
  test: test
})

export const mapDispatch = (dispatch) => ({
  fetchOrganisations: () => dispatch(fetchOrganisations()),
  fetchClientOrganisations: (id) => dispatch(fetchClientOrganisations(id)),
  fetchUserPersona: (orgId,id) => dispatch(fetchUserPersona(orgId,id)),
  fetchUserChecks: (id) => dispatch(fetchUserChecks(id)),
  deleteCompany: (...args) => dispatch(deleteCompany(...args)),
  deletePersona: (...args) => dispatch(deletePersona(...args)),
  deleteChecks: (...args) => dispatch(deleteChecks(...args)),
  fetchOrganisationsModal: () => dispatch(fetchOrganisationsModal()),
  fetchChecksModal: (orgId) => dispatch(fetchChecksModal(orgId)),
  verifyCompany: (...args) => dispatch(verifyCompany(...args)),
  verifyChecks: (...args) => dispatch(verifyChecks(...args)),
  verifyPersona: (...args) => dispatch(verifyPersona(...args))
})

export default connect(mapStateToProps, mapDispatch)(Component)
