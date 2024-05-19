import { takeLatest, put, all, call } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetchUserSettings() {
  const url = `${getApiUrl('userSettings')}`
  const json = yield httpFetch(url, { method: 'GET' })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.FETCH_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.FETCH_ERROR })
  }
}

export function* watchFetchUserSettings() {
  yield takeLatest(ACTIONS.FETCH, fetchUserSettings)
}

export function* changePassword(action) {
  const url = `${getApiUrl('changePassword')}`

  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(action.payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.CHANGE_PASSWORD_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.CHANGE_PASSWORD_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchChangePassword() {
  yield takeLatest(ACTIONS.CHANGE_PASSWORD, changePassword)
}

export function* saveUserSettings(action) {
  const url = `${getApiUrl('userSettings')}`
  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify(action.payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.SAVE_USER_SETTINGS_SUCCESS, payload: json.data })
  } else {
    yield put({ type: ACTIONS.SAVE_USER_SETTINGS_ERROR, payload: getApiErrorMessage(json) })
  }
}

export function* watchSaveUserSettings() {
  yield takeLatest(ACTIONS.SAVE_USER_SETTINGS, saveUserSettings)
}

export function* deleteUserAccount({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('deleteUserAccount')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.DELETE_USER_ACCOUNT_SUCCESS, payload: { message: json.message, isLogout: json.data.logout } })
    yield call(onSuccess)
  } else {
    yield put({ type: ACTIONS.DELETE_USER_ACCOUNT_ERROR, payload: getApiErrorMessage(json) })
    yield call(onError)
  }
}

export function* watchDeleteUserAccount() {
  yield takeLatest(ACTIONS.DELETE_USER_ACCOUNT, deleteUserAccount)
}

export default function* rootSaga() {
  yield all([
    watchFetchUserSettings(),
    watchChangePassword(),
    watchSaveUserSettings(),
    watchDeleteUserAccount()
  ])
}
