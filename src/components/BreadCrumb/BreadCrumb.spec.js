import React from 'react'
import { shallow } from 'enzyme'
import BreadCrumb from './BreadCrumb'

describe('<BreadCrumb />', () => {
  const createCommonProps = props => ({
    links: [
      {
        name: 'All Candidates',
        url: '/organisations/55/candidates',
        active: false
      },

      {
        name: 'Rocky',
        url: '/organisations/55/candidates/10',
        active: true
      }
    ],
    ...props
  })

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const props = createCommonProps()

      shallow(<BreadCrumb {...props} />)
    })
  })
})
