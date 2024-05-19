import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout'

describe('<Layout />', () => {
  let wrapper
  let props
  describe('when canEdit is true', () => {
    beforeEach(() => {
      props = {
        canEdit: true,
        editMode: false,
        isLoggedIn: true,
        user: {
          first_name: 'Jane',
          last_name: 'Doe'
        },
        token: 'token',
        locationKey: 'zwty',
        organisations: [],
        undoChanges: jest.fn(),
        saveChanges: jest.fn(),
        isMobileNavActive: false,
        setMobileNavActive: jest.fn(),
        setEditMode: jest.fn(),
        hasNotification: false
      }
      wrapper = mount(
        <Router>
          <Layout {...props} />
        </Router>
      )
    })

    it('renders "Edit" button in Header', () => {
      expect(wrapper.find('.Header__right .border-btn').text()).toEqual('Edit')
    })

    describe('clicking "Edit"', () => {
      it('calls props.setEditMode', () => {
        wrapper.find('.Header__right .border-btn').simulate('click')
        expect(props.setEditMode).toHaveBeenCalledWith(true)
      })
    })

    describe('when editMode is true', () => {
      let newProps
      beforeEach(() => {
        newProps = { ...props, editMode: true }
        wrapper = mount(
          <Router>
            <Layout {...newProps} />
          </Router>
        )
      })

      it('renders "save" and "cancel"', () => {
        expect(wrapper.find('.Header__right [data-header-cancel]').text())
          .toEqual('Cancel')
        expect(wrapper.find('.Header__right [data-header-save]').text())
          .toEqual('Save Changes')
      })

      describe('click "Cancel"', () => {
        it('calls props.undoChanges and hide buttons', () => {
          wrapper.find('.Header__right [data-header-cancel]').simulate('click')
          expect(newProps.undoChanges).toHaveBeenCalled()
          expect(newProps.setEditMode).toHaveBeenCalledWith(false)
        })
      })

      describe('click "Save"', () => {
        it('calls props.saveChanges', () => {
          wrapper.find('.Header__right [data-header-save]').simulate('click')
          expect(newProps.saveChanges).toHaveBeenCalled()
        })
      })
    })
  })

  describe('when canEdit is false', () => {
    beforeEach(() => {
      const props2 = {
        ...props,
        canEdit: false
      }
      wrapper = mount(
        <Router>
          <Layout {...props2} />
        </Router>
      )
    })

    it('renders no "Edit" button in Header', () => {
      expect(wrapper.find('.Header__right .border-btn').length).toEqual(0)
    })
  })
})
