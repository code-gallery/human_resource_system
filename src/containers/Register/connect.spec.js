import {
  setToken,
  loginSuccess
} from 'store/auth'
import { mapState, mapDispatch } from './connect'

describe('containers/Register/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        workPassInviteDetails: {
          notFound: false,
          requestInfo: null,
          inviteAccepted: false
        }
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        inviteNotFound: false,
        inviteEmail: null,
        inviteAccepted: false
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        loginSuccess: expect.any(Function),
        setToken: expect.any(Function)
      }))
    })

    it('calls "loginSuccess" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.loginSuccess()
      expect(spy).toHaveBeenCalledWith(loginSuccess())
    })

    it('calls "setToken" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setToken('newToken')
      expect(spy).toHaveBeenCalledWith(setToken('newToken'))
    })
  })
})
