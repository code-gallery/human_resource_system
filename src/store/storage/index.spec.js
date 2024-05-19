import reducer, {
  ACTIONS,
  saveStorage
} from './index.js'

describe('reducer: store/storage', () => {
  describe('Action Creators', () => {
    describe('saveStorage', () => {
      it('returns the correct action', () => {
        const action = saveStorage('payload')
        expect(action.type).toEqual(ACTIONS.SAVE)
        expect(action.payload).toEqual('payload')
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        errorMsg: null,
        successMsg: null
      })
    })

    describe('@@router/LOCATION_CHANGE', () => {
      const payload = 'payload'

      it('when state exists', () => {
        const existingState = {
          errorMsg: 'errorMsg'
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE,
          payload
        })

        expect(newState).toEqual({
          successMsg: null,
          errorMsg: null
        })
      })
    })

    describe('SAVE', () => {
      const payload = 'payload'

      it('when state exists', () => {
        const existingState = {
          errorMsg: 'errorMsg'
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE,
          payload
        })

        expect(newState).toEqual({
          successMsg: null,
          errorMsg: null
        })
      })
    })

    describe('SAVE_SUCCESS', () => {
      it('when state is undefined', () => {
        const state = reducer(void 0, {
          type: ACTIONS.SAVE_SUCCESS
        })

        expect(state).toEqual({
          successMsg: 'Data saved successfully',
          errorMsg: null
        })
      })
    })

    describe('SAVE_ERROR', () => {
      it('when state is undefined', () => {
        const state = reducer(void 0, {
          type: ACTIONS.SAVE_ERROR
        })

        expect(state).toEqual({
          successMsg: null,
          errorMsg: 'Sorry an error happened. Please try again'
        })
      })
    })
  })
})
