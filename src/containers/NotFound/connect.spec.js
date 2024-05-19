import { fetchOtherUserProfile } from 'store/userProfile'
import { mapState, mapDispatch } from './connect'

describe('containers/NotFound/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        userProfile: {
          user: {
            first_name: 'Jane'
          },
          pending: false
        }
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        userProfile: state.userProfile
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetchOtherUserProfile: expect.any(Function)
      }))
    })

    it('calls "fetchOtherUserProfile" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchOtherUserProfile('hello', 'world')
      expect(spy).toHaveBeenCalledWith(fetchOtherUserProfile('hello', 'world'))
    })
  })
})
