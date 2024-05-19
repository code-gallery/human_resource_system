import React from 'react'
import { shallow } from 'enzyme'
import HeroBlock from './HeroBlock'

describe('<HeroBlock />', () => {
  let wrapper
  let onImagePickFn
  beforeEach(() => {
    onImagePickFn = jest.fn()
    const props = {
      background_image: '',
      onImagePick: onImagePickFn
    }
    wrapper = shallow(
      <HeroBlock {...props} />
    )
  })

  it('renders correctly', () => {
    // section background
    expect(wrapper.find('.hero-block').length).toEqual(1)
    // image input
    expect(wrapper.find('.img-custom-file-upload').length).toEqual(1)
  })
})
