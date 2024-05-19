import React from 'react'
import renderer from 'react-test-renderer'
import OptionRenderer from './OptionRenderer'

describe('containers/LinkedinImport/OptionRenderer', () => {
  it('Renders correctly', () => {
    const wrapper = renderer.create(
      <OptionRenderer
        logo_image="test.jpg"
        name="Test name"
        country="Test country"
      />
    ).toJSON()

    expect(wrapper).toMatchSnapshot()
  })
})

