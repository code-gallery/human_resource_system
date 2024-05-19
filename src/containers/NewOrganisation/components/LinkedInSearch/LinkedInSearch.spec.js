import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import LinkedInSearch from './LinkedInSearch'

describe('containers/NewOrganisation/components/LinkedInSearch', () => {
  beforeEach(() => {
    window.IN = {}
    window.IN.User = {
      refresh: jest.fn(),
      authorize: function(cb) {
        cb()
      }
    }
  })

  describe('when no linkedIn token', () => {
    it('renders correctly', () => {
      window.IN.ENV = {
        auth: { oauth_token: '' }
      }
      const props = {
        save: jest.fn()
      }
      const tree = renderer.create(
        <LinkedInSearch {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is linkedIn token', () => {
    it('renders correctly', () => {
      window.IN.ENV = {
        auth: { oauth_token: 'token_value_here' }
      }
      const props = {
        save: jest.fn()
      }
      const tree = renderer.create(
        <LinkedInSearch {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<LinkedInSearch />', () => {
    let props
    let wrapper
    beforeEach(() => {
      props = {
        save: jest.fn()
      }
      window.IN.ENV = {
        auth: { oauth_token: '' }
      }
      wrapper = shallow(
        <LinkedInSearch {...props} />
      )
    })

    describe('signIn', () => {
      it('sets states correctly', () => {
        window.IN.ENV = {
          auth: { oauth_token: 'token_value_here' }
        }
        wrapper.setState({ token: null })
        wrapper.instance().signIn()
        expect(wrapper.state('token')).toEqual('token_value_here')
      })
    })

    describe('select', () => {
      it('calls props.save and update state correctly', () => {
        wrapper.setState({
          results: [
            { id: 12, name: 'ab' },
            { id: 123, name: 'abc' }
          ]
        })
        wrapper.instance().select({ id: 123, name: 'abc' })
        expect(wrapper.state('results')[1]).toEqual({ id: 123, name: 'abc', selected: true })
        expect(props.save).toHaveBeenCalledWith({ id: 123, name: 'abc' })
      })
    })

    describe('search', () => {
      describe('when keywords is invalid', () => {
        it('updates state correctly', () => {
          expect(wrapper.state('errors')).toEqual([])
          wrapper.instance().search({ preventDefault: jest.fn() })
          expect(wrapper.state('errors')).toEqual([ 'keywords' ])
        })
      })

      describe('when keywords is valid', () => {
        describe('when there are results', () => {
          it('updates state correctly', () => {
            const values = [
              { id: 1, name: 'ab' },
              { id: 2, name: 'abc' },
              { id: 3, name: 'abcd' }
            ]
            window.IN.API = {}
            window.IN.API.Raw = function() {
              return {
                url: function() {
                  return {
                    method: function() {
                      return {
                        result: function(cb) {
                          return cb({
                            companies: {
                              _total: 3,
                              values
                            }
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
            wrapper.setState({ keywords: 'Apple', token: 'token' })
            wrapper.instance().search({ preventDefault: jest.fn() })
            expect(wrapper.state('pending')).toEqual(false)
            expect(wrapper.state('showResults')).toEqual(true)
            expect(wrapper.state('results')).toEqual(values)
          })
        })

        describe('when there are no results', () => {
          it('updates state correctly', () => {
            const values = []
            window.IN.API = {}
            window.IN.API.Raw = function() {
              return {
                url: function() {
                  return {
                    method: function() {
                      return {
                        result: function(cb) {
                          return cb({
                            companies: {
                              _total: 0,
                              values
                            }
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
            wrapper.setState({ keywords: 'wrerer', token: 'token' })
            wrapper.instance().search({ preventDefault: jest.fn() })
            expect(wrapper.state('pending')).toEqual(false)
            expect(wrapper.state('showResults')).toEqual(true)
            expect(wrapper.state('results')).toEqual(values)
          })
        })
      })
    })
  })
})
