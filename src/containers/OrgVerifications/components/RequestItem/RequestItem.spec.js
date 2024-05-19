import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import RequestItem from './RequestItem'

describe('containers/Organisations/OrgVerifications/components/RequestItem/RequestItem', () => {
  const props = {
    onVerify: jest.fn(),
    onReject: jest.fn(),
    item: {
      payload: '{"date":"1994-07-07","start_date":"1994-07-07"}',
      type: 'type',
      id: 111,
      user: {
        first_name: 'Jane',
        last_name: 'Doe',
        profile_image: 'profile_image'
      },
      decline_reason: 'Lorem ipsum dolor'
    }
  }

  describe('when props is valid', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<RequestItem {...props} />)
    })

    it('renders correctly', () => {
      const tree = renderer.create(
        <RequestItem {...props} />
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('renders correct Avatar', () => {
      expect(wrapper.find('Avatar').length).toEqual(1)
    })

    it('renders correct Action', () => {
      expect(wrapper.find('Action').length).toEqual(1)
    })
  })
})
