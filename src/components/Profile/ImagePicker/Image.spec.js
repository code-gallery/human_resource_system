import React from 'react'
import { shallow } from 'enzyme'
import Image from './Image'

describe('<Image />', () => {
  let wrapper
  let onImageClickFn
  beforeEach(() => {
    onImageClickFn = jest.fn()
    const props = {
      src: '',
      onImageClick: onImageClickFn,
      isSelected: false
    }
    wrapper = shallow(
      <Image {...props} />
    )
  })

  describe('when isSelected is false', () => {
    it('renders correctly', () => {
      // container
      expect(wrapper.find('.responsive').length).toEqual(1)
      expect(wrapper.find('.responsive.selected').length).toEqual(0)
      // image
      expect(wrapper.find('.thumbnail').length).toEqual(1)
      expect(wrapper.find('.thumbnail.selected').length).toEqual(0)
    })
  })

  describe('when isSelected is true', () => {
    it('renders correctly', () => {
      wrapper.setProps({ isSelected: true })
      // container
      expect(wrapper.find('.responsive.selected').length).toEqual(1)
      // image
      expect(wrapper.find('.thumbnail.selected').length).toEqual(1)
    })
  })
})
