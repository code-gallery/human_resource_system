import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImportProfile from './components/ImportProfile'
import Layout from 'containers/Layout'
import ContentCard from 'components/ContentCard'
import FileBase64 from 'react-file-base64'
import httpFetch from 'utils/httpFetch'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT, getApiUrl } from 'containers/constants'
import './style.css'

class LinkedinImport extends Component {

  state = {
    cv: null
  }

  upload = (file) => {
    if (!file.base64) {
      alert('Please select a valid file')
      return
    }

    httpFetch(getApiUrl('linkedinImport'), {
      method: 'POST',
      body: JSON.stringify({
        base64Pdf: file.base64
      })
    })
      .then(response => {
        if (response.status === 'success') {
          this.setState({
            cv: response.data
          })
        } else {
          notify.show('There was an error processing your PDF, please try again', 'error', NOTIFICATION_TIMEOUT)
        }
      })
  }

  reset = () => {
    this.setState({
      cv: null
    })
  }

  render() {
    return (
      <Layout>
        <Notifications />
        <div className="container UserVerifications">
          <div className="row">
            <ContentCard title="Import CV">
              { this.state.cv === null ?
                <div>
                  <p>Please upload your exported CV from LinkedIn</p>
                  <FileBase64
                    onDone={this.upload}
                  />
                </div>
                :
                <ImportProfile cv={this.state.cv} history={this.props.history} reset={this.reset} />
              }
            </ContentCard>
          </div>
        </div>
      </Layout>
    )
  }
}

LinkedinImport.propTypes = {
  history: PropTypes.object
}

export default LinkedinImport
