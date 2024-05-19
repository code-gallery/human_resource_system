import React from 'react'
import renderer from 'react-test-renderer'
import TextArea from './TextArea'

describe('<TextArea />', () => {
  const commonProps = {
    name: 'about',
    label: 'About',
    onChange: jest.fn()
  }

  describe('when props.defaultValue is undefined', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <TextArea {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.defaultValue is valid', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        defaultValue: 'lorem ipsum'
      }
      const tree = renderer.create(
        <TextArea {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
