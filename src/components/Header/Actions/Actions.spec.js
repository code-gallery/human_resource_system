import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Actions from './Actions'

describe('components/Header/Actions', () => {
  const commonProps = {
    isMobile: false,
    editLabel: 'Edit',
    toggleEditMode: jest.fn(),
    saveChanges: jest.fn(),
    undoChanges: jest.fn()
  }

  describe('with defaultProps', () => {
    it('renders correctly', () => {
      const props = commonProps

      const tree = renderer.create(
        <Actions {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when loading is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        loading: true
      }

      const tree = renderer.create(
        <Actions {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode and canEdit are true', () => {
    let wrapper
    const props = {
      ...commonProps,
      editMode: true,
      canEdit: true
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <Actions {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('calls props.undoChanges correctly', () => {
      wrapper = shallow(
        <Actions {...props} />
      )

      expect(props.undoChanges).not.toHaveBeenCalled()
      wrapper.find('.changes-btns [data-header-cancel]').simulate('click')
      expect(props.undoChanges).toHaveBeenCalled()
    })

    it('calls props.saveChanges correctly', () => {
      wrapper = shallow(
        <Actions {...props} />
      )

      expect(props.saveChanges).not.toHaveBeenCalled()
      wrapper.find('.changes-btns [data-header-save]').simulate('click')
      expect(props.saveChanges).toHaveBeenCalled()
    })
  })

  describe('when canEdit is true', () => {
    let wrapper
    let props
    it('renders correctly', () => {
      props = {
        ...commonProps,
        canEdit: true
      }

      const tree = renderer.create(
        <Actions {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('calls props.toggleEditMode correctly', () => {
      wrapper = shallow(
        <Actions {...props} />
      )

      expect(props.toggleEditMode).not.toHaveBeenCalled()
      wrapper.find('.changes-btns .border-btn').simulate('click')
      expect(props.toggleEditMode).toHaveBeenCalled()
    })
  })
})
