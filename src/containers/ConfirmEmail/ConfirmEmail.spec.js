import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import ConfirmEmail from './ConfirmEmail'

describe('<ConfirmEmail />', () => {
  const props = {
    setUser: jest.fn(),
    setToken: jest.fn(),
    match: {
      params: {}
    }
  }

  it('renders correctly', () => {
    const { store } = config
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <ConfirmEmail {...props} />
        </Router>
      </Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
