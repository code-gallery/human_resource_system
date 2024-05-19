import React from 'react'
import { shallow } from 'enzyme'
import Assets from 'components/AvatarBig/assets'
import Avatar from './Avatar'

describe('<Avatar />', () => {
  describe('renders image only', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(
        <Avatar />
      )
    })

    it('renders correct default image', () => {
      expect(wrapper.find(`img[src="${Assets.placeholder}"]`).length).toEqual(1)
    })

    it('renders no label', () => {
      expect(wrapper.find('span').length).toEqual(0)
    })
  })

  describe('renders image and label', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        imageUrl: 'https://appii.s3.eu-west-2.amazonaws.com/profile_images/1510235964102.jpg',
        label: 'Jane Doe'
      }
      wrapper = shallow(
        <Avatar {...props} />
      )
    })

    it('renders correct default image', () => {
      expect(wrapper.find(`img[src="${props.imageUrl}"]`).length).toEqual(1)
    })

    it('renders label', () => {
      expect(wrapper.find('span').length).toEqual(1)
    })
  })
})
