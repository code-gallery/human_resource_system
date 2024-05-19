import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import Assets from './assets'
import AvatarBig from './AvatarBig'

describe('<AvatarBig />', () => {
  describe('renders image and link', () => {
    let wrapper

    beforeEach(() => {
      const props = {
        name: 'Hello lorem ipsum dolor',
        link: '/link/test'
      }
      wrapper = shallow(
        <AvatarBig {...props} />
      )
    })

    it('renders correct default image', () => {
      expect(wrapper.find(`img[src="${Assets.placeholder}"]`).length).toEqual(1)
    })

    it('renders correct <Link>', () => {
      expect(wrapper.find(Link).length).toEqual(1)
    })

    it('renders no tagline', () => {
      expect(wrapper.find('span').length).toEqual(0)
    })
  })

  describe('renders image, link and tagline', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        imageUrl: 'https://appii.s3.eu-west-2.amazonaws.com/profile_images/1510235964102.jpg',
        name: 'Jane Doe',
        link: '/link/test',
        tagline: 'Lorem ipsum dolor'
      }
      wrapper = shallow(
        <AvatarBig {...props} />
      )
    })

    it('renders correct default image', () => {
      expect(wrapper.find(`img[src="${props.imageUrl}"]`).length).toEqual(1)
    })

    it('renders correct <Link>', () => {
      expect(wrapper.find(Link).length).toEqual(1)
    })

    it('renders tagline', () => {
      expect(wrapper.find('span').length).toEqual(1)
    })
  })
})
