import React from 'react'
import { shallow } from 'enzyme'
import OrganisationCandidate from './OrganisationCandidate'

describe('<OrganisationCandidate />', () => {
  const createCommonProps = props => ({
    match: {},
    loading: false,
    requestCandidate: jest.fn(),
    error: false,
    candidate: {
      firstName: 'James',
      lastName: 'Carter',
      profileImage: 'example.com/assets/img/avatar.jpg',
      userEmail: 'james@example.com',
      role: 'Developer',
      company: 'Google',
      phoneNumber: '555 444 333',
      userId: 10
    },
    organisationBalance: {
      loading: false,
      balance: 1000
    },
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<OrganisationCandidate {...props} />)
    })
  })
})
