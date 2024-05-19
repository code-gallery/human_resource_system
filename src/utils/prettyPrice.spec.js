import prettyPrice from './prettyPrice'

describe('prettyPrice', () => {
  it('returns a string', () => {
    const expected = 'string'
    const actual = typeof prettyPrice('100')

    expect(actual).toEqual(expected)
  })

  it('returns a formated price', () => {
    const expected = '£1.00'
    const actual = prettyPrice('100')

    expect(actual).toEqual(expected)
  })
})
