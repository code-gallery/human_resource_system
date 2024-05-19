import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';

function CriminalRecord(props) {
  const input1 = props.criminal_record_details.criminalDeclarationMultiLineInputBox1
  const input2 = props.criminal_record_details.criminalDeclarationMultiLineInputBox2
  const input3 = props.criminal_record_details.criminalDeclarationMultiLineInputBox3
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">
                Criminal Record Declaration
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
              <div className="row">
                <div className="col-md-6 noPadding">
                  <h4 className="card-title">DETAILS</h4>
                </div>
                <div className="col-md-6">
                  <h4 className="card-title">CANDIDATE RESPONSE</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 noPadding">
                  <p className="card-text">
                    Have you ever been found guilty by Court of any offence in
                    any country, or put on probation?
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <span>
                      <b>{ input1 ? 'Yes' : 'No' }</b>
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 noPadding">
                  <p className="card-text">
                    Have you ever been found convicted by a Court Martial or
                    sentenced to detention whilst serving in the armed Forces?
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <span>
                      <b>{ input2 ? 'Yes' : 'No' }</b>
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 noPadding">
                  <p className="card-text">
                    Do you know of any other matters in your background which
                    might cause your reliability or suitability to have access
                    to Government Assets?
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <span>
                      <b>{ input3 ? 'Yes' : 'No' }</b>
                    </span>
                  </p>
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
                side={props.side}
                check_status={props.check_status}
                userID={props.userID}
                annotationReset={props.annotationReset}
                requestId={props.requestId}
                resetSuccess={props.resetSuccess}
                orgId={props.orgId}
                isEditable={props.isEditable}
              ></AnnotationComponent>
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

export default CriminalRecord
