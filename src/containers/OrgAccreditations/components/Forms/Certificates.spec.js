import React from 'react'
import renderer from 'react-test-renderer'
import Certificates from './Certificates'

describe('containers/OrgAccreditations/components/Forms/Certificates', () => {
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
        <Certificates {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all fields are valid', () => {
    it('renders correctly', () => {
      const props = {
        data: {
          name: 'Achievement 1',
          award_date: new Date('2016-09-04'),
          description: 'Lorem ipsum dolor',
          award_grade: 'grade',
          award_level: 'award level value',
          lat: 51.5049489,
          lng: -0.019500600000014856,
          award_location: 'London',
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
        <Certificates {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
