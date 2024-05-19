import React from 'react'
import { shallow } from 'enzyme'
import StatusInfo from './StatusInfo'

describe('containers/UserVerifications/components/StatusInfo', () => {
  let wrapper
  describe('when all accepted', () => {
    beforeEach(() => {
      const props = {
        item: {
          user_signature: 'ewrrewr',
          organisation_signature: 'ewrewrwr',
          status: 'accepted'
        }
      }
      wrapper = shallow(
        <StatusInfo {...props} />
      )
    })

    it('renders 3 "accepted" StatusBadge', () => {
      expect(wrapper.find('StatusBadge[type="accepted"]').length).toEqual(3)
    })
  })

  describe('when user_signature and organisation_signature are null', () => {
    beforeEach(() => {
      const props = {
        item: {
          user_signature: null,
          organisation_signature: null,
          status: 'accepted'
        }
      }
      wrapper = shallow(
        <StatusInfo {...props} />
      )
    })

    it('renders 2 "unverified" StatusBadge', () => {
      expect(wrapper.find('StatusBadge[type="unverified"]').length).toEqual(2)
    })

    it('renders 1 "accepted" StatusBadge', () => {
      expect(wrapper.find('StatusBadge[type="accepted"]').length).toEqual(1)
    })
  })

  describe('when status is "pending"', () => {
    beforeEach(() => {
      const props = {
        item: {
          user_signature: null,
          organisation_signature: null,
          status: 'pending'
        }
      }
      wrapper = shallow(
        <StatusInfo {...props} />
      )
    })

    it('renders 2 "unverified" StatusBadge', () => {
      expect(wrapper.find('StatusBadge[type="unverified"]').length).toEqual(2)
    })

    it('renders 1 "pending" StatusBadge', () => {
      expect(wrapper.find('StatusBadge[type="pending"]').length).toEqual(1)
    })
  })
})
