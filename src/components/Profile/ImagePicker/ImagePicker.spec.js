import React from 'react'
import { mount } from 'enzyme'
import ImagePicker from './ImagePicker'

describe('<ImagePicker />', () => {
  let wrapper

  beforeEach(() => {
    const props = {
      images: [ { src: 'test' } ],
      onPick: jest.fn()
    }

    wrapper = mount(
      <ImagePicker {...props} />
    )
  })

  describe('render', () => {
    it('renders correctly', () => {
      expect(wrapper.find('.image_picker').length).toEqual(1)
    })
  })

  describe('when props.images.length === 1', () => {
    it('renders one image', () => {
      expect(wrapper.find('.thumbnail').length).toEqual(1)
    })
  })

  describe('when props.images.length === 2', () => {
    it('renders two images', () => {
      wrapper.setProps({ images: [ { src: 'test1' }, { src: 'test2' } ] })
      expect(wrapper.find('.thumbnail').length).toEqual(2)
    })

    it('renders div with class clear once', () => {
      expect(wrapper.find('.clear').length).toEqual(1)
    })
  })

  describe('handleImageClick', () => {
    it('sets wrapper.state.picked', () => {
      const expectedPickedKey = '0'
      const expectedPickedValue = 'test'

      wrapper.setProps({ images: [ { src: 'test', value: '0' } ] })
      wrapper.find('.thumbnail').simulate('click')
      const modifiedPick = wrapper.state().picked
      expect(modifiedPick.get(expectedPickedKey)).toEqual(expectedPickedValue)
    })
  })

  describe('handleImageClick multiple', () => {
    it('calls onPick with a array', () => {
      let callsWithArray = false
      const arrayCheck = (array) => {
        callsWithArray = array instanceof Array
      }
      const mockPick = jest.fn().mockImplementation(arrayCheck)

      wrapper.setProps({
        multiple: true, images: [ { src: 'test', value: '0' } ], onPick: mockPick
      })
      wrapper.find('.thumbnail').simulate('click')

      expect(callsWithArray).toEqual(true)
    })
  })
})
