import React from 'react'
import { shallow } from 'enzyme'
import WorkPassMain from './WorkPassMain'

describe('<Main />', () => {
  const commonProps = {
    hasNotification: false
  }

  describe('Rendering', () => {
    it('renders without crashing', () => {
      shallow(<WorkPassMain {...commonProps} />)
    })
  })
})
