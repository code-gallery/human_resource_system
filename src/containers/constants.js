export const ROUTE_URL = {
  publicSiteHome: 'https://appii.io',
  publicSiteContact: 'https://appii.io/contact/',
  publicSiteHelp: 'https://appii.io/faq/',
  home: '/profile',
  cookies: '/cookies',
  confirmEmail: '/confirm-email/:token',
  login: '/login',
  logout: '/logout',
  forgotPassword: '/recover-password',
  resetPassword: '/recover-password/:token',
  register: '/register',
  registerTechnojob: '/register/technojobs/:technojobsId/:technojobsHash',
  organisations: '/organisations',
  orgProfile: '/organisations/:orgId',
  orgAccreditations: '/organisations/:orgId/accreditations',
  orgAccreditationQRCode: '/organisations/:orgId/accreditations/:id/qrcode',
  orgAccreditationEdit: '/organisations/:orgId/accreditations/:id/edit',
  orgAccreditationMembers: '/organisations/:orgId/accreditations/:id/members',
  orgVerifications: '/organisations/:orgId/verifications',
  orgWorkPass: '/organisations/:orgId/candidates',
  orgAdmins: '/organisations/:orgId/admins',
  newOrganisation: '/organisation/new',
  people: '/people',
  profile: '/profile',
  privacy: '/privacy-policy',
  privacyMobile: '/privacy-policy/mobile',
  settingsAccount: '/settings/account',
  terms: '/terms-of-use',
  termsMobile: '/terms-of-use/mobile',
  userProfile: '/profile/:uid',
  userVerifications: '/personal-verification',
  helpBiometric: '/help/biometric',
  linkedinImport: '/import/linkedin',
  dashboard: '/organisations/:orgId/dashboard',
  organisationCandidates: '/organisations/:orgId/candidates',
  organisationCandidatesSearch: '/organisations/:orgId/candidates/search/:candidate',
  externalCandidatesSearch:'/organisations/:orgId/externalCandidates/search/:candidate',
  externalCandidates:'/organisations/:orgId/externalCandidates',
  externalCandidate: '/organisations/:orgId/verifyingorganisations/:vOrgId/externalCandidates/:candidateId',
  organisationCandidate: '/organisations/:orgId/candidates/:candidateId',
  organisationCandidateNewRequest: '/organisations/:orgId/candidates/:candidateId/requests/new',
  organisationAddCandidate: '/organisations/:orgId/candidates/new',
  workPassInvite: '/invite/work_pass',
  workPassAccept: '/invite/work_pass/accept',
  workpassAdmin: '/organisations/:orgId/workpassAdmin',
  persona: '/organisations/:orgId/workpassAdmin/persona',
  workPassViewRequestData: '/organisations/:orgId/candidates/:candidateId/requests/:requestId/data/:vOrgId',
  workPassCheckDetails: '/organisations/:orgId/candidates/:candidateId/requests/:requestId/checks/:checkId/details/:type/:side/:status/:refOption/:optiontype/:vOrgId',
  workPassCandidateChecks: '/workPassCandidateChecks/:userId',
  candidateChecksView: '/workPassCandidateChecks/:userId/candidateChecksView/:requestId/type/:type',
  organisationDocuments: '/organisations/:orgId/documents',
  personaPermission: '/organisations/:orgId/personaPermission/:type'
}

export const getRoute = (route, params) => {
  let url = ROUTE_URL[route]
  if (!url) {
    throw new ReferenceError('No ROUTE_URL found at ' + route)
  }

  for (const param in params) {
    url = url.replace(':' + param, params[param])
  }
  return url
}

