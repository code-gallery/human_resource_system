import reducer, {
  ACTIONS,
  setEditMode
} from './index.js'

describe('reducer: store/layout', () => {
  describe('Action Creators', () => {
    describe('setEditMode', () => {
      it('returns the correct action', () => {
        const payload = true
        const action = setEditMode(payload)
        expect(action).toEqual({
          type: ACTIONS.SET_EDIT_MODE,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        editMode: false,
        hasNotification: false
      })
    })

    describe('SET_EDIT_MODE', () => {
      it('when state is undefined', () => {
        const payload = true
        const newState = reducer(void 0, {
          type: ACTIONS.SET_EDIT_MODE,
          payload
        })
        expect(newState.editMode).toEqual(payload)
      })
    })

    describe('@@router/LOCATION_CHANGE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: '@@router/LOCATION_CHANGE'
        })
        expect(newState.editMode).toEqual(false)
      })

      it('when state exits', () => {
        const state = {
          editMode: true
        }
        const newState = reducer(state, {
          type: '@@router/LOCATION_CHANGE'
        })
        expect(newState.editMode).toEqual(false)
      })
    })
  })
})
