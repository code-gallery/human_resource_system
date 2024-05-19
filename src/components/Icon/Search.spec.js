import React from 'react'
import renderer from 'react-test-renderer'
import Search from './Search'

describe('Search Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Search color="#000" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
