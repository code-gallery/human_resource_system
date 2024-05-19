import React from 'react'
import renderer from 'react-test-renderer'
import Appii from './Appii'

describe('Appii Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Appii color="#000" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
