import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import EducationList from './index'

describe('containers/Profile/components/EducationList', () => {
  const commonProps = {
    reorder: false,
    toggleReorder: jest.fn(),
    deleteEducation: jest.fn(),
    saveEntity: jest.fn(),
    filterEntries: function() {
      return true
    },
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
    qualifications: [
      { id: 20, name: 'Qualification (Type)', value1: 'Masters', value2: 'LLM' },
      { id: 21, name: 'Qualification (Type)', value1: 'Masters', value2: 'MSc' },
      { id: 22, name: 'Qualification (Type)', value1: 'Masters', value2: 'MA' }
    ],
    user: {
      mobile_address: true,
      biometrics_status: 'complete'
    },
    education: [
      {
        id: 127,
        verified_status: 'verified',
        institution: 'Birmingham City University',
        org: {
          id: 140,
          name: 'Birmingham City University'
        },
        organisation_id: 140,
        start_date: '2013-09-01T00:00:00.000Z',
        end_date: '2014-07-01T00:00:00.000Z',
        type: 'secondary'
      },
      {
        id: 128,
        verified_status: 'pending_verification',
        institution: 'Oxford Brookes University',
        org: {
          id: 953,
          name: 'Oxford Brookes University'
        },
        organisation_id: 953,
        start_date: '2011-09-01T00:00:00.000Z',
        end_date: '2012-07-01T00:00:00.000Z',
        type: 'secondary'
      }
    ]
  }
  const { store } = config

  describe('when props.editMode is false', () => {
    describe('when sorting by end_date', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: false
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <EducationList {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when props.editMode is true', () => {
    describe('when sorting by end_date', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: true
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <EducationList {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when props.editMode = true and props.addNew = true', () => {
    describe('when sorting by end_date', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: true,
          addNew: true
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <EducationList {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('<EducationList />', () => {
    let wrapper
    beforeEach(() => {
      const props = {
        ...commonProps,
        editMode: false
      }

      wrapper = shallow(
        <EducationList {...props} />
      )
    })

    describe('toggleBlockEditing', () => {
      it('updates state correctly', () => {
        expect(wrapper.state('blockIsEditing')).toEqual(false)
        wrapper.instance().toggleBlockEditing()
        expect(wrapper.state('blockIsEditing')).toEqual(true)
      })
    })

    describe('toggleAddNewItem', () => {
      it('updates state correctly', () => {
        expect(wrapper.state('addNew')).toEqual(false)
        wrapper.instance().toggleAddNewItem()
        expect(wrapper.state('addNew')).toEqual(true)
      })
    })
  })
})
