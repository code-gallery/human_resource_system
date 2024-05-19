import { fetchOrgAdmins, fetchOrgEmployees, addAdmin, deleteAdmin } from './reducer'
import { mapState, mapDispatch } from './connect'

describe('containers/OrgAdmins/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        orgAdmins: 'orgAdminObject'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        orgAdmins: 'orgAdminObject'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetchOrgAdmins: expect.any(Function),
        fetchOrgEmployees: expect.any(Function),
        deleteAdmin: expect.any(Function),
        addAdmin: expect.any(Function)
      }))
    })

    it('calls "fetchOrgAdmins" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchOrgAdmins('orgId')
      expect(spy).toHaveBeenCalledWith(fetchOrgAdmins('orgId'))
    })

    it('calls "fetchOrgEmployees" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchOrgEmployees('orgId')
      expect(spy).toHaveBeenCalledWith(fetchOrgEmployees('orgId'))
    })

    it('calls "deleteAdmin" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      const data = {
        orgId: 'orgId',
        adminId: 'adminId',
        userId: 'userId'
      }
      dispatcher.deleteAdmin(data)
      expect(spy).toHaveBeenCalledWith(deleteAdmin(data))
    })

    it('calls "addAdmin" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      const data = {
        orgId: 'orgId',
        user_id: 'userId',
        primary: true
      }
      dispatcher.addAdmin(data)
      expect(spy).toHaveBeenCalledWith(addAdmin(data))
    })
  })
})
