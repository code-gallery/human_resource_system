import { takeEvery, takeLatest, put, all, call } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../index'
import { setNotification } from 'store/layout'

export function* fetchUser() {
  const userUrl = getApiUrl('user')
  const requestUrl = getApiUrl('userWorkPassRequests')

  const [
    { data: userInfo },
    { data: userRequests }
  ] = yield all([
    httpFetch(userUrl, { method: 'GET' }),
    httpFetch(requestUrl, { method: 'GET' })
  ])

  const hasNotification = userRequests.requests.length > 0
  const payload = {
    ...userInfo,
    ...userRequests
  }

  yield put({ type: ACTIONS.SET_USER, payload })
  yield put(setNotification(hasNotification))
}

export function* watchFetchUser() {
  yield takeEvery(ACTIONS.FETCH_USER, fetchUser)
}

export function* updateUser({ payload }) {
  const url = getApiUrl('user')
  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.UPDATE_USER_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.UPDATE_USER_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchUpdateUser() {
  yield takeEvery(ACTIONS.UPDATE_USER, updateUser)
}

export function* fetchUserOrganisations() {
  const url = getApiUrl('userAdminOrganisations')
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_ORGANISATIONS, payload: json.data })
}

export function* watchFetchOrganisation() {
  yield takeLatest(ACTIONS.FETCH_ORGANISATIONS, fetchUserOrganisations)
}

/*---------------Client Organisations-------*/
export function* fetchClientOrganisations(action) {
  const {id} = action
  const url = getApiUrl('userClientOrganisations').replace(':org_id',id )
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_CLIENT_ORGANISATIONS, payload: json.data })
}

export function* watchFetchClientOrganisation() {
  yield takeLatest(ACTIONS.FETCH_CLIENT_ORGANISATIONS, fetchClientOrganisations)
}

/*---------------Client Organisations Filtered-------*/
export function* clientOrganisationsfilter(action) {
  const {id} = action
  const url = getApiUrl('clientOrganisationsfilter').replace(':org_id',id )
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_CLIENT_ORGANISATIONS, payload: json.data })
}

export function* watchclientOrganisationsfilter() {
  yield takeLatest(ACTIONS.FETCH_CLIENT_ORGANISATIONS_FILTER, clientOrganisationsfilter)
}

/*---------------Client Organisations-------*/


export function* deleteCompany({ payload, onSuccess, onError }) {
   const { orgId, organisation_id } = payload
   const url = `${getApiUrl('userAdminOrganisations')}/${orgId}/${organisation_id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_COMPANY_SUCCESS, payload: {  organisation_id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}


export function* watchDeleteCompany() {
  yield takeLatest(ACTIONS.DELETE_COMPANY, deleteCompany)
}
//shr
export function* fetchCompanyModal() {
  let url = getApiUrl('organisationModal')
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_ORGANISATIONS_MODAL_SUCCESS, payload: json.data })
}
export function* watchfetchCompanyModal() {
  yield takeLatest(ACTIONS.FETCH_ORGANISATIONS_MODAL, fetchCompanyModal)
}

export function* fetchChecksModal(payload) {
  let {id} = payload
  const url = getApiUrl('checksModalGet').replace(':org_id',id)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_CHECKS_MODAL_SUCCESS, payload: json.data })
}

export function* watchfetchChecksModal() {
  yield takeLatest(ACTIONS.FETCH_CHECKS_MODAL, fetchChecksModal)
}

/*---------------Workpass Admin Persona Table------*/
export function* fetchUserPersona(payload) {
  
  const {orgId,id} = payload
  const url = getApiUrl('userAdminPersonaGet').replace(':org_id',orgId).replace(':client_id',id)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_PERSONA, payload: json.data })

}

export function* watchFetchUserPersona() {
  yield takeLatest(ACTIONS.FETCH_PERSONA, fetchUserPersona)
}
export function* deletePersona({ payload, onSuccess, onError }) {
  const { organisation_id, persona_id } = payload
  let url = getApiUrl('userAdminPersona')
   url = `${url.replace(':orgId',organisation_id )}/${persona_id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_PERSONA_SUCCESS, payload: {  persona_id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}
export function* watchDeletePersona() {
  yield takeLatest(ACTIONS.DELETE_PERSONA, deletePersona)
}

/*---------------Workpass Admin Persona Table------*/

/*------------Workpass Admin Checks Table ------*/

export function* fetchUserChecks(action) {
  
  const {id} = action
  const url = getApiUrl('userAdminChecks').replace(':persona_id',id )
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.SET_CHECKS, payload: json })

}
export function* watchFetchUserChecks() {
  yield takeLatest(ACTIONS.FETCH_CHECKS, fetchUserChecks)
}




