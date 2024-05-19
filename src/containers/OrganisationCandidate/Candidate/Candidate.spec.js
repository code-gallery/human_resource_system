import React from 'react'
import { shallow } from 'enzyme'
import Candidate from './Candidate'

describe('<Candidate />', () => {
  const createCommonProps = props => ({
    orgId: 10,
    organisationBalance: 1000,
    loading: false,
    candidate: {
      firstName: 'James',
      lastName: 'Carter',
      profileImage: 'example.com/assets/img/avatar.jpg',
      userEmail: 'james@example.com',
      role: 'Developer',
      company: 'Google',
      phoneNumber: '555 444 333',
      userId: 10,
      requests: []
    },

    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<Candidate {...props} />)
    })
  })
})
