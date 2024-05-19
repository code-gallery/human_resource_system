import React from 'react'
import renderer from 'react-test-renderer'
import LoadingIndicator from './index'

describe('<LoadingIndicator />', () => {
  describe('without any props', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <LoadingIndicator />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with props', () => {
    it('renders correctly', () => {
      const props = {
        size: '80',
        display: 'inline'
      }

      const tree = renderer.create(
        <LoadingIndicator {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
