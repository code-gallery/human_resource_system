import React from 'react'
import OpenAlertsTable from './OpenAlertsTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid'
import { Table, TableData } from 'components/Table'

export const OpenAlerts = ({ orgId, data }) => {
  return (
    <main>
      <div className="flex-row">
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">Open Alerts</h3>
            <OpenAlertsTable
              orgId={orgId}
              data={data}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
