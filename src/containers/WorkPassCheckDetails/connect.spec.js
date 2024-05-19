import { fetchChecksDetails, resetCheckDetails } from './reducer'
import { mapStateToProps, mapDispatchToProps } from './connect'

describe('containers/UserVerifications/connect', () => {
  describe('mapStateToProps', () => {
    let state
    let match
    let candidate
    beforeEach(() => {
      let getRequest = jest.fn()
      state = {
        organisationBalance : 'organisationBalance',
        candidate :  {
          entity : '1',
          isFetching : false,
          getRequest : getRequest
      },
        fetchingCandidate: 'candidate.isFetching',
        error: 'candidate.error',
        checksDetails: 'checksDetails.checksDetails',
        pendingData : 'checksDetails.pendingData',
        request: {candidate : getRequest()},
        
      }
      match = {
        params : {
            requestId : 1
        }
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapStateToProps({state}, { match })).toEqual({
        organisationBalance: state.organisationBalance,
        candidate: state.candidate.entity,
        fetchingCandidate: state.candidate.isFetching,
        error: state.candidate.error,
        request: state.request,
        checksDetails: state.checksDetails,
        pendingData : state.checksDetails.pendingData
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('returns correct functions', () => {
      expect(mapDispatchToProps(() => {})).toEqual(expect.objectContaining({
        resetCheckDetails: expect.any(Function),
        fetchChecksDetails: expect.any(Function)
      }))
    })

    it('calls "fetch" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatchToProps(spy)
      dispatcher.fetchChecksDetails()
      expect(spy).toHaveBeenCalledWith(fetchChecksDetails())
    })
    it('calls "fetch" correctly', () => {
        const spy = jest.fn()
        const dispatcher = mapDispatchToProps(spy)
        dispatcher.resetCheckDetails()
        expect(spy).toHaveBeenCalledWith(resetCheckDetails())
      })
  })
})
