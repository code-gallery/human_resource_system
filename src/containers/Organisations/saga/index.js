import { takeLatest, put, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { ACTIONS } from '../reducer'

export function* fetch(action) {
  const { perPage, currentPage, q } = action.payload
  const doSearch = (q !== '')
  let url = `${getApiUrl('organisations')}?perPage=${perPage}&page=${currentPage}`
  if (doSearch) {
    url = `${getApiUrl('organisationsSearch')}?q=${q}`
  }

  const json = yield httpFetch(url, { method: 'GET' })

  if (doSearch) {
    const payload = { data: json }
    yield put({ type: ACTIONS.LOAD_SUCCESS, payload })
  } else {
    yield put({ type: ACTIONS.LOAD_SUCCESS, payload: json.data })
  }
}

export function* watchFetch() {
  yield takeLatest(ACTIONS.FETCH, fetch)
}

export default function* rootSaga() {
  yield all([
    watchFetch()
  ])
}
