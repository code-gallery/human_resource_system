import { call, put, takeLatest, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from './../reducer'
import moment from 'moment'

/**
 WORKER SAGA's
 */

const getActivityData = function* () {
  try {
    const url = getApiUrl('getActivityData')
    const json = yield httpFetch(url, { method: 'GET' })
    if (json.status === 'success') {
      const data = json.data.success ? json.data.activitydata : []
      yield put({ type: ACTIONS.GET_ACTIVITIES_SUCCESS, payload: data })
    } else {
      yield put({ type: ACTIONS.GET_ACTIVITIES_ERROR })
    }
  } catch (err) {
    yield put({ type: ACTIONS.GET_ACTIVITIES_ERROR })
  }
}

const getCompletedData = function* ({ payload }) {
  try {
    const url = getApiUrl('getCompletedData').replace(':orgId', payload.orgId)
    const json = yield httpFetch(url, { method: 'GET' })
    console.log('json-----', url, json)
    if (json.status === 'success') {
      const data = json.data.success ? json.data.activitydata : []
      const orderedData = data.sort((a, b) => {
        let date1 = a.created_at
        let date2 = b.created_at
        date1 = date1.split('/')
        date2 = date2.split('/')
        date1 = new Date(Date.UTC(date1[2], date1[1] - 1, date1[0]))
        date2 = new Date(Date.UTC(date2[2], date2[1] - 1, date2[0]))
        const x = moment(date1)
        const y = moment(date2)
        if (x === y) {
          return 0
        }
        if (isNaN(x) || x < y) {
          return -1
        }
        if (isNaN(y) || x > y) {
          return 1
        }
      })
      yield put({ type: ACTIONS.GET_COMPLETED_SUCCESS, payload: orderedData })
    } else {
      yield put({ type: ACTIONS.GET_COMPLETED_ERROR })
    }
  } catch (err) {
    yield put({ type: ACTIONS.GET_COMPLETED_ERROR })
  }
}

const getOpenAlertData = function* () {
  try {
    const url = getApiUrl('getOpenAlertData')
    const json = yield httpFetch(url, { method: 'GET' })
    console.log('json', url, json)
    if (json.status === 'success') {
      const data = json.data.success ? json.data.activitydata : []
      yield put({ type: ACTIONS.GET_OPENALERT_SUCCESS, payload: data })
    } else {
      yield put({ type: ACTIONS.GET_OPENALERT_ERROR })
    }
  } catch (err) {
    yield put({ type: ACTIONS.GET_OPENALERT_ERROR })
  }
}

const getAllOpenAlertData = function* () {
  try {
    const url = getApiUrl('getAllOpenAlertData')
    const json = yield httpFetch(url, { method: 'GET' })
    console.log('json', url, json)
    if (json.status === 'success') {
      const data = json.data.success ? json.data.activitydata : []
      yield put({ type: ACTIONS.GET_ALLOPENALERT_SUCCESS, payload: data })
    } else {
      yield put({ type: ACTIONS.GET_ALLOPENALERT_ERROR })
    }
  } catch (err) {
    yield put({ type: ACTIONS.GET_ALLOPENALERT_ERROR })
  }
}

/**
 WATCHERS SAGA's
 */

const watchGetActivityData = function* () {
  yield takeLatest(ACTIONS.GET_ACTIVITIES, getActivityData)
}

const watchGetCompletedData = function* () {
  yield takeLatest(ACTIONS.GET_COMPLETED, getCompletedData)
}

const watchGetOpenAlertData = function* () {
  yield takeLatest(ACTIONS.GET_OPENALERT, getOpenAlertData)
}

const watchGetAllOpenAlertData = function* () {
  yield takeLatest(ACTIONS.GET_ALLOPENALERT, getAllOpenAlertData)
}

/**
 ROOT SAGA
 */
export default function* rootSaga() {
  yield all([
    watchGetActivityData(),
    watchGetCompletedData(),
    watchGetOpenAlertData(),
    watchGetAllOpenAlertData()
  ])
}
