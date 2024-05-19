import React from 'react'
import { mount } from 'enzyme'
import Assets from './assets'
import InstallAppBaner from './InstallAppBanner'

describe('<InstallAppBaner />', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      url: 'http://google.co.uk'
    }
    wrapper = mount(
      <InstallAppBaner {...props} />
    )
  })

  it('renders app logo', () => {
    expect(wrapper.find(`img[src="${Assets.appIcon}"]`).length).toEqual(1)
  })

  it('renders an external link', () => {
    expect(wrapper.find(`a[href="${props.url}"]`).length).toEqual(1)
  })
})
