import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import AdminItem from './AdminItem'

describe('containers/OrgAdmins/components/AdminItem/AdminItem', () => {
  const props = {
    item: {
      organisation_id: 'orgId1',
      id: 'id1',
      primary: 'primary',
      user: {
        id: 'userid1',
        profile_image: 'http://angular.github.io/react-native-renderer/assets/react.png'
      }
    },
    deleteAdmin: jest.fn()
  }

  describe('when props.item and props.deleteAdmin are empty  ', () => {
    it('renders correctly', () => {
      const props = {
        item: {
          organisation_id: '',
          id: '',
          primary: '',
          user: {
            id: '',
            profile_image: ''
          }
        },
        deleteAdmin: jest.fn()
      }
      const tree = renderer.create(
        <AdminItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.item and props.deleteAdmin are valid  ', () => {
    it('renders correctly', () => {

      const tree = renderer.create(
        <AdminItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.item.primary = 1', () => {
    it('renders "Yes"', () => {
      props.item.primary = true
      const wrapper = shallow(
        <AdminItem {...props} />
      )
      expect(wrapper.find('p').text()).toEqual('Yes')
    })
  })

  describe('when props.item.primary = null', () => {
    it('renders "No"', () => {
      props.item.primary = null
      const wrapper = shallow(
        <AdminItem {...props} />
      )
      expect(wrapper.find('p').text()).toEqual('No')
    })
  })

  describe('when props.item.primary = 0', () => {
    it('renders "No"', () => {
      props.item.primary = 0
      const wrapper = shallow(
        <AdminItem {...props} />
      )
      expect(wrapper.find('p').text()).toEqual('No')
    })
  })

  describe('when button.click = true', () => {
    it('calls deleteAdmin correctly', () => {
      const wrapper = shallow(
        <AdminItem {...props} />
      )
      wrapper.find('[className="btn red-btn"]').simulate('click', { preventDefault: jest.fn() })
      expect(props.deleteAdmin).toHaveBeenCalled()
    })
  })
})
