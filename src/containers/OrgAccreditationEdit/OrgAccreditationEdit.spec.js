import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import { shallow } from 'enzyme'
import OrgAccreditationEdit from './OrgAccreditationEdit'
import AccreditationsForm from 'containers/OrgAccreditations/components/AccreditationsForm'

describe('containers/OrgAccreditationEdit', () => {
  const { store } = config
  describe('when props.pending is "fetching"', () => {
    it('renders correctly', () => {
      const props = {
        match: {
          params: {
            orgId: 12,
            id: 123
          }
        },
        orgAccreditation: {
          pending: 'fetching'
        },
        fetch: jest.fn(),
        saveAccreditation: jest.fn(),
        history: {
          push: jest.fn()
        }
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationEdit {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.pending is ""', () => {
    it('renders correctly', () => {
      const props = {
        match: {
          params: {
            orgId: 12,
            id: 123
          }
        },
        orgAccreditation: {
          pending: ''
        },
        fetch: jest.fn(),
        saveAccreditation: jest.fn(),
        history: {
          push: jest.fn()
        }
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAccreditationEdit {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<OrgAccreditationEdit />', () => {
    let props
    let wrapper
    beforeEach(() => {
      props = {
        match: {
          params: {
            orgId: 12,
            id: 123
          }
        },
        orgAccreditation: {
          name: 'Achievement 1',
          award_date: new Date('2016-09-04'),
          award_type: 'certificate',
          description: 'Lorem ipsum dolor',
          lat: 51.5049489,
          lng: -0.019500600000014856,
          award_location: 'London',
          type: 'Certification',
          delivery_type: 'Online',
          enabled: 1,
          radius: 320,
          link: 'http://google.co.uk',
          start_date: '2017-10-01T02:33:00.000Z',
          end_date: '2018-04-21T03:54:00.000Z',
          award_data: {
            date: '2017-11-01',
            description: 'Blockchain developer training',
            grade: 'A',
            level: 'Level 1',
            name: 'Certified Blockchain Developer'
          },
          pending: 'fetchSuccess'
        },
        fetch: jest.fn(),
        saveAccreditation: jest.fn(),
        history: {
          push: jest.fn()
        }
      }

      wrapper = shallow(
        <OrgAccreditationEdit {...props} />
      )
      jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
    })

    it('renders <AccreditationsForm />', () => {
      expect(wrapper.find(AccreditationsForm).length).toEqual(1)
    })

    describe('save', () => {
      it('calls props.saveAccreditation correctly', () => {
        wrapper.instance().save({
          name: 'Name',
          award_type: 'certificate',
          description: 'Lorem ipsum dolor',
          userAwards: []
        })
        expect(props.saveAccreditation).toHaveBeenCalledWith({
          orgId: props.match.params.orgId,
          data: {
            name: 'Name',
            award_type: 'certificate',
            description: 'Lorem ipsum dolor'
          }
        })
      })
    })

    describe('cancel', () => {
      it('calls history.push correctly', () => {
        wrapper.instance().cancel()
        expect(props.history.push).toHaveBeenCalledWith(expect.any(String))
      })
    })

    describe('componentWillReceiveProps', () => {
      it('shows success notification', () => {
        wrapper.setProps({
          orgAccreditation: {
            successMsg: 'success message',
            errorMsg: null
          }
        })
        expect(wrapper.instance().notifyFn).toHaveBeenCalledWith('success message', 'success')
      })

      it('shows error notification', () => {
        wrapper.setProps({
          orgAccreditation: {
            successMsg: null,
            errorMsg: 'error message'
          }
        })
        expect(wrapper.instance().notifyFn).toHaveBeenCalledWith('error message', 'error')
      })
    })
  })
})
