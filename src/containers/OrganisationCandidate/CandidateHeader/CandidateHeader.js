import React, { useState } from "react";
import PropTypes from "prop-types";
import CandidateInfo from "../CandidateInfo";
import LinkedButton from "components/LinkedButton";
import { ROUTE_URL } from "containers/constants";
import Button from "components/Button";
import "./style.css";

const CandidateHeader = ({
  candidate,
  orgId,
  vOrgId,
  organisationBalance,
  invitationPending,
  hasRequests,
  className,
  deleteCandidate,
  deletedData,
  isCandidateDelete,
  assignWorkpass,
  assignButtonStatus,
  requestId,
  showReturnBtn,
  activeSection,
  openNoteForm
}) => {
  const orgIsPoor = organisationBalance <= 0;
  const title = orgIsPoor
    ? "You have no balance to create a new candidate request"
    : "New Request";
  const candidateNewRequestLink = ROUTE_URL.organisationCandidateNewRequest
    .replace(":orgId", orgId)
    .replace(":candidateId", candidate.id);

  let disableDelete = false
  if (Array.isArray(deletedData)) {
    if (deletedData.length === 0) {
      disableDelete = true
    }
  }
  let pathname = `/organisations/${orgId}/candidates/${candidate.id}`
  let isDisable = false
  if (vOrgId && vOrgId != orgId) {
    pathname = `/organisations/${vOrgId}/verifyingorganisations/${orgId}/externalCandidates/${candidate.id}`
    isDisable = true
  }
  return (
    <header className={`CandidateHeader ${className}`}>
      <CandidateInfo
        invitationPending={invitationPending}
        hasRequests={hasRequests}
        info={candidate}
        assignWorkpass={assignWorkpass}
        assignButtonStatus={assignButtonStatus}
        showConfirmBtn={true && !requestId}
      />
      <div className="buttons_section">
        { (candidate.userId === null) &&
          <Button
            color="red"
            className="CandidateHeader__button delete_can_btn"
            // disabled = {disableDelete}
            disabled={!isCandidateDelete}
            onClick={() => { if (window.confirm('Do you want to delete this candidate?')) deleteCandidate(candidate.id, candidate.userId, orgId, false, isCandidateDelete) } }
          >Delete Candidate
          </Button>
        }
        {showReturnBtn &&
          <LinkedButton
            className="CandidateNewRequestsHeader__btn"
            color="blue"
            to={{
              pathname,
              state: { 'requestId': requestId,
                'redirectTo': 'requestNum' }
            }}>
            Return
          </LinkedButton>
        }
        {
          activeSection === 'notes' ?
            <Button
              className="CandidateHeader__button new-note"
              color="green"
              onClick={openNoteForm}
              title="New Note"
            >
              New Note
            </Button>
            :
            <LinkedButton
              className="CandidateHeader__button"
              color="green"
              to={candidateNewRequestLink}
              disabled={orgIsPoor || isDisable}
              title={title}
            >New Request
            </LinkedButton>
        }
      </div>
    </header>
  );
};

CandidateHeader.propTypes = {
  orgId: PropTypes.number.isRequired,
  candidate: PropTypes.object.isRequired,
  invitationPending: PropTypes.bool.isRequired,
  organisationBalance: PropTypes.number.isRequired,
  className: PropTypes.string,
  hasRequests: PropTypes.bool.isRequired,
  assignButtonStatus: PropTypes.bool
};

CandidateHeader.defaultProps = {
  className: "",
};

export default CandidateHeader;
