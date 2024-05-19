import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CandidateNewRequestHeader from './CandidateNewRequestHeader'

configure({adapter: new Adapter()});

describe('<CandidateNewRequestHeader />', () => {
  const createCommonProps = props => ({
    candidateName: 'James Carter',
    organisationId: 1,
    candidateId: 10,
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<CandidateNewRequestHeader {...props} />)
    })
  })
})
