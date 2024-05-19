import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import WorkExperienceAchievement from './WorkExperienceAchievement'

describe('containers/Profile/components/WorkExperienceAchievement', () => {
  const commonProps = {
    onFieldChange: jest.fn()
  }

  describe('when achievements is null', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        achievements: null
      }
      const tree = renderer.create(
        <WorkExperienceAchievement {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when achievements is not empty', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        achievements: [
          { achievement: 'hello world' },
          { achievement: 'lorem ipsum' }
        ]
      }
      const tree = renderer.create(
        <WorkExperienceAchievement {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('<WorkExperienceAchievement />', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        achievements: [
          { achievement: 'hello world' },
          { achievement: 'lorem ipsum' }
        ]
      }

      wrapper = shallow(
        <WorkExperienceAchievement {...props} />
      )
    })

    describe('addRow', () => {
      describe('when achievements is not empty', () => {
        it('calls props.onFieldChange correctly', () => {
          wrapper.instance().addRow()
          expect(props.onFieldChange).toHaveBeenCalledWith('achievements', [
            ...props.achievements,
            { achievement: '' }
          ])
        })
      })

      describe('when achievements is empty', () => {
        it('calls props.onFieldChange correctly', () => {
          wrapper.setProps({ achievements: [] })
          wrapper.instance().addRow()
          expect(props.onFieldChange).toHaveBeenCalledWith('achievements', [
            { achievement: '' }
          ])
        })
      })
    })

    describe('removeRow', () => {
      it('calls props.onFieldChange correctly', () => {
        wrapper.instance().removeRow(1)
        expect(props.onFieldChange).toHaveBeenCalledWith('achievements', [
          props.achievements[0]
        ])
      })
    })

    describe('updateRow', () => {
      it('calls props.onFieldChange correctly', () => {
        wrapper.instance().updateRow({ achievement: 'lorem ipsum' }, 1)
        expect(props.onFieldChange).toHaveBeenCalledWith('achievements', [
          props.achievements[0],
          { achievement: 'lorem ipsum' }
        ])
      })
    })
  })
})
