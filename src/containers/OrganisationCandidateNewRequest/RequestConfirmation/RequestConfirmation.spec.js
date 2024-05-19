import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import RequestConfirmation from './RequestConfirmation'

describe('RequestConfirmation', () => {
  const createCommonProps = props => ({
    organisationImage: 'https://example.com/assets/img/org.jpg',
    profileImage: 'https://example.com/assets/img/user.jpg',
    role: 'Developer',
    date: moment(),
    country: 'United Kingdom',
    region: 'Scotland',
    id: 10,
    checks: [
      {
        id: 1,
        price: 1000,
        type: 'DBS',
        options: {}
      }
    ],
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<RequestConfirmation {...props} />)
    })
  })
})
