import React from 'react'
import renderer from 'react-test-renderer'
import SearchBox from './index'

describe('<SearchBox />', () => {
  const props = {
    onSearch: jest.fn()
  }

  it('renders correctly', () => {
    const tree = renderer.create(
      <SearchBox {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
