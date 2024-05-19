import reducer, {
  ACTIONS,
  setMobileNavActive
} from './index.js'

describe('reducer: store/navigation', () => {
  describe('Action Creators', () => {
    describe('setMobileNavActive', () => {
      it('returns the correct action', () => {
        const payload = true
        const action = setMobileNavActive(payload)
        expect(action).toEqual({
          type: ACTIONS.SET_MOBILE_NAVIGATION_ACTIVE,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        isMobileNavActive: false
      })
    })

    describe('SET_MOBILE_NAVIGATION_ACTIVE', () => {
      it('when state is undefined', () => {
        const payload = true
        const newState = reducer(void 0, {
          type: ACTIONS.SET_MOBILE_NAVIGATION_ACTIVE,
          payload
        })
        expect(newState.isMobileNavActive).toEqual(payload)
      })
    })
  })
})
