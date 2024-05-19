import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import { Link } from "react-router-dom";

function Sanctions(props) {
  var gbg_response = ''
  if (props.sanctionData && props.sanctionData.length) {
    var abc = JSON.stringify(props.sanctionData)
    var bc = JSON.parse(abc).map(check => check.gbg_response)
    bc = JSON.parse(bc)
    gbg_response = bc.GBG_response.AuthenticateSPResult.BandText._text
  }
  var status = (gbg_response === 'No Match') ? 'CLEAR' : 'MATCH'
  var color = (gbg_response === 'No Match') ? 'green' : 'red'

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className={`card-header-${color}`}>
              <div className="col-md-6 checkTitle">Sanctions and PEPS</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  to="#"
                  color={color}
                >
                  {status}
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">DETAILS</h4>
              <div className="row ">
                <div className="col-md-12 noPadding">
                  <div className="col-md-8 col-sm-12">
                    <p className="card-text">
                      GBG Group Plc - Check Result :
                      <span
                        className={`statusText-${color}`}
                      >
                        {gbg_response.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <Link to="#" className="reportLink">
                      ATTACH REPORT
                    </Link>
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
export default Sanctions;
