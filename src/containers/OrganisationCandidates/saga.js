import { call, put, takeLatest, all } from 'redux-saga/effects'
import { ACTIONS, saveCandidates, candidatesRequestError } from './reducer'
import { getCandidates } from './service'

/**
 WORKERS
 */
const fetchCandidates = function* (action) {
  const { orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page } = action.payload
  try {
    const candidates = yield call(getCandidates, orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page)
    yield put(saveCandidates(candidates))
  } catch (e) {
    yield put(candidatesRequestError())
  }
}

/**
 WATCHERS
 */
const watchCandidatesRequest = function* () {
  yield takeLatest(ACTIONS.REQUEST_CANDIDATES, fetchCandidates)
}

/**
 ROOT SAGA
 */
const rootSaga = function* () {
  yield all([
    watchCandidatesRequest()
  ])
}

export {
  rootSaga as default,
  fetchCandidates,
  watchCandidatesRequest
}