/*------------Workpass Admin Checks Table ------*/




export function* fetchUserActivity() {
  const url = getApiUrl('activity')
  const json = yield httpFetch(url, { method: 'GET' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.SET_ACTIVITIES, payload: json.data })
  } else {
    yield put({ type: ACTIONS.SET_ACTIVITIES, payload: [] })
  }
}

export function* watchFetchActivity() {
  yield takeLatest(ACTIONS.FETCH_ACTIVITIES, fetchUserActivity)
}

export function* deleteJob({ payload, onSuccess, onError }) {
  const { id } = payload
  const url = `${getApiUrl('userJobs')}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_JOB_SUCCESS, payload: { id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDeleteJob() {
  yield takeLatest(ACTIONS.DELETE_JOB, deleteJob)
}

export function* deleteEducation({ payload, onSuccess, onError }) {
  const { id } = payload
  const url = `${getApiUrl('userEducations')}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_EDUCATION_SUCCESS, payload: { id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDeleteEducation() {
  yield takeLatest(ACTIONS.DELETE_EDUCATION, deleteEducation)
}

export function* deleteAward({ payload, onSuccess, onError }) {
  const { id, type } = payload
  const url = `${getApiUrl('userAwards')}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_AWARD_SUCCESS, payload: { id, type } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDeleteAward() {
  yield takeLatest(ACTIONS.DELETE_AWARD, deleteAward)
}

export function* saveAward({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('userAwards')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const newEntity = {
    ...json.data,
    verified: false,
    verified_status: 'not_verified'
  }
  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_AWARD_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchSaveAward() {
  yield takeLatest(ACTIONS.SAVE_AWARD, saveAward)
}

export function* saveEntity({ payload, onSuccess, onError }) {
  const url = `${getApiUrl(payload.entity_type === 'jobs' ? 'userJobs' : 'userEducations')}`
  delete payload.orgId
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  const newEntity = {
    ...json.data,
    verified: false,
    entity_type: payload.entity_type,
    verified_status: 'not_verified',
    visibility: payload.visibility
  }
  if (json.data.results && typeof (json.data.results) && json.data.results.length > 0) {
    newEntity.results = JSON.parse(json.data.results)
  }
  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_ENTITY_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchSaveEntity() {
  yield takeLatest(ACTIONS.SAVE_ENTITY, saveEntity)
}

export function* editEntity({ payload, onSuccess, onError }) {
  const data = { ...payload }
  const { id, verified, verified_status, entity_type } = data
  const url = `${getApiUrl(entity_type === 'jobs' ? 'userJobs' : 'userEducations')}`
  delete data.id
  delete data.verified_status
  delete data.verified
  delete data.entity_type
  delete data.orgId
  console.log(JSON.stringify(data),'Payload')
  const json = yield httpFetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })

  const newEntity = {
    ...json.data,
    verified: false,
    entity_type,
    verified_status: 'not_verified',
    visibility: data.visibility
  }

  if (Object.keys(data).length === 1 && data.visibility) {
    newEntity.verified = verified
    newEntity.verified_status = verified_status
  }

  if (json.status === 'success') {

    yield put({ type: ACTIONS.EDIT_ENTITY_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchEditEntity() {
  yield takeLatest(ACTIONS.EDIT_ENTITY, editEntity)
}

export function* editAward({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('userAwards')}`
  const { id, verified, verified_status } = payload
  delete payload.id
  delete payload.verified_status
  delete payload.verified

  const json = yield httpFetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  const newEntity = {
    ...json.data,
    verified: false,
    verified_status: 'not_verified'
  }

  if (Object.keys(payload).length === 1 && payload.visibility) {
    newEntity.verified = verified
    newEntity.verified_status = verified_status
  }

  if (json.status === 'success') {
    yield put({ type: ACTIONS.EDIT_AWARD_SUCCESS, payload: newEntity })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchEditAward() {
  yield takeLatest(ACTIONS.EDIT_AWARD, editAward)
}

export function* verifyAward(action) {
  const url = `${getApiUrl('verification')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...action.payload, type: 'award' })
  })
  yield put({
    type: ACTIONS.VERIFY_AWARD_SUCCESS,
    payload: {
      id: json.data.verification.user_award_id,
      verified: false,
      verified_status: 'pending_verification',
      type: action.payload.type
    }
  })
}

export function* watchVerifyAward() {
  yield takeLatest(ACTIONS.VERIFY_AWARD, verifyAward)
}


//added for company modal 
export function* verifyCompany({payload,onError,onSuccess}) {
 
  const { client_id,orgName,organisation_id, organisations,user_id, } = payload
  const url = `${getApiUrl('addCompany')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "user_id" :user_id,
      "client_id" :client_id,
      "organisation_id" :organisation_id
    })
  })
  if (json.status === 'success') {
    yield put({
      type: ACTIONS.VERIFY_COMPANY_SUCCESS,
      payload: {
        id: client_id,
        name: orgName
      }
    })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
 
}

export function* watchVerifyCompany() {
  yield takeLatest(ACTIONS.VERIFY_COMPANY, verifyCompany)
}

export function* verifyChecks({payload,onError,onSuccess}) {
  const { organisation_id, persona_id, type, checkId, checkName } = payload
  const url = `${getApiUrl('checksModalPost')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "persona_id" :persona_id,
      "organisation_id" :organisation_id,
      "check_id" : checkId
    })
  })
  const url2 = getApiUrl('userAdminChecks').replace(':persona_id',persona_id )
  const json2 = yield httpFetch(url2, { method: 'GET' })
  if (json.status === 'success') {
    yield put({
      type: ACTIONS.VERIFY_CHECKS_SUCCESS,
      payload: json2.data
    })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
 

}

export function* watchVerifyChecks() {
  yield takeLatest(ACTIONS.VERIFY_CHECKS, verifyChecks)
}
export function* deleteChecks({ payload, onSuccess, onError }) {
  const { persona_id, checks_id } = payload
  let url = getApiUrl('userAdminChecks')
   url = `${url.replace(':persona_id',persona_id )}/${checks_id}`
  const json = yield httpFetch(url, { method: 'DELETE' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_CHECKS_SUCCESS, payload: { checks_id } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}
export function* watchDeleteChecks() {
  yield takeLatest(ACTIONS.DELETE_CHECKS, deleteChecks)
}

export function* verifyPersona({ payload, onSuccess, onError }) {
 
  const { organisation_id, persona_name, orgId} = payload
  let url = `${getApiUrl('personaModal')}`
  url = `${url.replace(':orgId',organisation_id )}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "persona_name" :persona_name,
      "client_id" :organisation_id,
      "organisation_id" :orgId
    })
  })
  
  const url2 = getApiUrl('userAdminPersonaGet').replace(':org_id',orgId).replace(':client_id',organisation_id)
  const json2 = yield httpFetch(url2, { method: 'GET' })
  if (json.status === 'success') {
    yield put({
      type: ACTIONS.VERIFY_PERSONA_SUCCESS,
      payload: json2.data
    })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}
 

