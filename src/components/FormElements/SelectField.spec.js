import React from 'react'
import renderer from 'react-test-renderer'
import SelectField from './SelectField'

describe('<SelectField />', () => {
  const commonProps = {
    name: 'cpd',
    label: 'CPD',
    options: [
      { value: 'Formal', label: 'Formal' },
      { value: 'Informal', label: 'Informal' }
    ],
    onChange: jest.fn()
  }

  describe('when props.value is undefined', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <SelectField {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.placeholder has a value', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        placeholder: 'custom placeholder'
      }

      const tree = renderer.create(
        <SelectField {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.value is valid', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        value: 'Formal'
      }
      const tree = renderer.create(
        <SelectField {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