const API_URL = {
  confirmEmail: '/apis/userapi/v0.1/user/confirmEmail',
  login: '/api/login',
  organisations: '/apis/userapi/v0.1/organisations',
  organisationsEmployees: '/apis/userapi/v0.1/organisations/:orgId/employees',
  organisationsAdmins: '/apis/userapi/v0.1/organisations/:orgId/admins',
  organisationsSearch: '/apis/userapi/v0.1/organisations/search',
  resetPasswordRequest: '/apis/userapi/v0.1/user/resetPassword/request',
  resetPassword: '/apis/userapi/v0.1/user/resetPassword',
  changePassword: '/apis/userapi/v0.1/user/changePassword',
  user: '/apis/userapi/v0.1/user',
  userAwards: '/apis/userapi/v0.1/user/awards',
  userJobs: '/apis/userapi/v0.1/user/jobs',
  userEducations: '/apis/userapi/v0.1/user/educations',
  userResendConfirmation: '/apis/userapi/v0.1/user/requestConfirmationEmail',
  orgAccreditations: '/apis/userapi/v0.1/organisations/:orgId/accreditations',
  orgVerifications: '/apis/userapi/v0.1/organisations/:orgId/verifications',
  otherUser: '/apis/userapi/v0.1/user/:uid',
  otherUserAwards: '/apis/userapi/v0.1/user/:uid/awards',
  otherUserJobs: '/apis/userapi/v0.1/user/:uid/jobs',
  otherUserEducations: '/apis/userapi/v0.1/user/:uid/educations',
  userVerifications: '/apis/userapi/v0.1/user/verificationRequests',
  users: '/apis/userapi/v0.1/users',
  reference: '/apis/userapi/v0.1/referenceData/findByIdentifier?identifier=',
  orgAutocomplete: '/apis/userapi/v0.1/organisations/search?q=',
  refereeOrgAutocomplete:'/apis/userapi/v0.1/organisations/referee/search?q=',
  userSettings: '/apis/userapi/v0.1/user/settings',
  deleteUserAccount: '/apis/userapi/v0.1/user/tagForDelete',
  verification: '/apis/userapi/v0.1/verification/request',
  activity: '/apis/userapi/v0.1/user/log',
  verifiedStudents: '/apis/userapi/v0.1/organisations/:orgId/students',
  profileImage: '/profile/:id/profileImage',
  logoImage: '/organisation/:orgId/logoImage',
  storage: '/apis/userapi/v0.1/jsonStorage',
  linkedinImport: '/apis/userapi/v0.1/integrations/importLinkedInPdf',
  organisationCandidates: '/apis/userapi/v0.1/organisations/:orgId/candidates',
  organisationCandidate: '/apis/userapi/v0.1/organisations/:orgId/candidates/:candidateId',
  organisationExCandidate: '/apis/userapi/v0.1/organisations/:orgId/excandidates/:candidateId',
  externalCandidates:'/apis/userapi/v0.1/organisations/:org_id/externalcandidates',
  orgWorkPassConfig: '/apis/userapi/v0.1/organisations/:orgId/check_config',
  orgCandidateRequests: '/apis/userapi/v0.1/organisations/:orgId/candidates/:candidateId/requests',
  organisationCandidatesFind: '/apis/userapi/v0.1/organisations/:orgId/candidates/find',
  organisation: '/apis/userapi/v0.1/organisations/:orgId',
  workPassInvite: '/apis/userapi/v0.1/invite/work_pass',
  workpassAccept: '/apis/userapi/v0.1/invite/work_pass/accept',
  workPassRequest: '/apis/userapi/v0.1/work_pass/requests/:requestId',
  workPassExCandidateReq: '/apis/userapi/v0.1/work_pass/candidate/requests/:requestId',
  userWorkPassRequests: '/apis/userapi/v0.1/user/work_pass/requests',
  confirmRequest: '/apis/userapi/v0.1/work_pass/requests/:requestId/confirm',
  organisationModal:'/apis/userapi/v0.1/workpass_organisations',
  addCompany:'/apis/userapi/v0.1/workpass_organisations',
  checksModalGet:'/apis/userapi/v0.1/organisations/:org_id/workpass_checks',
  checksModalPost:'/apis/userapi/v0.1/workpass_checks',
  saveRightToWorkData:'/apis/userapi/v0.1/work_pass/checks/:check_id/data',
  uploadRightToWorkDocument: '/apis/userapi/v0.1/user/documents',
  userAdminOrganisations: '/apis/userapi/v0.1/user/adminOrganisations',
  userClientOrganisations: '/apis/userapi/v0.1/user/:org_id/clientOrganisations',
  userClientOrganisationsPermission: '/apis/userapi/v0.1/user/:org_id/clientOrganisationsPermissions',
  userAdminPersona: '/apis/userapi/v0.1/organisations/:orgId/personas',
  userAdminChecks: '/apis/userapi/v0.1/personas/:persona_id/checks',
  personaModal: '/apis/userapi/v0.1/organisations/:orgId/personas',
  userAdminPersonaGet: '/apis/userapi/v0.1/organisations/:org_id/:client_id/personas',
  fetchCheckData: '/apis/userapi/v0.1/organisations/:org_id/candidates/:candidate_id/requests/:request_id/checks/:check_id/:check_type',
  fetchEmpGapCheckData: '/apis/userapi/v0.1/checks/:check_id/:check_type/:web',
  emailSchedulerApi: '/email_schedular',
  workPassCandidateChecks: '/apis/userapi/v0.1/user/work_pass/requests',
  workPassCandidateCheck:'/apis/userapi/v0.1/work_pass/requests/:request_id',
  candidatePersonalInfo: '/apis/userapi/v0.1/user/attributes/personalInformation',
  saveCandidateInfo: '/apis/userapi/v0.1/work_pass/candidate/savecandidateinfo',
  getCandidateInfo: '/apis/userapi/v0.1/work_pass/candidate/getcandidateinfo/:candidate_id',
  userPersonalInfo: '/apis/userapi/v0.1/user/attributes/personalInformation/:user_id',
  candidateAddresses: '/apis/userapi/v0.1/user/attributes/addresses',
  userAddresses: '/apis/userapi/v0.1/user/attributes/addresses/:user_id',
  userWebAddress: '/apis/userapi/v0.1/user/attributes/addressweb',
  submitAddressHistory: '/apis/userapi/v0.1/work_pass/checks/:check_id/addresses/data',
  submitWorkPassRequest: '/apis/userapi/v0.1/work_pass/requests/:request_id/submit',
  annotationSubmit: '/apis/userapi/v0.1/checks/annotation/submit',
  annotationFetch: '/apis/userapi/v0.1/checks/:check_id/:check_type/annotation',
  annotationReset: '/apis/userapi/v0.1/checks/annotation/reset',
  refereeEmail: '/apis/userapi/v0.1/work_pass/checks/:check_id/data',
  workpassSubmit: '/apis/userapi/v0.1/work_pass/checks/:check_id/empsubmit',
  addNewDocument: '/apis/userapi/v0.1/organisations/document',
  documentUpload:'/apis/userapi/v0.1/user/documents',
  fetchOrgDocument: '/apis/userapi/v0.1/organisation/:org_id/documents/data',
  editOrgDocument: '/apis/userapi/v0.1/organisation/documents/:id',
  updateDocument: '/apis/userapi/v0.1/organisations/editdocument',
  uploadEmpDocument: '/apis/userapi/v0.1/user/empreference/documentupload',
  viewUploadedDocuments: '/apis/userapi/v0.1/user/empreference/viewimageupload',
  deleteDocument: '/apis/userapi/v0.1/user/empreference/deleteImage',
  uploadDirectorshipDocument: '/apis/userapi/v0.1/user/empreference/directorshipdocumentupload',
  uploadRightToWorkDocument: '/apis/userapi/v0.1/user/documents',
  deleteDirectorshipDocument: '/apis/userapi/v0.1/user/directorshipcheck/deleteImage',
  closeCheck: '/api/work_pass/closeEmployementReference/id/:checkid',
  personaPermissionAccounts: '/apis/userapi/v0.1/organisations/25767/workpassAdmin/persona',
  personaPermissionPeople: '/admin/organisations/:org_id/admins',
  personaPermissionEnable: '/apis/userapi/v0.1/user/clientOrganisationsPermissions',
  clientOrganisationsfilter: '/apis/userapi/v0.1/user/:org_id/clientOrganisationsfilter',
  softDeleteRef: '/api/work_pass/softDeleteEmployementReference/id/:checkid',
  assignWorkpass: '/apis/userapi/v0.1/work_pass/candidate/candidaterequestchange/:candidateId',
  assignButtonStatus: '/apis/userapi/v0.1/work_pass/candidate/candidaterequestbuttonststatus/:candidateId',
  candidateDelete: '/apis/userapi/v0.1/work_pass/candidate/deleterequest/:candidateId',
  dbsCheckSubmit: '/apis/userapi/v0.1/work_pass/checks/:check_id/submitDBS',
  updateDbsType: '/apis/userapi/v0.1/work_pass/checks/updatedbstype',
  deleteWPRequest: '/apis/userapi/v0.1/work_pass/candidate/deletesinglerequest/:requestId',
  refreshWPRequest: '/apis/userapi/v0.1/work_pass/checks/:requestId/refreshGBG',
  dbsButtonStatus: '/apis/userapi/v0.1/work_pass/checks/:check_id/submitbuttonDBS',
  saveOfficerCheckData: '/apis/userapi/v0.1/work_pass/employmentreferenceschecks/officeredit',
  getOfficerCheckData: '/apis/userapi/v0.1/work_pass/employmentreferenceschecks/officeredit/refrenceid/:refrenceid',
  changeStatusData: '/apis/userapi/v0.1/work_pass/updaterequest/:requestId',
  nudgeData: '/apis/userapi/v0.1/work_pass/checks/submitnudge',
  getDocPersona: '/apis/userapi/v0.1/organisation/personas/documents/:docId',
  putRoleData: '/apis/userapi/v0.1/organisations/:org_id/candidates/:candidate_id/requests/:id',
  postConfirmMailId: '/apis/userapi/v0.1/work_pass/user/:userId/confirmed',
  manualComplete: '/apis/userapi/v0.1/work_pass/checks/:check_id/submitManual',
  bankAddresses: '/apis/userapi/v0.1/user/attributes/banks',
  submitBankDetails: '/apis/userapi/v0.1/work_pass/bankdetails/:check_id/submit',
  candidateNotes: '/apis/userapi/v0.1/organisations/:org_id/candidates/:candidate_id/notes',
  submitCriminalRecord: '/apis/userapi/v0.1/work_pass/checks/:check_id/criminalRecordCheck/confirm',
  submitImmigrationDetails: '/apis/userapi/v0.1/work_pass/checks/:check_id/immigration_details/data',
  getActivityData: '/apis/userapi/v0.1/checks/annotation/getactivitydata',
  getCompletedData: '/apis/userapi/v0.1/checks/annotation/getactivitydataorgspecific/organisationid/:orgId',
  getOpenAlertData: '/apis/userapi/v0.1/checks/annotation/getactivitydata',
  getAllOpenAlertData: '/apis/userapi/v0.1/checks/annotation/getactivitydata'
}

