import React from 'react'
import renderer from 'react-test-renderer'
import OrganisationForm from './OrganisationForm'

describe('containers/NewOrganisation/components/OrganisationForm', () => {
  const commonProps = {
    save: jest.fn(),
    onChangeInput: jest.fn(),
    success: false
  }

  describe('when there no errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        errors: []
      }
      const tree = renderer.create(
        <OrganisationForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when name and websiteUrl have errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        errors: [ 'name', 'websiteUrl' ]
      }
      const tree = renderer.create(
        <OrganisationForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when success is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        errors: [],
        name: 'Applied',
        success: true
      }
      const tree = renderer.create(
        <OrganisationForm {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
