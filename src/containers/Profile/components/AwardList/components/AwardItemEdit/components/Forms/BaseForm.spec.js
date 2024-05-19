import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import BaseForm from './BaseForm'

describe('containers/Profile/components/.../BaseForm', () => {
  const props = {
    onFieldChange: jest.fn(),
    onFieldsChange: jest.fn(),
    orgRegistered: jest.fn(),
    organisation: 'Applied'
  }

  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <BaseForm {...props} />
    )
    props.onFieldChange.mockClear()
    props.onFieldsChange.mockClear()
  })

  describe('handleChange', () => {
    it('calls props.onFieldChange correctly', () => {
      wrapper.instance().handleChange('Informal', 'cpd_type')
      expect(props.onFieldChange)
        .toHaveBeenCalledWith('cpd_type', 'Informal')
    })
  })

  describe('onTextChange', () => {
    describe('when field "location" changes', () => {
      it('calls props.onFieldChange correctly', () => {
        const event = { formatted_address: 'London, UK' }
        wrapper.instance().onTextChange('location', event)
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('location', 'London, UK')
      })
    })

    describe('when field "test" changes', () => {
      it('calls props.onFieldChange correctly', () => {
        const event = { target: { value: 'hello world' } }
        wrapper.instance().onTextChange('test', event)
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('test', 'hello world')
      })
    })
  })

  describe('optionRenderer', () => {
    describe('when logo is default', () => {
      it('renders correct element', () => {
        const option = {
          name: 'CPD1',
          country: 'UK'
        }

        const tree = renderer.create(
          wrapper.instance().optionRenderer(option)
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when logo exists', () => {
      it('renders correct element', () => {
        const option = {
          name: 'CPD1',
          country: 'UK',
          logo_image: 'https://appii.s3.eu-west-2.amazonaws.com/organisations/logo_image/12_logo.jpg'
        }

        const tree = renderer.create(
          wrapper.instance().optionRenderer(option)
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('selectAsyncChange', () => {
    it('calls props.onFieldChange correctly', () => {
      wrapper.instance().selectAsyncChange({ name: 'applied' })
      expect(props.onFieldsChange)
        .toHaveBeenCalledWith({ organisation: 'applied' })
    })

    it('calls props.orgRegistered correctly', () => {
      wrapper.instance().selectAsyncChange()
      expect(props.orgRegistered)
        .toHaveBeenCalledWith(true)
    })
  })

  describe('selectAsyncBlur', () => {
    describe('when event target is valid', () => {
      beforeEach(() => {
        wrapper.instance().selectAsyncBlur({
          target: { value: 'applied' }
        })
      })

      it('calls props.onFieldChange correctly', () => {
        expect(props.onFieldsChange)
          .toHaveBeenCalledWith({ organisation: 'applied', organisation_id: null })
      })

      it('calls props.orgRegistered correctly', () => {
        expect(props.orgRegistered)
          .toHaveBeenCalledWith(false)
      })
    })

    describe('when event is not defined', () => {
      it('calls props.onFieldChange correctly', () => {
        wrapper.instance().selectAsyncBlur()
        expect(props.onFieldChange)
          .toHaveBeenCalledWith('organisation', props.organisation)
      })
    })
  })

  describe('getOptions', () => {
    it('calls without error', () => {
      expect(function() {
        wrapper.instance().getOptions()
      }).not.toThrow()
    })
  })
})
