import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import GapForm from './index'

configure({adapter: new Adapter()});
describe('containers/Profile/components/.../GapForm', () => {
  const commonProps = {
    deleteWork: jest.fn(),
    orgRegistered: jest.fn(),
    onFieldChange: jest.fn(),
    saveEntity:jest.fn(),
    toggleEdit:jest.fn(),
    toggleBlockEditing:jest.fn(),
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
        <GapForm {...props} />
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
        <GapForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when "position" and "start_date" are invalid', () => {
    const props = {
      ...commonProps,
      industry: '',
      company:'Employment Gap',
      description: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      end_date: '2016-03-01',
      start_date: '',
      position: 'Education Gap for an year ',
      invalidFields: [ 'industry', 'start_date' ]
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <GapForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all inputs have values', () => {
    const props = {
      ...commonProps,
      employment_type: 'employment_gap',
      company:'Employment Gap',
      description: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      industry: 'Compassionate Leave',
      end_date: '2016-06-01',
      start_date: '2016-03-01',
      position: 'Education Gap for an year'
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <GapForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('handleChange', () => {
      it('calls props.onFieldChange correctly', () => {
        const wrapper = shallow(
          <GapForm {...props} />
        )
        props.onFieldChange.mockClear()
        wrapper.instance().handleChange('value', 'field')
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('field', 'value')
      })
    })

    describe('onTextChange', () => {
      describe('when "industry" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const wrapper = shallow(
            <GapForm {...props} />
          )
          const event = { target: { name: 'industry', value: 'Compassionate Leave' } }
          props.onFieldChange.mockClear()
          wrapper.find('input[name="industry"]').simulate('change', event)
          expect(props.onFieldChange)
            .toHaveBeenCalledWith('industry', 'Compassionate Leave')
        })
      })
    })
  })
})
