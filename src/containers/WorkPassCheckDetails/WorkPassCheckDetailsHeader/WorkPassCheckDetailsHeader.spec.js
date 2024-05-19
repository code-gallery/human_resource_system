import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkPassCheckDetailsHeader from './WorkPassCheckDetailsHeader'
import config from 'store'

describe('<WorkPassCheckDetailsHeader />', () => {
    describe('Rendering', () => {
      const commonProps = {
        candidate: {
          requests: []
        },
        candidateId : 2,
        candidateName : 'Candidate',
        organisationId : 123,
        requestId : 44,
        className : ''
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsHeader {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })