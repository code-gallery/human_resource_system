import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import AwardList from './index'

describe('containers/Profile/components/AwardList', () => {
  const commonProps = {
    reorder: false,
    toggleReorder: jest.fn(),
    deleteAward: jest.fn(),
    saveAward: jest.fn(),
    filterEntries: function() {
      return true
    },
    user: {
      mobile_address: true,
      biometrics_status: 'complete'
    }
  }

  describe('when props.editMode is false', () => {
    describe('when sorting by proficiency', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: false,
          awardType: 'language',
          awardTitle: 'Languages',
          awardList: [
            { id: 105, proficiency: 2, name: 'Portuguese', type: 'language', verified_status: 'not_verified' },
            { id: 103, proficiency: 9, name: 'French', type: 'language', verified_status: 'verified' },
            { id: 106, proficiency: 4, name: 'Dutch', type: 'language', verified_status: 'verified' }
          ]
        }
        const tree = renderer.create(
          <AwardList {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when sorting by date_to', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: false,
          awardType: 'certificate',
          awardTitle: 'Certificates',
          awardList: [
            {
              id: 105,
              date_from: '2017-09-01T00:00:00.000Z',
              date_to: '2017-11-01T00:00:00.000Z',
              name: 'Certified Dev',
              type: 'certificate',
              verified_status: 'not_verified',
              org: {
                name: 'Apple Inc'
              }
            },
            {
              id: 103,
              date_from: '2017-06-01T00:00:00.000Z',
              date_to: '2017-08-01T00:00:00.000Z',
              name: 'Certificate 2',
              type: 'certificate',
              verified_status: 'verified',
              org: {
                name: 'Applied Blockchain'
              }
            }
          ]
        }
        const tree = renderer.create(
          <AwardList {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when sorting by date', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: false,
          awardType: 'award',
          awardTitle: 'Awards',
          awardList: [
            {
              id: 105,
              date: '2017-11-01T00:00:00.000Z',
              name: 'Award 1',
              type: 'award',
              verified_status: 'not_verified',
              org: {
                name: 'Applied Blockchain'
              }
            },
            {
              id: 103,
              date: '2017-10-01T00:00:00.000Z',
              name: 'Award 2',
              type: 'award',
              verified_status: 'verified',
              org: {
                name: 'Apple Inc'
              }
            }
          ]
        }
        const tree = renderer.create(
          <AwardList {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when props.editMode is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: true,
        awardType: 'language',
        awardTitle: 'Languages',
        awardList: [
          { id: 105, proficiency: 2, name: 'Portuguese', type: 'language', verified_status: 'not_verified' },
          { id: 103, proficiency: 9, name: 'French', type: 'language', verified_status: 'verified' },
          { id: 106, proficiency: 4, name: 'Dutch', type: 'language', verified_status: 'verified' }
        ]
      }
      const tree = renderer.create(
        <AwardList {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<AwardList />', () => {
    let wrapper
    beforeEach(() => {
      const props = {
        ...commonProps,
        editMode: false,
        awardType: 'language',
        awardTitle: 'Languages',
        awardList: [
          { id: 105, proficiency: 2, name: 'Portuguese', type: 'language', verified_status: 'not_verified' },
          { id: 103, proficiency: 9, name: 'French', type: 'language', verified_status: 'verified' },
          { id: 106, proficiency: 4, name: 'Dutch', type: 'language', verified_status: 'verified' }
        ]
      }

      wrapper = shallow(
        <AwardList {...props} />
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
