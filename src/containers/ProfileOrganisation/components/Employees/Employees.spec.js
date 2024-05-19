import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import Employees from './Employees'

describe('containers/ProfileOrganisation/components/Employees', () => {
  const { store } = config
  describe('when there are no employees', () => {
    describe('when editMode is false', () => {
      it('renders correctly', () => {
        const props = {
          organisation: {
            employees: []
          },
          editMode: false
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Employees {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when editMode is true', () => {
      it('renders correctly', () => {
        const props = {
          organisation: {
            employees: []
          },
          editMode: true
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Employees {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when there are some employees', () => {
    describe('when editMode is true', () => {
      it('renders correctly', () => {
        const props = {
          organisation: {
            employees: [
              { unique_key: 'jane', profile_image: null, first_name: 'jane', last_name: 'doe', tagline: 'hello' },
              { id: '21', profile_image: 'https://profile_image', first_name: 'john', last_name: 'doe', tagline: 'hello' }
            ]
          },
          editMode: true
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Employees {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })
})
