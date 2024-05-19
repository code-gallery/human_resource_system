import { ACTIONS as authActions } from 'store/auth'
import { ACTIONS as accreditationActions } from 'containers/OrgAccreditations/reducer'
import reducer, {
  ACTIONS,
  fetch
} from './index.js'

describe('reducer: containers/OrgAccreditationQRCode/reducer', () => {
  describe('Action Creators', () => {
    describe('fetch', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12, id: 80 }
        const action = fetch(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        qrCode: null,
        pending: '',
        errorMsg: null,
        successMsg: null
      })
    })

    describe('authActions.RESET_TOKEN', () => {
      it('when state exists', () => {
        const state = {
          qrCode: 'ewrwerwr',
          pending: 'fetchSuccess'
        }
        const newState = reducer(state, {
          type: authActions.RESET_TOKEN
        })

        expect(newState).toEqual({
          qrCode: null,
          pending: '',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('FETCH', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH
        })

        expect(newState).toEqual({
          qrCode: null,
          pending: 'fetching',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('FETCH_SUCCESS', () => {
      it('when state is undefined', () => {
        const payload = {
          qrCode: 'qrCode',
          name: 'Applied'
        }
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...payload,
          pending: 'fetchSuccess',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('FETCH_ERROR', () => {
      it('when state is undefined', () => {
        const payload = 'error message'
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_ERROR,
          payload
        })

        expect(newState).toEqual(expect.objectContaining({
          pending: 'fetchError',
          errorMsg: 'error message',
          successMsg: null
        }))
      })
    })

    describe('accreditationActions.SAVE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: accreditationActions.SAVE
        })

        expect(newState).toEqual({
          qrCode: null,
          pending: 'saving',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('accreditationActions.SAVE_SUCCESS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: accreditationActions.SAVE_SUCCESS,
          payload: {
            award: {
              name: 'new award',
              id: 16,
              qrCode: 'qrCode'
            }
          }
        })

        expect(newState).toEqual({
          name: 'new award',
          id: 16,
          qrCode: 'qrCode',
          pending: 'saveSuccess',
          errorMsg: null,
          successMsg: 'Accreditation saved successfully'
        })
      })
    })

    describe('accreditationActions.SAVE_ERROR', () => {
      it('when state is undefined', () => {
        const payload = 'error message'
        const newState = reducer(void 0, {
          type: accreditationActions.SAVE_ERROR,
          payload
        })

        expect(newState).toEqual(expect.objectContaining({
          pending: 'savingError',
          errorMsg: 'error message',
          successMsg: null
        }))
      })
    })
  })
})
