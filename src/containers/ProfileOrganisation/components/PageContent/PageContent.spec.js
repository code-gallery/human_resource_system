import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import PageContent from './index'

describe('containers/ProfileOrganisation/components/PageContent', () => {
  const { store } = config
  const commonProps = {
    organisation: {
      id: 12,
      name: 'Applied Blockchain',
      specialities: 'UX,JS,UI',
      employees: [
        { unique_key: 'jane', profile_image: null, first_name: 'jane', last_name: 'doe', tagline: 'hello' },
        { id: '21', profile_image: 'https://profile_image', first_name: 'john', last_name: 'doe', tagline: 'hello' }
      ],
      students: []
    },
    reference: {
      industries: [
        { text: 'Accounting' },
        { text: 'Banking' },
        { text: 'IT' }
      ],
      organisationSize: [
        { text: '1-10 employees' },
        { text: '11-50 employees' },
        { text: '51-200 employees' }
      ]
    },
    errors: [],
    onChangeInput: jest.fn()
  }

  describe('when editMode is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <PageContent {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: true
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <PageContent {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
