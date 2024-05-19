import React from 'react'
import renderer from 'react-test-renderer'
import { Table } from './index'

describe('<Table />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Table>
        <thead>
          <tr>
            <th>Foo</th>
            <th>Bar</th>
            <th>Baz</th>
          </tr>
        </thead>
      </Table>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
