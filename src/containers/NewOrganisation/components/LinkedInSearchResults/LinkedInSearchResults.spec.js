import React from 'react'
import renderer from 'react-test-renderer'
import LinkedInSearchResults from './LinkedInSearchResults'

describe('containers/NewOrganisation/components/LinkedInSearchResults', () => {
  describe('when there are no results', () => {
    it('renders correctly', () => {
      const props = {
        results: [],
        select: jest.fn()
      }
      const tree = renderer.create(
        <LinkedInSearchResults {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are results', () => {
    it('renders correctly', () => {
      const props = {
        results: [
          { name: 'Apple', id: 123, logoUrl: 'https://logo-apple', selected: true },
          { name: 'Apple 2', id: 124 },
          { name: 'Apple 3', id: 125 }
        ],
        select: jest.fn()
      }
      const tree = renderer.create(
        <LinkedInSearchResults {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
