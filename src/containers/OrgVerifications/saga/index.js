import { takeLatest, takeEvery, put, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetch(action) {
  const { orgId } = action.payload
  let url = getApiUrl('orgVerifications')
  url = url.replace(':orgId', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_SUCCESS, payload: json.data })
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}

export function* acceptVerification(action) {
  const { id, orgId } = action.payload
  let url = getApiUrl('orgVerifications')
  url = url.replace(':orgId', orgId)
  url = `${url}/${id}`

  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      action: 'accept'
    })
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.ACCEPT_VERIFICATION_SUCCESS, payload: { id } })
  }
}

export function* watchAcceptVerifications() {
  yield takeEvery(ACTIONS.ACCEPT_VERIFICATION, acceptVerification)
}

export function* declineVerification(action) {
  const { id, orgId, reasons } = action.payload
  let url = getApiUrl('orgVerifications')
  url = url.replace(':orgId', orgId)
  url = `${url}/${id}`

  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      action: 'decline',
      reasons
    })
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.DECLINE_VERIFICATION_SUCCESS, payload: { id } })
  }
}

export function* watchDeclineVerifications() {
  yield takeEvery(ACTIONS.DECLINE_VERIFICATION, declineVerification)
}

export default function* rootSaga() {
  yield all([
    watchFetch(),
    watchAcceptVerifications(),
    watchDeclineVerifications()
  ])
}
