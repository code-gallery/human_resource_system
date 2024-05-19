import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import DetailsEdit from './index'

describe('containers/ProfileOrganisation/components/DetailsEdit', () => {
  const commonProps = {
    reference: {
      industries: [
        { text: 'Accounting' },
        { text: 'Banking' },
        { text: 'IT' }
      ],
      organisationSize: [
        { text: '1-10 employees' },
        { text: '11-50 employees' },
        { text: '51-200 employees' }
      ]
    },
    onChangeInput: jest.fn()
  }

  describe('when most fields are empty and no errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisation: {
          name: 'Applied Blockchain'
        },
        errors: []
      }
      const tree = renderer.create(
        <DetailsEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when all fields exists and no errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisation: {
          name: 'Applied Blockchain',
          industries: 'IT',
          company_size: '11-50 employees',
          town: 'London',
          country: 'UK',
          year_founded: '2015'
        },
        errors: []
      }
      const tree = renderer.create(
        <DetailsEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when most fields are empty with errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisation: {
          name: 'Applied Blockchain',
          town: 'London'
        },
        errors: [ 'location', 'company_size', 'country', 'industries', 'year_founded' ]
      }
      const tree = renderer.create(
        <DetailsEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<DetailsEdit />', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        organisation: {
          name: 'Applied Blockchain',
          industries: 'IT',
          company_size: '11-50 employees',
          town: 'London',
          country: 'UK',
          year_founded: '2015'
        },
        errors: []
      }
      wrapper = shallow(
        <DetailsEdit {...props} />
      )
    })

    describe('onChangeInput', () => {
      it('calls props.onChangeInput', () => {
        const event = { target: { type: 'text', value: 'hello' } }
        wrapper.instance().onChangeInput(event)
        expect(props.onChangeInput).toHaveBeenCalledWith(event)
      })
    })
  })
})
