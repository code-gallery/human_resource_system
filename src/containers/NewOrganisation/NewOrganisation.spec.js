import React from 'react'
import { shallow } from 'enzyme'
import OrganisationForm from './components/OrganisationForm'
import LinkedInSearch from './components/LinkedInSearch'
import NewOrganisation from './NewOrganisation'

describe('<NewOrganisation />', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      storage: {
        successMsg: null,
        errorMsg: null
      },
      saveStorage: jest.fn()
    }
    wrapper = shallow(
      <NewOrganisation {...props} />
    )
    jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
  })

  it('renders correctly', () => {
    expect(wrapper.find(OrganisationForm).length).toEqual(1)
    expect(wrapper.find(LinkedInSearch).length).toEqual(1)
  })

  describe('componentWillReceiveProps', () => {
    it('shows success notification', () => {
      wrapper.setProps({
        storage: {
          successMsg: 'success message',
          errorMsg: null
        }
      })
      expect(wrapper.instance().notifyFn).toHaveBeenCalledWith('success message', 'success')
    })

    it('shows error notification', () => {
      wrapper.setProps({
        storage: {
          successMsg: null,
          errorMsg: 'error message'
        }
      })
      expect(wrapper.instance().notifyFn).toHaveBeenCalledWith('error message', 'error')
    })
  })

  describe('saveOrganisationForm', () => {
    describe('when there are errors (1)', () => {
      it('sets state.errorsForm correctly', () => {
        wrapper.instance().saveOrganisationForm({ preventDefault: jest.fn() })
        expect(wrapper.state('errorsForm')).toEqual([ 'name', 'websiteUrl', 'contactName', 'contactEmail' ])
      })
    })

    describe('when there are errors (2)', () => {
      it('sets state.errorsForm correctly', () => {
        wrapper.setState({
          name: '',
          websiteUrl: ''
        })
        wrapper.instance().saveOrganisationForm({ preventDefault: jest.fn() })
        expect(wrapper.state('errorsForm')).toEqual([ 'name', 'websiteUrl', 'contactName', 'contactEmail' ])
      })
    })

    describe('when inputs are valid', () => {
      it('calls props.saveStorage correctly', () => {
        wrapper.setState({
          name: 'Apple',
          contactName: 'John Smith',
          contactEmail: 'john@apple.com',
          websiteUrl: 'http://apple.com',
          linkedInUrl: 'https://www.linkedin.com/company/123'
        })
        wrapper.instance().saveOrganisationForm({ preventDefault: jest.fn() })
        expect(props.saveStorage).toHaveBeenCalledWith({
          type: 'organisationRegistration',
          json: {
            name: 'Apple',
            contactName: 'John Smith',
            contactEmail: 'john@apple.com',
            websiteUrl: 'http://apple.com',
            linkedInUrl: 'https://www.linkedin.com/company/123'
          }
        })
      })
    })
  })

  describe('saveLinkedInOrganisation', () => {
    it('calls props.saveStorage correctly', () => {
      wrapper.instance().saveLinkedInOrganisation({ name: 'Applied', logoUrl: 'logoUrl' })
      expect(props.saveStorage).toHaveBeenCalledWith({
        type: 'organisationRegistration',
        json: {
          name: 'Applied',
          logoUrl: 'logoUrl'
        }
      })
    })
  })
})
