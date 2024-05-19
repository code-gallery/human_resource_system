import { ACTIONS as authActions } from 'store/auth'
import reducer, {
  ACTIONS,
  fetch
} from './index.js'

describe('reducer: containers/UserVerifications/reducer', () => {
  describe('Action Creators', () => {
    describe('fetch', () => {
      it('returns the correct action', () => {
        const action = fetch()
        expect(action).toEqual({
          type: ACTIONS.FETCH
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        processed: []
      })
    })

    describe('authActions.RESET_TOKEN', () => {
      it('when state exists', () => {
        const state = {
          processed: [ 'verifications list' ]
        }
        const newState = reducer(state, {
          type: authActions.RESET_TOKEN
        })

        expect(newState).toEqual({
          processed: []
        })
      })
    })

    describe('LOAD_SUCCESS', () => {
      it('when state is undefined', () => {
        const payload = {
          processed: [ 'verifications list' ]
        }
        const newState = reducer(void 0, {
          type: ACTIONS.LOAD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          processed: payload.processed,
          loading: false
        })
      })
    })
  })
})
