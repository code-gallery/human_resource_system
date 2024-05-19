import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl,getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from './reducer'

export function* fetch() {
  let url = getApiUrl('persona')
  const json = yield httpFetch(url, { method: 'GET' })
  yield put({ type: ACTIONS.FETCH_SUCCESS, data: json.data })
}

export function* addCompany(action) {
  const { organisation_id, user_id } = action.payload
  //url = `${url.replace(':orgId', orgId)}/${id}`
  const url = getApiUrl('addCompany')
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(action.payload)
  })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.ADD_COMPANY_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.ADD_COMPANY_SUCCESS, payload: getApiErrorMessage(json) })
  }
  
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}
export function* watchAddCompany() {
  yield takeLatest(ACTIONS.ADD_COMPANY, addCompany)
}

export default function* rootSaga() {
  yield all([
    watchFetch(),
    watchAddCompany()
  ])
}
