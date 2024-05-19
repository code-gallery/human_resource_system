import React from 'react'
import renderer from 'react-test-renderer'
import CaretDown from './CaretDown'

describe('CaretDown Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CaretDown color="#000" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
