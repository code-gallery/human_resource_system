import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import UniForm from './index'
configure({adapter: new Adapter()});
describe('containers/Profile/components/.../UniForm', () => {
  const commonProps = {
    awards: [
      { id: 1, name: 'Qualification (Award)', value1: 'AS-Levels', value2: 'A*' },
      { id: 1, name: 'Qualification (Award)', value1: 'GCSE', value2: 'A*' },
      { id: 2, name: 'Qualification (Award)', value1: 'Master', value2: 'Pass' },
      { id: 3, name: 'Qualification (Award)', value1: 'Doctorate', value2: 'Pass' }
    ],
    highSchoolDegrees: [
      { id: 10, name: 'Qualification (Type)', value1: 'Secondary', value2: 'AS-Levels' },
      { id: 12, name: 'Qualification (Type)', value1: 'Secondary', value2: 'GCSE' },
      { id: 12, name: 'Qualification (Type)', value1: 'Secondary', value2: 'MSc' }
    ],
    onFieldChange: jest.fn(),
    student_number: '12344',
    invalidFields: [],
    invalidDates: false,
    degree: 'MSc',
    studied: 'Computer Science',
    grade: 'B',
    start_date: '2013-09-01T00:00:00.000Z',
    end_date: '2014-07-01T00:00:00.000Z'
  }

  describe('when props.transcript is not defined', () => {
    const props = commonProps
    it('renders correctly', () => {
      const tree = renderer.create(
        <UniForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('<SchoolForm />', () => {
      let wrapper
      beforeEach(() => {
        wrapper = shallow(
          <UniForm {...props} />
        )
        props.onFieldChange.mockClear()
      })

      describe('when "studied" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const event = { target: { value: 'Blockchain' } }
          wrapper.find('input[name="studied"]').simulate('change', event)

          expect(props.onFieldChange).toHaveBeenCalledWith('studied', 'Blockchain')
        })
      })

      describe('when "degree" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const event = { target: { value1: 'BSc' } }
          wrapper.find('[name="select-degree"]').simulate('change', event)

          expect(props.onFieldChange).toHaveBeenCalledTimes(2)
        })
      })

      describe('when "student number" changes', () => {
        it('calls props.onFieldChange correctly', () => {
          const event = { target: { value: '1222222' } }
          wrapper.find('[name="student-number"]').simulate('change', event)

          expect(props.onFieldChange).toHaveBeenCalledWith('student_number', '1222222')
        })
      })

      describe('onFileLoad', () => {
        it('calls props.onFieldChange correctly', () => {
          wrapper.instance().onFileLoad()

          expect(props.onFieldChange).toHaveBeenCalledWith('transcript', null)
        })
      })
    })
  })
})
