import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import TwitterInput from './index'

describe('containers/Profile/components/.../TwitterInput', () => {
  it('renders correctly', () => {
    const props = {
      value: '@hello',
      onChangeInput: jest.fn()
    }
    const tree = renderer.create(
      <TwitterInput {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  describe('<TwitterInput />', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        value: '',
        onChangeInput: jest.fn()
      }
      wrapper = shallow(
        <TwitterInput {...props} />
      )
    })

    describe('componentWillReceiveProps', () => {
      it('updates state.value correctly', () => {
        wrapper.setProps({
          value: '@jane_doe'
        })
        expect(wrapper.state('value')).toEqual('@jane_doe')
      })
    })

    describe('onChangeHandler', () => {
      describe('when value contains "@"', () => {
        it('calls props.onChangeInput correctly', () => {
          wrapper.instance().onChangeHandler({ target: { value: '@jane' } })
          expect(props.onChangeInput).toHaveBeenCalledWith('@jane')
        })
      })

      describe('when value does not contain "@"', () => {
        it('calls props.onChangeInput correctly', () => {
          wrapper.instance().onChangeHandler({ target: { value: 'jane' } })
          expect(props.onChangeInput).toHaveBeenCalledWith('@jane')
        })
      })
    })
  })
})
