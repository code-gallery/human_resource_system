import React from 'react'
import renderer from 'react-test-renderer'
import { TableData } from './index'

describe('<TableData />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TableData>React</TableData>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
