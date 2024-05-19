import httpFetch from 'utils/httpFetch'
import { takeLatest, call, put } from 'redux-saga/effects'
import { ACTIONS } from './reducer.js'
import { fetchChecksdetails, watchfetchChecksdetails } from './saga.js'
import { getApiUrl } from 'containers/constants'


describe('watchfetchChecksdetails', () => {
  it('runs fetchChecksdetails Saga for latest FETCH_CHECK_DETAILS action', () => {
    const gen = watchfetchChecksdetails()
    const expected = takeLatest(ACTIONS.FETCH_CHECK_DETAILS, fetchChecksdetails)
    const actual = gen.next().value
    expect(actual).toEqual(expected)
  })
})


describe('containers/Profile/saga', () => {
  describe('fetchChecksdetails work_gaps', () => {
    const payload = {
      checkId: 1,
      checkType: 'work_gaps',
      requestId: 2,
      candidateId: 3
    }

    describe('on success work_gaps', () => {
      const gen = fetchChecksdetails(payload)

      it('calls correct API', () => {
        let checkId = '1'
        let checkType = 'work_gaps'
        const url = getApiUrl('fetchEmpGapCheckData').replace(':check_id', checkId).replace(':check_type', checkType)
        expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
      })

    })

    describe('Successful response', () => {
      const mockResponse = {
        status: 'success',
        data: {
          check_data: {}
        }
      }
      const gen = fetchChecksdetails(payload)
      gen.next()
      const dispatchedAction = gen.next(mockResponse).value
      it('dispatches action to save checks to the store', () => {
        const expected = put({ type: '@appii/fetchCheck/FETCH_CHECK_DETAILS_SUCCESS', payload: { data: { check_data: {} }, "status": "success" } })
        const actual = dispatchedAction
        expect(actual).toEqual(expected)
      })
    })
  })


  describe('fetchChecksdetails employment_verfication', () => {
    const payload = {
      checkId: 1,
      checkType: 'employment_verfication',
      requestId: 2,
      candidateId: 3
    }

    describe('on success employment_verfication', () => {
      const gen = fetchChecksdetails(payload)

      it('calls correct API', () => {
        let checkId = 1
        let checkType = 'employment_verfication'
        let requestId = 2
        let candidateId = 3
        let orgId = 4
        const url = getApiUrl('fetchEmpGapCheckData').replace(':org_id', orgId).replace(':candidate_id', candidateId).replace(':request_id', requestId).replace(':check_id', checkId).replace(':check_type', checkType)
        const actual = gen.next().value
        expect(actual).toEqual(httpFetch(url, { method: 'GET' }))
      })
    })

    describe('Successful response', () => {
      const mockResponse = {
        status: 'success',
        data: {
          check_data: {}
        }
      }
      const gen = fetchChecksdetails(payload)
      gen.next()
      const dispatchedAction = gen.next(mockResponse).value
      it('dispatches action to save checks to the store', () => {
        const expected = put({ type: '@appii/fetchCheck/FETCH_CHECK_DETAILS_SUCCESS', payload: {} })
        const actual = dispatchedAction
        expect(actual).toEqual(expected)
      })
    })
  })


  describe('fetchChecksdetails employment_reference', () => {
    const payload = {
      checkId: 1,
      checkType: 'employment_reference',
      requestId: 2,
      candidateId: 3
    }

    describe('on success employment_reference', () => {
      const gen = fetchChecksdetails(payload)

      it('calls correct API', () => {
        let checkId = 1
        let checkType = 'employment_reference'
        let requestId = 2
        let candidateId = 3
        let orgId = 4
        const url = getApiUrl('fetchCheckData').replace(':org_id', orgId).replace(':candidate_id', candidateId).replace(':request_id', requestId).replace(':check_id', checkId).replace(':check_type', checkType)
        const actual = takeLatest(gen.next().value)
        const expected = takeLatest(httpFetch(url, { method: 'GET' }))
        expect(actual).toEqual(expected)
      })

      describe('Successful response', () => {
        const mockResponse = {
          status: 'success',
          data: {
            check_data: {}
          }
        }
        const gen = fetchChecksdetails(payload)
        gen.next()
        const dispatchedAction = gen.next(mockResponse).value
        it('dispatches action to save checks to the store', () => {
          const expected = put({ type: '@appii/fetchCheck/FETCH_CHECK_DETAILS_SUCCESS', payload: {} })
          const actual = dispatchedAction
          console.log("expected", expected)
          console.log("actual", actual)
          expect(actual).toEqual(expected)
        })
      })

    })
  })
})




