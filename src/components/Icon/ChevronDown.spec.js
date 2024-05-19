import React from 'react'
import renderer from 'react-test-renderer'
import ChevronDown from './ChevronDown'

describe('ChevronDown Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ChevronDown color="#000" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
