import React from 'react'
import renderer from 'react-test-renderer'
import ProgressBar from './ProgressBar'

describe('containers/Profile/components/ProgressBar', () => {
  describe('when range uses default prop', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <ProgressBar proficiency="4" />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when range is 11', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <ProgressBar proficiency="8" range={11} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
