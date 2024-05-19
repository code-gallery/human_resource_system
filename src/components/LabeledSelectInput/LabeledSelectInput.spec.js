import React from 'react'
import renderer from 'react-test-renderer'
import LabeledSelectInput from './LabeledSelectInput'

describe('LabeledSelectInput', () => {
  const props = {
    label: 'Country',
    onValueChange: jest.fn(),
    value: 'test',
    options: {
      test: 'Value'
    }
  }

  describe('Rendering', () => {
    it('renders', () => {
      const tree = renderer.create(<LabeledSelectInput {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
