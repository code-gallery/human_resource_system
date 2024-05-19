import { setToken, fetchUser, fetchOrganisations } from 'store/auth'
import { fetchReference } from 'store/reference'
import { mapState, mapDispatch } from './connect'

describe('containers/App/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        auth: {
          token: 'token'
        }
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        token: 'token'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetchUser: expect.any(Function),
        fetchOrganisations: expect.any(Function),
        setToken: expect.any(Function),
        fetchReference: expect.any(Function)
      }))
    })

    it('calls "fetchUser" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchUser()
      expect(spy).toHaveBeenCalledWith(fetchUser())
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

    it('calls "setToken" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setToken('newToken')
      expect(spy).toHaveBeenCalledWith(setToken('newToken'))
    })
  })
})
