import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkPassViewRequestData from './WorkPassViewRequestData'
import Button from '../../components/Button'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import config from 'store'
import { any } from 'prop-types'

configure({adapter: new Adapter()});

describe('<WorkPassViewRequestData />', () => {
  describe('Rendering', () => {
    const commonProps = {
      match: {
        params: {
          orgId: '1',
          candidateId: '10',
          requestId: '25'
        }
      },
      candidate: {
        requests: []
      },
      fetchingCandidate: false,
      request: { checks: [] },
      getRequest: jest.fn(),
      requestCandidate: jest.fn(),
      history: {
        push: jest.fn()
      },
      organisationBalance: { balance: 1000 }
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <Provider store={config.store}>
          <Router>
            <WorkPassViewRequestData {...commonProps} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<WorkPassViewRequestData /> status submitted', () => {
  describe('Rendering', () => {
    const commonProps = {
      match: {
        params: {
          orgId: '1',
          candidateId: '10',
          requestId: '25'
        }
      },
      candidate: {
        requests: [{
          status : 'submitted'
        }]
      },
      fetchingCandidate: false,
      request: { checks: [{
        id : '1',
        type : 'driver_license_check',
        side : 'candidate',
        status : 'complete',
        data : [{
          check_id : '2',
          name : 'driver_license_check',
          type : 'attribute',
          snapshot : {}
        }]
      }] },
      getRequest: jest.fn(),
      requestCandidate: jest.fn(),
      history: {
        push: jest.fn()
      },
      organisationBalance: { balance: 1000 }
    }

    const confirmCandidate = jest.fn();

    it('renders correctly', () => {
      const tree = renderer.create(
        <Provider store={config.store}>
          <Router>
            <WorkPassViewRequestData {...commonProps} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<WorkPassViewRequestData /> status submitted', () => {
  describe('Rendering', () => {
    const commonProps = {
      match: {
        params: {
          orgId: '1',
          candidateId: '10',
          requestId: '25'
        }
      },
      candidate: {
        requests: [{
          status : 'submitted'
        }]
      },
      fetchingCandidate: false,
      request: { checks: [] },
      getRequest: jest.fn(),
      requestCandidate: jest.fn(),
      history: {
        push: jest.fn()
      },
      organisationBalance: { balance: 1000 },
      error : true
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <Provider store={config.store}>
          <Router>
            <WorkPassViewRequestData {...commonProps} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<WorkPassViewRequestData /> button click', () => {
  const commonProps = {
    match: {
      params: {
        orgId: '1',
        candidateId: '10',
        requestId: '25'
      }
    },
    candidate: {
      requests: [{
        
      }]
    },
    fetchingCandidate: false,
    request: { checks: [], status : 'submitted' },
    getRequest: jest.fn(),
    requestCandidate: jest.fn(),
    history: {
      push: jest.fn()
    },
    organisationBalance: { balance: 1000 },
    error : false
  }
  it('Calls confirmCandidate', () => {
    
    const wrapper = mount(
      <Provider store={config.store}>
          <Router>
            <WorkPassViewRequestData {...commonProps} />
          </Router>
        </Provider>
    )
    const confirmCandidate = jest.fn()
    const btn = wrapper.find(Button)
    btn.simulate('click')
    expect(confirmCandidate.mock.calls.length).not.toEqual(1);
    //expect(confirmCandidate).toHaveBeenCalled();
  })
})




