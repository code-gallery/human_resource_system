import { mapState, mapDispatch } from './connect'

describe('containers/OrganisationCandidates/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        candidates: {
          candidates: 'candidates',
          isFetching: true,
          error: ''
        }
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        candidates: 'candidates',
        loading: true,
        error: ''
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch).toEqual(expect.objectContaining({
        requestCandidates: expect.any(Function),
        resetCandidates: expect.any(Function)
      }))
    })
  })
})
