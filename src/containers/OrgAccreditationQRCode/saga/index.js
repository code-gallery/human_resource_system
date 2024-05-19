import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetch(action) {
  const { orgId, id } = action.payload
  let url = getApiUrl('orgAccreditations')
  url = `${url.replace(':orgId', orgId)}/${id}`
  const json = yield httpFetch(url, { method: 'GET' })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.FETCH_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.FETCH_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}

export default function* rootSaga() {
  yield all([
    watchFetch()
  ])
}
