import React from 'react'
import renderer from 'react-test-renderer'
import UserAddCard from './UserAddCard'

describe('<UserAddCard />', () => {
  const props = {
    name: 'James Carter',
    added: true,
    onAdd: jest.fn()
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserAddCard {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
