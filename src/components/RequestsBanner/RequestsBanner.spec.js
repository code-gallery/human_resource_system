import React from 'react'
import renderer from 'react-test-renderer'
import RequestsBanner from './RequestsBanner'

describe('<RequestsBanner />', () => {
  const commonProps = {
    requests: [
      {
        id: 1,
        candidate: {
          organisation: { name: 'Applied Blockchain' }
        }
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <RequestsBanner {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('renders correctly for 2 requests', () => {
      const props = {
        requests: [
          ...commonProps.requests,
          {
            id: 2,
            candidate: {
              organisation: { name: 'Shell' }
            }
          }
        ]
      }
      const tree = renderer.create(
        <RequestsBanner {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
