import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import CandidateNewRequest from './CandidateNewRequest'

describe('<CandidateNewRequest />', () => {
  const checks = {
    rightToWork: {
      price: 100,
      enabled: true
    },
    dbs: {
      price: 200,
      enabled: true
    },
    dbsEnhanced: {
      price: 300,
      enabled: true
    },
    dbsBasic: {
      price: 100,
      enabled: true
    },
    company: {
      price: 1000,
      enabled: true
    }
  }

  const props = {
    organisationId: 1,
    candidateId: 10,
    postNewRequest: jest.fn(),
    checks
  }

  describe('Rendering', () => {
    it('renders from crashing', () => {
      const tree = renderer.create(<CandidateNewRequest {...props} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('getAvailableOptions', () => {
    describe('when dbsEnhanced is not enabled', () => {
      it('only allows standard options', () => {
        const dbsDisabledProps = {
          ...props,
          checks: {
            ...checks,
            dbsEnhanced: {
              enabled: false
            }
          }
        }
        const wrapper = shallow(<CandidateNewRequest {...dbsDisabledProps} />)
        expect(wrapper.instance().getAvailableDbsOptions()).toEqual([ 'workingAtHome', 'volunteering' ])
      })
    })

    describe('when dbsEnhanced is enabled', () => {
      let wrapper
      beforeEach(() => {
        wrapper = shallow(<CandidateNewRequest {...props} />)
      })

      describe('when enhanced DBS option is not checked', () => {
        it('allows standard options', () => {
          expect(wrapper.instance().getAvailableDbsOptions()).toEqual([ 'workingAtHome', 'volunteering' ])
        })
      })

      describe('when enhanced DBS option is checked', () => {
        it('allows all options', () => {
          wrapper.setState({ dbsType: 'enhanced' })
          expect(wrapper.instance().getAvailableDbsOptions()).toEqual([ 'workingWithChildren', 'workingWithAdults', 'workingAtHome', 'volunteering' ])
        })
      })

      describe('when basic DBS option is checked', () => {
        it('allows no options', () => {
          wrapper.setState({ dbsType: 'basic' })
          expect(wrapper.instance().getAvailableDbsOptions()).toEqual([])
        })
      })
    })
  })
})
