import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ProjectForm from './ProjectForm'

describe('containers/Profile/components/.../ProjectForm', () => {
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
        <ProjectForm {...props} />
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
        <ProjectForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when "name" and "description" are invalid', () => {
    const props = {
      ...commonProps,
      name: '',
      description: '',
      date_from: '2016-03-01',
      date_to: '2016-05-01',
      organisation: 'City of Oxford College',
      invalidFields: [ 'name', 'description' ]
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <ProjectForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      name: 'Project1',
      description: 'Lorem ipsum',
      date_from: '2016-03-01',
      date_to: '2016-05-01',
      organisation: 'City of Oxford College'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <ProjectForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('handleChange', () => {
      describe('when "description" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <ProjectForm {...props} />
          )
          const event = { target: { name: 'description', value: 'hello' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="description"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('description', 'hello')
        })
      })

      it('calls props.onFieldChange correctly', () => {
        const wrapper = shallow(
          <ProjectForm {...props} />
        )
        props.onFieldChange.mockClear()
        wrapper.instance().handleChange('2016-06-01', 'date_to')
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('date_to', '2016-06-01')
      })
    })

    describe('onTextChange', () => {
      it('calls props.onFieldChange correctly', () => {
        const wrapper = shallow(
          <ProjectForm {...props} />
        )
        const event = { target: { name: 'name', value: 'Project12' } }
        props.onFieldChange.mockClear()
        wrapper.find('input[name="name"]').simulate('change', event)
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('name', 'Project12')
      })
    })

    describe('optionRenderer', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <ProjectForm {...props} />
        )
        expect(typeof wrapper.instance().optionRenderer)
          .toEqual('function')
      })
    })

    describe('selectAsyncChange', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <ProjectForm {...props} />
        )
        expect(typeof wrapper.instance().selectAsyncChange)
          .toEqual('function')
      })
    })

    describe('selectAsyncBlur', () => {
      it('exists on instance', () => {
        const wrapper = shallow(
          <ProjectForm {...props} />
        )
        expect(typeof wrapper.instance().selectAsyncBlur)
          .toEqual('function')
      })
    })
  })
})
