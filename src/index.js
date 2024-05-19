import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import config from 'store'
import 'whatwg-fetch'
import 'react-select/dist/react-select.css'
import 'all.css'
import 'index.css'
import ScrollToTop from 'components/ScrollToTop'
import AuthRoute from 'components/AuthRoute'
import { ROUTE_URL } from 'containers/constants.js'
import App from 'containers/App'
import NotFound from 'containers/NotFound'
import Register from 'containers/Register'
import ConfirmEmail from 'containers/ConfirmEmail'
import Login from 'containers/Login'
import Logout from 'containers/Logout'
import ForgotPassword from 'containers/ForgotPassword'
import ResetPassword from 'containers/ResetPassword'
import Organisations from 'containers/Organisations'
import NewOrganisation from 'containers/NewOrganisation'
import People from 'containers/People'
import Profile from 'containers/Profile'
import ProfileOrganisation from 'containers/ProfileOrganisation'
import Privacy from 'containers/Privacy'
import Cookie from 'containers/Cookie'
import TermsUse from 'containers/TermsUse'
import SettingsAccount from 'containers/SettingsAccount'
import UserVerifications from 'containers/UserVerifications'
import OrgVerifications from 'containers/OrgVerifications'
import OrgAdmins from 'containers/OrgAdmins'
import OrgAccreditations from 'containers/OrgAccreditations'
import OrgAccreditationQRCode from 'containers/OrgAccreditationQRCode'
import OrgAccreditationEdit from 'containers/OrgAccreditationEdit'
import OrgAccreditationMembers from 'containers/OrgAccreditationMembers'
import HelpBiometric from 'containers/HelpBiometric'
import LinkedinImport from 'containers/LinkedinImport'
import Dashboard from 'containers/Dashboard'
import OrganisationCandidates from 'containers/OrganisationCandidates'
import OrganisationCandidatesSearch from 'containers/OrganisationCandidatesSearch'
import OrganisationCandidate from 'containers/OrganisationCandidate'
import ExternalCandidates from 'containers/ExternalCandidates'
import ExternalCandidate from 'containers/ExternalCandidate'
import OrganisationCandidateNewRequest from 'containers/OrganisationCandidateNewRequest'
import OrganisationAddCandidate from 'containers/OrganisationAddCandidate'
import WorkPassInvite from 'containers/WorkPassInvite'
import WorkPassInviteAccept from 'containers/WorkPassInviteAccept'
import WorkPassViewRequestData from 'containers/WorkPassViewRequestData'
import WorkPassCheckDetails from 'containers/WorkPassCheckDetails'
import WorkpassAdmin from 'containers/WorkpassAdministration'
import WorkpassAdminPersona from 'containers/WorkpassAdministration/WorkpassAdminPersona'
import WorkPassCandidateCheck from 'containers/WorkPassCandidateCheck'
import WorkPassCandidateCheckView from 'containers/WorkPassCandidateCheck/CandidateChecksView'
import OrganisationDocuments from 'containers/OrganisationDocuments'
import PersonaPermission from 'containers/PersonaPermission';
const { store, history } = config

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <div>
          <Route path="/" component={App} />
          <Switch>
            <Route exact path={ROUTE_URL.workPassInvite} component={WorkPassInvite} />
            <Route exact path={ROUTE_URL.workPassAccept} component={WorkPassInviteAccept} />
            <Route exact path={ROUTE_URL.register} component={Register} />
            <Route exact path={ROUTE_URL.registerTechnojob} component={Register} />
            <Route path={ROUTE_URL.confirmEmail} component={ConfirmEmail} />
            <Route exact path={ROUTE_URL.login} component={Login} />
            <Route exact path={ROUTE_URL.logout} component={Logout} />
            <Route exact path={ROUTE_URL.forgotPassword} component={ForgotPassword} />
            <Route path={ROUTE_URL.resetPassword} component={ResetPassword} />
            <AuthRoute exact path={ROUTE_URL.organisations} component={Organisations} />
            <AuthRoute exact path={ROUTE_URL.newOrganisation} component={NewOrganisation} />
            <AuthRoute exact path={ROUTE_URL.people} component={People} />
            <AuthRoute exact path={ROUTE_URL.profile} component={Profile} />
            <AuthRoute exact path={ROUTE_URL.userProfile} component={Profile} />
            <AuthRoute exact path={ROUTE_URL.orgProfile} component={ProfileOrganisation} />
            <Route exact path={ROUTE_URL.cookies} component={Cookie} />
            <Route exact path={ROUTE_URL.privacy} component={Privacy} />
            <Route exact path={ROUTE_URL.privacyMobile} render={(props) => (<Privacy {...props} hasLayout={false} />)} />
            <Route exact path={ROUTE_URL.terms} component={TermsUse} />
            <Route exact path={ROUTE_URL.termsMobile} render={(props) => (<TermsUse {...props} hasLayout={false} />)} />
            <AuthRoute exact path={ROUTE_URL.settingsAccount} component={SettingsAccount} />
            <AuthRoute exact path={ROUTE_URL.userVerifications} component={UserVerifications} />
            <AuthRoute exact path={ROUTE_URL.orgVerifications} component={OrgVerifications} />
            <AuthRoute exact path={ROUTE_URL.orgAdmins} component={OrgAdmins} />
            <AuthRoute exact path={ROUTE_URL.orgAccreditations} component={OrgAccreditations} />
            <AuthRoute exact path={ROUTE_URL.orgAccreditationQRCode} component={OrgAccreditationQRCode} />
            <AuthRoute exact path={ROUTE_URL.orgAccreditationEdit} component={OrgAccreditationEdit} />
            <AuthRoute exact path={ROUTE_URL.orgAccreditationMembers} component={OrgAccreditationMembers} />
            <AuthRoute exact path={ROUTE_URL.helpBiometric} component={HelpBiometric} />
            <AuthRoute exact path={ROUTE_URL.linkedinImport} component={LinkedinImport} />
            <AuthRoute path={ROUTE_URL.dashboard} component={Dashboard} />
            <AuthRoute exact path={ROUTE_URL.organisationCandidates} component={OrganisationCandidates} />
            <AuthRoute exact path={ROUTE_URL.organisationCandidatesSearch} component={OrganisationCandidates} />
            <AuthRoute exact path={ROUTE_URL.organisationAddCandidate} component={OrganisationAddCandidate} />
            <AuthRoute exact path={ROUTE_URL.organisationCandidate} component={OrganisationCandidate} />
            <AuthRoute exact path={ROUTE_URL.externalCandidates} component={ExternalCandidates} />
            <AuthRoute exact path={ROUTE_URL.externalCandidatesSearch} component={ExternalCandidates} />
            <AuthRoute exact path={ROUTE_URL.externalCandidate} component={ExternalCandidate} />
            <AuthRoute exact path={ROUTE_URL.organisationCandidateNewRequest} component={OrganisationCandidateNewRequest} />
            <AuthRoute exact path={ROUTE_URL.workPassViewRequestData} component={WorkPassViewRequestData} />
            <AuthRoute exact path={ROUTE_URL.workPassCheckDetails} component={WorkPassCheckDetails} />
            <AuthRoute exact path={ROUTE_URL.workpassAdmin} component={WorkpassAdmin} />
            <AuthRoute exact path={ROUTE_URL.persona} component={WorkpassAdminPersona} />
            <AuthRoute exact path={ROUTE_URL.workPassCandidateChecks} component={WorkPassCandidateCheck} />
            <AuthRoute exact path={ROUTE_URL.candidateChecksView} component={WorkPassCandidateCheckView} />
            <AuthRoute exact path={ROUTE_URL.organisationDocuments} component={OrganisationDocuments} />
            <AuthRoute exact path={ROUTE_URL.personaPermission} component={PersonaPermission} />
            { /* Catch all route */ }
            <Route component={NotFound} />
          </Switch>
        </div>
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
