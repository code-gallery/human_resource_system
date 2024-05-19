import React from 'react'
import { shallow } from 'enzyme'
import _difference from 'lodash/difference'
import LoadingIndicator from 'components/LoadingIndicator'
import { HeroBlock, ProfileInfo } from 'components/Profile'
import ProfileOrganisation from './ProfileOrganisation'

describe('<ProfileOrganisation />', () => {
  let wrapper
  let props
  const emptyOrg = {
    name: 'Banff Academy',
    about_us: null,
    address1: null,
    address2: null,
    address3: null,
    background_color: null,
    banner_image: null,
    company_size: null,
    company_status: null,
    country: null,
    county: null,
    town: null,
    postCode: null,
    website: null,
    year_founded: null
  }
  beforeEach(() => {
    props = {
      editMode: false,
      fetch: jest.fn(),
      fetchReference: jest.fn(),
      fetchEmployees: jest.fn(),
      fetchAdmins: jest.fn(),
      fetchVerifiedStudents: jest.fn(),
      match: {
        params: { orgId: 12 }
      },
      reference: {
        industries: []
      },
      organisation: {
        ...emptyOrg,
        name: null,
        loadingRequests: 0,
        pending: false
      },
      save: jest.fn(),
      setEditMode: jest.fn()
    }
    wrapper = shallow(
      <ProfileOrganisation {...props} />
    )
    jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
  })

  it('renders <LoadingIndicator /> until all requests are done', () => {
    expect(wrapper.find(LoadingIndicator).length).toEqual(1)
    wrapper.setProps({
      organisation: {
        ...props.organisation,
        loadingRequests: 4
      }
    })
    expect(wrapper.find(LoadingIndicator).length).toEqual(0)
  })

  it('props.fetch was called', () => {
    expect(props.fetch).toHaveBeenCalledWith({ orgId: 12 })
  })

  it('props.fetchEmployees was called', () => {
    expect(props.fetchEmployees).toHaveBeenCalledWith({ orgId: 12 })
  })

  it('props.fetchAdmins was called', () => {
    expect(props.fetchAdmins).toHaveBeenCalledWith({ orgId: 12 })
  })

  it('props.fetchVerifiedStudents was called', () => {
    expect(props.fetchVerifiedStudents).toHaveBeenCalledWith({ orgId: 12 })
  })

  it('props.fetchReference was called', () => {
    expect(props.fetchReference).toHaveBeenCalled()
  })

  describe('componentWillReceiveProps', () => {
    describe('saving successfully', () => {
      it('setEditMode is called correctly', () => {
        expect(props.setEditMode).not.toHaveBeenCalled()
        wrapper.instance().saving = true
        wrapper.setProps({ organisation: { ...props.organisation, pending: true } })
        wrapper.setProps({ organisation: { ...props.organisation, pending: false } })
        expect(props.setEditMode).toHaveBeenCalledWith(false)
      })

      it('shows success notification', () => {
        wrapper.instance().saving = true
        wrapper.setProps({ organisation: { ...props.organisation, pending: true } })
        wrapper.setProps({ organisation: { ...props.organisation, pending: false } })
        expect(wrapper.instance().notifyFn).toHaveBeenCalledWith(expect.any(String), 'success')
      })
    })

    describe('server side error while saving', () => {
      beforeEach(() => {
        wrapper.instance().saving = true
        wrapper.setProps({ organisation: { ...props.organisation, saveErrorMsg: 'error message' } })
      })
      it('setEditMode is not called', () => {
        expect(props.setEditMode).not.toHaveBeenCalled()
      })

      it('shows error notification', () => {
        expect(wrapper.instance().notifyFn).toHaveBeenCalledWith(expect.any(String), 'error')
      })
    })
  })

  describe('when all requests are done', () => {
    beforeEach(() => {
      wrapper.setProps({
        organisation: {
          ...props.organisation,
          loadingRequests: 3
        }
      })
    })

    it('renders "<HeroBlock />"', () => {
      expect(wrapper.find(HeroBlock).length).toEqual(1)
    })

    it('renders "<ProfileInfo />"', () => {
      expect(wrapper.find(ProfileInfo).length).toEqual(1)
    })
  })

  describe('resetState()', () => {
    it('set state correctly', () => {
      expect(wrapper.state()).toEqual({ errors: [] })
      wrapper.instance().resetState([ 'name', 'country' ])
      expect(wrapper.state()).toEqual({
        about_us: void 0,
        company_size: void 0,
        name: void 0,
        town: void 0,
        country: void 0,
        year_founded: void 0,
        industries: void 0,
        specialities: void 0,
        errors: [ 'name', 'country' ]
      })
    })
  })

  describe('validateAndGetChanges()', () => {
    it('returns all errors and data is correct', () => {
      const { data, errors } = wrapper.instance().validateAndGetChanges()
      const expectedErrors = [
        'about_us', 'town', 'country', 'name', 'specialities',
        'company_size', 'year_founded', 'industries'
      ]
      expect(_difference(errors, expectedErrors)).toEqual([])
      expect(data).toEqual({})
    })

    it('returns some errors and data is correct', (done) => {
      wrapper.setProps({
        organisation: {
          ...props.organisation,
          name: 'Applied Blockchain',
          about_us: 'Lorem',
          town: 'Paris',
          country: 'France'
        }
      })
      wrapper.setState({
        location: {
          formatted_address: 'London, UK'
        },
        name: '',
        about_us: 'Lorem ipsum'
      }, () => {
        const { data, errors } = wrapper.instance().validateAndGetChanges()
        const expectedErrors = [
          'name', 'specialities',
          'company_size', 'year_founded', 'industries'
        ]
        expect(_difference(errors, expectedErrors)).toEqual([])
        expect(data).toEqual({
          town: 'London',
          country: 'UK',
          about_us: 'Lorem ipsum'
        })
        done()
      })
    })

    it('returns no errors and data is correct', (done) => {
      wrapper.setProps({
        organisation: {
          ...props.organisation,
          ...emptyOrg
        }
      })
      wrapper.setState({
        location: {
          formatted_address: 'London, UK'
        },
        name: 'Company name',
        company_size: '10 Employees',
        about_us: 'Lorem ipsum',
        year_founded: '2015',
        specialities: 'hello,world',
        industries: 'Computer'
      }, () => {
        const { data, errors } = wrapper.instance().validateAndGetChanges()
        expect(errors).toEqual([])
        expect(data).toEqual({
          name: 'Company name',
          town: 'London',
          country: 'UK',
          about_us: 'Lorem ipsum',
          company_size: '10 Employees',
          year_founded: '2015',
          specialities: 'hello,world',
          industries: 'Computer'
        })
        done()
      })
    })
  })

  describe('saveChanges()', () => {
    it('calls "validateAndGetChanges"', () => {
      const spy = jest.spyOn(wrapper.instance(), 'validateAndGetChanges')
      wrapper.instance().saveChanges()
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('calls "setState"', () => {
      const spy = jest.spyOn(wrapper.instance(), 'setState')
      wrapper.instance().saveChanges()
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    describe('when there are errors', () => {
      it('props.save is not called', (done) => {
        wrapper.setState({
          about_us: ''
        }, () => {
          wrapper.instance().saveChanges()
          expect(props.save).not.toHaveBeenCalled()
          done()
        })
      })
    })

    describe('when there are no errors', () => {
      it('props.save is called correctly (1)', (done) => {
        wrapper.setProps({
          organisation: {
            ...props.organisation,
            name: 'Applied Blockchain',
            about_us: 'Lorem',
            town: 'Paris',
            country: 'France',
            company_size: '10',
            industries: 'industries',
            year_founded: '2014'
          }
        })
        wrapper.setState({
          location: {
            formatted_address: 'London, UK'
          },
          name: 'Applied',
          about_us: 'Lorem ipsum',
          company_size: '1',
          industries: 'Computer',
          year_founded: '2015',
          specialities: 'hello,world',
          errors: []
        }, () => {
          wrapper.instance().saveChanges()
          expect(props.save).toHaveBeenCalledWith({
            orgId: 12,
            town: 'London',
            country: 'UK',
            name: 'Applied',
            about_us: 'Lorem ipsum',
            company_size: '1',
            industries: 'Computer',
            year_founded: '2015',
            specialities: 'hello,world'
          })
          done()
        })
      })

      it('props.save is called correctly (organisation is all empty)', (done) => {
        wrapper.setProps({
          organisation: {
            ...props.organisation,
            ...emptyOrg
          },
          match: {
            params: { orgId: 995 }
          }
        })
        wrapper.setState({
          location: {
            formatted_address: 'London, UK'
          },
          name: 'Banff Academy',
          about_us: 'Lorem ipsum',
          company_size: '1',
          industries: 'Computer',
          year_founded: '2015',
          specialities: 'hello,world',
          errors: []
        }, () => {
          wrapper.instance().saveChanges()
          expect(props.save).toHaveBeenCalledWith({
            orgId: 995,
            town: 'London',
            country: 'UK',
            name: 'Banff Academy',
            about_us: 'Lorem ipsum',
            company_size: '1',
            industries: 'Computer',
            year_founded: '2015',
            specialities: 'hello,world'
          })
          done()
        })
      })
    })
  })
})
