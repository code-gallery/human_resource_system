import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import Header from './Header'

configure({adapter: new Adapter()});

describe('<Header />', () => {
  let wrapper
  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        first_name: 'Jane',
        last_name: 'Doe',
        profile_image: '://profile_image'
      }
      const props = {
        user,
        token: 'token',
        isLoggedIn: true,
        editLabel: 'Edit',
        organisations: [],
        responsive: false,
        hasNotification: false
      }
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>
      )
    })

    it('renders username', () => {
      expect(wrapper.find('.profile-header').text()).toContain('Hi, Jane')
    })

    it('logos link to the correct page', () => {
      expect(wrapper.find('.Header__appii').find({ href: ROUTE_URL.home }).length)
        .toEqual(1)
    })
  })

  describe('when user is logged out', () => {
    beforeEach(() => {
      const props = {
        user: { first_name: 'Jane' },
        isLoggedIn: false,
        organisations: [],
        responsive: false,
        hasNotification: false
      }
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>
      )
    })

    it('does not render username', () => {
      expect(wrapper.find('.profile-header').length).toEqual(0)
    })

    it('logos link to the correct page', () => {
      expect(wrapper.find('.Header__appii').find({ href: ROUTE_URL.publicSiteHome }).length)
        .toEqual(1)
    })
  })
})
