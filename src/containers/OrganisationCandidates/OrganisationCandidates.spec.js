import React from 'react'
import { shallow } from 'enzyme'
import OrganisationCandidates from './OrganisationCandidates'

describe('<OrganisationCandidates />', () => {
  const commonProps = {
    match: {
      params: {
        orgId: 14
      }
    },
    history: {},
    requestCandidates: jest.fn(),
    resetCandidates: jest.fn(),
    loading: false
  }
  let wrapper

  describe('when props.error = true', () => {
    beforeEach(() => {
      const props = {
        ...commonProps,
        error: true
      }

      wrapper = shallow(<OrganisationCandidates {...props} />)
    })

    it('renders <Redirect />', () => {
      expect(wrapper.find('Redirect').length).toEqual(1)
    })
  })

  describe('when props.error = false', () => {
    beforeEach(() => {
      const props = {
        ...commonProps,
        error: false
      }

      wrapper = shallow(<OrganisationCandidates {...props} />)
    })

    it('renders <Candidates />', () => {
      expect(wrapper.find('Candidates').length).toEqual(1)
    })
  })
})
