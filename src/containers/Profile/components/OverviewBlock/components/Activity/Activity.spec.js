import React from 'react'
import renderer from 'react-test-renderer'
import Activity from './Activity'

describe('containers/Profile/components/OverviewBlock/.../Activity', () => {
  describe('when activities is empty', () => {
    it('renders correctly', () => {
      const props = {
        activities: [],
        editMode: false
      }
      const tree = renderer.create(
        <Activity {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when activities is not empty', () => {
    const activities = [
      {
        assertion: 'developer',
        date: '2017-11-17T17:37:09.000Z',
        organisation: 'Applied Blockchain',
        status: 'pending_verification',
        type: 'job'
      },
      {
        assertion: 'MSc',
        date: '2017-11-17T17:37:09.000Z',
        organisation: 'Westminster',
        status: 'verified',
        type: 'education'
      }
    ]

    describe('when editMode is false', () => {
      it('renders correctly', () => {
        const props = {
          activities,
          editMode: false
        }
        const tree = renderer.create(
          <Activity {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when editMode is true', () => {
      it('renders correctly', () => {
        const props = {
          activities,
          editMode: true
        }
        const tree = renderer.create(
          <Activity {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })
})
