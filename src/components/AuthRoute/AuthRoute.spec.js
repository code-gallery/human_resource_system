import React from 'react'
import PropTypes from 'prop-types'
import createRouterContext from 'react-router-test-context'
import { mount } from 'enzyme'
import AuthRoute from './index'

const context = createRouterContext({})
const childContextTypes = {
  router: PropTypes.object
}
let wrapper
let storeAuth

const TestComponent = () => {
  return (
    <div></div>
  )
}

const setupModules = (value) => {
  storeAuth = require('store/auth') // eslint-disable-line
  storeAuth.isLoaded = () => {
    return value
  }
  jest.doMock('store/auth', () => {
    return storeAuth
  })

  wrapper = mount(<AuthRoute component={TestComponent} />, {
    context,
    childContextTypes
  }
  )
}

describe('<AuthRoute />', () => {
  afterEach(() => {
    wrapper.unmount()
    jest.resetModules()
    delete require.cache[storeAuth] // eslint-disable-line
    delete require.cache[AuthRoute] // eslint-disable-line
  })

  describe('isAuthenticated === true', () => {
    it('displays the test component', () => {
      setupModules(true)
      expect(wrapper.find(TestComponent).exists()).toBe(true)
    })
  })

  describe('isAuthenticated === false', () => {
    it('redirects', () => {
      setupModules(false)
      expect(wrapper.find('Redirect').exists()).toBe(true)
    })
  })
})
