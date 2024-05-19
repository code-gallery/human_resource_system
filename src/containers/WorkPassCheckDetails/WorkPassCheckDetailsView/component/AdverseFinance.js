import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import { Link } from 'react-router-dom';

function AdverseFinance(props) {
  let inputBox1, inputBox2;
  if (props.advData.hasOwnProperty("GBG_response")) {
    inputBox1 = props.advData.Snapshot[0].adversFinanceMultiLineInputBox1 !== null ? props.advData.Snapshot[0].adversFinanceMultiLineInputBox1 : ''
    inputBox2 = props.advData.Snapshot[0].adversFinanceMultiLineInputBox2 !== null ? props.advData.Snapshot[0].adversFinanceMultiLineInputBox2 : ''
  } else {
    inputBox1 = props.advData.check_data.dataSnapshot[0].adversFinanceMultiLineInputBox1 !== null ? props.advData.check_data.dataSnapshot[0].adversFinanceMultiLineInputBox1 : ''
    inputBox2 = props.advData.check_data.dataSnapshot[0].adversFinanceMultiLineInputBox2 !== null ? props.advData.check_data.dataSnapshot[0].adversFinanceMultiLineInputBox2 : ''
  }

  let gbg_response = 'No Result'
  let color = 'red'
  let status = 'MATCH'
  if (props.advData.hasOwnProperty("GBG_response")) {
    gbg_response = props.advData.GBG_response
  } else if (props.advData.check_data.dataGBG.GBG_response) {
    gbg_response = props.advData.check_data.dataGBG.GBG_response
  } else if (props.advData.check_data.dataGBG.checks) {
    gbg_response = props.advData.check_data.dataGBG.checks[1].outcome.overall
  }
  if (gbg_response.toLowerCase() === 'alert') {
    status = 'ALERT'
    color = 'amber'
  } else if (gbg_response.toLowerCase() === 'pass') {
    status = 'CLEAR'
    color = 'green'
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className={`card-header-${color}`}>
              <div className="col-md-6">U.K. Finance Check</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color={color}
                  to="#"
                >
                  {status}
                </LinkedButton>
              </div>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <h4 className="card-title">DETAILS</h4>
                  <span className="card-text">
                    GBG Group Plc - Check Result :{" "}
                  </span>
                  <span className={` statusText-${color}`}>
                    {gbg_response}
                  </span>
                </div>
                <div className="col-md-6">
                  <Link to="#" className="report">
                    REPORT
                  </Link>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12 mt-3">
                  <span className="card-title">SELF DECLARATION</span>
                  <div className="align mb-3">
                    <input
                      type="checkbox"
                      id="ch1"
                      name="ch1"
                      checked={inputBox1}
                      readOnly
                    />
                    <label htmlFor="ch1" className="align">
                      Have you, or have you been, the subject of any voluntary
                      arrangements, Country Court Judgements, Bankruptcy or any
                      other formal credit relation proceedings which are{" "}
                      <strong>NOT</strong> satisfied.{" "}
                    </label>
                  </div>
                  <textarea
                    className="fullBox"
                    value={inputBox1}
                    readOnly
                  ></textarea>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="align mb-3">
                    <input
                      type="checkbox"
                      id="ch2"
                      name="ch2"
                      checked={inputBox2}
                      readOnly
                    />
                    <label htmlFor="ch2" className="align">
                      Have you, or have you been, the subject of any voluntary
                      arrangements, Country Court Judgements, Bankruptcy or any
                      other formal credit relation proceedings which have been
                      satisfied.{" "}
                    </label>
                  </div>
                  <textarea
                    className="fullBox"
                    value={inputBox2}
                    readOnly
                  ></textarea>
                </div>
              </div>
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={props.checkId}
                type={props.type}
                annotationFetch={props.annotationFetch}
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

export default AdverseFinance;