import React from 'react'
import renderer from 'react-test-renderer'
import SettingsSection from './SettingsSection'

describe('containers/SettingsAccount/components/SettingsSection', () => {
  describe('when type = communications', () => {
    const settingData = {
      sections: {
        email_frequency: {
          title: 'Email Frequency',
          settings: {
            email_invite_verify: {
              type: 'boolean',
              description: 'Receive personal invitations to verify users details'
            },
            email_messages: {
              type: 'boolean',
              description: 'Receive messages from other APPII users'
            },
            email_opportunities: {
              type: 'boolean',
              description: 'Receive emails about potential jobs and opportunities'
            }
          }
        }
      }
    }

    const settings = {
      email_invite_verify: 0,
      email_messages: 1,
      email_opportunities: 1
    }

    it('renders correctly', () => {
      const props = {
        type: 'communications',
        data: settingData,
        settings,
        saveUserSettings: jest.fn(),
        updateUserProfile: jest.fn()
      }

      const tree = renderer.create(
        <SettingsSection {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when type = privacy', () => {
    const settingData = {
      sections: {
        advertising_preferences: {
          title: 'Advertising preferences',
          settings: {
            cookies_ads: {
              type: 'boolean',
              description: 'APPII may use cookies and similar technologies on third party sites...'
            }
          }
        },
        contact_visibility: {
          title: 'Contact Details',
          settings: {
            visibility_email: {
              type: 'enum',
              enum: { private: 'Only Me', verifiers: 'Verifiers', registered: 'Registered Users', public: 'Everyone' },
              description: 'Who can see your Email Address'
            },
            visibility_twitter: {
              type: 'enum',
              enum: { private: 'Only Me', verifiers: 'Verifiers', registered: 'Registered Users', public: 'Everyone' },
              description: 'Who can see your your Twitter username'
            }
          }
        }
      }
    }

    const settings = {
      visibility_twitter: 'private',
      visibility_email: 'public',
      cookies_ads: 1
    }

    it('renders correctly', () => {
      const user = {
        visibility: 'registered'
      }
      const props = {
        type: 'privacy',
        data: settingData,
        user,
        settings,
        saveUserSettings: jest.fn(),
        updateUserProfile: jest.fn()
      }

      const tree = renderer.create(
        <SettingsSection {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
