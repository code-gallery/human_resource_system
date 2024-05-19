import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkPassInviteDetails from './WorkPassInviteDetails'

describe('<WorkPassInviteDetails />', () => {
  const props = {
    token: 'x',
    loading: true,
    requestInfo: jest.fn(),
    user: {},
    info: {}
  }

  describe('when loading=true', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Router>
          <WorkPassInviteDetails {...props} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when loading=false', () => {
    it('renders correctly', () => {
      const loadedProps = {
        ...props,
        loading: false,
        info: {
          instance: {
            id: 1,
            role: 'Test',
            candidate: {
              organisation: {
                name: 'Test Org',
                logo_image: 'logo.png'
              }
            },
            created_at: '2018-07-04 15:15:15',
            country: 'GB',
            region: 'England'
          }
        }
      }
      const tree = renderer.create(
        <Router>
          <WorkPassInviteDetails {...loadedProps} />
        </Router>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
