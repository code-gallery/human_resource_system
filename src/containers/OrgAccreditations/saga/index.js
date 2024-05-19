import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetch(action) {
  const { orgId } = action.payload
  let url = getApiUrl('orgAccreditations')
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_SUCCESS, payload: json.data })
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}

export function* deleteAccreditation(action) {
  const { orgId, id } = action.payload
  let url = getApiUrl('orgAccreditations')
  url = `${url.replace(':orgId', orgId)}/${id}`
  const json = yield httpFetch(url, { method: 'DELETE' })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_SUCCESS, payload: { id } })
  } else {
    yield put({ type: ACTIONS.DELETE_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchDelete() {
  yield takeLatest(ACTIONS.DELETE, deleteAccreditation)
}

export function* saveAccreditation(action) {
  const { orgId, data } = action.payload
  let method = 'POST'
  let url = getApiUrl('orgAccreditations')
  url = url.replace(':orgId', orgId)
  if (data.id) {
    url = `${url}/${data.id}`
    method = 'PUT'
  }
  const json = yield httpFetch(url, {
    method,
    body: JSON.stringify(data)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.SAVE_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchSave() {
  yield takeLatest(ACTIONS.SAVE, saveAccreditation)
}

export default function* rootSaga() {
  yield all([
    watchFetch(),
    watchDelete(),
    watchSave()
  ])
}
