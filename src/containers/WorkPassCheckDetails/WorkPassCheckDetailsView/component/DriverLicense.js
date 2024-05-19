import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import { Link } from 'react-router-dom';
import moment from "moment";

function DriverLicense(props) {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header">
              <div className="col-md-6">Drivers Licence Check</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="green"
                  to="#"
                >
                  Clear
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-12">
                  <h4>DETAILS</h4>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p>
                    GBG Group Plc - Check result :
                    {(Object.keys(props.driver_license).length !== 0 &&
                    props.driver_license.check_data.dataGBG !== null &&
                    props.driver_license.check_data.dataGBG.driver_license_check_response)
                    ? (
                        <span className="statusText-green">
                          {
                            props.driver_license.check_data.dataGBG
                              ?.driver_license_check_response
                              ?.driver_license_check_response.decision.current
                          }
                        </span>
                      ) : (
                        <span className="statusText">No results available</span>
                      )}
                  </p>
                </div>
                <div className="col-md-6">
                  <Link to="#" className="report">
                    <u>DRIVERS LICENCE</u>
                  </Link>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <h4>DETAILS</h4>
                </div>
              </div>
              {Object.keys(props.driver_license).length !== 0 &&
              Object.keys(props.driver_license.check_data.dataSnapshot).length >
                0 ? (
                  <div>
                    <div className="row mb-3">
                      <div className="col-md-3 mb-3">
                        <ul>
                          <li>Licence Number</li>
                          <li>Type</li>
                          <li>Date of Birth</li>
                          <li>Issuing Country</li>
                          <li>Issue Date</li>
                          <li>Check Code</li>
                        </ul>
                      </div>
                      <div className="col-md-9 mb-3">
                        <ul>
                          <li>
                            {props.driver_license.check_data.dataSnapshot.number}
                          </li>
                          <li>
                            {props.driver_license.check_data.dataSnapshot.type}
                          </li>
                          <li>
                            {moment(props.driver_license.check_data.dataSnapshot.dob).format('DD/MM/YYYY')}
                          </li>
                          <li>
                            { props.driver_license.check_data.dataSnapshot.issue_country}
                          </li>
                          <li>
                            {moment(props.driver_license.check_data.dataSnapshot.valid_from).format('DD/MM/YYYY')}
                          </li>
                          <li>
                            { props.driver_license.check_data.dataSnapshot.check_code }
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row mb-3 pt-3">
                      {props.driver_license.check_data.dataSnapshot.endorsements
                        .length > 0 ? (
                          <div className="col-md-12">
                            <h4>ENDORSEMENTS</h4>
                          </div>
                        ) : (
                          ''
                        )}
                    </div>
                    {props.driver_license.check_data.dataSnapshot.endorsements.map(
                      (item, idx) => {
                        return (
                          <div className="row mb-3" key={idx}>
                            <div className="col-md-3 mb-3">
                              <ul>
                                <li>Endorsement Type</li>
                                <li>Offence Code</li>
                                <li>Offence</li>
                                <li>Date of Offence</li>
                                <li>Expiry Date</li>
                              </ul>
                            </div>
                            <div className="col-md-9 mb-3">
                              <ul>
                                <li>{item.type}</li>
                                <li>{item.typeCode}</li>
                                <li>{item.offence}</li>
                                <li>{item.doo}</li>
                                <li>{item.valid_to}</li>
                              </ul>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="mt-3 mb-3">Do not have driver licence.</div>
                )}
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

export default DriverLicense;