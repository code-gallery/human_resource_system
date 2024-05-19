import React from 'react'
import PDFReader from './index'
import { shallow } from 'enzyme'

describe('<PDFReader />', () => {
  const props = { transcript: 'transcript' }
  describe('when props is valid', () => {
    it('renders correctly', () => {
      const tree = shallow(
        <PDFReader {...props} />
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
