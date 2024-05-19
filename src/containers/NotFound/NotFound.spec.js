import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import NotFound from './NotFound'

describe('containers/NotFound', () => {

  const props = {
    history: {
      push: jest.fn()
    },
    fetchOtherUserProfile: jest.fn()
  }

  describe('rendering', () => {
    it('renders', () => {
      const { store } = config

      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <NotFound {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
