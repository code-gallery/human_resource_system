import React from 'react'
import { shallow } from 'enzyme'
import TagList from './TagList'

describe('<TagList />', () => {
  let wrapper
  beforeEach(() => {
    const props = {
      tags: [ 'hello', 'world' ]
    }
    wrapper = shallow(
      <TagList {...props} />
    )
  })

  it('renders correctly', () => {
    expect(wrapper.find('ul.TagList').length).toEqual(1)
    expect(wrapper.find('li').length).toEqual(2)
  })

  describe('when there are no tags', () => {
    it('renders nothing', () => {
      wrapper.setProps({ 'tags': [] })
      expect(wrapper.instance().render()).toEqual(null)
    })
  })
})
