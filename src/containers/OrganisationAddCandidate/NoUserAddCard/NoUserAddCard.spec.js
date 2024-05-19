import React from 'react'
import renderer from 'react-test-renderer'
import NoUserAddCard from '.'

describe('<NoUserAddCard />', () => {
  const props = {
    loading: false,
    added: false,
    onAdd: jest.fn()
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const tree = renderer.create(
        <NoUserAddCard {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
