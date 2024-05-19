import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import { Link } from 'react-router-dom';

function Bank(props) {
  let gbg_response = ''
  let datagbg = props.bankDetails.dataGBG
  if (datagbg !== null && typeof datagbg.Bank_Accounts_GBG_response !== 'undefined') {
    gbg_response = props.bankDetails.dataGBG.Bank_Accounts_GBG_response.outcome.overall
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Bank Account Check</div>
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
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h4 className="card-title form-group">DETAILS</h4>
                <ul>
                  <li>
                    <div className="form-group">
                      <span className="card-text pull-left">
                        GBG Group Plc - Check Result{" "}:
                      </span>
                      <div className="pull-right col-md-9">
                        {datagbg !== null ? (
                          <span>
                            { gbg_response !== ''
                              && (
                                <span className={` ${
                                  gbg_response === 'Pass'
                                    ? 'statusText-green'
                                    : gbg_response === 'Indeterminate' ? 'statusText-amber' : 'statusText'
                                }` }>
                                  {gbg_response}
                                </span>
                              )
                            }
                          </span>
                        ) : (
                          <span className="statusText">
                            No results available
                          </span>
                        )}
                        <span>
                          <Link to="#" className="report">
                            REPORT
                          </Link>
                        </span>
                      </div>
                    </div>
                  </li>
                  <h4 className="card-title form-group">
                    BANK ACCOUNT DETAILS
                  </h4>
                  {Object.keys(props.bankDetails.dataSnapshot).length === 0 ? (
                    <span>Do not have a bank account.</span>
                  ) : (
                    <span>
                      <li>
                        <div className="form-group">
                          <span className="card-text pull-left">
                            Bank Country{" "}
                          </span>
                          <div className="pull-right col-md-9">
                            <span className="card-text">
                              {" "}
                              {props.bankDetails.dataSnapshot.bank_acct_country}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-group">
                          <span className="card-text pull-left">
                            Bank or Building Society Name{" "}
                          </span>
                          <div className="pull-right col-md-9">
                            <span className="card-text">
                              {" "}
                              {props.bankDetails.dataSnapshot.organisation_name}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-group">
                          <span className="card-text pull-left">
                            Sort Code{" "}
                          </span>
                          <div className="pull-right col-md-9">
                            <span className="card-text">
                              {" "}
                              {props.bankDetails.dataSnapshot.bank_code}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-group">
                          <span className="card-text pull-left">
                            Account Number{" "}
                          </span>
                          <div className="pull-right col-md-9">
                            <span className="card-text">
                              {props.bankDetails.dataSnapshot.account_no}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-group">
                          <span className="card-text pull-left">
                            Account Name{" "}
                          </span>
                          <div className="pull-right col-md-9">
                            <span className="card-text">
                              {" "}
                              {props.bankDetails.dataSnapshot.account_name}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-group">
                          <span className="card-text pull-left">Address </span>
                          <div className="pull-right col-md-9">
                            <span className="card-text">
                              {" "}
                              {props.bankDetails.dataSnapshot.account_address}
                            </span>
                          </div>
                        </div>
                      </li>
                    </span>
                  )}
                </ul>
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
              requestId={props.requestId}
              resetSuccess={props.resetSuccess}
              annotationReset={props.annotationReset}
              userID={props.userID}
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
  );
}
export default Bank;