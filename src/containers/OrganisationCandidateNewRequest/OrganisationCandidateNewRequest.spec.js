import React from 'react'
import { shallow } from 'enzyme'
import OrganisationCandidateNewRequest from './OrganisationCandidateNewRequest'

describe('<OrganisationCandidateNewRequest />', () => {
  const createCommonProps = props => ({
    workPassRequest: {
      organisationChecks: {},
      loading: false,
      posted: false
    },
    candidate: {},
    requestOrganisationConfig: jest.fn(),
    requestCandidate: jest.fn(),
    postNewRequest: jest.fn(),
    resetNewRequest: jest.fn(),
    match: {
      params: {}
    },
    history: {},
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<OrganisationCandidateNewRequest {...props} />)
    })
  })
})
