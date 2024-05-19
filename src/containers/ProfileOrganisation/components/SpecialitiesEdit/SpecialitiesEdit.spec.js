import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import SpecialitiesEdit from './index'

describe('containers/ProfileOrganisation/components/SpecialitiesEdit', () => {
  const commonProps = {
    onChangeInput: jest.fn()
  }

  describe('when there are no specialities and no errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisation: {
          speciality: ''
        },
        errors: []
      }
      const tree = renderer.create(
        <SpecialitiesEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there are 3 specialities and no errors', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisation: {
          specialities: 'UX,JS,UI'
        },
        errors: []
      }
      const tree = renderer.create(
        <SpecialitiesEdit {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is an error', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        organisation: {
          specialities: ''
        },
        errors: [ 'specialities' ]
      }
      const tree = renderer.create(
        <SpecialitiesEdit {...props} />
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
          specialities: 'UX,UI'
        },
        errors: []
      }
      wrapper = shallow(
        <SpecialitiesEdit {...props} />
      )
    })

    describe('onChange', () => {
      it('set state correctly', () => {
        const event = { target: { type: 'text', value: 'hello' } }
        wrapper.instance().onChange(event)
        expect(wrapper.state('speciality')).toEqual('hello')
      })
    })

    describe('onClickAdd', () => {
      describe('when addind an empty speciality', () => {
        it('state.error is true', () => {
          const event = { target: { type: 'text', value: '' } }
          expect(wrapper.state('error')).toEqual(false)
          wrapper.instance().onChange(event)
          wrapper.instance().onClickAdd({ preventDefault: jest.fn() })
          expect(wrapper.state('error')).toEqual(true)
        })
      })

      describe('cannot add duplicate', () => {
        it('state.specialities is correct', () => {
          expect(wrapper.state('specialities')).toEqual([ 'ux', 'ui' ])
          const event = { target: { type: 'text', value: 'UX' } }
          wrapper.instance().onChange(event)
          wrapper.instance().onClickAdd({ preventDefault: jest.fn() })
          expect(wrapper.state('specialities')).toEqual([ 'ux', 'ui' ])
        })
      })

      describe('add new speciality', () => {
        it('state.specialities is correct', () => {
          expect(wrapper.state('specialities')).toEqual([ 'ux', 'ui' ])
          const event = { target: { type: 'text', value: 'JS' } }
          wrapper.instance().onChange(event)
          wrapper.instance().onClickAdd({ preventDefault: jest.fn() })
          expect(wrapper.state('specialities')).toEqual([ 'ux', 'ui', 'js' ])
        })
      })
    })

    describe('onClickRemove', () => {
      describe('remove a speciality', () => {
        it('state.specialities is correct', () => {
          wrapper.instance().onClickRemove('ui')
          expect(wrapper.state('specialities')).toEqual([ 'ux' ])
        })
      })
    })
  })
})
