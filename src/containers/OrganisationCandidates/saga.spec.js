import { takeLatest, call, put } from 'redux-saga/effects'
import { ACTIONS, requestCandidates } from './reducer'
import { watchCandidatesRequest, fetchCandidates } from './saga'
import { getCandidates } from './service'

describe('watchCandidatesRequest Saga', () => {
  it('runs fetchCandidates worker for latest REQUEST_CANDIDATES action', () => {
    const gen = watchCandidatesRequest()

    const expected = takeLatest(ACTIONS.REQUEST_CANDIDATES, fetchCandidates)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('fetchCandidates Saga', () => {
  it('calls getCandidates service with the correct arguments', () => {
    const action = requestCandidates(1)
    const gen = fetchCandidates(action)

    const expected = call(getCandidates, action.payload.orgId, action.payload.search)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })

  it('dispatches action to save Candidates to the store', () => {
    const action = requestCandidates(1)
    const gen = fetchCandidates(action)
    const mockCandidates = []
    gen.next()

    const expected = put({
      type: ACTIONS.REQUEST_CANDIDATES_SUCCESS,
      payload: {
        candidates: mockCandidates
      }
    })

    const actual = gen.next(mockCandidates).value

    expect(actual).toEqual(expected)
  })
})
