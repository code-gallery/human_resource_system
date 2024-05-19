import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import UniForm from './index'

configure({adapter: new Adapter()});
describe('containers/Profile/components/.../UniForm', () => {
  const commonProps = {
    deleteWork: jest.fn(),
    saveEntity:jest.fn(),
    toggleEdit:jest.fn(),
    toggleBlockEditing:jest.fn(),
    onFieldChange: jest.fn(),
    orgRegistered: jest.fn(),
    invalidFields: [],
    invalidMessage: 'Error occured',
    invalidDates: false,
    industries: [
      { text: 'Accounting' },
      { text: 'Animation' },
      { text: 'IT' }
    ]
  }

  describe('when all inputs have no values', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const tree = renderer.create(
        <UniForm {...props} />
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
        <UniForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when "position" and "start_date" are invalid', () => {
    const props = {
      ...commonProps,
      position: '',
      location: 'London, UK',
      industry: 'Accounting',
      end_date: '2016-03-01',
      start_date: '',
      organisation: 'City of Oxford College',
      invalidFields: [ 'position', 'start_date' ]
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <UniForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      position: 'Developer',
      location: 'London, UK',
      industry: 'Accounting',
      end_date: '2016-06-01',
      start_date: '2016-03-01',
      organisation: 'City of Oxford College'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <UniForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('handleChange', () => {
      it('calls props.onFieldChange correctly', () => {
        const wrapper = shallow(
          <UniForm {...props} />
        )
        props.onFieldChange.mockClear()
        wrapper.instance().handleChange('value', 'field')
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('field', 'value')
      })
    })

    describe('onTextChange', () => {
      describe('when "position" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <UniForm {...props} />
          )
          const event = { target: { name: 'position', value: 'Developer' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="position"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('position', 'Developer')
        })
      })
    })
  })
})
