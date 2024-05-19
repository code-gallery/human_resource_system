import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import LanguageForm from './LanguageForm'

describe('containers/Profile/components/.../LanguageForm', () => {
  const commonProps = {
    onFieldChange: jest.fn()
  }

  describe('when all inputs have no values', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const tree = renderer.create(
        <LanguageForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      proficiency: 5,
      name: 'English',
      description: 'Lorem ipsum'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <LanguageForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('componentDidMount', () => {
      it('calls props.onFieldChange correctly', () => {
        shallow(
          <LanguageForm {...props} />
        )
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('proficiency', 5)
      })
    })

    describe('handleChange', () => {
      describe('when "description" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <LanguageForm {...props} />
          )
          const event = { target: { name: 'description', value: 'hello world' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="description"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('description', 'hello world')
        })
      })
    })
  })
})
