import reducer, {
  ACTIONS,
  fetchUserSettings,
  saveUserSettings,
  deleteUserAccount,
  changePassword
} from './index.js'

describe('reducer: containers/SettingsAccount/reducer', () => {
  describe('Action Creators', () => {
    describe('fetchUserSettings', () => {
      it('returns the correct action', () => {
        const action = fetchUserSettings()
        expect(action).toEqual({
          type: ACTIONS.FETCH
        })
      })
    })

    describe('saveUserSettings', () => {
      it('returns the correct action', () => {
        const action = saveUserSettings('payload')
        expect(action).toEqual({
          type: ACTIONS.SAVE_USER_SETTINGS,
          payload: 'payload'
        })
      })
    })

    describe('deleteUserAccount', () => {
      it('returns the correct action', () => {
        const action = deleteUserAccount('payload')
        expect(action).toEqual({
          type: ACTIONS.DELETE_USER_ACCOUNT,
          payload: 'payload'
        })
      })
    })

    describe('changePassword', () => {
      it('returns the correct action', () => {
        const action = changePassword('payload')
        expect(action).toEqual({
          type: ACTIONS.CHANGE_PASSWORD,
          payload: 'payload'
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        settings: {},
        settingsConfig: {},
        successMsg: null,
        errorMsg: null,
        pending: false
      })
    })

    describe('FETCH', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH
        })

        expect(newState.pending).toEqual(true)
      })
    })

    describe('FETCH_SUCCESS', () => {
      it('when state is undefined', () => {
        const payload = {
          settings: 'settings',
          settingsConfig: 'settingsConfig'
        }
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_SUCCESS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            ...payload,
            pending: false
          })
        )
      })
    })

    describe('FETCH_ERROR', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_ERROR
        })

        expect(newState).toEqual(
          expect.objectContaining({
            errorMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('CHANGE_PASSWORD', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.CHANGE_PASSWORD
        })

        expect(newState).toEqual(
          expect.objectContaining({
            successMsg: null,
            errorMsg: null,
            pending: true
          })
        )
      })
    })

    describe('CHANGE_PASSWORD_SUCCESS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.CHANGE_PASSWORD_SUCCESS
        })

        expect(newState).toEqual(
          expect.objectContaining({
            successMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('CHANGE_PASSWORD_ERROR', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.CHANGE_PASSWORD_ERROR,
          payload: 'message'
        })

        expect(newState).toEqual(
          expect.objectContaining({
            errorMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('SAVE_USER_SETTINGS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE_USER_SETTINGS
        })

        expect(newState).toEqual(
          expect.objectContaining({
            successMsg: null,
            errorMsg: null,
            pending: true
          })
        )
      })
    })

    describe('SAVE_USER_SETTINGS_SUCCESS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE_USER_SETTINGS_SUCCESS
        })

        expect(newState).toEqual(
          expect.objectContaining({
            successMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('SAVE_USER_SETTINGS_ERROR', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE_USER_SETTINGS_ERROR
        })

        expect(newState).toEqual(
          expect.objectContaining({
            errorMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('DELETE_USER_ACCOUNT', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.DELETE_USER_ACCOUNT
        })

        expect(newState).toEqual(
          expect.objectContaining({
            successMsg: null,
            errorMsg: null,
            pending: true
          })
        )
      })
    })

    describe('DELETE_USER_ACCOUNT_SUCCESS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.DELETE_USER_ACCOUNT_SUCCESS,
          payload: 'message'
        })

        expect(newState).toEqual(
          expect.objectContaining({
            successMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('DELETE_USER_ACCOUNT_ERROR', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.DELETE_USER_ACCOUNT_ERROR,
          payload: 'message'
        })

        expect(newState).toEqual(
          expect.objectContaining({
            errorMsg: expect.any(String),
            pending: false
          })
        )
      })
    })

    describe('@@router/LOCATION_CHANGE', () => {
      it('when state is undefined', () => {
        const state = {
          hello: 'world',
          successMsg: 'hello',
          errorMsg: null,
          pending: false
        }
        const newState = reducer(state, {
          type: '@@router/LOCATION_CHANGE'
        })

        expect(newState).toEqual(
          expect.objectContaining({
            hello: 'world',
            errorMsg: null,
            successMsg: null,
            pending: false
          })
        )
      })
    })
  })
})
