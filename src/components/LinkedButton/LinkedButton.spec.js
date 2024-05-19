import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import LinkedButton from './index'

describe('<LinkedButton />', () => {
  const props = {
    onClick: jest.fn(),
    to: '/'
  }

  it('renders correctly', () => {
    const { store } = config
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <LinkedButton {...props}>Click Me</LinkedButton>
        </Router>
      </Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
