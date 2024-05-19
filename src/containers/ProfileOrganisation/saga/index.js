import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetch(action) {
  const { orgId } = action.payload
  const url = `${getApiUrl('organisations')}/${orgId}`
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.LOAD_SUCCESS, payload: json.data })
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}

export function* fetchEmployees(action) {
  const { orgId } = action.payload
  let url = `${getApiUrl('organisationsEmployees')}`
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.LOAD_EMPLOYEES_SUCCESS, payload: json.data })
}

export function* watchFetchEmployess() {
  yield takeLatest(ACTIONS.FETCH_EMPLOYEES, fetchEmployees)
}

export function* fetchAdmins(action) {
  const { orgId } = action.payload
  let url = `${getApiUrl('organisationsAdmins')}`
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.LOAD_ADMINS_SUCCESS, payload: json.data })
}

export function* watchFetchAdmins() {
  yield takeLatest(ACTIONS.FETCH_ADMINS, fetchAdmins)
}

export function* save(action) {
  const { orgId } = action.payload
  const url = `${getApiUrl('organisations')}/${orgId}`
  delete action.payload.orgId
  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify(action.payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.SAVE_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchSave() {
  yield takeLatest(ACTIONS.SAVE, save)
}

export function* fetchVerifiedStudents(action) {
  const { orgId } = action.payload
  let url = `${getApiUrl('verifiedStudents')}`
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.LOAD_VERIFIED_STUDENTS_SUCCESS, payload: json.data })
}

export function* watchFetchVerifiedStudents() {
  yield takeLatest(ACTIONS.FETCH_VERIFIED_STUDENTS, fetchVerifiedStudents)
}

export default function* rootSaga() {
  yield all([
    watchFetch(),
    watchFetchEmployess(),
    watchFetchAdmins(),
    watchFetchVerifiedStudents(),
    watchSave()
  ])
}
