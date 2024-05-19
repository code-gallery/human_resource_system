import { all } from 'redux-saga/effects'
import organisations from 'containers/Organisations/saga'
import people from 'containers/People/saga'
import profile from 'containers/Profile/saga'
import profileOrganisation from 'containers/ProfileOrganisation/saga'
import userVerifications from 'containers/UserVerifications/saga'
import orgVerifications from 'containers/OrgVerifications/saga'
import orgAccreditations from 'containers/OrgAccreditations/saga'
import orgAccreditation from 'containers/OrgAccreditationQRCode/saga'
import orgAdmins from 'containers/OrgAdmins/saga'
import userSettings from 'containers/SettingsAccount/saga'
import organisationCandidates from 'containers/OrganisationCandidates/saga'
import externalCandidates from 'containers/ExternalCandidates/saga'
import externalCandidate from 'containers/ExternalCandidate/saga'
import organisationCandidate from 'containers/OrganisationCandidate/saga'
import organisationCandidateNewRequest from 'containers/OrganisationCandidateNewRequest/saga'
import organisationAddCandidate from 'containers/OrganisationAddCandidate/saga'
import workPassInviteDetails from 'containers/WorkPassInviteDetails/saga'
import workPassInviteAccept from 'containers/WorkPassInviteAccept/saga'
import workPassSideMenu from 'components/WorkPassSideMenu/saga'
import fetchCheck from 'containers/WorkPassCheckDetails/saga'
import personaPermission from 'containers/PersonaPermission/saga'
import dashboard from 'containers/Dashboard/saga'
// import requestList from 'containers/WorkPassCandidateCheck/saga/saga'
import data from 'containers/WorkPassCandidateCheck/saga/saga'
import organisationDocument from 'containers/OrganisationDocuments/saga'
import auth from './auth/saga'
import reference from './reference/saga'
import storage from './storage/saga'

export default function* rootSaga() {
  try {
    yield all([
      auth(),
      organisations(),
      people(),
      profileOrganisation(),
      profile(),
      userVerifications(),
      orgVerifications(),
      orgAccreditations(),
      orgAccreditation(),
      orgAdmins(),
      reference(),
      storage(),
      userSettings(),
      organisationCandidates(),
      organisationCandidate(),
      externalCandidates(),
      externalCandidate(),
      organisationCandidateNewRequest(),
      organisationAddCandidate(),
      workPassInviteDetails(),
      workPassInviteAccept(),
      workPassSideMenu(),
      fetchCheck(),
      // requestList(),
      data(),
      organisationDocument(),
      personaPermission(),
      dashboard()
    ])
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error(e)
    }
  }
}
