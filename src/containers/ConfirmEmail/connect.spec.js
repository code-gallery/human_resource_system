import { setUser, setToken } from 'store/auth'
import { mapDispatch } from './connect'

describe('containers/ConfirmEmail/connect', () => {

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        setUser: expect.any(Function),
        setToken: expect.any(Function)
      }))
    })

    it('calls "setUser" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setUser('newUser')
      expect(spy).toHaveBeenCalledWith(setUser('newUser'))
    })

    it('calls "setToken" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setToken('newToken')
      expect(spy).toHaveBeenCalledWith(setToken('newToken'))
    })
  })
})
