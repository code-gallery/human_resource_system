import React from 'react'
import { shallow } from 'enzyme'
import PageTitle from 'components/PageTitle'
import ContentCard from 'components/ContentCard'
import List from './components/List'
import OrgAccreditations from './OrgAccreditations'

describe('containers/OrgAccreditations', () => {
  let wrapper
  let fetchFn
  let deleteAccreditationFn
  let saveAccreditationFn
  beforeEach(() => {
    fetchFn = jest.fn()
    deleteAccreditationFn = jest.fn()
    saveAccreditationFn = jest.fn()
    const props = {
      fetch: fetchFn,
      deleteAccreditation: deleteAccreditationFn,
      saveAccreditation: saveAccreditationFn,
      match: {
        params: {
          orgId: '12'
        }
      },
      orgAccreditations: {
        awards: [],
        awardsType: {},
        pending: '',
        errorMsg: null,
        successMsg: null
      }
    }
    wrapper = shallow(
      <OrgAccreditations {...props} />
    )
  })

  it('props.fetch is called on "componentWillMount"', () => {
    expect(fetchFn).toHaveBeenCalledWith({ orgId: '12' })
  })

  describe('when user is not associated to the org', () => {
    it('renders Unauthorised', () => {
      const spy = jest.spyOn(wrapper.instance(), 'renderUserNotAuthorised')
      wrapper.setProps({
        organisations: [],
        pending: false
      })
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('when data has not loaded', () => {
    it('renders Loading', () => {
      const spy = jest.spyOn(wrapper.instance(), 'renderPageLoading')
      wrapper.setProps({
        pending: true
      })
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('when data has loaded', () => {
    beforeEach(() => {
      wrapper.setProps({
        orgVerifications: {
          awards: [ { id: 1 }, { id: 2 } ],
          awardsType: {
            award: {
              label: 'Awards',
              fields: { 'name': true, 'organisation': true, 'description': true, 'date': true },
              qrcode: true
            },
            achievement: {
              label: 'Achievements',
              fields: { 'name': true, 'description': true, 'date': true, 'grade': true },
              qrcode: true
            }
          },
          pending: 'fetchSuccess'
        },
        organisations: [ { id: 12 } ],
        pending: false
      })
    })

    it('renders correct <PageTitle />', () => {
      expect(wrapper.find(PageTitle).length).toEqual(1)
    })

    it('renders content correctly', () => {
      expect(wrapper.find(ContentCard).length).toEqual(1)
      expect(wrapper.find(List).length).toEqual(1)
    })
  })

  describe('deleteAccreditation', () => {
    it('calls props.deleteAccreditation correctly', () => {
      wrapper.instance().deleteAccreditation(126)
      expect(deleteAccreditationFn).toHaveBeenCalledWith({
        id: 126,
        orgId: '12'
      })
    })
  })

  describe('save', () => {
    it('calls props.saveAccreditation correctly', () => {
      wrapper.instance().save({ hello: 'world' })
      expect(saveAccreditationFn).toHaveBeenCalledWith({
        data: { hello: 'world' },
        orgId: '12'
      })
    })
  })

  describe('toggleForm', () => {
    it('sets state.showForm correctly', () => {
      wrapper.setState({ showForm: true })
      wrapper.instance().toggleForm({
        preventDefault: jest.fn()
      })
      expect(wrapper.state('showForm')).toEqual(false)
    })
  })

  describe('cancel', () => {
    it('sets state.showForm correctly', () => {
      wrapper.setState({ showForm: true })
      wrapper.instance().cancel()
      expect(wrapper.state('showForm')).toEqual(false)
    })
  })
})
