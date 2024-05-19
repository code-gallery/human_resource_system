import React from 'react'
import renderer from 'react-test-renderer'
import ContentCard from './index'

describe('<ContentCard />', () => {
  const TestComponent = () => {
    return (
      <div>Hello World</div>
    )
  }

  const commonProps = {
    children: <TestComponent />
  }

  describe('when there is no title', () => {
    it('renders correctly', () => {
      const props = commonProps

      const tree = renderer.create(
        <ContentCard {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a title', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        title: 'My page title'
      }

      const tree = renderer.create(
        <ContentCard {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with props.className', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        className: 'custom-class'
      }

      const tree = renderer.create(
        <ContentCard {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
