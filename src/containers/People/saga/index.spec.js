import { put } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { fetch } from './index'
import { getApiUrl } from 'containers/constants'
import { ACTIONS } from '../reducer'

describe('containers/Peope/saga', () => {
  describe('fetch', () => {
    const payload = {
      currentPage: 1,
      perPage: 50,
      q: 'Gary'
    }

    describe('on success', () => {
      const gen = fetch({ payload })

      it('calls correct API', () => {
        const url = `${getApiUrl('users')}?bioOnly=1&perPage=50&page=1`
        expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
      })

      it('triggers the correct action', () => {
        expect(gen.next({ data: 'peopleData' }).value).toEqual(put({
          type: ACTIONS.LOAD_SUCCESS,
          payload: 'peopleData'
        }))
      })
    })
  })
})
