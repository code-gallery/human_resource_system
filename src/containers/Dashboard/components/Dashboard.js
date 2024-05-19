import React from 'react'
import AllOpenAlertsTable from './AllOpenAlertsTable'
import OpenAlertsTable from './OpenAlertsTable'
import ActivitiesTable from './ActivitiesTable'
import CompletedTable from './CompletedTable'

export const Dashboard = ({ orgId, activityData, completedData, openAlertData, allOpenAlertData, setPage }) => {
  console.log('completedData', completedData)
  return (
    <main>
      <div className="flex-row">
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">My Activities</h3>
            { activityData &&
              <ActivitiesTable
                orgId={orgId}
                data={activityData.slice(0, 5)}
              />
            }
            { activityData.length > 5 &&
              <span className="view-all link" onClick={() => setPage('activites')}>View All</span>
            }
          </div>
        </div>
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">Recently Completed</h3>
            { completedData &&
              <CompletedTable
                orgId={orgId}
                data={completedData.slice(0, 5)}
              />
            }
            { completedData.length > 5 &&
              <span className="view-all link" onClick={() => setPage('completed')}>View All</span>
            }
          </div>
        </div>
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">Open Alerts</h3>
            <OpenAlertsTable
              orgId={orgId}
              data={openAlertData}
            />
            <span className="view-all link" onClick={() => setPage('openalerts')}>View All</span>
          </div>
        </div>
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">All Open Alerts</h3>
            <AllOpenAlertsTable
              orgId={orgId}
              data={allOpenAlertData}
            />
            <span className="view-all link" onClick={() => setPage('allopenalerts')}>View All</span>
          </div>
        </div>
      </div>
    </main>
  )
}

