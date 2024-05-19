import React from 'react'
import { shallow } from 'enzyme'
import LabeledTextInput from './LabeledTextInput'

describe('<LabeledTextInput />', () => {
  const createCommonProps = props => ({
    label: 'Name',
    onValueChange: jest.fn(),
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<LabeledTextInput {...props} />)
    })
  })
})
