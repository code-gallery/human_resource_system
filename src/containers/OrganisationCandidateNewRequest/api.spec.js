import isObject from 'lodash/isObject'
import { getOrganisationConfig } from './api'
import { isPromise } from 'test/utils/isPromise'

describe('getOrganisationConfig', () => {
  const orgId = 10
  const result = getOrganisationConfig(orgId)

  it('returns a Promise', () => {
    const expected = true
    const actual = isPromise(result)

    expect(actual).toEqual(expected)
  })

  describe('Resolved Promise', () => {
    xit('returns a object', async () => {
      expect.assertions(1)
      const expected = true
      const actual = isObject(await result)

      expect(actual).toEqual(expected)
    })
  })
})
