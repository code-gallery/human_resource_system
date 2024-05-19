import React from 'react'
import renderer from 'react-test-renderer'
import Button from './index'

describe('<Button />', () => {
  const props = {
    onClick: jest.fn()
  }

  it('renders correctly', () => {
    const tree = renderer.create(
      <Button {...props}>Click Me</Button>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
