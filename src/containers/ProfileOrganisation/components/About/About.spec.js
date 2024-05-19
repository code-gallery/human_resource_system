import React from 'react'
import renderer from 'react-test-renderer'
import About from './index'

describe('containers/ProfileOrganisation/components/About', () => {
  describe('when about_us is null', () => {
    it('renders correctly', () => {
      const props = {
        organisation: {
          about_us: null
        }
      }
      const tree = renderer.create(
        <About {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when about_us is valid', () => {
    it('renders correctly', () => {
      const props = {
        organisation: {
          about_us: 'Hello world\n\nLorem ipsum dolor\r\n sit amet\n blah blah'
        }
      }
      const tree = renderer.create(
        <About {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
