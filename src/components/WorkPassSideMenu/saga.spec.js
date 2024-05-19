import { takeLatest, call, put } from 'redux-saga/effects'
import { watchFetchBalance, fetchBalance } from './saga'
import { ACTIONS, fetchBalance as _fetchBalance, setBalance } from './reducer'
import * as api from './api'

/**
 Watcher Saga's
 */
describe('watchFetchBalance saga', () => {
  const gen = watchFetchBalance()

  it('takes latest FETCH_BALANCE action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.FETCH_BALANCE, fetchBalance)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

/**
 Worker Saga's
 */
describe('fetchBalance saga', () => {
  const orgId = 1
  const action = _fetchBalance(orgId)
  const gen = fetchBalance(action)

  it('calls the api service with organisation ID to get balance', () => {
    const expected = call(api.getOrgBalance, orgId)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })

  it('dispatches an action to store balance', () => {
    const orgId = 1
    const balance = 1000
    const expected = put(setBalance(orgId, balance))
    const actual = gen.next(balance).value

    expect(actual).toEqual(expected)
  })
})
