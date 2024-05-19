import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import AchievementForm from './AchievementForm'

describe('containers/Profile/components/.../AchievementForm', () => {
  const commonProps = {
    onFieldChange: jest.fn(),
    invalidFields: []
  }

  describe('when all inputs have no values', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const tree = renderer.create(
        <AchievementForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when "name" and "description" are invalid', () => {
    const props = {
      ...commonProps,
      name: '',
      description: '',
      date: '2016-02-01',
      invalidFields: [ 'name', 'description' ]
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <AchievementForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      name: 'Awesomeness',
      description: 'Lorem ipsum',
      date: '2016-02-01'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <AchievementForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('onTextChange', () => {
      it('calls props.onFieldChange correctly', () => {
        const wrapper = shallow(
          <AchievementForm {...props} />
        )
        const event = { target: { name: 'name', value: 'hello world' } }
        props.onFieldChange.mockClear()
        wrapper.find('input[name="name"]').simulate('change', event)
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('name', 'hello world')
      })
    })

    describe('handleChange', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <AchievementForm {...props} />
        )
        expect(typeof wrapper.instance().handleChange)
          .toEqual('function')
      })
    })
  })
})
