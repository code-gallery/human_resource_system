import { takeLatest, call, put, all } from 'redux-saga/effects'
import * as api from 'containers/WorkPassInvite/api'
import { ACTIONS, requestInfoSuccess, apiError } from './reducer'

/**
 WORKER SAGA's
 */
const fetchRequestInfo = function* (action) {
  const { token } = action.payload

  try {
    const inviteInfo = yield call(api.getInviteInfo, token)
    yield put(requestInfoSuccess(inviteInfo))
  } catch (e) {
    yield put(apiError(e))
  }
}

/**
 WATCHER SAGA's
 */
const watchRequestInfo = function* () {
  yield takeLatest(ACTIONS.REQUEST_INFO, fetchRequestInfo)
}

/**
 ROOT SAGA's
 */
const rootSaga = function* () {
  yield all([
    watchRequestInfo()
  ])
}

export {
  rootSaga as default
}
