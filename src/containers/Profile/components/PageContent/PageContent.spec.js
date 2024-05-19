import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import PageContent from './PageContent'

describe('containers/Profile/components/.../PageContent', () => {
  const commonProps = {
    onChangeProfileField: jest.fn(),
    deleteAward: jest.fn(),
    deleteWork: jest.fn(),
    deleteEducation: jest.fn(),
    saveAward: jest.fn(),
    saveEntity: jest.fn(),
    filterEntries: jest.fn(),
    user: {
      first_name: 'Jane',
      last_name: 'Doe'
    },
    reference: {
      industries: [
        { text: 'Accounting' },
        { text: 'Animation' },
        { text: 'IT' }
      ],
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
      degrees: [
        { id: 10, name: 'Qualification (Type)', value1: 'Secondary', value2: 'AS-Levels' },
        { id: 12, name: 'Qualification (Type)', value1: 'Secondary', value2: 'GCSE' },
        { id: 12, name: 'Qualification (Type)', value1: 'Secondary', value2: 'MSc' }
      ]
    },
    jobs: [],
    allAwards: {
      achievement: [],
      award: [],
      certificate: [],
      cpd: [],
      language: [],
      project: [],
      skill: []
    },
    educations: [],
    activities: []
  }

  describe('when props.pageOrder is undefined', () => {
    describe('when props.editMode is true', () => {
      it('renders correctly with defaultOrder', () => {
        const props = {
          ...commonProps,
          editMode: true
        }
        const tree = renderer.create(
          <PageContent {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })

      describe('when invalid fields', () => {
        it('renders correctly with defaultOrder', () => {
          const props = {
            ...commonProps,
            editMode: true,
            user: {
              first_name: '',
              last_name: ''
            }
          }
          const tree = renderer.create(
            <PageContent {...props} />
          ).toJSON()

          expect(tree).toMatchSnapshot()
        })
      })
    })

    describe('when props.editMode is false', () => {
      it('renders correctly with defaultOrder', () => {
        const props = {
          ...commonProps,
          editMode: false
        }
        const tree = renderer.create(
          <PageContent {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when props.pageOrder exists', () => {
    it('renders correctly with custom order', () => {
      const props = {
        ...commonProps,
        editMode: false,
        pageOrder: {
          education: 7,
          jobs: 8,
          award: 2,
          cpd: 6,
          certificate: 4,
          achievement: 5,
          project: 3,
          skill: 0,
          language: 1
        }
      }
      const tree = renderer.create(
        <PageContent {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<PageContent />', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        editMode: false
      }

      wrapper = shallow(
        <PageContent {...props} />
      )
    })

    describe('toggleReorder', () => {
      it('updates state.reorder correctly', () => {
        wrapper.instance().toggleReorder()
        expect(wrapper.state('reorder')).toEqual(true)
        wrapper.instance().toggleReorder()
        expect(wrapper.state('reorder')).toEqual(false)
      })
    })

    describe('componentWillReceiveProps', () => {
      describe('when pageOrder changes', () => {
        it('updates state.order correctly', () => {
          wrapper.setProps({
            pageOrder: { award: 0 }
          })
          expect(wrapper.state('order')).toEqual({ award: 0 })
        })
      })

      describe('when editMode changes', () => {
        it('updates state.reorder correctly', () => {
          wrapper.setState({
            reorder: true
          })
          wrapper.setProps({
            editMode: true
          })
          expect(wrapper.state('reorder')).toEqual(false)
        })
      })
    })

    describe('onSort', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const sortedList = [
          { classes: [ 'cpd' ], rank: 1 },
          { classes: [ 'project' ], rank: 0 },
          { classes: [ 'skill' ], rank: 2 },
          { classes: [ 'language' ], rank: 3 }
        ]
        wrapper.instance().onSort(sortedList)
        expect(props.onChangeProfileField)
          .toHaveBeenCalledWith('profile_order', {
            cpd: 1,
            project: 0,
            skill: 2,
            language: 3
          })
      })
    })
  })
})
