import React from 'react'
import { shallow } from 'enzyme'
import StatusBadge from './StatusBadge'

describe('<StatusBadge />', () => {
  let wrapper
  describe('when showLabel is false', () => {
    describe('by default status is "unverified"', () => {
      beforeEach(() => {
        wrapper = shallow(
          <StatusBadge />
        )
      })

      it('renders correct badge', () => {
        expect(wrapper.find('img[alt="Unverified on profile"]').length)
          .toEqual(1)
        expect(wrapper.find('.StatusBadge-unverified').length)
          .toEqual(1)
      })

      it('renders no label', () => {
        expect(wrapper.find('.StatusBadge').text())
          .not.toContain('Unverified on profile')
      })
    })

    describe('status "pending"', () => {
      beforeEach(() => {
        wrapper = shallow(
          <StatusBadge type="pending" />
        )
      })

      it('renders correct badge', () => {
        expect(wrapper.find('img[alt="Pending"]').length)
          .toEqual(1)
        expect(wrapper.find('.StatusBadge-pending').length)
          .toEqual(1)
      })

      it('renders no label', () => {
        expect(wrapper.find('.StatusBadge').text())
          .not.toContain('Pending')
      })
    })
  })

  describe('when showLabel is true', () => {
    describe('status "accepted"', () => {
      beforeEach(() => {
        wrapper = shallow(
          <StatusBadge type="accepted" showLabel={true} />
        )
      })

      it('renders correct badge', () => {
        expect(wrapper.find('img[alt="Request confirmed"]').length)
          .toEqual(1)
        expect(wrapper.find('.StatusBadge-accepted').length)
          .toEqual(1)
      })

      it('renders no label', () => {
        expect(wrapper.find('.StatusBadge').text())
          .toContain('Request confirmed')
      })
    })
  })
})
