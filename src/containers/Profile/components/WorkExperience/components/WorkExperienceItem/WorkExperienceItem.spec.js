import React from 'react'
import renderer from 'react-test-renderer'

import WorkExperienceItem from './index'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


describe('containers/Profile/components/.../WorkExperienceItem', () => {
  const commonProps = {
    start_date: '2017-08-01T00:00:00.000Z',
    end_date: '0000-00-00',
    name: 'Dev 2',
    verified_status: 'verified',
    org: {
      id: 55,
      name: 'Applied Blockchain',
      logo_image: '//logo_image'
    },
    industries: [
      { text: 'Accounting' },
      { text: 'Animation' },
      { text: 'IT' }
    ],
    toggleBlockEditing: jest.fn(),
    deleteWork: jest.fn(),
    saveEntity: jest.fn()
  }

  describe('when editMode is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false
      }
      const tree = renderer.create(
        <WorkExperienceItem {...props} />
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
        <WorkExperienceItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
    configure({adapter: new Adapter()});
    describe('UNSAFE_componentWillReceiveProps', () => {
      it('calls props.toggleBlockEditing correctly', () => {
        const wrapper = shallow(
          <WorkExperienceItem {...props} />
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
