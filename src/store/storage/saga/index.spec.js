import { takeEvery, call, put, all } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { getApiUrl } from 'containers/constants'
import { ACTIONS } from '../index'
import rootSaga, { watchSaveStorage, saveStorage } from '.'

/**
 Root Saga
 */
describe('Root saga', () => {
  const gen = rootSaga()

  it('runs all watchers', () => {
    const expected = all([ watchSaveStorage() ])
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

/**
 Watcher Saga's
 */
describe('watchSaveStorage saga', () => {
  const gen = watchSaveStorage()

  it('takes latest SAVE action and runs the correct Saga', () => {
    const expected = takeEvery(ACTIONS.SAVE, saveStorage)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

/**
 Worker Saga's
 */
describe('saveStorage saga', () => {
  const action = {
    type: ACTIONS.SAVE,
    payload: {}
  }

  it('calls fetch with the correct endpoint & options', () => {
    const gen = saveStorage(action)
    const expected = call(
      httpFetch,
      getApiUrl('storage'),
      {
        method: 'POST',
        body: JSON.stringify(action.payload)
      }
    )
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })

  describe('when status = success', () => {
    const gen = saveStorage(action)
    gen.next()

    it('dispatches a SAVE_SUCCESS action', () => {
      const expected = put({
        type: ACTIONS.SAVE_SUCCESS
      })
      const actual = gen.next({ status: 'success' }).value

      expect(actual).toEqual(expected)
    })
  })

  describe('when status != success', () => {
    const gen = saveStorage(action)
    gen.next()

    it('dispatches a SAVE_ERROR action', () => {
      const expected = put({
        type: ACTIONS.SAVE_ERROR
      })
      const actual = gen.next({ status: 'error' }).value

      expect(actual).toEqual(expected)
    })
  })
})
