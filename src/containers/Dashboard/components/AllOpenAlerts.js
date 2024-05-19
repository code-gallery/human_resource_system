import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid'
import { Table, TableData } from 'components/Table'
import AllOpenAlertsTable from './AllOpenAlertsTable'

export const AllOpenAlerts = ({ orgId, data }) => {
  return (
    <main>
      <div className="flex-row">
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">All Open Alerts</h3>
            <AllOpenAlertsTable
              orgId={orgId}
              data={data}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
