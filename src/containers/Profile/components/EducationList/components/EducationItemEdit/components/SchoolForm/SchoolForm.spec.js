import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import SchoolForm from './index'
configure({adapter: new Adapter()});
describe('containers/Profile/components/.../SchoolForm', () => {
  const commonProps = {
    awards: [
      { id: 1, name: 'Qualification (Award)', value1: 'AS-Levels', value2: 'A*' },
      { id: 1, name: 'Qualification (Award)', value1: 'GCSE', value2: 'A*' },
      { id: 2, name: 'Qualification (Award)', value1: 'Master', value2: 'Pass' },
      { id: 3, name: 'Qualification (Award)', value1: 'Doctorate', value2: 'Pass' }
    ],
    highSchoolDegrees: [
      { id: 10, name: 'Qualification (Type)', value1: 'Secondary', value2: 'AS-Levels' },
      { id: 11, name: 'Qualification (Type)', value1: 'Secondary', value2: 'A-Levels' },
      { id: 12, name: 'Qualification (Type)', value1: 'Secondary', value2: 'GCSE' }
    ],
    onFieldChange: jest.fn(),
    student_number: '12344',
    invalidFields: [],
    invalidDates: false,
    type: 'secondary',
    start_date: '2013-09-01T00:00:00.000Z',
    end_date: '2014-07-01T00:00:00.000Z'
  }

  describe('when props.results = []', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        results: []
      }

      const tree = renderer.create(
        <SchoolForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.results is not empty', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        results: [
          { grade: 'A*', qualification: 'AS-Levels', subject: 'Subject 1' },
          { grade: 'A*', qualification: 'AS-Levels', subject: 'Subject 2' }
        ]
      }

      const tree = renderer.create(
        <SchoolForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<SchoolForm />', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        results: [
          { grade: 'A*', qualification: 'AS-Levels', subject: 'Subject 1' },
          { grade: 'A*', qualification: 'AS-Levels', subject: 'Subject 2' }
        ]
      }

      wrapper = shallow(
        <SchoolForm {...props} />
      )
      props.onFieldChange.mockClear()
    })

    describe('when "subject" changes', () => {
      it('calls props.onFieldChange correctly', () => {
        const event = { target: { name: 'subject-1', value: 'Subject 2 change' } }
        wrapper.find('input[name="subject-1"]').simulate('change', event)

        expect(props.onFieldChange).toHaveBeenCalledWith('results', [
          props.results[0],
          { grade: 'A*', qualification: 'AS-Levels', subject: 'Subject 2 change' }
        ])
      })
    })

    describe('when "qualification" changes', () => {
      it('calls props.onFieldChange correctly', () => {
        const event = { value2: 'GCSE' }
        wrapper.find('[name="select-qualification-1"]').simulate('change', event)

        expect(props.onFieldChange).toHaveBeenCalledWith('results', [
          props.results[0],
          { grade: null, qualification: 'GCSE', subject: 'Subject 2' }
        ])
      })
    })

    describe('when "grade" changes', () => {
      it('calls props.onFieldChange correctly', () => {
        const event = { value2: 'B' }
        wrapper.find('[name="select-grade-1"]').simulate('change', event)

        expect(props.onFieldChange).toHaveBeenCalledWith('results', [
          props.results[0],
          { grade: 'B', qualification: 'AS-Levels', subject: 'Subject 2' }
        ])
      })
    })

    describe('when "student number" changes', () => {
      it('calls props.onFieldChange correctly', () => {
        const event = { target: { value: '1222222' } }
        wrapper.find('[name="student-number"]').simulate('change', event)

        expect(props.onFieldChange).toHaveBeenCalledWith('student_number', '1222222')
      })
    })

    describe('addRow', () => {
      describe('when results is not empty', () => {
        it('calls props.onFieldChange correctly', () => {
          wrapper.instance().addRow()
          expect(props.onFieldChange).toHaveBeenCalledWith('results', [
            ...props.results,
            { subject: '', qualification: '', grade: '' }
          ])
        })
      })

      describe('when results is empty', () => {
        it('calls props.onFieldChange correctly', () => {
          wrapper.setProps({ results: [] })
          wrapper.instance().addRow()
          expect(props.onFieldChange).toHaveBeenCalledWith('results', [
            { subject: '', qualification: '', grade: '' }
          ])
        })
      })
    })

    describe('removeRow', () => {
      it('calls props.onFieldChange correctly', () => {
        wrapper.instance().removeRow(1)
        expect(props.onFieldChange).toHaveBeenCalledWith('results', [
          props.results[0]
        ])
      })
    })
  })
})
