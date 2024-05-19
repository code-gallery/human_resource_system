import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkpassAdmin from './workpassAdmin.js'
import config from 'store'

describe('<WorkpassAdmin />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
            params: {
              orgId: '1',
              candidateId: '10',
              requestId: '25'
            }
          },
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkpassAdmin {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })