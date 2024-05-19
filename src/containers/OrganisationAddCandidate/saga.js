import { takeLatest, all, put, call } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { getApiUrl } from 'containers/constants'
import {
  ACTIONS,
  searchCandidateError,
  searchCandidateSuccess,
  addCandidateSuccess,
  addCandidateError
} from './reducer'

/**
 WORKER SAGA's
 */
const findCandidates = function* (action) {
  try {
    const { orgId, query } = action.payload

    let url = getApiUrl('organisationCandidatesFind').replace(':orgId', orgId)
    url += `?search=${query}`

    const response = yield call(httpFetch, url)

    if (response.status !== 'success') {
      throw new Error(response.errors[0].error)
    }

    const { users } = response.data

    yield put(searchCandidateSuccess(users))
  } catch (e) {
    yield put({ searchCandidateError })
  }
}

const addCandidateToOrg = function* (action) {
  const { orgId, candidateInfo, onError } = action.payload
  const url = getApiUrl('organisationCandidates').replace(':orgId', orgId)
 
  try {
    const response = yield call(httpFetch, url, {
      method: 'POST',
      body: JSON.stringify(candidateInfo)
    })

    if (response.status !== 'success') {      
      yield call(onError) 
      throw new Error('Bad response')
    }

    yield put(addCandidateSuccess(response.data))
  } catch (err) {
    yield put(addCandidateError())
  }
}

/**
 WATCHER SAGA's
 */
const watchCandidateSearch = function* () {
  yield takeLatest(ACTIONS.CANDIDATES_SEARCH, findCandidates)
}

const watchAddCandidate = function* () {
  yield takeLatest(ACTIONS.ADD_CANDIDATE, addCandidateToOrg)
}

/**
 ROOT SAGA
 */
const rootSaga = function* () {
  yield all([
    watchCandidateSearch(),
    watchAddCandidate()
  ])
}

export {
  rootSaga as default,
  watchCandidateSearch,
  watchAddCandidate,
  findCandidates,
  addCandidateToOrg
}
