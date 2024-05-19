import freeze from 'deep-freeze'
import isObject from 'lodash/isObject'
import reducer, {
  ACTIONS,
  fetchBalance,
  setBalance,
  initialState
} from './reducer'

describe('Action Creators', () => {
  describe('fetchBalance', () => {
    const orgId = 1
    const action = fetchBalance(orgId)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.FETCH_BALANCE
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { orgId }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('setBalance', () => {
    const orgId = 1
    const balance = 1000
    const action = setBalance(orgId, balance)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.FETCH_BALANCE_SUCCESS
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { orgId, balance }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })
})

describe('Reducer', () => {
  describe('when action is unknown', () => {
    const state = freeze({})
    const action = { type: 'FOO' }

    it('returns the given state', () => {
      const expected = state
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('when state = undefined', () => {
    const state = void 0
    const action = { type: 'ANY' }

    it('sets the initial state', () => {
      const expected = initialState
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('FETCH_BALANCE', () => {
    const state = freeze({ ...initialState })
    const orgId = 1
    const action = fetchBalance(orgId)

    it('returns the correct new state', () => {
      const expected = {
        orgId,
        loading: true,
        balance: null
      }
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('FETCH_BALANCE_SUCCESS', () => {
    const state = freeze({
      loading: true,
      orgId: 1,
      balance: null
    })

    const orgId = 1
    const balance = 1000
    const action = setBalance(orgId, balance)

    it('returns the correct new balance', () => {
      const expected = {
        loading: false,
        orgId: 1,
        balance: 1000
      }
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })
})
