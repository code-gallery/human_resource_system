import { fetch, setCurrentPage, setSearchQuery } from './reducer'
import { mapState, mapDispatch } from './connect'

describe('containers/Organisations/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        organisations: 'organisations'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        organisations: 'organisations'
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetch: expect.any(Function),
        setCurrentPage: expect.any(Function),
        setSearchQuery: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetch('data')
      expect(spy).toHaveBeenCalledWith(fetch('data'))
    })

    it('calls "setCurrentPage" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setCurrentPage('currentPage')
      expect(spy).toHaveBeenCalledWith(setCurrentPage('currentPage'))
    })

    it('calls "setSearchQuery" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setSearchQuery('query')
      expect(spy).toHaveBeenCalledWith(setSearchQuery('query'))
    })
  })
})
