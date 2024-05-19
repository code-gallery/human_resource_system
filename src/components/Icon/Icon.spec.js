import React from 'react'
import renderer from 'react-test-renderer'
import Icon from './Icon'

describe('<Icon />', () => {
  const props = {
    type: 'search'
  }

  it('renders correctly', () => {
    const tree = renderer.create(
      <Icon {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
