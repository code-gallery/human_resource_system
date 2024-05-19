import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Cpd from './Cpd'

describe('containers/OrgAccreditations/components/Forms/Cpd', () => {
  describe('when all fields are empty', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          lat: 51.504,
          lng: -0.0195,
          location: '1 Canada Square, Canary Wharf, London E14 5AB, UK'
        },
        onChangeInput: jest.fn()
      }
      const tree = renderer.create(
        <Cpd {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all fields are valid', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          name: 'Achievement 1',
          award_date_from: new Date('2016-09-04'),
          award_date_to: new Date('2016-09-06'),
          description: 'Lorem ipsum dolor',
          award_cpd_type: 'Formal',
          award_level: 'award level value',
          lat: 51.5049489,
          lng: -0.019500600000014856,
          award_location: 'London',
          award_duration: '2 hours',
          type: 'Certification',
          delivery_type: 'Online',
          level: 'Level 2',
          enabled: 1,
          radius: 320,
          link: 'http://google.co.uk'
        },
        onChangeInput: jest.fn()
      }
      const tree = renderer.create(
        <Cpd {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('award_cpd_type change', () => {
    it('calls props.onChangeInput correctly', () => {
      const props = {
        data: {
          lat: 51.504,
          lng: -0.0195,
          location: 'London E14 5AB, UK'
        },
        onChangeInput: jest.fn()
      }
      const wrapper = shallow(
        <Cpd {...props} />
      )
      const event = { value: 'Informal' }
      wrapper.find('[name="select-cpd-type"]').simulate('change', event)
      expect(props.onChangeInput)
        .toHaveBeenCalledWith({
          target: {
            name: 'award_cpd_type',
            value: 'Informal'
          }
        })
    })
  })
})
