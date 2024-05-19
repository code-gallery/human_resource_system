import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import Candidates from './index'

describe('<Candidates />', () => {
  const props = {
    organisationId: 10,
    candidates: [],
    onSearch: jest.fn(),
    loading: false
  }

  describe('when props.candidates = []', () => {
    it('renders correctly', () => {
      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <Candidates {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
