import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid'
import { Table, TableData } from 'components/Table'
import { ROUTE_URL } from 'containers/constants'
import { Link } from 'react-router-dom'
import Select from 'react-select'

const ActivitiesTable = ({ data, orgId }) => {
  const [ officer, setOfficer ] = useState('')

  const assignActivity = (value) => {
    setOfficer(value)
  }

  const deleteActivity = (id) => {
  }

  return (
    <Table className="CandidateRequestsTable__table" >
      <thead>
        <tr>
          <th className="TableHeading left-align">#</th>
          <th className="TableHeading left-align">Activity</th>
          <th className="TableHeading left-align">Candidate</th>
          <th className="TableHeading center-align">Assign</th>
          <th className="TableHeading center-align"></th>
        </tr>
      </thead>
      <tbody>
        { data.length ? data.map((res, idx) => {
          const { id, candidate, candidate_id, request_id, type, side, status, options, activity, officerdetails } = res
          let refOption = '1ref'
          const option = JSON.parse(options)
          if (type === 'employment_reference') {
            refOption = option.Employee_1_ref ? '1ref' : option.Employee_2_ref ? '2ref' : option.Employee_3_ref ? '3ref' : option.Employee_4_ref ? '4ref' : option.Employee_5_ref ? '5ref' : option.Employee_6_ref ? '6ref' : option.Employee_7_ref ? '7ref' : '1ref'
          }
          const link = ROUTE_URL.workPassCheckDetails
            .replace(":orgId", orgId)
            .replace(":candidateId", candidate_id)
            .replace(":requestId", request_id)
            .replace(":checkId", id)
            .replace(":type", type)
            .replace(":side", side)
            .replace(":status", status)
            .replace(":refOption", refOption)
            .replace(":optiontype", option.type || type)
          const candidateLink = ROUTE_URL.organisationCandidate
            .replace(':orgId', orgId)
            .replace(':candidateId', candidate_id)
          const officerOptions = officerdetails ? officerdetails.map(off => {
            return {
              value: off.id,
              label: off.first_name + ' ' + off.last_name
            }
          }) : []
          return (
            <tr key={idx} className="CandidatesTable__table-row">
              <TableData className="CandidatesTable__table-data left-align cell-width">
                {idx + 1}
              </TableData>
              <TableData className="CandidatesTable__table-data left-align cell-width link">
                <Link
                  to={{
                    pathname: link
                  }}
                >
                  {activity}
                </Link>
              </TableData>
              <TableData className="CandidatesTable__table-data left-align cell-width link">
                <Link
                  to={{
                    pathname: candidateLink
                  }}
                >
                  {candidate[0].first_name}
                </Link>
              </TableData>
              <TableData className="CandidatesTable__table-data cell-width no-padding assign">
                <Select
                  options={officerOptions}
                  value={officer}
                  onChange={e => assignActivity(e.value)}
                />
              </TableData>
              <TableData className="CandidatesTable__table-data center-align cell-width">
                <FontAwesomeIcon
                  className="fa-icon red-icon"
                  icon={faTrashAlt}
                  onClick={() => {
                    if (window.confirm('Are you sure to delete this item?')) {
                      deleteActivity(id)
                    }
                  }}
                />
              </TableData>
            </tr>
          )
        })
          :
          (<tr className="CandidatesTable__table-row">
            <TableData className="CandidatesTable__table-data left-align cell-width" colSpan="4">
              No Data found
            </TableData>
          </tr>)
        }
      </tbody>
    </Table>
  )
}

export default ActivitiesTable
