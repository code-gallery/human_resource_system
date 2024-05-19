import React from 'react'
import { shallow } from 'enzyme'
import UserContextMenu from './UserContextMenu'

describe('<UserContextMenu />', () => {
  let wrapper
  describe('when user has no organisations', () => {
    beforeEach(() => {
      const props = {
        user: {
          first_name: 'Jane',
          last_name: 'Doe',
          profile_image: '://profile_image'
        },
        organisations: [],
        toggleDropDown: jest.fn(),
        showDropdown: true
      }
      wrapper = shallow(
        <UserContextMenu {...props} />
      )
    })

    it('has 1 verification link', () => {
      expect(wrapper.find('.h-verifications').length).toEqual(1)
    })
  })

  describe('when user has 2 organisations', () => {
    beforeEach(() => {
      const props = {
        user: {
          first_name: 'Jane',
          last_name: 'Doe',
          profile_image: '://profile_image'
        },
        organisations: [
          {
            id: 1,
            name: 'hello'
          },
          {
            id: 2,
            name: 'bar',
            checkConfig: [
              {
                type: 'dbs',
                enabled: 1
              }
            ]
          }
        ],
        toggleDropDown: jest.fn(),
        showDropdown: true
      }
      wrapper = shallow(
        <UserContextMenu {...props} />
      )
    })

    it('has 3 verification links', () => {
      expect(wrapper.find('.h-verifications').length).toEqual(3)
    })

    it('has 2 organisation titles', () => {
      expect(wrapper.find('.h-org-head').length).toEqual(2)
    })

    it('has 1 organisation with Work Pass link', () => {
      const workPassLink = wrapper.find('.h-workpass')
      expect(workPassLink.length).toEqual(1)
      expect(workPassLink.prop('to')).toEqual('/organisations/2/candidates')
    })
  })

  describe('when showDropdown is false', () => {
    beforeEach(() => {
      const props = {
        user: {
          first_name: 'Jane',
          last_name: 'Doe',
          profile_image: '://profile_image'
        },
        organisations: [ { id: 1, name: 'hello' }, { id: 2, name: 'bar' } ],
        toggleDropDown: jest.fn(),
        showDropdown: false
      }
      wrapper = shallow(
        <UserContextMenu {...props} />
      )
    })

    it('navigation is not visible', () => {
      expect(wrapper.find('.nav-dropdown').length).toEqual(0)
    })

    it('verification links are not visible', () => {
      expect(wrapper.find('.h-verifications').length).toEqual(0)
    })
  })
})
