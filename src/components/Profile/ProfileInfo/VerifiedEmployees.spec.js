import React from 'react'
import renderer from 'react-test-renderer'
import VerifiedEmployees from './VerifiedEmployees'

describe('components/Profile/.../VerifiedEmployees', () => {
  describe('when props.employees is empty', () => {
    it('renders correctly', () => {
      const props = {
        employees: []
      }
      const tree = renderer.create(
        <VerifiedEmployees {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is 1 verified employee', () => {
    it('renders correctly', () => {
      const props = {
        employees: [
          { confirmed: 1, profile_image: null },
          { confirmed: 0, profile_image: null }
        ]
      }
      const tree = renderer.create(
        <VerifiedEmployees {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are many verified employees', () => {
    it('renders correctly', () => {
      const props = {
        employees: [
          { confirmed: 1, profile_image: null },
          { confirmed: 1, profile_image: null },
          { confirmed: 1, profile_image: null },
          { confirmed: 0, profile_image: null },
          { confirmed: 1, profile_image: null },
          { confirmed: 1, profile_image: null },
          { confirmed: 1, profile_image: null },
          { confirmed: 0, profile_image: null }
        ]
      }
      const tree = renderer.create(
        <VerifiedEmployees {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
