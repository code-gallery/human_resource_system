import moment from 'moment'
import freeze from 'deep-freeze'
import isObject from 'lodash/isObject'
import reducer, {
  initialState,
  ACTIONS,
  requestCandidate,
  saveCandidate,
  candidateRequestError,
  getRequest,
  getRequestSuccess
} from './reducer'

describe('Action Creators', () => {
  describe('requestCandidate', () => {
    const orgId = 1
    const candidateId = 10
    const action = requestCandidate(orgId, candidateId)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_CANDIDATE
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    describe('Payload', () => {
      it('has organisation ID', () => {
        const expected = orgId
        const actual = action.payload.orgId

        expect(actual).toEqual(expected)
      })

      it('has candidate ID', () => {
        const expected = candidateId
        const actual = action.payload.candidateId

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('saveCandidate', () => {
    const mockCandidate = {
      id: 1,
      email: 'hello@example.com',
      createdAt: moment('2018-03-20T12:00:07.770Z'),
      requests: []
    }

    const action = saveCandidate(mockCandidate)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_CANDIDATE_SUCCESS
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    describe('Payload', () => {
      it('has candidate', () => {
        const expected = mockCandidate
        const actual = action.payload.candidate

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('candidateRequestError', () => {
    const action = candidateRequestError()

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_CANDIDATE_ERROR
      const actual = action.type

      expect(actual).toEqual(expected)
    })
  })

  describe('getRequest', () => {
    const requestId = 1
    const action = getRequest(requestId)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.GET_REQUEST
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { requestId }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('getRequestSuccess', () => {
    const requestId = 1
    const request = {
      state: 'submitted',
      checks: [
        {
          id: 1,
          type: 'right_to_work',
          side: 'candidate',
          price: 0
        }
      ]
    }

    const action = getRequestSuccess(requestId, request)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.GET_REQUEST_SUCCESS
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = {
        requestId,
        request,
        checks: request.checks
      }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })
})

describe('Candidate Reducer', () => {
  describe('Action: unkown', () => {
    const state = freeze({ ...initialState })
    const action = { type: 'Foo' }

    it('returns given state', () => {
      const expected = state
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('No state passed through', () => {
    it('sets & return an initial state', () => {
      const expected = initialState
      const actual = reducer(void 0, {})

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_CANDIDATE', () => {
    const state = freeze({ ...initialState })
    const action = requestCandidate(10, 5)

    it('returns the correct new state', () => {
      const expected = {
        ...initialState,
        isFetching: true,
        error: null,
        entity: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_CANDIDATE_SUCCESS', () => {
    const state = freeze({
      ...initialState,
      isFetching: true
    })

    const mockCandidate = {}
    const action = saveCandidate(mockCandidate)

    it('returns the correct new state', () => {
      const expected = {
        ...initialState,
        isFetching: false,
        entity: mockCandidate
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_CANDIDATE_ERROR', () => {
    const state = freeze({
      ...initialState,
      isFetching: true
    })

    const action = candidateRequestError()

    it('returns the correct new state', () => {
      const expected = {
        ...initialState,
        isFetching: false,
        error: true
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: GET_REQUEST', () => {
    const state = freeze({ ...initialState })
    const requestId = 1
    const action = getRequest(requestId)

    it('returns the correct new state', () => {
      const expected = {
        ...initialState,
        getRequest: {
          [requestId]: 'fetching'
        }
      }
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: GET_REQUEST_SUCCESS', () => {
    const state = freeze({ ...initialState })
    const requestId = 1
    const checks = []
    const action = getRequestSuccess(requestId, checks)

    it('returns the correct new state', () => {
      const expected = {
        ...initialState,
        getRequest: {
          [requestId]: checks
        }
      }
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })
})
