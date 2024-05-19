import { takeLatest, call, put } from 'redux-saga/effects'
import { getCandidate } from './api'
import httpFetch from 'utils/httpFetch'
import { getApiUrl } from 'containers/constants'
import {
  ACTIONS,
  requestCandidate,
  saveCandidate,
  getRequest,
  getRequestSuccess,
  getRequestError
} from './reducer'
import {
  watchCandidateRequest,
  fetchCandidate,
  watchChecksRequest,
  fetchRequest
} from './saga'

/**
 Watchers
 */
describe('watchCandidateRequest', () => {
  it('runs fetchCandidate Saga for latest REQUEST_CANDIDATE action', () => {
    const gen = watchCandidateRequest()

    const expected = takeLatest(ACTIONS.REQUEST_CANDIDATE, fetchCandidate)
    const actual = gen.next().value

    expect(actual).toEqual(expected)

  })
})

describe('watchChecksRequest', () => {
  const gen = watchChecksRequest()

  it('takes latest GET_REQUEST action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.GET_REQUEST, fetchRequest)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

/**
 Workers
 */
describe('fetchCandidate', () => {
  const organisationId = 1
  const candidateId = 25
  const action = requestCandidate(organisationId, candidateId)

  it('calls getCandidate api service with the organisation ID & candidate ID', () => {
    const gen = fetchCandidate(action)
    const expected = call(getCandidate, organisationId, candidateId)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })

  it('dispatches action to save Candidate to the store', () => {
    const gen = fetchCandidate(action)
    const mockCandidate = []
    gen.next()

    const expected = put(saveCandidate(mockCandidate))
    const actual = gen.next(mockCandidate).value

    expect(actual).toEqual(expected)
  })
})

describe('fetchRequest', () => {
  const requestId = 1
  const action = getRequest(requestId)
  const gen = fetchRequest(action)

  it('calls the correct api endpoint to retrieve data', () => {
    const url = getApiUrl('workPassRequest').replace(':requestId', requestId)
    const expected = call(httpFetch, url)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })

  describe('Successful response', () => {
    const mockResponse = {
      status: 'success',
      data: {
        request: {}
      }
    }
    const gen = fetchRequest(action)
    gen.next()
    const dispatchedAction = gen.next(mockResponse).value

    it('dispatches action to save checks to the store', () => {
      const expected = put(getRequestSuccess(requestId, {}))
      const actual = dispatchedAction

      expect(actual).toEqual(expected)
    })
  })

  describe('Unsuccessful response', () => {
    const mockResponse = {
      status: 'error'
    }
    const gen = fetchRequest(action)
    gen.next()
    const dispatchedAction = gen.next(mockResponse).value

    it('dispatches the correct error action', () => {
      const expected = put(getRequestError())
      const actual = dispatchedAction

      expect(actual).toEqual(expected)
    })
  })
})
