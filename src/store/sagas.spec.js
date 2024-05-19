import rootSaga from './sagas'

/**
 Root Saga
 */

/**
 @TODO: Write a better test to check the right watchers are called
 */
describe('Root Saga', () => {
  const gen = rootSaga()

  it('calls correct number of watchers', () => {
    const expected = 20
    const actual = gen.next().value.ALL.length

    expect(actual).toEqual(expected)
  })
})
