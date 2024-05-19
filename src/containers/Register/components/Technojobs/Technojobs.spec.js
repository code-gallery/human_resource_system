import React from 'react'
import renderer from 'react-test-renderer'
import Technojobs from './index'

describe('<Technojobs />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Technojobs />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
