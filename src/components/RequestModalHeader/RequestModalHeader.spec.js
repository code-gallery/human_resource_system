import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RequestModalHeader from './RequestModalHeader'

configure({adapter: new Adapter()});

describe('<RequestModalHeader />', () => {
  const createCommonProps = props => ({
    id: '#10',
    title: 'Request Info',
    organisationAvatar: 'https://example.com/assets/img/organisationAvatar.jpg',
    userAvatar: 'https://example.com/assets/img/user.jpg',
    position: 'Developer',
    date: '12 Feb 2018',
    location: 'United Kingdom',
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<RequestModalHeader {...props} />)
    })
  })
})
