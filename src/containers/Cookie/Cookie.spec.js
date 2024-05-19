import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import Cookie from './index'

describe('containers/Cookie', () => {
  it('renders correctly', () => {
    const { store } = config
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <Cookie />
        </Router>
      </Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
