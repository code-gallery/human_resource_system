import React, { useState } from 'react';
import { Table, TableData } from 'components/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/fontawesome-free-solid'
import moment from 'moment'

const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const Notes = props => {
  return (
    <div className="row notes-section">
      <div className="col-md-12">
        <Table className="CandidateRequestsTable__table candidateRequestNew" >
          <thead>
            <tr>
              {/* <th className="TableHeading checkbox">
                <input type="checkbox" />
              </th>*/}
              <th className="TableHeading">Date</th>
              <th className="TableHeading">Time</th>
              <th className="TableHeading">Type</th>
              <th className="TableHeading">Officer</th>
              <th className="TableHeading">Status</th>
              <th className="TableHeading">Attachments</th>
            </tr>
          </thead>
          <tbody>
            {
              props.notes.length ? props.notes.map((note, idx) => {
                // const files = isJsonString(note.files) ? JSON.parse(note.files) : []
                return (
                  <tr className="CandidatesTable__table-row" key={idx}>
                    {/* <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:"middle"}}>
                      <input type="checkbox" />
                    </TableData> */}
                    <TableData className="CandidatesTable__table-data date cell-width"
                      onClick={() => props.editNote(note)}
                    >
                      {moment(new Date(note.created_at)).format('DD/MM/YYYY')}
                    </TableData>
                    <TableData className="CandidatesTable__table-data cell-width">
                      {moment(new Date(note.created_at)).format('hh:mm')}
                    </TableData>
                    <TableData className="CandidatesTable__table-data cell-width">
                      {note.note_type}
                    </TableData>
                    <TableData className="CandidatesTable__table-data cell-width">
                      {note.officerName}
                    </TableData>
                    <TableData className="CandidatesTable__table-data cell-width">
                      {note.note_status}
                    </TableData>
                    <TableData className="CandidatesTable__table-data cell-width">
                      { note.files.length ?
                        <FontAwesomeIcon
                          className="fa-icon"
                          icon={faPaperclip}
                        />
                        : ''}
                    </TableData>
                  </tr>
                )
              })
                :
                <tr>
                  <TableData
                    colSpan="6"
                    className="CandidateRequestsTable__table-data CandidateRequestsTable__empty"
                  >
                    <h2 className="CandidateRequestsTable__empty-header">
                      No Notes
                    </h2>
                    <p>Create one by clicking the New Note button</p>
                  </TableData>
                </tr>
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Notes
