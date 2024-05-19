import { connect } from 'react-redux'
import Component from './Dashboard.js'
import { getActivityData, getCompletedData, getOpenAlertData, getAllOpenAlertData, deleteActivity, assignActivity } from './reducer'

export const mapStateToProps = ({ auth, dashboard }) => {
  return {
    user: auth.user || {},
    activityData: dashboard.activityData,
    completedData: dashboard.completedData,
    openAlertData: dashboard.openAlertData,
    allOpenAlertData: dashboard.allOpenAlertData
  }
}

const mapDispatchToProps = {
  getActivityData,
  getCompletedData,
  getOpenAlertData,
  getAllOpenAlertData,
  deleteActivity,
  assignActivity
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
