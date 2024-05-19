import React from 'react'
import PropTypes from 'prop-types'
import Notifications, { notify } from 'react-notify-toast'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Form from 'components/Abstract/Form'
import Layout from 'containers/Layout'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import LoadingIndicator from 'components/LoadingIndicator'
import PageTitle from 'components/PageTitle'
import ContentCard from 'components/ContentCard'
import ChangePassword from './components/ChangePassword'
import DeleteAccount from './components/DeleteAccount'
import SettingsSection from './components/SettingsSection'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

class SettingsAccount extends Form {
  constructor(props) {
    super(props)

    this.state = {
      currentPassword: '',
      newPassword: '',
      retypedNewPassword: '',
      reason: '',
      errorMessage: ''
    }
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  componentWillMount() {
    this.props.fetchUserSettings()
  }

  /* componentWillReceiveProps(nextProps) {
    const {
      successMsg,
      errorMsg
    } = nextProps.userSettings

    if (successMsg) {
      notify.show(successMsg, 'success', NOTIFICATION_TIMEOUT)
    }

    if (errorMsg) {
      notify.show(errorMsg, 'error', NOTIFICATION_TIMEOUT)
    }
  }*/

  selectReason = (e) => {
    this.setState({
      reason: e.target.value
    })
  }
  deleteUserAccount = () => {
    const { reason } = this.state
    if (reason) {
      this.props.deleteUserAccount({ reason },
        () => {
          const { successMsg, isLogout } = this.props.userSettings
          notify.show(successMsg, 'success', NOTIFICATION_TIMEOUT)
          if (isLogout) {
            this.props.resetToken()
            // this.props.history.push(ROUTE_URL.login)
          }
        },
        () => {
          const { errorMsg } = this.props.userSettings
          notify.show(errorMsg, 'error', NOTIFICATION_TIMEOUT)
        }
      )
    } else {
      this.setState({
        errorMessage: 'Please select reason'
      })
    }
  }

  onChangePassword(e) {
    e.preventDefault()
    const { currentPassword, newPassword } = this.state
    this.props.changePassword({
      existing_password: currentPassword,
      new_password: newPassword
    })
  }

  render() {
    const { currentPassword, newPassword, retypedNewPassword, reason, errorMessage } = this.state
    const {
      user,
      userSettings,
      saveUserSettings,
      updateUserProfile
    } = this.props
    const { settings, settingsConfig } = userSettings

    if (!Object.keys(settings).length && userSettings.pending) {
      return (
        <Layout>
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    if (!Object.keys(settings).length && !userSettings.pending) {
      return (
        <Layout>
          <Notifications />
          <div className="container">
            <PageTitle type="type2">
              <span>Settings & Privacy</span>
            </PageTitle>
            <div className="row">
              <ContentCard>
                <p>Your settings could not be loaded. Please try again.</p>
              </ContentCard>
            </div>
          </div>
        </Layout>
      )
    }

    return (
      <Layout>
        <Notifications />

        <div className="SettingsAccount container">
          <PageTitle type="type2">
            <span>Settings & Privacy</span>
          </PageTitle>

          <div className="row">
            <ContentCard>
              <Tabs>
                <TabList className="settings-tablist">
                  <Tab className="settings-tab">Account</Tab>
                  <Tab className="settings-tab">Privacy</Tab>
                  <Tab className="settings-tab">Communications</Tab>
                </TabList>

                <TabPanel>
                  <ChangePassword
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    retypedNewPassword={retypedNewPassword}
                    onChangeInput={this.onChangeInput}
                    onChangePassword={this.onChangePassword}
                  />
                  <DeleteAccount
                    reason={reason}
                    errorMessage={errorMessage}
                    selectReason={this.selectReason}
                    deleteUserAccount={this.deleteUserAccount}
                  />
                </TabPanel>

                <TabPanel>
                  <SettingsSection
                    type="privacy"
                    user={user}
                    data={settingsConfig.privacy}
                    settings={settings}
                    saveUserSettings={saveUserSettings}
                    updateUserProfile={updateUserProfile}
                  />
                </TabPanel>

                <TabPanel>
                  <SettingsSection
                    type="communications"
                    data={settingsConfig.communications}
                    settings={settings}
                    saveUserSettings={saveUserSettings}
                    updateUserProfile={updateUserProfile}
                  />
                </TabPanel>
              </Tabs>
            </ContentCard>
          </div>
        </div>
      </Layout>
    )
  }
}

SettingsAccount.propTypes = {
  fetchUserSettings: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  saveUserSettings: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  userSettings: PropTypes.shape({
    pending: PropTypes.bool,
    successMsg: PropTypes.string,
    errorMsg: PropTypes.string
  }),
  saveErrorMsg: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  pending: PropTypes.bool
}

export default SettingsAccount
