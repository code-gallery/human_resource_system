import { ACTIONS as authActions } from 'store/auth'
import reducer, {
  ACTIONS,
  fetch,
  deleteAccreditation,
  saveAccreditation
} from './index.js'

describe('reducer: containers/OrgAccreditations/reducer', () => {
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

    describe('deleteAccreditation', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12, id: 80 }
        const action = deleteAccreditation(payload)
        expect(action).toEqual({
          type: ACTIONS.DELETE,
          payload
        })
      })
    })

    describe('saveAccreditation', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12 }
        const action = saveAccreditation(payload)
        expect(action).toEqual({
          type: ACTIONS.SAVE,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        awards: [],
        pending: '',
        errorMsg: null,
        successMsg: null
      })
    })

    describe('authActions.RESET_TOKEN', () => {
      it('when state exists', () => {
        const state = {
          awards: [ 'e', 'ed' ],
          awardType: {}
        }
        const newState = reducer(state, {
          type: authActions.RESET_TOKEN
        })

        expect(newState).toEqual({
          awards: [],
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
          awards: [],
          pending: 'fetching',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('FETCH_SUCCESS', () => {
      it('when state is undefined', () => {
        const payload = {
          awards: [ '1', '2' ],
          awardType: { award: {}, cpd: {} }
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

    describe('DELETE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.DELETE
        })

        expect(newState).toEqual({
          awards: [],
          pending: 'deleting',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('DELETE_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          awards: [ { id: 1 }, { id: 80 }, { id: 5 } ],
          awardType: { hello: 'world' },
          pending: 'done'
        }
        const payload = { orgId: 12, id: 80 }

        const newState = reducer(state, {
          type: ACTIONS.DELETE_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          awards: [ { id: 1 }, { id: 5 } ],
          awardType: { hello: 'world' },
          pending: 'deletingSuccess',
          successMsg: 'Accreditation deleted successfully'
        })
      })
    })

    describe('SAVE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE
        })

        expect(newState).toEqual({
          awards: [],
          pending: 'saving',
          errorMsg: null,
          successMsg: null
        })
      })
    })

    describe('SAVE_SUCCESS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE_SUCCESS,
          payload: {
            award: {
              name: 'new award',
              id: 16
            }
          }
        })

        expect(newState).toEqual({
          awards: [ {
            name: 'new award',
            id: 16
          } ],
          pending: 'saveSuccess',
          errorMsg: null,
          successMsg: 'Accreditation saved successfully'
        })
      })
    })
  })
})
