import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import EditProfile from './index'

describe('containers/Profile/components/.../EditProfile', () => {
  describe('with no validation errors', () => {
    it('renders correctly', () => {
      const props = {
        user: {
          first_name: 'Jane',
          last_name: 'Doe'
        },
        onChangeProfileField: jest.fn(),
        invalidFields: []
      }
      const tree = renderer.create(
        <EditProfile {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with validation errors', () => {
    it('renders correctly', () => {
      const props = {
        user: {
          first_name: '',
          last_name: ''
        },
        onChangeProfileField: jest.fn(),
        invalidFields: [ 'first_name', 'last_name' ]
      }
      const tree = renderer.create(
        <EditProfile {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<EditProfile />', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        user: {},
        onChangeProfileField: jest.fn(),
        invalidFields: []
      }
      wrapper = shallow(
        <EditProfile {...props} />
      )
    })

    describe('when "first_name" changes', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const event = { target: { type: 'text', value: 'Jane' } }
        wrapper.find('[name="first_name"]').simulate('change', event)
        expect(props.onChangeProfileField).toHaveBeenCalledWith('first_name', 'Jane')
      })
    })

    describe('when "last_name" changes', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const event = { target: { type: 'text', value: 'Doe' } }
        wrapper.find('[name="last_name"]').simulate('change', event)
        expect(props.onChangeProfileField).toHaveBeenCalledWith('last_name', 'Doe')
      })
    })

    describe('when "tagline" changes', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const event = { target: { type: 'text', value: 'Lorem ipsum dolor' } }
        wrapper.find('[name="tagline"]').simulate('change', event)
        expect(props.onChangeProfileField).toHaveBeenCalledWith('tagline', 'Lorem ipsum dolor')
      })
    })

    describe('when "public_email" changes', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const event = { target: { type: 'text', value: 'ab@appliedblockchain.com' } }
        wrapper.find('[name="public_email"]').simulate('change', event)
        expect(props.onChangeProfileField).toHaveBeenCalledWith('public_email', 'ab@appliedblockchain.com')
      })
    })

    describe('when "mobile" changes', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const event = { target: { type: 'text', value: '077000' } }
        wrapper.find('[name="mobile"]').simulate('change', event)
        expect(props.onChangeProfileField).toHaveBeenCalledWith('mobile', '077000')
      })
    })

    describe('when "dob" changes', () => {
      it('calls props.onChangeProfileField correctly', () => {
        const event = { format: function() {
          return '21/09/2016'
        } }
        wrapper.find('[name="dob"]').simulate('change', event)
        expect(props.onChangeProfileField).toHaveBeenCalledWith('dob', '21/09/2016')
      })
    })
  })
})
