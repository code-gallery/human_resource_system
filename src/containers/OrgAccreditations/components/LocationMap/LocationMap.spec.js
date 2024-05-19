import React from 'react'
import { mount } from 'enzyme'
import LocationMap from './LocationMap'

describe('containers/OrgAccreditations/components/LocationMap', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      onChangeInput: jest.fn(),
      data: {
        radius: 250,
        lat: 51.504,
        lng: -0.0195,
        location: 'Canada Square, London',
        location_enable: 1
      }
    }

    wrapper = mount(
      <LocationMap {...props} />
    )
  })

  describe('onPlaceSelected', () => {
    it('calls props.onChangeInput correctly', () => {
      wrapper.instance().onPlaceSelected({
        geometry: {
          location: {
            lat: jest.fn(),
            lng: jest.fn()
          }
        },
        formatted_address: 'Moorgate, London'
      })
      expect(props.onChangeInput).toHaveBeenCalledTimes(3)
    })
  })

  describe('onClickLocationEnable', () => {
    it('calls props.onChangeInput correctly', () => {
      wrapper.instance().onClickLocationEnable()
      expect(props.onChangeInput).toHaveBeenCalledWith({
        target: {
          name: 'location_enable',
          value: false
        }
      })
    })
  })

  describe('onChangeRadius', () => {
    it('calls props.onChangeInput correctly', () => {
      const event = { target: { value: 280 } }
      wrapper.instance().onChangeRadius(event)
      expect(props.onChangeInput).toHaveBeenCalledWith(event)
    })
  })

  describe('onChangePosition', () => {
    it('calls props.onChangeInput correctly (lat)', () => {
      const event = { target: { name: 'lat', value: '49.504' } }
      wrapper.instance().onChangePosition(event)
      expect(props.onChangeInput).toHaveBeenCalledWith(event)
    })

    it('calls props.onChangeInput correctly (lng)', () => {
      const event = { target: { name: 'lng', value: '-1.0195' } }
      wrapper.instance().onChangePosition(event)
      expect(props.onChangeInput).toHaveBeenCalledWith(event)
    })

    it('calls props.onChangeInput correctly (value is empty)', () => {
      const event = { target: { name: 'lng', value: '' } }
      wrapper.instance().onChangePosition(event)
      expect(props.onChangeInput).toHaveBeenCalledWith(event)
    })
  })
})
