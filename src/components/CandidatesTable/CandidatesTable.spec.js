import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import CandidatesTable from './index'

describe('<CandidatesTable />', () => {
  const props = {
    organisationId: 10,
    candidates: [
      {
        id: 1,
        email: 'james@example.com',
        requests: [],
        userId: 10,
        profileImage: '/assets/img/profile.jpg',
        firstName: 'James',
        lastName: 'Carter'
      }
    ]
  }

  it('renders correctly', () => {
    const { store } = config
    const tree = renderer.create(
      <Provider store={store}>
        <Router>
          <CandidatesTable {...props} />
        </Router>
      </Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
