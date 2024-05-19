import React from 'react'
import { shallow } from 'enzyme'
import OrgAdmins from './OrgAdmins'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'

describe('<OrgAdmins />', () => {
  const commonProps = {
    orgAdmins: {
      admins: [
        {
          organisation_id: 'orgid1',
          id: 'id1',
          primary: 'primary1',
          user: {
            id: 'userid1',
            profileimage: 'http://angular.github.io/react-native-renderer/assets/angular.png'
          }
        },
        {
          organisation_id: 'orgid2',
          id: 'id2',
          primary: 'primary2',
          user: {
            id: 'userid2',
            profile_image: 'http://angular.github.io/react-native-renderer/assets/react.png'
          }
        }
      ],
      org: { name: 'name1', id: 'id1' },
      employees: [
        {
          biometrics_status: 'complete',
          admin: true,
          profile_image: 'http://angular.github.io/react-native-renderer/assets/react.png',
          first_name: 'First1',
          last_name: 'Last1'
        },
        {
          biometrics_status: 'complete',
          admin: false,
          profile_image: 'http://angular.github.io/react-native-renderer/assets/angular.png',
          first_name: 'First2',
          last_name: 'Last2'
        }
      ],
      pending: true
    },
    match: { params: { orgId: 'orgId' } },
    fetchOrgAdmins: jest.fn(),
    fetchOrgEmployees: jest.fn(),
    addAdmin: jest.fn(),
    deleteAdmin: jest.fn()
  }
  let wrapper
  let props

  beforeEach(() => {
    props = {
      ...commonProps
    }
    wrapper = shallow(
      <OrgAdmins {...props} />
    )
  })

  describe('componentWillMount', () => {
    it('calls props.fetchOrgAdmins correctly', () => {
      expect(props.fetchOrgAdmins).toHaveBeenCalledWith({
        orgId: 'orgId'
      })
    })

    it('calls props.fetchOrgEmployees correctly', () => {
      expect(props.fetchOrgEmployees).toHaveBeenCalledWith({
        orgId: 'orgId'
      })
    })
  })

  describe('componentWillReceiveProps', () => {
    it('this.filterEmployees was called correctly', () => {
      const filterEmployees = jest.spyOn(wrapper.instance(), 'filterEmployees')
      wrapper.setProps({
        orgAdmins: commonProps.orgAdmins
      })
      expect(filterEmployees).toHaveBeenCalled()
    })

    it('when !filteredEmployees.length', () => {
      it('this.state.showForm=false', () => {
        wrapper.setProps({
          orgAdmins: commonProps.orgAdmins
        })
        expect(wrapper.state()).objectContaining({
          showForm: false
        })
      })
    })
  })

  describe('filterEmployees', () => {
    it('returns correct values', () => {
      const employees = wrapper.instance().filterEmployees(commonProps.orgAdmins.employees)
      employees.forEach(employee => expect(employee)
        .toEqual(expect.objectContaining({ admin: false, biometrics_status: 'complete' })))
    })
  })

  describe('toggleForm', () => {
    it('toggles state.showForm correctly', () => {
      const prevState = wrapper.state()
      wrapper.instance().toggleForm({ preventDefault: () => {} })
      const nextState = wrapper.state()
      expect(nextState.showForm).not.toEqual(prevState.showForm)
    })
  })

  describe('when props.pending is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        orgAdmins: {
          ...commonProps.orgAdmins,
          pending: false
        }
      }

      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAdmins {...props} />
          </Router>
        </Provider>
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.pending is true', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps
      }
      const { store } = config
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <OrgAdmins {...props} />
          </Router>
        </Provider>
      ).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
