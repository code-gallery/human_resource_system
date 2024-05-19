import React from 'react'
import { shallow } from 'enzyme'
import RequestStatus from './RequestStatus'

describe('<RequestStatus />', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      shallow(<RequestStatus status="complete" />)
    })
  })
})
