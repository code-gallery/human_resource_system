import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkPassInvite from './WorkPassInvite'

describe('<WorkPassInvite />', () => {
  const props = {
    location: {
      search: '?token=123456'
    }
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Router>
          <WorkPassInvite {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
