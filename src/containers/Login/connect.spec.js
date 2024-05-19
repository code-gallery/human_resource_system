import {
  setToken, fetchOrganisations,
  loginSuccess, loginFailed
} from 'store/auth'
import { fetchReference } from 'store/reference'
import { mapState, mapDispatch } from './connect'

describe('containers/Login/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        auth: 'authObject',
        workPassInviteDetails: {
          notFound: false,
          requestInfo: null,
          inviteAccepted: false
        }
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        auth: 'authObject',
        inviteNotFound: false,
        inviteEmail: null,
        inviteAccepted: false
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetchOrganisations: expect.any(Function),
        fetchReference: expect.any(Function),
        loginSuccess: expect.any(Function),
        loginFailed: expect.any(Function),
        setToken: expect.any(Function)
      }))
    })

    it('calls "fetchOrganisations" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchOrganisations()
      expect(spy).toHaveBeenCalledWith(fetchOrganisations())
    })

    it('calls "fetchReference" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchReference()
      expect(spy).toHaveBeenCalledWith(fetchReference())
    })

    it('calls "loginSuccess" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.loginSuccess()
      expect(spy).toHaveBeenCalledWith(loginSuccess())
    })

    it('calls "loginFailed" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.loginFailed()
      expect(spy).toHaveBeenCalledWith(loginFailed())
    })

    it('calls "setToken" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setToken('newToken')
      expect(spy).toHaveBeenCalledWith(setToken('newToken'))
    })
  })
})
