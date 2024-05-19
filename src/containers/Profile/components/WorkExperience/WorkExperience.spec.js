import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import WorkExperience from './WorkExperience'

configure({adapter: new Adapter()});
describe('containers/Profile/components/WorkExperience', () => {
  const commonProps = {
    industries: [
      { text: 'Accounting' },
      { text: 'Animation' },
      { text: 'IT' }
    ],
    reorder: false,
    toggleReorder: jest.fn(),
    deleteWork: jest.fn(),
    saveEntity: jest.fn(),
    filterEntries: function() {
      return true
    },
    user: {
      mobile_address: true,
      biometrics_status: 'complete'
    },
    jobs: [
      {
        id: 103,
        start_date: '2017-08-01T00:00:00.000Z',
        end_date: '0000-00-00',
        name: 'Dev 2',
        verified_status: 'verified',
        org: {
          name: 'Applied Blockchain'
        }
      },
      {
        id: 105,
        start_date: '2015-09-01T00:00:00.000Z',
        end_date: '2016-11-01T00:00:00.000Z',
        name: 'Dev 1',
        verified_status: 'not_verified',
        org: {
          name: 'Apple Inc'
        }
      }
    ]
  }

  describe('when props.editMode is false', () => {
    describe('when sorting by end_date', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: false
        }
        const tree = renderer.create(
          <WorkExperience {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when props.editMode is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: true
      }
      const tree = renderer.create(
        <WorkExperience {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('when state.addNew is true', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: true
        }

        const wrapper = shallow(
          <WorkExperience {...props} />
        )

        wrapper.setState({
          addNew: true
        })

        expect(wrapper.find('WorkItemEdit').length).toEqual(1)
      })
    })
  })

  describe('<WorkExperience />', () => {
    let wrapper
    beforeEach(() => {
      const props = {
        ...commonProps,
        editMode: false,
        jobs: []
      }

      wrapper = shallow(
        <WorkExperience {...props} />
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
