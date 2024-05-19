import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Navigation'

describe('components/Header/Navigation', () => {
  it('renders correctly', () => {
    const props = {
      intelligentLink: 'http://google.co.uk',
      toggleMenu: jest.fn()
    }
    const tree = renderer.create(
      <Router>
        <Navigation {...props} />
      </Router>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
