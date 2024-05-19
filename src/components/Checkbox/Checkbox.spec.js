import React from 'react'
import { shallow } from 'enzyme'
import Checkbox from './Checkbox'

describe('<Checkbox />', () => {
  const createCommonProps = props => ({
    onChange: jest.fn(),
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<Checkbox {...props} />)
    })
  })
})
