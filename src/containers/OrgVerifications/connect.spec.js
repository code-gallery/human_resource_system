import { fetch, acceptVerification, declineVerification } from './reducer'
import { mapState, mapDispatch } from './connect'

describe('containers/OrgVerifications/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        orgVerifications: 'orgVerifications',
        auth: { organisations: 'authOrgan', pending: true }
      }
    })
    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        orgVerifications: 'orgVerifications',
        organisations: state.auth.organisations,
        pending: state.auth.pending
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetch: expect.any(Function),
        acceptVerification: expect.any(Function),
        declineVerification: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetch('data')
      expect(spy).toHaveBeenCalledWith(fetch('data'))
    })

    it('calls "acceptVerification" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.acceptVerification('orgId')
      expect(spy).toHaveBeenCalledWith(acceptVerification('orgId'))
    })

    it('calls "declineVerification" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      const data = {
        orgId: 'orgId',
        adminId: 'adminId',
        userId: 'userId'
      }
      dispatcher.declineVerification(data)
      expect(spy).toHaveBeenCalledWith(declineVerification(data))
    })
  })
})
