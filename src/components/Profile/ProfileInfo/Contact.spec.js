import React from 'react'
import renderer from 'react-test-renderer'
import Contact from './Contact'

describe('components/Profile/.../Contact', () => {
  const commonProps = {
    isMobile: false,
    active: false,
    onToggle: jest.fn(),
    user: {
      public_email: 'ab@appliedblockchain.com',
      twitter: '@applied',
      mobile: '+44',
      website: null
    }
  }

  describe('when editMode = true and active = true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: true,
        active: true
      }
      const tree = renderer.create(
        <Contact {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode = false and active = true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false,
        active: true
      }
      const tree = renderer.create(
        <Contact {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode = false and active = false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false,
        active: false
      }
      const tree = renderer.create(
        <Contact {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all user info are not defined', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false,
        user: {}
      }
      const tree = renderer.create(
        <Contact {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
