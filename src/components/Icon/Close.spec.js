import React from 'react'
import renderer from 'react-test-renderer'
import Close from './Close'

describe('Close Icon', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Close color="#000" />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
