import React from 'react'
import { Table, TableData } from 'components/Table'
import Select from 'react-select'
import CompletedTable from './CompletedTable'

export const Completed = ({ orgId, data }) => {
  return (
    <main>
      <div className="flex-row">
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">Recently Completed</h3>
            <CompletedTable
              orgId={orgId}
              data={data}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

