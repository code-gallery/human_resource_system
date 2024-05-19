import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure  } from 'enzyme'
import PageTitle from './PageTitle'

configure({adapter: new Adapter()})

describe('<PageTitle />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <PageTitle title="hello" />
    )
  })

  it('renders correct title (type1)', () => {
    expect(wrapper.find('.PageTitle-type1').text()).toEqual('hello')
  })

  it('renders correct title (type2)', () => {
    wrapper = shallow(
      <PageTitle title="hello world" type="type2" />
    )
    expect(wrapper.find('.PageTitle-type2').text()).toEqual('hello world')
  })

  it('renders correctly with children', () => {
    wrapper = shallow(
      <PageTitle type="type2">
        <span>hello world <strong>toto</strong></span>
      </PageTitle>
    )
    expect(wrapper.find('.PageTitle-type2').text()).toEqual('hello world toto')
    expect(wrapper.find('.PageTitle-type2 strong').length).toEqual(1)
  })
})
