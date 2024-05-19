import React from 'react'
import { shallow } from 'enzyme'
import CandidateInfo from './CandidateInfo'

describe('<CandidateInfo />', () => {
  const createCommonProps = props => ({
    invitationPending: false,
    hasRequests: true,
    info: {
      firstName: 'James',
      lastName: 'Carter',
      profileImage: 'example.com/assets/img/avatar.jpg',
      userEmail: 'james@example.com',
      role: 'Developer',
      company: 'Google',
      phoneNumber: '555 444 333',
      userId: 10
    },

    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<CandidateInfo {...props} />)
    })
  })
})
