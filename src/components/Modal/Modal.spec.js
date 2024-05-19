import React from 'react'
import { shallow } from 'enzyme'
import Modal from './Modal'

describe('<Modal />', () => {
  const createCommonProps = props => ({
    isOpen: true,
    contentLabel: 'Request Confirmation',
    ...props
  })

  describe('Rendering', () => {
    const props = createCommonProps()

    it('renders without crashing', () => {
      shallow(<Modal {...props} />)
    })
  })
})
