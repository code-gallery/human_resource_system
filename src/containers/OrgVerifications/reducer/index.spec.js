import { ACTIONS as authActions } from 'store/auth'
import reducer, {
  ACTIONS,
  fetch,
  acceptVerification,
  declineVerification
} from './index.js'

describe('reducer: containers/OrgVerifications/reducer', () => {
  describe('Action Creators', () => {
    describe('fetch', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12 }
        const action = fetch(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH,
          payload
        })
      })
    })

    describe('acceptVerification', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12, id: 126 }
        const action = acceptVerification(payload)
        expect(action).toEqual({
          type: ACTIONS.ACCEPT_VERIFICATION,
          payload
        })
      })
    })

    describe('declineVerification', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12, id: 126 }
        const action = declineVerification(payload)
        expect(action).toEqual({
          type: ACTIONS.DECLINE_VERIFICATION,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        processed: [],
        requests: [],
        organisation: {},
        pending: false
      })
    })

    describe('authActions.RESET_TOKEN', () => {
      it('when state exists', () => {
        const state = {
          processed: [ 'processed' ],
          requests: [ 'requests' ],
          organisation: { name: 'Applied' }
        }
        const newState = reducer(state, {
          type: authActions.RESET_TOKEN
        })

        expect(newState).toEqual({
          processed: [],
          requests: [],
          organisation: {},
          pending: false
        })
      })
    })

    describe('@@router/LOCATION_CHANGE', () => {
      it('when state exists', () => {
        const state = {
          processed: [ 'processed' ],
          requests: [ 'requests' ],
          organisation: { name: 'Applied' }
        }
        const newState = reducer(state, {
          type: '@@router/LOCATION_CHANGE'
        })

        expect(newState).toEqual({
          processed: [],
          requests: [],
          organisation: {},
          pending: false
        })
      })
    })

    describe('FETCH', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH
        })

        expect(newState.pending).toEqual(true)
      })
    })

    describe('FETCH_SUCCESS', () => {
      it('when state is undefined', () => {
        const payload = {
          requests: [ 'requests' ],
          processed: [ 'processed' ],
          organisation: {
            id: 12,
            name: 'hello'
          }
        }
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...payload,
          pending: false
        })
      })
    })

    describe('ACCEPT_VERIFICATION_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          requests: [ { id: 125 }, { id: 126 }, { id: 128 } ],
          processed: [ 'processed' ],
          organisation: {
            id: 12,
            name: 'hello'
          }
        }
        const newState = reducer(state, {
          type: ACTIONS.ACCEPT_VERIFICATION_SUCCESS,
          payload: {
            id: 126
          }
        })

        expect(newState.processed).toEqual(state.processed)
        expect(newState.requests.length).toEqual(2)
        expect(newState.requests[0]).toEqual({ id: 125 })
        expect(newState.requests[1]).toEqual({ id: 128 })
      })
    })

    describe('DECLINE_VERIFICATION_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          requests: [ { id: 125 }, { id: 126 }, { id: 128 } ],
          processed: [ 'processed' ],
          organisation: {
            id: 12,
            name: 'hello'
          }
        }
        const newState = reducer(state, {
          type: ACTIONS.DECLINE_VERIFICATION_SUCCESS,
          payload: {
            id: 126
          }
        })

        expect(newState.processed).toEqual(state.processed)
        expect(newState.requests.length).toEqual(2)
        expect(newState.requests[0]).toEqual({ id: 125 })
        expect(newState.requests[1]).toEqual({ id: 128 })
      })
    })
  })
})
