import { ACTIONS as authActions } from 'store/auth'
import reducer, {ACTIONS, fetchChecksDetails, resetCheckDetails} from './reducer.js'

describe('reducer: containers/UserVerifications/reducer', () => {
    describe('Action Creators', () => {
      describe('fetchChecksDetails', () => {
        it('returns the correct action', () => {
          const action = fetchChecksDetails()
          expect(action).toEqual({
            type: ACTIONS.FETCH_CHECK_DETAILS
          })
        })
      })
      describe('resetCheckDetails', () => {
        it('returns the correct action', () => {
          const action = resetCheckDetails()
          expect(action).toEqual({
            type: ACTIONS.RESET_FETCH_CHECK_DETAILS
          })
        })
      })
    })

    describe('Reducer', () => {
        it('returns the correct initialState', () => {
          const state = reducer(void 0)
          expect(state).toEqual({
            checksDetails: [],
            pendingData: true
          })
        }) 

        describe('FETCH_CHECK_DETAILS action called', () => {
            it('when state exists', () => {
              const state = {
                checksDetails: [],
                pendingData: true
              }
              const newState = reducer(void 0, {
                type: ACTIONS.FETCH_CHECK_DETAILS,
              })
              expect(newState).toEqual({
                checksDetails: [],
                pendingData: true
              })
            })
          })

        describe('FETCH_CHECK_DETAILS action called', () => {
            it('when state exists', () => {
              const payload = {
                checksDetails: ['checkdetails'],
                pendingData: false
              }
              const newState = reducer(void 0, {
                type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
                payload
              })
              expect(newState).toEqual({
                checksDetails: payload,
                pendingData: false
              })
            })
          })

          describe('RESET_FETCH_CHECK_DETAILS action called', () => {
            it('when state does not exists', () => {
              const state = {
                checksDetails: ['checkdetails'],
                pendingData: false
              }
              const newState = reducer(void 0, {
                type: ACTIONS.RESET_FETCH_CHECK_DETAILS,
              })
              expect(newState).toEqual({
                checksDetails: [],
                pendingData: true
              })
            })
          })

    })

    

})