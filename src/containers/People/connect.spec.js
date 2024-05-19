import { setSearchQuery, setCurrentPage, fetch } from './reducer'
import { mapState, mapDispatch } from './connect'

describe('containers/People/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        people: 'peopleObject'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        people: 'peopleObject'
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
      dispatcher.setCurrentPage(4)
      expect(spy).toHaveBeenCalledWith(setCurrentPage(4))
    })

    it('calls "setSearchQuery" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setSearchQuery('applied')
      expect(spy).toHaveBeenCalledWith(setSearchQuery('applied'))
    })
  })
})
