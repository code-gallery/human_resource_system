import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import CandidateHeader from './CandidateHeader'

configure({adapter: new Adapter()});

describe('<CandidateHeader />', () => {
  const createCommonProps = props => ({
    orgId: 10,
    organisationBalance: 1000,
    invitationPending: false,
    hasRequests: true,
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

    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<CandidateHeader {...props} />)
    })
  })
})
