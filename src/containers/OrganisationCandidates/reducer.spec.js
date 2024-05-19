import freeze from 'deep-freeze'
import isObject from 'lodash/isObject'
import reducer, {
  requestCandidates,
  ACTIONS,
  saveCandidates,
  resetCandidates,
  candidatesRequestError,
  initialState
} from './reducer'

describe('Action Creators', () => {
  describe('requestCandidates', () => {
    it('returns a object', () => {
      const result = requestCandidates(10)
      const expected = true
      const actual = isObject(result)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const { type } = requestCandidates(10)
      const expected = ACTIONS.REQUEST_CANDIDATES
      const actual = type

      expect(actual).toEqual(expected)
    })

    describe('Payload', () => {
      const organisationId = 10
      const search = 'Andy'
      const { payload } = requestCandidates(organisationId, search)

      it('has the correct orgId', () => {
        const expected = organisationId
        const actual = payload.orgId

        expect(actual).toEqual(expected)
      })

      it('has the correct search', () => {
        const expected = search
        const actual = payload.search

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('saveCandidates', () => {
    const candidates = []
    const result = saveCandidates(candidates)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(result)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_CANDIDATES_SUCCESS
      const actual = result.type

      expect(actual).toEqual(expected)
    })

    describe('Payload', () => {
      const { payload } = result

      it('has the correct candidates', () => {
        const expected = candidates
        const actual = payload.candidates

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('resetCandidates', () => {
    const result = resetCandidates()

    it('returns a object', () => {
      const expected = true
      const actual = isObject(result)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.RESET
      const actual = result.type

      expect(actual).toEqual(expected)
    })
  })

  describe('candidatesRequestError', () => {
    const result = candidatesRequestError()

    it('retuns a object', () => {
      const expected = true
      const actual = isObject(result)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_CANDIDATES_ERROR
      const actual = result.type

      expect(actual).toEqual(expected)
    })
  })
})

describe('Reducer', () => {
  it('returns given state when action type is unkown', () => {
    const state = {}
    const action = { type: 'FOO' }
    const newState = reducer(state, action)

    const expected = state
    const actual = newState

    expect(actual).toEqual(expected)
  })

  it('sets initial state', () => {
    const state = {}
    const newState = reducer(void state, {})

    const expected = initialState
    const actual = newState

    expect(actual).toEqual(expected)
  })

  describe('Action: REQUEST_CANDIDATES', () => {
    const state = freeze(initialState)
    const action = {
      type: ACTIONS.REQUEST_CANDIDATES,
      payload: {
        orgId: 10,
        search: 'Tom'
      }
    }

    it('returns the correct new State', () => {
      const expected = {
        isFetching: true,
        orgId: 10,
        error: null,
        candidates: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_CANDIDATES_SUCCESS', () => {
    const state = freeze({
      isFetching: true,
      orgId: 10,
      error: null,
      candidates: null
    })

    const action = {
      type: ACTIONS.REQUEST_CANDIDATES_SUCCESS,
      payload: {
        candidates: []
      }
    }

    it('returns the correct new state', () => {
      const expected = {
        isFetching: false,
        orgId: 10,
        error: null,
        candidates: action.payload.candidates
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_CANDIDATES_ERROR', () => {
    const state = freeze({
      isFetching: true,
      orgId: 10,
      error: null,
      candidates: null
    })

    const action = {
      type: ACTIONS.REQUEST_CANDIDATES_ERROR
    }

    it('returns the correct new state', () => {
      const expected = {
        isFetching: false,
        orgId: 10,
        error: true,
        candidates: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: RESET', () => {
    const state = {
      isFetching: false,
      orgId: 10,
      error: null,
      candidates: []
    }

    const action = {
      type: ACTIONS.RESET
    }

    it('returns the correct new state', () => {
      const expected = initialState
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })
})
