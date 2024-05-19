import React from 'react'
import renderer from 'react-test-renderer'
import CheckboxOption from './CheckboxOption'

describe('<CheckboxOption />', () => {
  const props = {
    text: 'Do want to win?',
    onChange: jest.fn()
  }

  describe('Rendering', () => {
    it('renders', () => {
      const tree = renderer.create(<CheckboxOption {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
