import React from 'react'
import renderer from 'react-test-renderer'
import ContentProfileOrg from './ContentProfileOrg'

describe('components/Profile/.../ContentProfileOrg', () => {
  const commonProps = {
    company_size: '11-50 employees',
    name: 'Applied Blockchain',
    town: 'London',
    country: 'UK',
    industries: 'IT',
    year_founded: '2015'
  }

  describe('when all fields exists (no admins)', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          ...commonProps,
          admins: []
        }
      }
      const tree = renderer.create(
        <ContentProfileOrg {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when location is empty (with admins)', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          ...commonProps,
          town: null,
          admins: [ 'admin1', 'admin2' ]
        }
      }
      const tree = renderer.create(
        <ContentProfileOrg {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when year_founded is empty (with admins)', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          ...commonProps,
          year_founded: null,
          admins: [ 'admin1', 'admin2' ]
        }
      }
      const tree = renderer.create(
        <ContentProfileOrg {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when industries is empty (no admins)', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          ...commonProps,
          industries: null,
          admins: []
        }
      }
      const tree = renderer.create(
        <ContentProfileOrg {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when industries|company_size|year_founded are empty (no admins)', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          ...commonProps,
          company_size: null,
          industries: null,
          year_founded: null,
          admins: []
        }
      }
      const tree = renderer.create(
        <ContentProfileOrg {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
