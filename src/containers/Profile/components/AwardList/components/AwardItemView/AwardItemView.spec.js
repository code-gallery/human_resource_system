import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import AwardItemView from './AwardItemView'

describe('containers/Profile/components/.../AwardItemView', () => {
  const commonProps = {
    toggleEdit: jest.fn(),
    id: 3,
    name: 'Test name',
    organisation: 'Company Inc',
    description: 'Lorem ipsum',
    date: '2016-03-01T00:00:00.000Z'
  }

  describe('when props.editMode = false', () => {
    const props = {
      ...commonProps,
      editMode: false
    }

    describe('when props.verified_status = "pending_verification"', () => {
      it('renders correctly', () => {
        props.verified_status = 'pending_verification'
        const tree = renderer.create(
          <AwardItemView {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when props.verified_status = "verified"', () => {
      it('renders correctly', () => {
        props.verified_status = 'verified'
        const tree = renderer.create(
          <AwardItemView {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when props.organisation_id exists', () => {
      it('renders correctly', () => {
        const { store } = config
        props.verified_status = 'verified'
        props.organisation_id = 55
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <AwardItemView {...props} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when props.editMode = true', () => {
    const props = {
      ...commonProps,
      editMode: true
    }

    describe('when props.verified_status = "not_verified"', () => {
      it('renders correctly', () => {
        props.verified_status = 'not_verified'
        props.date_from = '2016-03-01T00:00:00.000Z'
        props.date_to = '2016-06-01T00:00:00.000Z'
        const tree = renderer.create(
          <AwardItemView {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when awardType = "language"', () => {
      it('renders correctly', () => {
        props.verified_status = 'declined'
        props.awardType = 'language'
        props.proficiency = 6
        const tree = renderer.create(
          <AwardItemView {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when awardType = "skill"', () => {
      it('renders correctly', () => {
        props.verified_status = 'verified'
        props.awardType = 'skill'
        props.proficiency = 3
        const tree = renderer.create(
          <AwardItemView {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when award_id and created_at exists', () => {
      it('renders correctly', () => {
        props.verified_status = 'verified'
        props.award_id = 45
        props.created_at = '2016-03-01T00:00:00.000Z'
        props.awardType = 'award'
        const tree = renderer.create(
          <AwardItemView {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })
})
