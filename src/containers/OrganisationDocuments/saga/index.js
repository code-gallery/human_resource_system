import { all, call, put, takeLatest,takeEvery } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { getApiUrl } from 'containers/constants'
import { ACTIONS } from '../reducer'

export function* addNewDocument({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('addNewDocument')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload.data)
  })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.POST_DOCUMENT_SUCCESS, payload: json.data })
    yield call(onSuccess, json.data)
  } else {
    yield call(onError)
  }
}

export function* watchPostDocument() {
  yield takeLatest(ACTIONS.POST_DOCUMENT, addNewDocument)
}

export function* fetchDocumentTable(action) {

  const orgId = action.payload.orgId
  // let url = `${getApiUrl('fetchOrgDocument').replace(':org_id',orgId)}?perPage=${perPage}&page=${currentPage}`
  const url = getApiUrl('fetchOrgDocument').replace(':org_id', orgId)
  const json = yield httpFetch(url, { method: 'GET' })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.FETCH_DOCUMENT_TABLE_DATA_SUCCESS, payload: json.data.check_data})
  }
}

export function* watchFetchDocumentTable() {
  yield takeEvery(ACTIONS.FETCH_DOCUMENT_TABLE_DATA, fetchDocumentTable)
}

export function* editDocumentTable(action) {
  const { id, updatedStatus } = action.payload
  let url = getApiUrl('editOrgDocument').replace(':id', id)
  const json = yield httpFetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      status: updatedStatus
    })
  })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.EDIT_DOCUMENT_SUCCESS, payload: { id } })
  }
}

export function* watchEditDocumentTable() {
  yield takeLatest(ACTIONS.EDIT_DOCUMENT, editDocumentTable)
}

export function* getDocPersona(action) {
  const { id, orgId } = action.payload
  const url = getApiUrl('getDocPersona').replace(':docId', id)
  const json = yield httpFetch(url, { method: 'GET' })
  let persona = []
  if (orgId) {
    persona.push(
      {
        key: orgId,
        value: json.data.data
      }
    )
  } else {
    persona = json.data.data
  }
  if (json.status === 'success') {
    yield put({ type: ACTIONS.GET_DOC_PERSONA_SUCCESS, payload: persona })
  }
}

export function* watchgetDocPersona() {
  yield takeLatest(ACTIONS.GET_DOC_PERSONA, getDocPersona)
}

export function* updateDocument({ payload, onSuccess, onError }) {
  const url = `${getApiUrl('updateDocument')}`
  const json = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  if (json.status === 'success') {
    yield put({ type: ACTIONS.UPDATE_DOCUMENT_SUCCESS, payload: { document_id: payload.documentID } })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchUpdateDocument() {
  yield takeLatest(ACTIONS.UPDATE_DOCUMENT, updateDocument)
}

export default function* rootSaga() {
  yield all([
    watchPostDocument(),
    watchFetchDocumentTable(),
    watchEditDocumentTable(),
    watchgetDocPersona(),
    watchUpdateDocument()
  ])
}
