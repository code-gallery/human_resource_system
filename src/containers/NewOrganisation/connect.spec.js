import { saveStorage } from 'store/storage'
import { mapState, mapDispatch } from './index'

describe('containers/NewOrganisation/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        storage: 'storageObject'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        storage: 'storageObject'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        saveStorage: expect.any(Function)
      }))
    })

    it('calls "saveStorage" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.saveStorage('data')
      expect(spy).toHaveBeenCalledWith(saveStorage('data'))
    })
  })
})
