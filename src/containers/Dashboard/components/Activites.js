import React from 'react'
import ActivitiesTable from './ActivitiesTable'

export const Activities = ({ data, orgId }) => {
  return (
    <main>
      <div className="flex-row">
        <div className="flex-col">
          <div className="flex-box">
            <h3 className="activity-header">My Activities</h3>
            { data &&
              <ActivitiesTable
                data={data}
                orgId={orgId}
              />
            }
          </div>
        </div>
      </div>
    </main>
  )
}
