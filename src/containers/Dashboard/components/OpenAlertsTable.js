import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid'
import { Table, TableData } from 'components/Table'
import { ROUTE_URL } from 'containers/constants'
import { Link } from 'react-router-dom'

const OpenAlertsTable = (props) => {
  return (
    <Table className="CandidateRequestsTable__table" >
      <thead>
        <tr>
          <th className="TableHeading left-align">#</th>
          <th className="TableHeading left-align">Check Name</th>
          <th className="TableHeading right-align">Alter Type</th>
          <th className="TableHeading right-align">Date</th>
          <th className="TableHeading rignt-align"></th>
        </tr>
      </thead>
      <tbody>
        <tr className="CandidatesTable__table-row">
          <TableData className="CandidatesTable__table-data left-align cell-width">
            10
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            Adverse finance
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width link">
            Fail
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            19/09/21
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            <FontAwesomeIcon
              className="fa-icon red-icon"
              icon={faTrashAlt}
              // onClick={() => this.delete(address.id)}
            />
          </TableData>
        </tr>
        <tr className="CandidatesTable__table-row">
          <TableData className="CandidatesTable__table-data left-align cell-width">
            125
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            DBS
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width link">
            Alert
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            23/09/21
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            <FontAwesomeIcon
              className="fa-icon red-icon"
              icon={faTrashAlt}
              // onClick={() => this.delete(address.id)}
            />
          </TableData>
        </tr>
        <tr className="CandidatesTable__table-row">
          <TableData className="CandidatesTable__table-data left-align cell-width">
            1225
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            Address History
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width link">
            Negative Declartion
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            20/01/21
          </TableData>
          <TableData className="CandidatesTable__table-data right-align cell-width">
            <FontAwesomeIcon
              className="fa-icon red-icon"
              icon={faTrashAlt}
              // onClick={() => this.delete(address.id)}
            />
          </TableData>
        </tr>
      </tbody>
    </Table>
  )
}

export default OpenAlertsTable
