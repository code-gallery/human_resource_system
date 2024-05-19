import { put } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { fetch } from './index'
import { getApiUrl } from 'containers/constants'
import { ACTIONS } from '../reducer'

describe('containers/Organisations/saga', () => {
  describe('fetch', () => {
    describe('when q = ""', () => {
      const payload = {
        currentPage: 1,
        perPage: 0,
        q: ''
      }
      const gen = fetch({ payload })

      it('calls correct API', () => {
        const url = `${getApiUrl('organisations')}?perPage=50&page=1`
        expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
      })

      it('triggers the correct action', () => {
        expect(gen.next({ data: 'orgData' }).value).toEqual(put({
          type: ACTIONS.LOAD_SUCCESS,
          payload: 'orgData'
        }))
      })
    })

    describe('when q = "APPII"', () => {
      const payload = {
        currentPage: 1,
        perPage: 0,
        q: 'APPII'
      }
      const gen = fetch({ payload })

      it('calls correct API', () => {
        const url = `${getApiUrl('organisationsSearch')}?q=APPII`
        expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
      })

      it('triggers the correct action', () => {
        expect(gen.next({ hello: 'world' }).value).toEqual(put({
          type: ACTIONS.LOAD_SUCCESS,
          payload: {
            data: { hello: 'world' }
          }
        }))
      })
    })
  })
})