const LOCATION_ORIGIN = {
  test: 'https://test-jdc9nn.appii.io',
  staging: 'https://staging-51le5z.appii.io',
  production: 'https://appii.io'
}

export const getIntelligentProfileUrl = function (token, locationOrigin) {
  let url
  switch (locationOrigin) {
    case LOCATION_ORIGIN.staging:
    case LOCATION_ORIGIN.production:
      url = `https://intelligent-profile.appii.io/setting_up?jwt=${token}`
      break
    case LOCATION_ORIGIN.test:
      url = `https://intelligentprofile-test-jdc9nn.appii.io/setting_up?jwt=${token}`
      break
    default:
      url = false
  }

  return url
}

export const getApiUrl = function (key) {
  let baseUrl
  switch (process.env.REACT_APP_API_ENV) {
    case 'local':
      baseUrl = 'http://localhost:3333'
      break
    case 'staging':
      baseUrl = 'https://api-staging-51le5z.appii.io'
      break
    case 'test':
      baseUrl = 'https://api-test-jdc9nn.appii.io'
      break
    case 'production':
      baseUrl = 'https://api.appii.io'
      break
    default:
      baseUrl = 'https://api-test-jdc9nn.appii.io'
  }
  return baseUrl + API_URL[key]
}

export const getApiErrorMessage = function (json) {
  let message = 'An unknown error has occured. Please try again'
  if (json && json.errors && json.errors[0]) {
    if (json.errors[0].error) {
      message = json.errors[0].error
    } else if (json.errors[0].validation && json.errors[0].message) {
      message = json.errors[0].message
    }
  }

  return message
}

