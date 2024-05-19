import React from 'react'
import { shallow } from 'enzyme'
import OrganisationCandidatesSearch from './OrganisationCandidatesSearch'

describe('<OrganisationCandidatesSearch />', () => {
  const commonProps = {
    match: {
      params: {
        orgId: 14
      }
    },
    history: {},
    requestCandidates: jest.fn(),
    loading: false
  }
  let wrapper

  describe('when props.error = true', () => {
    beforeEach(() => {
      const props = {
        ...commonProps,
        error: true
      }

      wrapper = shallow(<OrganisationCandidatesSearch {...props} />)
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

      wrapper = shallow(<OrganisationCandidatesSearch {...props} />)
    })

    it('renders <Candidates />', () => {
      expect(wrapper.find('Candidates').length).toEqual(1)
    })
  })
})
