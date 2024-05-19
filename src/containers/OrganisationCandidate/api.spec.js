import { getCandidate } from './api'
import isObject from 'lodash/isObject'
import { isPromise } from 'test/utils/isPromise'

describe('getCandidate', () => {
  const orgId = 25
  const candidateId = 1
  const result = getCandidate(orgId, candidateId)

  it('returns a promise', () => {
    const expected = true
    const actual = isPromise(result)

    expect(actual).toEqual(expected)
  })

  describe('Resolved Promise', () => {
    xit('returns a object', async () => {
      const expected = true
      const actual = isObject(await result)

      expect(actual).toEqual(expected)
    })
  })
})
