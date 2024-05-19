import { isPromise } from './isPromise'

describe('isPromise()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isPromise(10)

    expect(actual).toEqual(expected)
  })

  it('should return true when value is a Promise', () => {
    const promise = Promise.resolve(10)

    const expected = true
    const actual = isPromise(promise)

    expect(actual).toEqual(expected)
  })

  it('should return false when value is NOT a Promise', () => {
    const vals = [
      1,
      'foobar',
      Symbol('foobar'),
      true,
      {},
      () => { },
      {
        then() { },
        catch() { }
      }
    ]

    vals.forEach((val) => {
      const expected = false
      const actual = isPromise(val)

      expect(actual).toEqual(expected)
    })
  })
})
