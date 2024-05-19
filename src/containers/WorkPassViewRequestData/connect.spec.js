import { mapStateToProps, mapDispatchToProps } from './connect'
import { connect } from 'react-redux'
import { getRequest, requestCandidate } from '../OrganisationCandidate/reducer'

describe('containers/UserVerifications/connect', () => {
    describe('mapStateToProps', () => {
      let state
      let match
      beforeEach(() => {
        match = {
          params : {
            requestId : 1
          }
        }
        state = {
            candidate: getRequest[match.params.requestId],
            request: 'request',
            match : {
              params : {
                requestId : 1
              }
            }
            
        }
        
       
      })
  
      it('returns a correctly mapped state', () => {
        
        expect(mapStateToProps(state, match)).toEqual({
            candidate: state.candidate,
            request: state.request,
            match: state.match
        })
      })
    })
  
    describe('mapDispatchToProps', () => {
      it('returns correct functions', () => {
        expect(mapDispatchToProps(() => {})).toEqual(expect.objectContaining({
            getRequest: expect.any(Function),
            requestCandidate: expect.any(Function)
        }))
      })
  
      it('calls "requestCandidate" correctly', () => {
        const spy = jest.fn()
        const dispatcher = mapDispatchToProps(spy)
        dispatcher.requestCandidate()
        expect(spy).toHaveBeenCalledWith(requestCandidate())
      })
      it('calls "getRequest" correctly', () => {
        const spy = jest.fn()
        const dispatcher = mapDispatchToProps(spy)
        dispatcher.getRequest()
        expect(spy).toHaveBeenCalledWith(getRequest())
      })
    })
  })