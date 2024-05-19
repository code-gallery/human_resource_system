import { put } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { fetch, acceptVerification, declineVerification } from './index'
import { ACTIONS } from '../reducer'

describe('containers/OrgVerifications/saga', () => {
  describe('fetch', () => {
    const payload = {
      orgId: 130
    }
    const gen = fetch({ payload })

    it('calls correct API', () => {
      const url = '/organisations/130/verifications'
      expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
    })

    it('triggers the correct action', () => {
      expect(gen.next({ data: 'orgVerificationData' }).value).toEqual(put({
        type: ACTIONS.FETCH_SUCCESS,
        payload: 'orgVerificationData'
      }))
    })
  })

  describe('acceptVerification', () => {
    const payload = {
      orgId: 130,
      id: 12
    }

    describe('when success', () => {
      const gen = acceptVerification({ payload })

      it('calls correct API', () => {
        const url = '/organisations/130/verifications/12'
        expect(gen.next(payload).value).toEqual(
          httpFetch(url, {
            method: 'PUT',
            body: JSON.stringify({
              action: 'accept'
            })
          })
        )
      })

      it('triggers the correct action', () => {
        expect(gen.next({ status: 'success' }).value).toEqual(put({
          type: ACTIONS.ACCEPT_VERIFICATION_SUCCESS,
          payload: { id: 12 }
        }))
      })
    })

    describe('when not success', () => {
      const gen = acceptVerification({ payload })
      gen.next(payload)

      it('triggers no action', () => {
        expect(gen.next({ status: '' }).value).toEqual(void 0)
      })
    })
  })

  describe('declineVerification', () => {
    const payload = {
      orgId: 130,
      id: 12,
      reasons: 'lorem ipsum dolor'
    }

    describe('when success', () => {
      const gen = declineVerification({ payload })

      it('calls correct API', () => {
        const url = '/organisations/130/verifications/12'
        expect(gen.next(payload).value).toEqual(
          httpFetch(url, {
            method: 'PUT',
            body: JSON.stringify({
              action: 'decline',
              reasons: 'lorem ipsum dolor'
            })
          })
        )
      })

      it('triggers the correct action', () => {
        expect(gen.next({ status: 'success' }).value).toEqual(put({
          type: ACTIONS.DECLINE_VERIFICATION_SUCCESS,
          payload: { id: 12 }
        }))
      })
    })

    describe('when not success', () => {
      const gen = declineVerification({ payload })
      gen.next(payload)

      it('triggers no action', () => {
        expect(gen.next({ status: '' }).value).toEqual(void 0)
      })
    })
  })
})
