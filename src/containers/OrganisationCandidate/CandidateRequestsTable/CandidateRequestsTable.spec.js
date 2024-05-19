import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import CandidateRequestsTable from './CandidateRequestsTable'

describe('<CandidateRequestsTable />', () => {
  const createCommonProps = props => ({
    orgId: 1,
    candidateId: 2,
    requests: [
      {
        id: 10,
        createdAt: moment(),
        role: 'Developer',
        status: 'complete'
      }
    ],

    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<CandidateRequestsTable {...props} />)
    })
  })
})
