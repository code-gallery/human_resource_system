import React from 'react'
import renderer from 'react-test-renderer'
import ChevronUp from './ChevronUp'

describe('ChevronUp Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ChevronUp color="#000" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
