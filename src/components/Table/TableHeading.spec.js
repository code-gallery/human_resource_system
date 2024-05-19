import React from 'react'
import renderer from 'react-test-renderer'
import { TableHeading } from './index'

describe('<TableHeading />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TableHeading>Name</TableHeading>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
