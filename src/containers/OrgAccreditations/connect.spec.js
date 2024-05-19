import { fetch, deleteAccreditation, saveAccreditation } from './reducer'
import { mapState, mapDispatch } from './connect'

describe('containers/OrgAccreditations/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        auth: {
          pending: false,
          organisations: [ { id: 12 } ]
        },
        orgAccreditations: 'orgAccreditations'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        pending: false,
        organisations: [ { id: 12 } ],
        orgAccreditations: 'orgAccreditations'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetch: expect.any(Function),
        deleteAccreditation: expect.any(Function),
        saveAccreditation: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetch('data')
      expect(spy).toHaveBeenCalledWith(fetch('data'))
    })

    it('calls "deleteAccreditation" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.deleteAccreditation('data')
      expect(spy).toHaveBeenCalledWith(deleteAccreditation('data'))
    })

    it('calls "saveAccreditation" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.saveAccreditation('data')
      expect(spy).toHaveBeenCalledWith(saveAccreditation('data'))
    })
  })
})
