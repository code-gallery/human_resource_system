import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import AdminForm from './AdminForm'

describe('containers/OrgAdmins/components/AdminForm/AdminForm', () => {
  let fullProps
  let commonProps

  beforeEach(() => {
    commonProps = {
      closeForm: jest.fn(),
      addAdmin: jest.fn()
    }
    fullProps = {
      ...commonProps,
      showForm: true,
      orgId: '142',
      employees: []
    }
  })

  describe('when props.showForm is false', () => {
    it('renders null', () => {
      const tree = renderer.create(
        <AdminForm {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.showForm is true', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <AdminForm {...fullProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<AdminForm', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(
        <AdminForm {...fullProps} />
      )
      jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
    })

    describe('optionRenderer', () => {
      it('renders correct element', () => {
        const option = {
          profile_image: 'profile_image',
          first_name: 'Jane',
          last_name: 'Doe'
        }

        const tree = renderer.create(
          wrapper.instance().optionRenderer(option)
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('selectAdmin', () => {
      describe('when value is valid', () => {
        it('returns correctly', () => {
          const user = 'user1'
          wrapper.instance().selectAdmin(user)
          expect(wrapper.state()).toEqual(expect.objectContaining({
            selectedAdmin: {
              user: user
            }
          }))
        })
      })
    })

    describe('isSelectedAdminPrimary', () => {
      describe('when value is valid', () => {
        it('returns correctly', () => {
          const value = 'primary1'
          wrapper.instance().isSelectedAdminPrimary(value)
          expect(wrapper.state().selectedAdmin).toEqual(expect.objectContaining({
            primary: value
          }))
        })
      })
    })

    describe('addAdminHandler', () => {
      describe('when state.selectedAdmin.user is not valid', () => {
        it('shows an error notification', () => {
          wrapper.instance().addAdminHandler({ preventDefault: jest.fn() })
          expect(wrapper.instance().notifyFn)
            .toHaveBeenCalledWith(expect.any(String), 'error')
        })
      })

      describe('when state.selectedAdmin.user is valid', () => {
        it('calls props.addAdmin correctly (1)', () => {
          const state = {
            selectedAdmin:
              {
                user: { id: 'userid1' },
                primary: { label: 'Yes' }
              }
          }
          wrapper.setState(state)
          wrapper.instance().addAdminHandler({ preventDefault: jest.fn() })
          expect(fullProps.addAdmin)
            .toHaveBeenCalledWith({
              orgId: fullProps.orgId,
              user_id: state.selectedAdmin.user.id,
              primary: true
            })
        })

        it('calls props.addAdmin correctly (2)', () => {
          const state = {
            selectedAdmin:
              {
                user: { id: 'userid1' },
                primary: { label: 'No' }
              }
          }
          wrapper.setState(state)
          wrapper.instance().addAdminHandler({ preventDefault: jest.fn() })
          expect(fullProps.addAdmin)
            .toHaveBeenCalledWith({
              orgId: fullProps.orgId,
              user_id: state.selectedAdmin.user.id,
              primary: false
            })
        })
      })
    })
  })
})
