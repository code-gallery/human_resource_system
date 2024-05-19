import React from 'react'
import PropTypes from 'prop-types'
import _isNil from 'lodash/isNil'
import Notifications, { notify } from 'react-notify-toast'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Layout from 'containers/Layout'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import Form from 'components/Abstract/Form'
import ContentCard from 'components/ContentCard'
import PageTitle from 'components/PageTitle'
import OrganisationForm from './components/OrganisationForm'
import LinkedInSearch from './components/LinkedInSearch'

class NewOrganisation extends Form {
  constructor(props) {
    super(props)
    this.savingForm = false
    this.state = {
      errorsForm: [],
      successForm: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.storage.successMsg) {
      if (this.savingForm) {
        this.savingForm = false
        this.setState({ successForm: true })
      }
      this.notifyFn(nextProps.storage.successMsg, 'success')
    } else if (nextProps.storage.errorMsg) {
      this.savingForm = false
      this.notifyFn(nextProps.storage.errorMsg, 'error')
    }
  }

  saveOrganisationForm = (e) => {
    e.preventDefault()
    this.setState({ successForm: false })
    const required = [ 'name', 'websiteUrl', 'contactName', 'contactEmail' ]
    const errorsForm = []
    for (let i = 0; i < required.length; i++) {
      if (_isNil(this.state[required[i]]) || this.state[required[i]] === '') {
        errorsForm.push(required[i])
      }
    }

    if (errorsForm.length === 0 && !this.savingForm) {
      const payload = {
        type: 'organisationRegistration',
        json: {
          name: this.state.name,
          websiteUrl: this.state.websiteUrl,
          contactName: this.state.contactName,
          contactEmail: this.state.contactEmail
        }
      }

      if (this.state.linkedInUrl) {
        payload.json.linkedInUrl = this.state.linkedInUrl
      }
      this.savingForm = true
      this.props.saveStorage(payload)
    } else {
      this.setState({ errorsForm })
    }
  }

  saveLinkedInOrganisation = (json) => {
    const payload = {
      type: 'organisationRegistration',
      json
    }
    this.props.saveStorage(payload)
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, NOTIFICATION_TIMEOUT)
  }

  render() {
    const { errorsForm, successForm, name } = this.state
    return (
      <Layout>
        <Notifications />
        <div className="container">
          <PageTitle type="type2" title="New Organisation" />
          <div className="row SettingsAccount">
            <ContentCard>
              <Tabs>
                <TabList className="settings-tablist">
                  <Tab className="settings-tab">Form</Tab>
                  <Tab className="settings-tab">LinkedIn Search</Tab>
                </TabList>

                <TabPanel>
                  <OrganisationForm
                    name={name}
                    onChangeInput={this.onChangeInput}
                    save={this.saveOrganisationForm}
                    errors={errorsForm}
                    success={successForm}
                  />
                </TabPanel>

                <TabPanel>
                  <LinkedInSearch
                    onChangeInput={this.onChangeInput}
                    save={this.saveLinkedInOrganisation}
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

NewOrganisation.propTypes = {
  storage: PropTypes.shape({
    errorMsg: PropTypes.oneOfType([
      PropTypes.string, PropTypes.object
    ]),
    successMsg: PropTypes.oneOfType([
      PropTypes.string, PropTypes.object
    ])
  }),
  saveStorage: PropTypes.func.isRequired
}

export default NewOrganisation
