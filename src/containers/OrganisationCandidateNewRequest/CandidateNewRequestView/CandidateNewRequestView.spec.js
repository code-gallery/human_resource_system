import React from 'react'
import { shallow } from 'enzyme'
import CandidateNewRequestView from './CandidateNewRequestView'

describe('<CandidateNewRequestView />', () => {
  const createCommonProps = props => ({
    loading: true,
    organisationId: 10,
    candidateId: 1,
    postNewRequest: jest.fn(),
    checks: {},
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<CandidateNewRequestView {...props} />)
    })
  })
})
