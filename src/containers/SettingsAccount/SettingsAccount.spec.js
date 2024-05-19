import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import SettingsAccount from './SettingsAccount'

describe('<SettingsAccount />', () => {
  const props = {
    fetchUserSettings: jest.fn(),
    deleteUserAccount: jest.fn(),
    changePassword: jest.fn(),
    saveUserSettings: jest.fn(),
    updateUserProfile: jest.fn(),
    userSettings: {
      pending: false,
      successMsg: 'Well Done',
      errorMsg: '',
      settings: {},
      settingsConfig: {}
    },
    saveErrorMsg: '',
    pending: false
  }

  describe('when props.userSettings.settings = {}', () => {
    it('renders no data', () => {
      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <SettingsAccount {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
