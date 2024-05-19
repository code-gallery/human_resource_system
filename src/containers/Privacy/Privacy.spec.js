import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import Privacy from './index'

describe('containers/Privacy', () => {
  describe('when hasLayout is true', () => {
    it('renders correctly', () => {
      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <Privacy />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when hasLayout is false', () => {
    it('renders correctly', () => {
      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <Privacy hasLayout={false} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
