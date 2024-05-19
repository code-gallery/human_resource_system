import React, { useState } from 'react'
import { startCase } from 'lodash'
import { Table, TableData } from 'components/Table'
import { ROUTE_URL } from 'containers/constants'
import { Link } from 'react-router-dom'
import moment from 'moment'
const typeNames = require('../../../utils/reference_type.json')

const CompletedTable = ({ data, orgId }) => {
  return (
    <Table className="CandidateRequestsTable__table" >
      <thead>
        <tr>
          <th className="TableHeading left-align">Check</th>
          <th className="TableHeading left-align">Company</th>
          <th className="TableHeading right-align">Candidate</th>
          <th className="TableHeading right-align">Check Name</th>
          <th className="TableHeading right-align">Officer Status</th>
          <th className="TableHeading right-align">Date</th>
        </tr>
      </thead>
      <tbody>
        { data.length ? data.map((res, idx) => {
          const candidateName = res.candidatedetails ? `${res.candidatedetails.first_name} ${res.candidatedetails.last_name}` : ''
          const candidateId = res.candidatedetails ? res.candidatedetails.id : ''
          const date = new Date(res.created_at)
          const candidateLink = ROUTE_URL.organisationCandidate
            .replace(':orgId', orgId)
            .replace(':candidateId', candidateId)
          return (
            <tr className="CandidatesTable__table-row" key={idx}>
              <TableData className="CandidatesTable__table-data left-align cell-width">
                {idx + 1}
              </TableData>
              <TableData className="CandidatesTable__table-data right-align cell-width">
                {res.employerName}
              </TableData>
              <TableData className="CandidatesTable__table-data right-align cell-width link">
                <Link
                  to={{
                    pathname: candidateLink
                  }}
                >
                  {candidateName}
                </Link>
              </TableData>
              <TableData className="CandidatesTable__table-data right-align cell-width">
                {typeNames[res.type]}
              </TableData>
              <TableData className="CandidatesTable__table-data right-align cell-width">
                {startCase(res.officer_status)}
              </TableData>
              <TableData className="CandidatesTable__table-data right-align cell-width">
                {moment(date.toISOString().substring(0, 10), 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </TableData>
            </tr>
          )
        })
          :
          (<tr className="CandidatesTable__table-row">
            <TableData className="CandidatesTable__table-data left-align cell-width" colSpan="5">
              No Data found
            </TableData>
          </tr>)
        }
      </tbody>
    </Table>
  )
}

export default CompletedTable
