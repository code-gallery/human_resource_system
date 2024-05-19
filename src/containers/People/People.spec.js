import React from 'react'
import { shallow } from 'enzyme'
import AvatarBig from 'components/AvatarBig'
import Pagination from 'react-bootstrap/lib/Pagination'
import People from './People'

describe('<People />', () => {
  const commonProps = {
    people: {
      data: [
        {
          id: 1,
          profile_image: 'http://google.co.uk',
          first_name: 'Jane',
          last_name: 'Doe',
          tagline: 'Lorem ipsum'
        },
        {
          id: 1,
          unique_key: 'johndoe',
          profile_image: 'http://google.co.uk',
          first_name: 'John',
          last_name: 'Doe',
          tagline: 'Lorem ipsum'
        }
      ]
    }
  }
  let wrapper
  let props

  beforeEach(() => {
    props = {
      people: {
        ...commonProps.people,
        currentPage: 1,
        perPage: 50,
        q: '',
        total: 0
      },
      fetch: jest.fn(),
      setSearchQuery: jest.fn(),
      setCurrentPage: jest.fn()
    }
    wrapper = shallow(
      <People {...props} />
    )
  })

  it('props.fetch was called correctly', () => {
    expect(props.fetch).toHaveBeenCalledWith({
      perPage: 50,
      currentPage: 1,
      q: ''
    })
  })

  describe('componentWillReceiveProps', () => {
    it('props.fetch was called correctly (1)', () => {
      wrapper.setProps({
        people: {
          ...props.people,
          currentPage: 2
        }
      })

      expect(props.fetch).toHaveBeenCalledWith({
        perPage: 50,
        currentPage: 2,
        q: ''
      })
    })

    it('props.fetch was called correctly (2)', () => {
      wrapper.setProps({
        people: {
          ...props.people,
          q: 'applied'
        }
      })

      expect(props.fetch).toHaveBeenCalledWith({
        perPage: 50,
        currentPage: 1,
        q: 'applied'
      })
    })
  })

  describe('onSearch', () => {
    it('props.setSearchQuery was called correctly', () => {
      wrapper.setState({
        q: 'applied'
      })
      wrapper.instance().onSearch({ preventDefault: jest.fn() })
      expect(props.setSearchQuery).toHaveBeenCalledWith('applied')
    })
  })

  describe('onSelectPage', () => {
    it('props.setCurrentPage was called correctly', () => {
      wrapper.instance().onSelectPage(3)
      expect(props.setCurrentPage).toHaveBeenCalledWith(3)
    })
  })

  describe('clearSearch', () => {
    beforeEach(() => {
      wrapper.setState({
        q: 'applied'
      })
      wrapper.instance().clearSearch()
    })

    it('state.q is updated correctly', () => {
      expect(wrapper.state('q')).toEqual('')
    })

    it('props.setSearchQuery was called correctly', () => {
      expect(props.setSearchQuery).toHaveBeenCalledWith('')
    })
  })

  describe('render', () => {
    it('2 <AvatarBig />', () => {
      expect(wrapper.find(AvatarBig).length).toEqual(2)
    })
  })

  describe('renderPagination', () => {
    it('with no pagination', () => {
      expect(wrapper.find(Pagination).length).toEqual(0)
    })

    it('with pagination', () => {
      wrapper.setProps({
        people: {
          ...props.people,
          total: 40
        }
      })
      expect(wrapper.find(Pagination).length).toEqual(1)
    })
  })
})
