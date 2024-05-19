import { call, put, takeLatest, all } from 'redux-saga/effects'
import { getCandidate } from './api'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import {
  ACTIONS,
  saveCandidate,
  candidateRequestError,
  getRequestSuccess,
  getRequestError
} from './reducer'

/**
 WORKER SAGA's
 */
const fetchCandidate = function* (action) {
  try {
    const { orgId, candidateId } = action.payload
    const candidate = yield call(getCandidate, orgId, candidateId)

    yield put(saveCandidate(candidate))
  } catch (e) {
    yield put(candidateRequestError())
  }
}

const fetchRequest = function* (action) {
  try {
    const { requestId } = action.payload
    const url = getApiUrl('workPassExCandidateReq').replace(':requestId', requestId)
    const response = yield call(httpFetch, url)

    if (response.status !== 'success') {
      throw new Error('Bad response')
    }

    const request = response.data.request

    yield put(getRequestSuccess(requestId, request))
  } catch (err) {
    yield put(getRequestError())
  }
}

/**
 WATCHERS SAGA's
 */
const watchCandidateRequest = function* () {
  yield takeLatest(ACTIONS.REQUEST_CANDIDATE, fetchCandidate)
}

const watchChecksRequest = function* () {
  yield takeLatest(ACTIONS.GET_REQUEST, fetchRequest)
}

/**
 ROOT SAGA
 */
const rootSaga = function* () {
  yield all([
    watchCandidateRequest(),
    watchChecksRequest()
  ])
}

export {
  rootSaga as default,
  watchCandidateRequest,
  fetchCandidate,
  watchChecksRequest,
  fetchRequest
}
