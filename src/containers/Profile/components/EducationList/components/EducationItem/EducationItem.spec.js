import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import EducationItem from './EducationItem'

describe('containers/Profile/components/.../EducationItem', () => {
  const commonProps = {
    created_at: '2017-12-13 15:17:02',
    degree: 'MSc',
    start_date: '2004-09-01',
    end_date: '2005-08-01',
    entity_type: 'educations',
    grade: 'Pass',
    org: {
      id: 953,
      name: 'Oxford Brookes University',
      logo_image: '//appii.s3.eu-west-2.amazonaws.com/organisation_logos/oxford-brookes-university1509337248159.jpg'
    },
    verified_status: 'not_verified',
    type: 'higher',
    visibility: 'registered',
    toggleBlockEditing: jest.fn(),
    deleteEducation: jest.fn(),
    saveEntity: jest.fn()
  }

  describe('when editMode is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false
      }
      const tree = renderer.create(
        <EducationItem {...props} />
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
        <EducationItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    describe('componentWillReceiveProps', () => {
      it('calls props.toggleBlockEditing correctly', () => {
        const wrapper = shallow(
          <EducationItem {...props} />
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
