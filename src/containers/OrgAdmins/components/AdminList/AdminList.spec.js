import React from 'react'
import renderer from 'react-test-renderer'
import AdminList from './AdminList'

describe('containers/OrgAdmins/components/AdminItem/AdminItem', () => {
  const commonProps = {
    data: [],
    deleteAdmin: jest.fn()
  }

  describe('when props.data=[]', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <AdminList {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.data is valid', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps, data: [
          {
            organisation_id: 'orgid1',
            id: 'id1',
            primary: 'primary1',
            user: {
              id: 'userid1',
              profile_image: 'http://angular.github.io/react-native-renderer/assets/angular.png'
            }
          },
          {
            organisation_id: 'orgid2',
            id: 'id2',
            primary: 'primary2',
            user: {
              id: 'userid2',
              profile_image: 'http://angular.github.io/react-native-renderer/assets/react.png'
            }
          }
        ]
      }
      const tree = renderer.create(
        <AdminList {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
