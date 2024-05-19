import { fetchUserSettings, changePassword, saveUserSettings, deleteUserAccount } from './reducer'
import { updateUserProfile } from 'store/auth'
import { mapState, mapDispatch } from './connect'

describe('containers/SettingsAccount/connect', () => {
  describe('mapState', () => {
    const commonState = {
      auth: { user: 'user', saveErrorMsg: null, pending: false },
      userSettings: 'userSettings'
    }

    it('returns a correctly mapped state', () => {
      expect(mapState(commonState)).toEqual({
        user: 'user',
        pending: false,
        saveErrorMsg: null,
        userSettings: 'userSettings'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetchUserSettings: expect.any(Function),
        deleteUserAccount: expect.any(Function),
        changePassword: expect.any(Function),
        saveUserSettings: expect.any(Function),
        updateUserProfile: expect.any(Function)
      }))
    })

    it('calls "fetchUserSettings" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchUserSettings()
      expect(spy).toHaveBeenCalledWith(fetchUserSettings())
    })

    it('calls "deleteUserAccount" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.deleteUserAccount()
      expect(spy).toHaveBeenCalledWith(deleteUserAccount())
    })

    it('calls "changePassword" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.changePassword('data')
      expect(spy).toHaveBeenCalledWith(changePassword('data'))
    })

    it('calls "saveUserSettings" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.saveUserSettings('data')
      expect(spy).toHaveBeenCalledWith(saveUserSettings('data'))
    })

    it('calls "updateUserProfile" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.updateUserProfile('data')
      expect(spy).toHaveBeenCalledWith(updateUserProfile('data'))
    })
  })
})
