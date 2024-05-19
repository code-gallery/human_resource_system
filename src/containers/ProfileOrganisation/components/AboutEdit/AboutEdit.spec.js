import React from 'react'
import renderer from 'react-test-renderer'
import AboutEdit from './index'

describe('containers/ProfileOrganisation/components/AboutEdit', () => {
  describe('when there are no errors', () => {
    it('renders correctly', () => {
      const props = {
        organisation: {
          about_us: 'hello'
        },
        onChangeInput: jest.fn(),
        errors: []
      }
      const tree = renderer.create(
        <AboutEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when about_us failed validation', () => {
    it('renders correctly', () => {
      const props = {
        organisation: {
          about_us: null
        },
        onChangeInput: jest.fn(),
        errors: [ 'about_us' ]
      }
      const tree = renderer.create(
        <AboutEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
