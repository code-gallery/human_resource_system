import React, { Component } from 'react'
import { NOTIFICATION_TIMEOUT, getApiUrl } from 'containers/constants'
import Notifications, { notify } from 'react-notify-toast'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import WorkPassMain from 'components/WorkPassMain'
import BreadCrumb from 'components/BreadCrumb'
import { Dashboard as Main } from './components/Dashboard'
import { AllOpenAlerts } from './components/AllOpenAlerts'
import { OpenAlerts } from './components/OpenAlerts'
import { Activities } from './components/Activites'
import { Completed } from './components/Completed'
import Layout from 'containers/Layout'
import './style.css'

class Dashboard extends Component {
  state = {
    page: 'dashboard'
  }

  componentDidMount() {
    this.props.getActivityData()
    this.props.getCompletedData({orgId: this.props.match.params.orgId})
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key && this.state.page !== 'dashboard') {
      this.setState({ page: 'dashboard' })
    }
  }

  setPage = (page) => {
    this.setState({ page })
  }

  render() {
    const { orgId } = this.props.match.params
    const { user, activityData, completedData, openAlertData, allOpenAlertData } = this.props
    const breadCrumbs = [
      {
        name: 'Officer',
        url: `/organisations/${orgId}/dashboard`,
        active: false,
        redirectTo: 'candidates'
      },

      {
        name: user.first_name ? user.first_name : '',
        url: `/organisations/${orgId}/dashboard`,
        active: true,
        redirectTo: 'candidateRequests'
      }
    ]
    return (
      <Layout showFooter={false} responsive={false}>
        <Notifications></Notifications>
        <WorkPassSideMenu organisationId={orgId} />
        <WorkPassMain>
          <BreadCrumb className="Candidate__breadcrumb" links={breadCrumbs} />
          { this.state.page === 'dashboard' &&
            <Main
              orgId={orgId}
              page={this.state.page}
              setPage={this.setPage}
              activityData={activityData}
              completedData={completedData}
              openAlertData={openAlertData}
              allOpenAlertData={allOpenAlertData}
            />
          }
          { this.state.page === 'activites' &&
            <Activities
              orgId={orgId}
              page={this.state.page}
              setPage={this.setPage}
              data={activityData}
            />
          }
          { this.state.page === 'completed' &&
            <Completed
              orgId={orgId}
              page={this.state.page}
              setPage={this.setPage}
              data={completedData}
            />
          }
          { this.state.page === 'openalerts' &&
            <OpenAlerts
              orgId={orgId}
              page={this.state.page}
              setPage={this.setPage}
              data={openAlertData}
            />
          }
          { this.state.page === 'allopenalerts' &&
            <AllOpenAlerts
              orgId={orgId}
              page={this.state.page}
              setPage={this.setPage}
              data={allOpenAlertData}
            />
          }
        </WorkPassMain>
      </Layout>
    )
  }
}

export default Dashboard
