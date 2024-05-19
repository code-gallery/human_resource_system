import React from 'react'
import renderer from 'react-test-renderer'
import Avatar from './index'

describe('<Avatar>', () => {
  const props = {
    imgUrl: 'https://example.com/assets/img/cat.jpg'
  }

  it('renders correctly', () => {
    const tree = renderer.create(
      <Avatar {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
