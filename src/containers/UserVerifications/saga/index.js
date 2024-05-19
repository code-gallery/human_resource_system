import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetch() {
  const url = getApiUrl('userVerifications')
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.LOAD_SUCCESS, payload: json.data })
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}

export default function* rootSaga() {
  yield all([
    watchFetch()
  ])
}
