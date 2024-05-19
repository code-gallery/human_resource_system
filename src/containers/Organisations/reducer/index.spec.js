import reducer, {
  ACTIONS,
  fetch,
  setCurrentPage,
  setSearchQuery
} from './index.js'

describe('reducer: containers/Organisations/reducer', () => {
  describe('Action Creators', () => {
    describe('fetch', () => {
      it('returns the correct action', () => {
        const payload = { currentPage: 1, perPage: 10 }
        const action = fetch(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH,
          payload
        })
      })
    })

    describe('setCurrentPage', () => {
      it('returns the correct action', () => {
        const currentPage = 3
        const action = setCurrentPage(currentPage)
        expect(action).toEqual({
          type: ACTIONS.SET_CURRENT_PAGE,
          currentPage
        })
      })
    })

    describe('setSearchQuery', () => {
      it('returns the correct action', () => {
        const action = setSearchQuery('hello')
        expect(action).toEqual({
          type: ACTIONS.SET_SEARCH_QUERY,
          q: 'hello'
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        total: 0,
        perPage: 24,
        currentPage: 1,
        q: '',
        data: []
      })
    })

    describe('LOAD_SUCCESS', () => {
      it('when state is undefined', () => {
        const payload = {
          currentPage: 2,
          total: 30,
          perPage: 24,
          lastPage: 2,
          data: [ 'organisations list' ]
        }
        const newState = reducer(void 0, {
          type: ACTIONS.LOAD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...payload,
          q: ''
        })
      })
    })

    describe('SET_CURRENT_PAGE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_CURRENT_PAGE,
          currentPage: 3
        })

        expect(newState.currentPage).toEqual(3)
      })
    })

    describe('SET_SEARCH_QUERY', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_SEARCH_QUERY,
          q: 'hello'
        })

        expect(newState.currentPage).toEqual(1)
        expect(newState.q).toEqual('hello')
        expect(newState.total).toEqual(0)
        expect(newState.data).toEqual([])
      })
    })
  })
})
