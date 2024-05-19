import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import AwardItem from './AwardItem'

describe('containers/Profile/components/.../AwardItem', () => {
  const commonProps = {
    name: 'Award name',
    org: {
      id: 5,
      name: 'AA plc',
      logo_image: 'https://appii.s3.eu-west-2.amazonaws.com/organisation_logos/aa-plc1509336690734.jpg'
    },
    created_at: '2017-12-07 15:36:20',
    verified_status: 'not_verified',
    type: 'award',
    visibility: 'registered',
    toggleBlockEditing: jest.fn(),
    deleteAward: jest.fn(),
    saveAward: jest.fn()
  }

  describe('when editMode is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false
      }
      const tree = renderer.create(
        <AwardItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode is true', () => {
    const props = {
      ...commonProps,
      editMode: true
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <AwardItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('componentWillReceiveProps', () => {
      it('calls props.toggleBlockEditing correctly', () => {
        const wrapper = shallow(
          <AwardItem {...props} />
        )
        expect(props.toggleBlockEditing).not.toHaveBeenCalled()
        wrapper.setState({ edit: true }, function() {
          wrapper.setProps({
            editMode: false
          })
        })
        expect(props.toggleBlockEditing).toHaveBeenCalled()
        expect(wrapper.state('edit')).toEqual(false)
      })
    })
  })
})
