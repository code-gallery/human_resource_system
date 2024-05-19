import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SkillForm from './SkillForm'

describe('containers/Profile/components/.../SkillForm', () => {
  const commonProps = {
    onFieldChange: jest.fn()
  }

  describe('when all inputs have no values', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const tree = renderer.create(
        <SkillForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      proficiency: 5,
      name: 'Skill 1',
      date: '2014-04-01',
      description: 'Lorem ipsum'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <SkillForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('componentDidMount', () => {
      it('calls props.onFieldChange correctly', () => {
        shallow(
          <SkillForm {...props} />
        )
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('proficiency', 3)
      })
    })

    describe('handleChange', () => {
      describe('when "name" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <SkillForm {...props} />
          )
          const event = { target: { name: 'name', value: 'hello' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="name"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('name', 'hello')
        })
      })

      describe('when "description" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <SkillForm {...props} />
          )
          const event = { target: { name: 'description', value: 'hello' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="description"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('description', 'hello')
        })
      })
    })
  })
})
