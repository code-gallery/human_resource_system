import { takeLatest, call, put, all } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { getApiUrl } from 'containers/constants'
import { ACTIONS, accepted, apiError } from './reducer'

/**
 WORKER SAGA's
 */
const acceptInvite = function* (action) {
  const { token } = action.payload
  let url = getApiUrl('workpassAccept')
  url += `?token=${token}`

  try {
    yield call(httpFetch, url, { method: 'POST' })
    yield put(accepted())
  } catch (e) {
    yield put(apiError(e))
  }
}

/**
 WATCHER SAGA's
 */
const watchPost = function* () {
  yield takeLatest(ACTIONS.INVITE_ACCEPT_POST, acceptInvite)
}

/**
 ROOT SAGA's
 */
const rootSaga = function* () {
  yield all([
    watchPost()
  ])
}

export {
  rootSaga as default,
  watchPost,
  acceptInvite
}
