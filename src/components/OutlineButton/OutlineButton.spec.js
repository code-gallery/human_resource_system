import React from 'react'
import { shallow } from 'enzyme'
import OutlineButton from './OutlineButton'

describe('<OutlineButton />', () => {
  const createCommonProps = props => ({
    children: 'Click Me',
    onClick: jest.fn(),
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<OutlineButton {...props} />)
    })
  })
})
