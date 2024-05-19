import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import CheckCard from './CheckCard'
import CheckboxOption from 'components/CheckboxOption'
import LabeledSelectInput from 'components/LabeledSelectInput'

describe('<CheckCard />', () => {
  const props = {
    requestName: 'DBS',
    verifier: 'Apii',
    price: 2500,
    added: false,
    onChange: jest.fn()
  }

  describe('Rendering', () => {
    it('renders', () => {
      const tree = renderer.create(<CheckCard {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('When options are used', () => {
    const optionProps = {
      ...props,
      options: [
        {
          text: 'Test',
          checked: true,
          onValueChange: jest.fn()
        }
      ]
    }

    it('renders', () => {
      const tree = renderer.create(<CheckCard {...optionProps} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('includes a checkbox with the correct text', () => {
      const wrapper = shallow(<CheckCard {...optionProps} />)
      const checkbox = wrapper.find(CheckboxOption)
      expect(checkbox.length).toEqual(1)
      expect(checkbox.prop('text')).toEqual('Test')
    })
  })

  describe('When selects are used', () => {
    const selectProps = {
      ...props,
      selects: [
        {
          label: 'Test',
          onValueChange: jest.fn(),
          value: 'val',
          options: {
            val: 'Value'
          }
        }
      ]
    }

    it('renders', () => {
      const tree = renderer.create(<CheckCard {...selectProps} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('includes a select with the correct options', () => {
      const wrapper = shallow(<CheckCard {...selectProps} />)
      const select = wrapper.find(LabeledSelectInput)
      expect(select.length).toEqual(1)
      expect(select.prop('label')).toEqual('Test')
      expect(select.prop('options')).toEqual({ val: 'Value' })
    })
  })
})
