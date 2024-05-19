import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import VisibilitySetting from './VisibilitySetting'

describe('containers/Profile/components/VisibilitySetting', () => {
  const props = {
    value: 'public',
    onFieldChange: jest.fn()
  }
  jest.spyOn(Date.prototype, 'getTime')
    .mockImplementation(function() {
      return 1513183504086
    })

  it('renders correctly', () => {
    const tree = renderer.create(
      <VisibilitySetting {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  describe('handleChange', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(
        <VisibilitySetting {...props} />
      )
      wrapper.instance().handleChange({ value: 'private' })
    })

    it('calls props.onFieldChange correctly', () => {
      expect(props.onFieldChange)
        .toHaveBeenCalledWith('visibility', 'private')
    })

    it('set state.value correctly', () => {
      expect(wrapper.state('value')).toEqual('private')
    })
  })
})
