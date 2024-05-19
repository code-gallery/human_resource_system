import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetchOrgAdmins(action) {
  const { orgId } = action.payload
  let url = getApiUrl('organisationsAdmins')
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_SUCCESS, payload: json.data })
}

export function* watchFetchOrgAdmins() {
  yield takeLatest(ACTIONS.FETCH, fetchOrgAdmins)
}

export function* fetchOrgEmployees(action) {
  const { orgId } = action.payload
  let url = getApiUrl('organisationsEmployees')
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_EMPLOYEES_SUCCESS, payload: json.data })
}

export function* watchFetchOrgEmployees() {
  yield takeLatest(ACTIONS.FETCH_EMPLOYEES, fetchOrgEmployees)
}

export function* addAdmin(action) {
  const { orgId } = action.payload
  let url = getApiUrl('organisationsAdmins')
  url = url.replace(':orgId', orgId)
  delete action.payload.orgId
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(action.payload)
  })
  yield put({ type: ACTIONS.ADD_ADMIN_SUCCESS, payload: json.data })
}

export function* watchAddAdmin() {
  yield takeLatest(ACTIONS.ADD_ADMIN, addAdmin)
}

export function* deleteAdmin(action) {
  const { orgId, adminId, userId } = action.payload
  let url = getApiUrl('organisationsAdmins')
  url = url.replace(':orgId', orgId)
  yield httpFetch(`${url}/${adminId}`, { method: 'DELETE' })
  yield put({ type: ACTIONS.DELETE_ADMIN_SUCCESS, payload: { adminId, userId } })
}

export function* watchDeleteAdmin() {
  yield takeLatest(ACTIONS.DELETE_ADMIN, deleteAdmin)
}

export default function* rootSaga() {
  yield all([
    watchFetchOrgAdmins(),
    watchFetchOrgEmployees(),
    watchAddAdmin(),
    watchDeleteAdmin()
  ])
}
