import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import WorkPassInviteAccept from './WorkPassInviteAccept'
import config from 'store'

describe('<WorkPassInviteAccept />', () => {
  const props = {
    location: {
      search: ''
    },
    inviteAccepted: false,
    acceptInvite: jest.fn(),
    loading: true,
    requestInfo: jest.fn(),
    user: {},
    info: {}
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <WorkPassInviteAccept {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
