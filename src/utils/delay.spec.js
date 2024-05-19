import { delay } from './delay'
import { isPromise } from 'test/utils/isPromise'

describe('delay()', () => {
  const result = delay(0)

  it('returns a promise', () => {
    const expected = true
    const actual = isPromise(result)

    expect(actual).toEqual(expected)
  })
})
