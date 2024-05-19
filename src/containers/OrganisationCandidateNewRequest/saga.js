import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as api from './api'
import {
  saveOrganisationConfig,
  requestPosted,
  requestErrored,
  ACTIONS
} from './reducer'

/**
 WORKER SAGA's
 */
const fetchOrgConfig = function* (action) {
  try {
    const { orgId } = action.payload
    const checkConfig = yield call(api.getOrganisationConfig, orgId)

    yield put(saveOrganisationConfig(checkConfig))
  } catch (e) {
    yield put(requestErrored())
  }
}

const postNewRequest = function* (action) {
  try {
    const { orgId, candidateId, requestInfo } = action.payload
    const info = yield call(api.postRequest, orgId, candidateId, requestInfo)

    yield put(requestPosted(info))
  } catch (e) {
    yield put(requestErrored())
  }
}

/**
 WATCHER SAGA's
 */
const watchOrgConfigRequest = function* () {
  yield takeLatest(ACTIONS.REQUEST_ORGANISATION_CONFIG, fetchOrgConfig)
}

const watchPostNewRequest = function* () {
  yield takeLatest(ACTIONS.POST_NEW_REQUEST, postNewRequest)
}

/**
 ROOT SAGA
 */
const rootSaga = function* () {
  yield all([
    watchOrgConfigRequest(),
    watchPostNewRequest()
  ])
}

export {
  rootSaga as default,
  fetchOrgConfig,
  watchOrgConfigRequest,
  watchPostNewRequest,
  postNewRequest
}
