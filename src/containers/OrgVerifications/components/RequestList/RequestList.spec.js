import React from 'react'
import renderer from 'react-test-renderer'
import RequestList from './RequestList'

describe('containers/Organisations/OrgVerifications/components/RequestList/RequestList', () => {
  const commonProps = {
    onVerify: jest.fn(),
    onReject: jest.fn(),
    data: []
  }
  const props = {
    ...commonProps,
    data: [ {
      payload: '{"date":"1994-07-07","start_date":"1994-07-07"}',
      type: 'type',
      id: 111,
      user: {
        firstname: 'firstname',
        lastname: 'lastname'
      },
      decline_reason: 'donot ask'
    } ]
  }

  describe('when props.data.length=0', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <RequestList {...commonProps} />
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.data.length>0', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <RequestList {...props} />
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
