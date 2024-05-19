import React from 'react'
import renderer from 'react-test-renderer'
import RequestChecks from './RequestChecks'

describe('<RequestChecks />', () => {
  const commonProps = {
    getRequest: jest.fn(),
    orgId: 1,
    candidateId: 2,
    requestId: 10,
    checks: [
      {
        id: 1,
        type: 'right_to_work',
        side: 'candidate',
        status: 'pending',
        data: []
      },
      {
        id: 1,
        type: 'right_to_work',
        side: 'organisation',
        status: 'complete',
        data: []
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <RequestChecks {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
