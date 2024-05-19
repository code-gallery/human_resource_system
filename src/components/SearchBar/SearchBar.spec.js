import React from 'react'
import { shallow } from 'enzyme'
import SearchBar from './index'

describe('<SearchBar />', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = {
      q: '',
      query: '',
      clear: jest.fn(),
      onChangeInput: jest.fn(),
      onSubmit: jest.fn(),
      placeholder: 'search test'
    }
    wrapper = shallow(
      <SearchBar {...props} />
    )
  })

  describe('search input', () => {
    it('calls props.onChangeInput when input changes', () => {
      expect(props.onChangeInput).not.toHaveBeenCalled()
      wrapper.find('.SearchBar input').simulate('change')
      expect(props.onChangeInput).toHaveBeenCalled()
    })
  })

  describe('form submit', () => {
    it('calls props.onSubmit', () => {
      expect(props.onSubmit).not.toHaveBeenCalled()
      wrapper.find('.SearchBar').simulate('submit')
      expect(props.onSubmit).toHaveBeenCalled()
    })
  })

  describe('when query is empty string', () => {
    it('does not render what user search for and no clear button', () => {
      expect(wrapper.find('.SearchBar-query').length).toEqual(0)
    })
  })

  describe('when query is not empty', () => {
    beforeEach(() => {
      wrapper.setProps({ query: 'Applied' })
    })

    it('renders what user search for', () => {
      expect(wrapper.find('.SearchBar-query').length).toEqual(1)
      expect(wrapper.find('.SearchBar-query .pull-left').text()).toContain('Applied')
    })

    describe('clear button', () => {
      it('call props.clear onClick', () => {
        expect(wrapper.find('.SearchBar-query button').length).toEqual(1)
        expect(props.clear).not.toHaveBeenCalled()
        wrapper.find('.SearchBar-query button').simulate('click')
        expect(props.clear).toHaveBeenCalled()
      })
    })
  })
})
