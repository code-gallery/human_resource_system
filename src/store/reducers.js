import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import people from 'containers/People/reducer'
import profileOrganisation from 'containers/ProfileOrganisation/reducer'
import organisations from 'containers/Organisations/reducer'
import userVerifications from 'containers/UserVerifications/reducer'
import orgVerifications from 'containers/OrgVerifications/reducer'
import orgAccreditations from 'containers/OrgAccreditations/reducer'
import orgAccreditation from 'containers/OrgAccreditationQRCode/reducer'
import orgAdmins from 'containers/OrgAdmins/reducer'
import userSettings from 'containers/SettingsAccount/reducer'
import candidates from 'containers/OrganisationCandidates/reducer'
import candidate from 'containers/OrganisationCandidate/reducer'
import workPassRequest from 'containers/OrganisationCandidateNewRequest/reducer'
import addCandidate from 'containers/OrganisationAddCandidate/reducer'
import workPassInviteDetails from 'containers/WorkPassInviteDetails/reducer'
import workPassInviteAccept from 'containers/WorkPassInviteAccept/reducer'
import organisationBalance from 'components/WorkPassSideMenu/reducer'
import fetchCheck from 'containers/WorkPassCheckDetails/reducer'
import personaPermission from 'containers/PersonaPermission/reducer'
import dashboard from 'containers/Dashboard/reducer'
// import requestList from 'containers/WorkPassCandidateCheck/reducer/reducer'
import data from 'containers/WorkPassCandidateCheck/reducer/reducer'
import organisationDocument from 'containers/OrganisationDocuments/reducer'
import externalcandidates from 'containers/ExternalCandidates/reducer'
import externalcandidate from 'containers/ExternalCandidate/reducer'
import userProfile from './userProfile'
import auth from './auth'
import reference from './reference'
import storage from './storage'
import navigation from './navigation'
import layout from './layout'

const reducers = combineReducers({
  auth,
  layout,
  navigation,
  orgAccreditations,
  orgAccreditation,
  orgAdmins,
  organisation: profileOrganisation,
  organisations,
  orgVerifications,
  people,
  reference,
  router: routerReducer,
  storage,
  userProfile,
  userVerifications,
  userSettings,
  candidates,
  candidate,
  workPassRequest,
  addCandidate,
  workPassInviteDetails,
  workPassInviteAccept,
  organisationBalance,
  fetchCheck,
  // requestList,
  data,
  externalcandidates,
  externalcandidate,
  organisationDocument,
  personaPermission,
  dashboard
})

export default reducers
