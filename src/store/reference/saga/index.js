import { takeEvery, put, all } from 'redux-saga/effects'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { parseResponse, parseArrayToOptions } from 'utils/parse'
import { ACTIONS } from '../index'

export function* fetchReference() {
  const url = getApiUrl('reference')
  const { industries,gapsReasons, degrees, awards, organisationSize, highSchoolDegrees } = yield all({
    industries: yield httpFetch(`${url}industries`, { method: 'GET' }),
    gapsReasons: yield httpFetch(`${url}employment-gap-reason`, { method: 'GET' }),
    degrees: yield httpFetch(`${url}qualification-type&value3=higher`, { method: 'GET' }),
    highSchoolDegrees: yield httpFetch(`${url}qualification-type&value1=Secondary`, { method: 'GET' }),
    awards: yield httpFetch(`${url}qualification-award`, { method: 'GET' }),
    organisationSize: yield httpFetch(`${url}organisation-size`, { method: 'GET' })
  })

  yield put({
    type: ACTIONS.SET_REFERENCE,
    payload: {
      industries: parseArrayToOptions(industries.data, true),
      gapsReasons:parseResponse(gapsReasons.data, 'value1'),
      degrees: degrees.data,
      highSchoolDegrees: highSchoolDegrees.data,
      awards: awards.data,
      organisationSize: parseResponse(organisationSize.data, 'value1')
    }
  })
}

export function* watchFetchReference() {
  yield takeEvery(ACTIONS.FETCH_REFERENCE, fetchReference)
}

export default function* rootSaga() {
  yield all([
    watchFetchReference()
  ])
}
