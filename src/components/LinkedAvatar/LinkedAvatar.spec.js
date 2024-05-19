import React from 'react'
import { shallow } from 'enzyme'
import LinkedAvatar from './LinkedAvatar'

describe('<LinkedAvatar />', () => {
  const createCommonProps = props => ({
    msg: 'Sent',
    avatarLeft: {
      src: 'example.com/assets/img/foo.jpg',
      alt: 'Foo'
    },

    avatarRight: {
      src: 'example.com/assets/img/bar.jpg',
      alt: 'Bar'
    },

    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<LinkedAvatar {...props} />)
    })
  })
})
