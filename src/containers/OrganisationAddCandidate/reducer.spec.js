import freeze from 'deep-freeze'
import isObject from 'lodash/isObject'
import reducer, {
  ACTIONS,
  searchCandidate,
  searchCandidateError,
  searchCandidateSuccess,
  addCandidate,
  addCandidateSuccess,
  addCandidateError,
  resetAddCandidate,
  initialState
} from './reducer'

describe('Action Creators', () => {
  describe('searchCandidate', () => {
    const orgId = 1
    const query = 'Bob'
    const action = searchCandidate(orgId, query)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct Action type', () => {
      const expected = ACTIONS.CANDIDATES_SEARCH
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = {
        orgId,
        query
      }

      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('searchCandidateSuccess', () => {
    const users = []
    const action = searchCandidateSuccess(users)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct type', () => {
      const expected = ACTIONS.CANDIDATES_SEARCH_SUCCESS
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { users }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('searchCandidateError', () => {
    const action = searchCandidateError()

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct type', () => {
      const expected = action.type
      const actual = action.type

      expect(actual).toEqual(expected)
    })
  })

  describe('addCandidate', () => {
    const orgId = 1
    const candidateInfo = {}
    const action = addCandidate(orgId, candidateInfo)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct type', () => {
      const expected = ACTIONS.ADD_CANDIDATE
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { orgId, candidateInfo }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('addCandidateSuccess', () => {
    const candidateInfo = {}
    const action = addCandidateSuccess(candidateInfo)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct type', () => {
      const expected = ACTIONS.ADD_CANDIDATE_SUCCESS
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { candidateInfo }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('resetAddCandidate', () => {
    const action = resetAddCandidate()

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct type', () => {
      const expected = ACTIONS.RESET
      const actual = action.type

      expect(actual).toEqual(expected)
    })
  })
})

describe('Reducer', () => {
  describe('Action: Unknown', () => {
    const state = freeze({})
    const action = { type: 'FOO' }

    it('returns given state', () => {
      const expected = state
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('when state = undefined', () => {
    const state = void 0
    const action = { type: 'ANY' }

    it('returns the initial state', () => {
      const expected = initialState
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: CANDIDATES_SEARCH', () => {
    const state = freeze(initialState)
    const orgId = 1
    const query = 'Bob'
    const action = searchCandidate(orgId, query)

    it('returns the correct new state', () => {
      const expected = {
        loading: true,
        error: null,
        users: null,
        unknownUser: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: CANDIDATES_SEARCH_SUCCESS', () => {
    const state = freeze({
      loading: true,
      error: null,
      users: null,
      unknownUser: null
    })

    const users = []
    const action = searchCandidateSuccess(users)

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: null,
        users,
        unknownUser: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: CANDIDATES_SEARCH_ERROR', () => {
    const state = freeze({
      loading: true,
      error: null,
      users: null,
      unknownUser: null
    })

    const action = searchCandidateError()

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: true,
        users: null,
        unknownUser: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: ADD_CANDIDATE', () => {
    const state = freeze({
      loading: false,
      error: null,
      users: [],
      unknownUser: null
    })

    const orgId = 1
    const candidateInfo = {
      email: 'foo@example.com'
    }
    const action = addCandidate(orgId, candidateInfo)

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: null,
        users: [],
        unknownUser: 'loading'
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: ADD_CANDIDATE_SUCCESS', () => {
    const state = freeze({
      loading: false,
      error: null,
      users: [],
      unknownUser: 'loading'
    })

    const candidateInfo = {
      id: 1,
      email: 'james@example.com'
    }
    const action = addCandidateSuccess(candidateInfo)

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: null,
        users: [],
        unknownUser: {
          id: 1,
          email: 'james@example.com'
        }
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: ADD_CANDIDATE_ERROR', () => {
    const state = freeze({
      ...initialState,
      users: [],
      unknownUser: 'loading'
    })
    const action = addCandidateError()

    it('returns the correct new state', () => {
      const expected = {
        ...initialState,
        users: [],
        unknownUser: null
      }
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: RESET', () => {
    const state = freeze(initialState)
    const action = resetAddCandidate()

    it('returns the correct new state', () => {
      const expected = { ...initialState }
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })
})
