import { getCandidates } from './service'
import { isPromise } from 'test/utils/isPromise'

describe('getCandidates', () => {
  it('returns a Promise', () => {
    const expected = true
    const actual = isPromise(getCandidates(1))

    expect(actual).toEqual(expected)
  })

  describe('Resolved Promise', () => {
    /** @TODO: mock fetch for this to work */
    xit('is a instance of Array', async () => {
      expect.assertions(1)
      const result = await getCandidates(1)

      const expected = true
      const actual = Array.isArray(result)

      expect(actual).toEqual(expected)
    })
  })
})
