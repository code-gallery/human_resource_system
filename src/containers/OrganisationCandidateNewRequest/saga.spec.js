import { takeLatest, call, put } from 'redux-saga/effects'
import { ACTIONS, requestOrganisationConfig, saveOrganisationConfig } from './reducer'
import { getOrganisationConfig } from './api'
import {
  watchOrgConfigRequest,
  fetchOrgConfig,
  watchPostNewRequest,
  postNewRequest
} from './saga'

/**
 Watcher Saga's
 */
describe('watchOrgConfigRequest Saga', () => {
  const gen = watchOrgConfigRequest()

  it('takes latest REQUEST_ORGANISATION_CONFIG action and runs the correct Saga', () => {
    const expected = takeLatest(ACTIONS.REQUEST_ORGANISATION_CONFIG, fetchOrgConfig)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchPostNewRequest Saga', () => {
  const gen = watchPostNewRequest()

  it('takes latest POST_NEW_REQUEST action and runs the correct Saga', () => {
    const expected = takeLatest(ACTIONS.POST_NEW_REQUEST, postNewRequest)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

/**
 Worker Saga's
 */
describe('fetchOrgConfig Saga', () => {
  const orgId = 10
  const action = requestOrganisationConfig(orgId)
  const gen = fetchOrgConfig(action)

  it('calls getOrganisationConfig api service with the Organisation ID', () => {
    const expected = call(getOrganisationConfig, orgId)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })

  describe('Organisation Config Success', () => {
    it('dispatches action to save config to store', () => {
      const mockConfig = {}
      const action = saveOrganisationConfig(mockConfig)
      const expected = put(action)
      const actual = gen.next(mockConfig).value

      expect(actual).toEqual(expected)
    })
  })
})
