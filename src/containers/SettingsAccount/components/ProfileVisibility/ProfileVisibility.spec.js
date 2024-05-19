import React from 'react'
import renderer from 'react-test-renderer'
import ProfileVisibility from './ProfileVisibility'

describe('containers/SettingsAccount/components/ProfileVisibility', () => {
  it('renders correctly', () => {
    const props = {
      value: 'public',
      onChangeInput: jest.fn()
    }
    const tree = renderer.create(
      <ProfileVisibility {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
