import { resetToken } from 'store/auth'
import { mapDispatch } from './connect'

describe('containers/Logout/connect', () => {
  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        resetToken: expect.any(Function)
      }))
    })

    it('calls "resetToken" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.resetToken()
      expect(spy).toHaveBeenCalledWith(resetToken())
    })
  })
})
