import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';

function ClientSpecificDocument(props) {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">
                Client Specific Documentation Details
              </div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  to="#"
                  color="blue"
                >
                  Complete
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">DETAILS</h4>
              <div className="row ">
                <div className="col-md-12 noPadding">
                  <div className="col-md-12 col-sm-12">
                    <p className="card-text">
                      Check Result :{" "}
                      <span>
                        <b>Not Applicable</b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={props.checkId}
                type={props.type}
                annotationFetch={props.annotationFetch}
                annotationData={props.annotationData}
                complaince_response={props.complaince_response}
                notes={props.notes}
                userID={props.userID}
                annotationReset={props.annotationReset}
                check_status={props.check_status}
                side={props.side}
                requestId={props.requestId}
                resetSuccess={props.resetSuccess}
                orgId={props.orgId}
                isEditable={props.isEditable}
              />
              <NotesHistory
                notesHistory={props.annotationData.check_data}
              ></NotesHistory>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSpecificDocument;