import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import OrgAccreditationQRCode from './OrgAccreditationQRCode'

describe('containers/OrgAccreditationQRCode', () => {
  const { store } = config
  describe('when request is pending', () => {
    it('renders correctly', () => {
      const props = {
        orgAccreditation: {
          pending: 'fetching'
        },
        match: {
          params: {
            id: 36,
            orgId: 12
          }
        },
        fetch: jest.fn()
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationQRCode {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when data has loaded', () => {
    it('renders correctly', () => {
      const props = {
        orgAccreditation: {
          name: 'Awesome Workshop',
          qrCode: 'base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        },
        match: {
          params: {
            id: 36,
            orgId: 12
          }
        },
        fetch: jest.fn()
      }

      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationQRCode {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
