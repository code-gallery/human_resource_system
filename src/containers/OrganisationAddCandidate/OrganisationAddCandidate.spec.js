import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import OrganisationAddCandidate from './OrganisationAddCandidate'
import config from 'store'

describe('<OrganisationAddCandidate />', () => {
  const createCommonProps = props => ({
    match: {
      params: {}
    },
    loading: false,
    searchCandidate: jest.fn(),
    addCandidate: jest.fn(),
    resetAddCandidate: jest.fn(),
    users: [],
    unknownUser: null,
    ...props
  })

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Provider store={config.store}>
          <Router>
            <OrganisationAddCandidate {...createCommonProps()} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