export const APP_PREFIX = '@appii'

export const STORAGE_KEY = {
  token: `${APP_PREFIX}:token`,
  register: `${APP_PREFIX}:register`,
  appBanner: `${APP_PREFIX}:appBanner`
}

export const INSTAGRAM_ID = 'b014437f44774eada8f4595b95994927'

export const DEFAULT_ORDER = {
  education: 0,
  jobs: 1,
  award: 2,
  cpd: 3,
  certificate: 4,
  achievement: 5,
  project: 6,
  skill: 7,
  language: 8
}

export const IOS_APP_URL = 'https://itunes.apple.com/gb/app/appii/id1215363651?mt=8'
export const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.appii'

export const NOTIFICATION_TIMEOUT = 4000

export const VISIBILITY_OPTIONS = [
  { value: 'private', label: 'Only Me' },
  { value: 'public', label: 'Everyone' },
  { value: 'registered', label: 'Registered Users' },
  { value: 'verifiers', label: 'Verifiers' }
]

export default {
  ROUTE_URL,
  APP_PREFIX,
  STORAGE_KEY,
  INSTAGRAM_ID,
  DEFAULT_ORDER,
  IOS_APP_URL,
  ANDROID_APP_URL,
  VISIBILITY_OPTIONS,
  getRoute,
  getApiUrl,
  getApiErrorMessage,
  getIntelligentProfileUrl
}
