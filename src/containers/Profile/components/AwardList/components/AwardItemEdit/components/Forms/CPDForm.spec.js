import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import CPDForm from './CPDForm'

describe('containers/Profile/components/.../CPDForm', () => {
  const commonProps = {
    onFieldChange: jest.fn(),
    orgRegistered: jest.fn(),
    invalidFields: [],
    invalidDates: false
  }

  describe('when all inputs have no values', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const tree = renderer.create(
        <CPDForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when invalidDates is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        invalidDates: true
      }
      const tree = renderer.create(
        <CPDForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when "name" and "description" are invalid', () => {
    const props = {
      ...commonProps,
      name: '',
      description: '',
      cpd_type: 'Informal',
      date_from: '2016-03-31T23:00:00.000Z',
      date_to: '2016-05-31T23:00:00.000Z',
      duration: '30',
      location: 'London, UK',
      organisation: 'City of Oxford College',
      invalidFields: [ 'name', 'description' ]
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <CPDForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      name: 'CPD1',
      description: 'Lorem ipsum',
      cpd_type: 'Informal',
      date_from: '2016-03-31T23:00:00.000Z',
      date_to: '2016-05-31T23:00:00.000Z',
      duration: '30',
      location: 'London, UK',
      organisation: 'City of Oxford College'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <CPDForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('handleChange', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <CPDForm {...props} />
        )
        expect(typeof wrapper.instance().handleChange)
          .toEqual('function')
      })
    })

    describe('onTextChange', () => {
      describe('when "name" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <CPDForm {...props} />
          )
          const event = { target: { name: 'name', value: 'CPD12' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="name"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('name', 'CPD12')
        })
      })

      describe('when "description" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <CPDForm {...props} />
          )
          const event = { target: { name: 'description', value: 'lorem ipsum' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="description"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('description', 'lorem ipsum')
        })
      })

      describe('when "duration" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <CPDForm {...props} />
          )
          const event = { target: { name: 'duration', value: '50' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="duration"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('duration', '50')
        })
      })
    })

    describe('optionRenderer', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <CPDForm {...props} />
        )
        expect(typeof wrapper.instance().optionRenderer)
          .toEqual('function')
      })
    })

    describe('selectAsyncChange', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <CPDForm {...props} />
        )
        expect(typeof wrapper.instance().selectAsyncChange)
          .toEqual('function')
      })
    })

    describe('selectAsyncBlur', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <CPDForm {...props} />
        )
        expect(typeof wrapper.instance().selectAsyncBlur)
          .toEqual('function')
      })
    })
  })
})
