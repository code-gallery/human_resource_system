import { fetch, fetchEmployees, fetchAdmins, fetchVerifiedStudents, save } from './reducer'
import { fetchReference } from 'store/reference'
import { setEditMode } from 'store/layout'
import { mapState, mapDispatch } from './index'

describe('containers/Login/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        organisation: 'organisationObject',
        reference: 'referenceObject'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        organisation: 'organisationObject',
        reference: 'referenceObject'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetch: expect.any(Function),
        fetchEmployees: expect.any(Function),
        fetchAdmins: expect.any(Function),
        fetchVerifiedStudents: expect.any(Function),
        fetchReference: expect.any(Function),
        save: expect.any(Function),
        setEditMode: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetch('data')
      expect(spy).toHaveBeenCalledWith(fetch('data'))
    })

    it('calls "fetchEmployees" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchEmployees('data')
      expect(spy).toHaveBeenCalledWith(fetchEmployees('data'))
    })

    it('calls "fetchAdmins" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchAdmins('data')
      expect(spy).toHaveBeenCalledWith(fetchAdmins('data'))
    })

    it('calls "fetchVerifiedStudents" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchVerifiedStudents('data')
      expect(spy).toHaveBeenCalledWith(fetchVerifiedStudents('data'))
    })

    it('calls "fetchReference" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchReference()
      expect(spy).toHaveBeenCalledWith(fetchReference())
    })

    it('calls "save" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.save('data')
      expect(spy).toHaveBeenCalledWith(save('data'))
    })

    it('calls "setEditMode" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setEditMode('data')
      expect(spy).toHaveBeenCalledWith(setEditMode('data'))
    })
  })
})
