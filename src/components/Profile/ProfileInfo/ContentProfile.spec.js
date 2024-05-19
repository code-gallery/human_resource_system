import React from 'react'
import renderer from 'react-test-renderer'
import ContentProfile from './ContentProfile'

describe('components/Profile/.../ContentProfile', () => {
  const commonProps = {
    user: {
      biometrics_status: null,
      first_name: 'John',
      last_name: 'Doe',
      town: 'London',
      country: 'UK',
      tagline: 'lorem ipsum'
    }
  }

  describe('when all fields exists', () => {
    describe('when user is verified', () => {
      it('renders correctly', () => {
        const props = {
          user: {
            ...commonProps.user,
            biometrics_status: 'complete',
            biometrics_first_name: 'John Evan',
            biometrics_last_name: 'Smith'
          }
        }
        const tree = renderer.create(
          <ContentProfile {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when user is not verified', () => {
      it('renders correctly', () => {
        const props = {
          user: {
            ...commonProps.user,
            biometrics_status: 'failed'
          }
        }
        const tree = renderer.create(
          <ContentProfile {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when biometrics_first_name is null', () => {
    describe('when user is verified', () => {
      it('renders correctly', () => {
        const props = {
          user: {
            ...commonProps.user,
            biometrics_status: 'complete',
            biometrics_first_name: null,
            biometrics_last_name: 'John Evan Smith'
          }
        }
        const tree = renderer.create(
          <ContentProfile {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when biometrics_last_name is null', () => {
    describe('when user is verified', () => {
      it('renders correctly', () => {
        const props = {
          user: {
            ...commonProps.user,
            biometrics_status: 'complete',
            biometrics_first_name: 'John Evan Smith',
            biometrics_last_name: null
          }
        }
        const tree = renderer.create(
          <ContentProfile {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('when location is empty', () => {
    describe('when user is verified', () => {
      it('renders correctly', () => {
        const props = {
          user: {
            ...commonProps.user,
            town: null
          }
        }
        const tree = renderer.create(
          <ContentProfile {...props} />
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })
})
