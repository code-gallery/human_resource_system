import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import List from './List'

describe('containers/OrgAccreditations/components/List', () => {
  const { store } = config
  describe('when props.pending is "fetching"', () => {
    it('renders correctly', () => {
      const props = {
        awards: [],
        deleteAccreditation: jest.fn(),
        pending: 'fetching'
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <List {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.awards is empty', () => {
    it('renders correctly', () => {
      const props = {
        awards: [],
        deleteAccreditation: jest.fn(),
        pending: 'fetchSuccess'
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <List {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.awards is not empty', () => {
    it('renders correctly', () => {
      const props = {
        awards: [
          {
            id: 1, name: 'Blockchain', level: 'Level 1',
            enabled: 1, delivery_type: 'In a classroom', type: 'cpd',
            organisation_id: 100
          },
          {
            id: 2, name: 'Award 1', level: 'Level 2',
            enabled: 0, delivery_type: 'Online', type: 'award',
            organisation_id: 200
          }
        ],
        awardTypes: {
          cpd: { label: 'CPD' },
          award: { label: 'Award' }
        },
        deleteAccreditation: jest.fn(),
        pending: 'fetchSuccess'
      }
      const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <List {...props} />
          </Router>
        </Provider>
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
