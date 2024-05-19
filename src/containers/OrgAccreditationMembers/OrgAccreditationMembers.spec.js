import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import OrgAccreditationMembers from './OrgAccreditationMembers'

describe('containers/OrgAccreditationMembers', () => {
  const { store } = config
  describe('when props.pending is "fetching"', () => {
    it('renders correctly', () => {
      const props = {
        match: {
          params: {
            orgId: 12,
            id: 123
          }
        },
        orgAccreditation: {
          pending: 'fetching'
        },
        fetch: jest.fn()
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationMembers {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are no users', () => {
    it('renders correctly', () => {
      const props = {
        match: {
          params: {
            orgId: 12,
            id: 123
          }
        },
        orgAccreditation: {
          pending: 'fetchSuccess',
          name: 'Blockchain',
          userAwards: []
        },
        fetch: jest.fn()
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationMembers {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are users', () => {
    it('renders correctly', () => {
      const props = {
        match: {
          params: {
            orgId: 12,
            id: 123
          }
        },
        orgAccreditation: {
          pending: 'fetchSuccess',
          name: 'Blockchain',
          userAwards: [
            { created_at: new Date('2016-09-04'), user: { unique_key: 'jane', first_name: 'Jane', last_name: 'Doe' } },
            { created_at: new Date('2016-09-02'), user: { unique_key: 'john', first_name: 'John', last_name: 'Doe' } },
            { created_at: new Date('2016-09-01'), user: { unique_key: 'phillehh', first_name: 'Phil', last_name: 'Doe' } }
          ]
        },
        fetch: jest.fn()
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationMembers {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
