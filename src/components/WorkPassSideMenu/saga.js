import { takeLatest, all, call, put } from 'redux-saga/effects'
import { ACTIONS, setBalance } from './reducer'
import * as api from './api'

/**
 WORKER SAGA's
 */
const fetchBalance = function* (action) {
  const { orgId } = action.payload
  const balance = yield call(api.getOrgBalance, orgId)

  yield put(setBalance(orgId, balance))
}

/**
 WATCHER SAGA's
 */
const watchFetchBalance = function* () {
  yield takeLatest(ACTIONS.FETCH_BALANCE, fetchBalance)
}

/**
 ROOT SAGA
 */
const rootSaga = function* () {
  yield all([
    watchFetchBalance()
  ])
}

export {
  rootSaga as default,
  watchFetchBalance,
  fetchBalance
}
