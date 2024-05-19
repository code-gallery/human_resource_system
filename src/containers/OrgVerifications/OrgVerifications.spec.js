import React from 'react'
import { shallow } from 'enzyme'
import PageTitle from 'components/PageTitle'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import OrgVerifications from './OrgVerifications'

describe('containers/OrgVerifications', () => {
  const commonProps = {
    fetch: jest.fn(),
    acceptVerification: jest.fn(),
    declineVerification: jest.fn(),
    match: {
      params: {
        orgId: '12'
      }
    },
    orgVerifications: {
      processed: [],
      requests: [],
      organisation: {}
    },
    pending: true
  }
  let wrapper
  let props

  beforeEach(() => {
    props = {
      ...commonProps
    }
    wrapper = shallow(
      <OrgVerifications {...props} />
    )
  })

  it('props.fetch is called on "componentWillMount"', () => {
    expect(props.fetch).toHaveBeenCalledWith({ orgId: '12' })
  })

  describe('componentWillReceiveProps', () => {
    it('fetch new data correctly', () => {
      props.fetch.mockClear()
      wrapper.setProps({
        orgVerifications: {
          pending: false,
          organisation: {}
        },
        match: {
          params: {
            orgId: '21'
          }
        }
      })
      expect(props.fetch).toHaveBeenCalledWith({ orgId: '21' })
    })
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

  describe('when data is loading', () => {
    it('renders <LoadingIndicator />', () => {
      expect(wrapper.find(LoadingIndicator).length).toEqual(1)
    })

    it('renders no <PageTitle />', () => {
      expect(wrapper.find(PageTitle).length).toEqual(0)
    })
  })

  describe('when data has loaded', () => {
    beforeEach(() => {
      wrapper.setProps({
        orgVerifications: {
          processed: [ { id: 1 }, { id: 2 } ],
          requests: [ { id: 10 }, { id: 20 } ],
          organisation: {
            name: 'Applied Block',
            id: 12
          }
        },
        organisations: [ { id: 12 } ],
        pending: false
      })
    })

    it('renders correct <PageTitle />', () => {
      expect(wrapper.find(PageTitle).length).toEqual(1)
    })

    it('renders 2 <ContentCard />', () => {
      expect(wrapper.find(ContentCard).length).toEqual(2)
    })
  })

  describe('onVerify', () => {
    it('calls props.acceptVerification correctly', () => {
      wrapper.instance().onVerify(126)
      expect(props.acceptVerification).toHaveBeenCalledWith({
        id: 126,
        orgId: '12'
      })
    })
  })

  describe('onReject', () => {
    it('calls props.declineVerification correctly', () => {
      wrapper.instance().onReject(126, 'lorem ipsum')
      expect(props.declineVerification).toHaveBeenCalledWith({
        id: 126,
        orgId: '12',
        reasons: 'lorem ipsum'
      })
    })
  })
})
