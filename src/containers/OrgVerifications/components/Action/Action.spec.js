import React from 'react'
import { shallow } from 'enzyme'
import Action from './Action'

describe('containers/OrgVerifications/components/Action', () => {
  let wrapper
  const commonProps = {
    id: 126,
    onVerify: jest.fn(),
    onConfirm: jest.fn(),
    toggle: jest.fn(),
    reasonError: false
  }

  describe('when props.showReason = false', () => {
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        showReason: false
      }

      wrapper = shallow(
        <Action {...props} />
      )
    })

    it('renders verify and reject buttons', () => {
      const buttons = wrapper.find('button')
      expect(buttons.length).toEqual(2)
      expect(buttons.nodes[0].props.children).toContain('Verify')
      expect(buttons.nodes[1].props.children).toContain('Reject')
    })

    describe('when user clicks "Verify" button', () => {
      it('props.onVerify is called correctly', () => {
        wrapper.find('button[data-verify]').simulate('click')
        expect(props.onVerify).toHaveBeenCalledWith(126)
      })
    })

    describe('when user clicks "Reject" button', () => {
      it('props.toggle is called correctly', () => {
        wrapper.find('button[data-reject]').simulate('click')
        expect(props.toggle).toHaveBeenCalled()
      })
    })
  })

  describe('when props.showReason = true', () => {
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        showReason: true
      }

      wrapper = shallow(
        <Action {...props} />
      )
    })

    it('renders cancel and confirm buttons', () => {
      const buttons = wrapper.find('button')
      expect(buttons.length).toEqual(2)
      expect(buttons.nodes[0].props.children).toContain('Cancel')
      expect(buttons.nodes[1].props.children).toContain('Confirm')
    })

    describe('when user clicks "Confirm" button', () => {
      it('props.onConfirm is called correctly', () => {
        wrapper.find('button[data-confirm]').simulate('click')
        expect(props.onConfirm).toHaveBeenCalled()
      })
    })

    describe('when user clicks "Cancel" button', () => {
      it('props.toggle is called correctly', () => {
        wrapper.find('button[data-cancel]').simulate('click')
        expect(props.toggle).toHaveBeenCalled()
      })
    })

    describe('when props.reasonError = true', () => {
      it('renders error message', () => {
        wrapper.setProps({ reasonError: true })
        expect(wrapper.find('.message.has-error').length).toEqual(1)
      })
    })
  })
})
