import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import AwardForm from './AwardForm'

describe('containers/Profile/components/.../AwardForm', () => {
  const commonProps = {
    onFieldChange: jest.fn(),
    orgRegistered: jest.fn(),
    invalidFields: []
  }

  describe('when all inputs have no values', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const tree = renderer.create(
        <AwardForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when "name" and "description" are invalid', () => {
    const props = {
      ...commonProps,
      name: '',
      description: '',
      date: '2016-03-01',
      organisation: 'City of Oxford College',
      invalidFields: [ 'name', 'description' ]
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <AwardForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      name: 'Award1',
      description: 'Lorem ipsum',
      date: '2016-03-01',
      organisation: 'City of Oxford College'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <AwardForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('handleChange', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <AwardForm {...props} />
        )
        expect(typeof wrapper.instance().handleChange)
          .toEqual('function')
      })
    })

    describe('onTextChange', () => {
      describe('when "name" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <AwardForm {...props} />
          )
          const event = { target: { name: 'name', value: 'Award12' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="name"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('name', 'Award12')
        })
      })

      describe('when "description" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <AwardForm {...props} />
          )
          const event = { target: { name: 'description', value: 'lorem ipsum' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="description"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('description', 'lorem ipsum')
        })
      })
    })

    describe('optionRenderer', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <AwardForm {...props} />
        )
        expect(typeof wrapper.instance().optionRenderer)
          .toEqual('function')
      })
    })

    describe('selectAsyncChange', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <AwardForm {...props} />
        )
        expect(typeof wrapper.instance().selectAsyncChange)
          .toEqual('function')
      })
    })

    describe('selectAsyncBlur', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <AwardForm {...props} />
        )
        expect(typeof wrapper.instance().selectAsyncBlur)
          .toEqual('function')
      })
    })
  })
})
