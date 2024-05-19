import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'

describe('<Footer />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <Footer />
    )
  })
  it('renders correctly', () => {
    expect(wrapper.find('.Footer').length).toEqual(1)
  })
  it('should have 6 links', () => {
    expect(wrapper.find('.Footer-nav li').length).toEqual(6)
  })
})
