import { fetch } from './reducer'
import { mapState, mapDispatch } from './connect'

describe('containers/UserVerifications/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        userVerifications: 'userVerifications'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        userVerifications: state.userVerifications
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetch: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetch()
      expect(spy).toHaveBeenCalledWith(fetch())
    })
  })
})