export function* watchVerifyPersona() {
  yield takeLatest(ACTIONS.VERIFY_PERSONA, verifyPersona)
}

//end of changes shr


export function* verifyEntity(action) {
  const url = `${getApiUrl('verification')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...action.payload, type: action.payload.type === 'jobs' ? 'job' : 'education' })
  })
  yield put({
    type: ACTIONS.VERIFY_ENTITY_SUCCESS,
    payload: {
      id: action.payload.type === 'jobs' ? json.data.verification.job_id : json.data.verification.education_id,
      verified: false,
      verified_status: 'pending_verification',
      entity_type: action.payload.type
    }
  })
}

export function* watchVerifyEntity() {
  yield takeLatest(ACTIONS.VERIFY_ENTITY, verifyEntity)
}

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchFetchOrganisation(),
    watchDeleteJob(),
    watchDeleteEducation(),
    watchDeleteAward(),
    watchSaveAward(),
    watchSaveEntity(),
    watchEditEntity(),
    watchEditAward(),
    watchVerifyAward(),
    watchVerifyEntity(),
    watchUpdateUser(),
    watchFetchActivity(),
    watchDeleteCompany(),
    watchDeletePersona(),
    watchFetchUserPersona(),
    watchFetchUserChecks(),
    watchDeleteChecks(),
    watchVerifyCompany(),
    watchVerifyChecks(),
    watchfetchCompanyModal(),
    watchfetchChecksModal(),
    watchFetchClientOrganisation(),
    watchclientOrganisationsfilter(),
    watchVerifyPersona()
  ])
}
