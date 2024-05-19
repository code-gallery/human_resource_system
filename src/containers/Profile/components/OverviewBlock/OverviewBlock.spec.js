import React from 'react'
import renderer from 'react-test-renderer'
import OverviewBlock from './OverviewBlock'

describe('containers/Profile/components/OverviewBlock', () => {
  const commonProps = {
    user: {
      first_name: 'John',
      last_name: 'Doe',
      public_email: 'johndoe@appliedblockchain.com',
      location: 'London, UK'
    },
    jobs: [
      { verified: true },
      { verified: false },
      { verified: false }
    ],
    educations: [
      { verified: true },
      { verified: true },
      { verified: false }
    ],
    allAwards: {
      achievement: [],
      award: [
        { verified: true },
        { verified: false }
      ],
      certificate: [],
      cpd: [
        { verified: true },
        { verified: true },
        { verified: true }
      ],
      language: [
        { verified: true },
        { verified: false }
      ],
      project: [
        { verified: true },
        { verified: true },
        { verified: true }
      ],
      skill: []
    },
    activities: [],
    onChangeProfileField: jest.fn()
  }

  describe('when editMode is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false
      }
      const tree = renderer.create(
        <OverviewBlock {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode is true', () => {
    describe('when name is valid', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          editMode: true
        }
        const tree = renderer.create(
          <OverviewBlock {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when name is invalid', () => {
      it('renders correctly', () => {
        const props = {
          ...commonProps,
          user: {
            first_name: '',
            last_name: ''
          },
          editMode: true
        }
        const tree = renderer.create(
          <OverviewBlock {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })
})
