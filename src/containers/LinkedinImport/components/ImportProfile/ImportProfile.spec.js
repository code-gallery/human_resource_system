import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import ImportProfile from './index'

describe('containers/LinkedinImport/ImportProfile', () => {
  it('renders correctly', () => {
    const { store } = config
    const props = {
      cv: {
        name: 'Testy tester',
        subtext: 'The tester',
        summary: 'Likes tests',
        email: 'test@example.com',
        experience: [
          {
            description: 'Description',
            startDate: 'October 2016',
            endDate: 'April 2018',
            jobTitle: 'Testiest Tester',
            organisation: 'APPII'
          },
          {
            description: 'Description',
            startDate: 'June 2014',
            endDate: 'July 2016',
            jobTitle: 'Less testy tester',
            organisation: 'APPII'
          }
        ],
        education: [
          {
            date: '2003 - 2006',
            degree: 'Masters in Testing',
            organisation: 'Testford University'
          }
        ]
      }
    }
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <ImportProfile {...props} />
        </Router>
      </Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
