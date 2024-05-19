import React, { useState } from 'react';
import PropTypes from 'prop-types'
import CandidateRequestsTable from './CandidateRequestsTable/CandidateRequestsTable'
import NoteForm from './Notes/NoteForm'
import Notes from './Notes/Notes'

const CandidateRequests = (props) => {

  // const [ activeSection, setActiveSection ] = useState('workpass')
  const [ width, setWidth ] = useState('100%')

  const setSection = (type) => {
    // setActiveSection(type)
    props.setSection(type)
    if (type === 'notes') {
      setWidth('49%')
    } else {
      setWidth('100%')
    }
  }

  return (
    <div className="wpr-container">
      <section className="CandidateRequestsTable">
        <h1 className="CandidateRequestsTable__header">
          <span className={`wp-heading ${props.activeSection === 'workpass' && 'active'}`} onClick={ () => setSection('workpass') }>Work Pass Requests</span>
          <span className={`notes-heading ${props.activeSection === 'notes' && 'active'}`} onClick={ () => setSection('notes') }>Notes</span>
        </h1>
        { props.activeSection === 'workpass' &&
          <CandidateRequestsTable
            orgId={props.orgId}
            candidate={props.candidate}
            candidateId={props.candidateId}
            requests={props.requests}
            location={props.location}
            deleteRequest={props.deleteRequest}
            deleteReqStatus={props.deleteReqStatus}
            refreshRequest={props.refreshRequest}
            refreshReqStatus={props.refreshReqStatus}
            saveEmploymentReference={props.saveEmploymentReference}
            filterOrganisation={props.filterOrganisation}
            organisations={props.organisations}
            loading={props.loader}
            saveEmpLoader={props.saveEmpLoader}
            getRequest={props.getRequest}
            fetchCandidatePersonalInfo={props.fetchCandidatePersonalInfo}
            personalinfo={props.personalinfo}
            addresses={props.addresses}
            savePersonalInfo={props.savePersonalInfo}
            saveAddress={props.saveAddress}
            deleteAddress={props.deleteAddress}
            editAddress={props.editAddress}
            userId={props.userId}
          />
        }
        {
          props.activeSection === 'notes' &&
          <Notes
            org_id={props.orgId}
            user_id={props.userId}
            candidate_id={props.candidateId}
            notes={props.notes}
            saveNote={props.saveNote}
            editNote={props.editNote}
          />
        }
      </section>
      {
        (props.activeSection === 'notes' && props.isNoteFormOpen) &&
          <NoteForm
            org_id={props.orgId}
            user_id={props.loggedInUser}
            edit_note={props.edit_note}
            candidate_id={props.candidateId}
            notes={props.notes}
            saveNote={props.saveNote}
            pendingNote={props.pendingNote}
            deleteNote={props.deleteNote}
            closeNoteForm={props.closeNoteForm}
          />
      }
    </div>
  );
}

CandidateRequests.propTypes = {
  orgId: PropTypes.number.isRequired,
  candidateId: PropTypes.number.isRequired,
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.object.isRequired,
      role: PropTypes.string.isRequired,
      employerName: PropTypes.string,
      status: PropTypes.oneOf([
        "complete",
        "declined",
        "pending",
        "submitted",
        "awaiting_response",
      ]).isRequired,
    })
  ).isRequired,
};

export default CandidateRequests;
