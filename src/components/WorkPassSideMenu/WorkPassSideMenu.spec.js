import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import WorkPassSideMenu from './index'

describe('<WorkPassSideMenu />', () => {
  const props = {
    organisationId: 55,
    balance: '£1000'
  }

  it('renders correctly', () => {
    const { store } = config
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <WorkPassSideMenu {...props} />
        </Router>
      </Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
