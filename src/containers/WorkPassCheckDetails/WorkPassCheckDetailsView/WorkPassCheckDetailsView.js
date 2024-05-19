import React from "react";
import "./style.css";
import LinkedButton from "components/LinkedButton";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import Modal from "components/Modal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Icon from "components/Icon";
import moment from "moment";
import classNames from "classnames";
import AnnotationComponent from "./component/AnnotationComponent/AnnotationComponent.js";
import NotesHistory from "./component/NotesHistory/NotesHistory.js";
import UploadDocumentModal from "./component/UploadDocumentModal/UploadDocumentModal.js";
import ViewDocumentModal from "./component/ViewDocumentModal/ViewDocumentModal.js";
import Button from "components/Button";
import countryISO from 'iso-3166-1-alpha-2'
import AdverseFinance from './component/AdverseFinance';
import WorkGap from './component/WorkGap';
import Bank from './component/Bank';
import DBS from './component/DBS';
import ImmigrationDetails from './component/ImmigrationDetails';
import TuberCulosis from './component/TuberCulosis';
import DriverLicense from './component/DriverLicense';
import AdverseMedia from './component/AdverseMedia';
import EmpReference from './component/EmpReference';
import ClientSpecificDocument from './component/ClientSpecificDocument';
import Sanctions from './component/Sanctions'
import CriminalRecord from './component/CriminalRecord'
import CandidateUploads from './component/CandidateUploads'
import EmployeeEligibilityVerification from './component/EmployeeEligibilityVerification'
import ManuallyCompleted from './ManuallyCompleted'

function Directorship(props) {
  let docnum = 0;
  var imgArray = [];
  if (props.doc_images !== undefined) {
    props.doc_images.map((item, idx) => {
      if (Array.isArray(item)) {
        {
          item.map((item) => {
            imgArray.push(item.url);
          });
        }
      } else {
        imgArray.push(item.url);
      }
    });
  }
  docnum = imgArray.length;

  // if(props.doc_images !== undefined){
  //   docnum = props.doc_images.length
  // }

  let idx = 1;
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Directorship Checks</div>
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
              <div className="row ">
                <div className="col-md-3">
                  <Button
                    color="white"
                    className="doc-button"
                    disabled={!props.isEditable}
                    onClick={() => {
                      props.openDocumentUploadModal(idx);
                    }}
                  >
                    Upload Documents
                  </Button>
                  <br />
                  <Button
                    color="white"
                    className="doc-button relative-box"
                    onClick={() => {
                      props.openDocumentViewModal(idx);
                    }}
                  >
                    View Documents{" "}
                    <span className="button__badge">{docnum}</span>
                  </Button>
                </div>
                <div className="col-md-9"></div>
                {props.documentModalIsOpen ? (
                  <UploadDocumentModal
                    type={props.type}
                    checkId={props.checkId}
                    handleCloseModal={props.openDocumentUploadModal}
                    addDocuments={props.addDocuments}
                    isOpen={props.documentModalIsOpen}
                  />
                ) : (
                  ""
                )}

                {props.viewDocumentModalIsOpen ? (
                  <ViewDocumentModal
                    handleCloseModal={props.openDocumentViewModal}
                    isOpen={props.viewDocumentModalIsOpen}
                    viewUploadedDocuments={props.viewUploadedDocuments}
                    type={props.type}
                    checkId={props.checkId}
                    uploaded_documents={props.uploaded_documents}
                    idx={idx}
                    deleteDocuments={props.deleteDocuments}
                    isEditable={props.isEditable}
                  >
                    {" "}
                  </ViewDocumentModal>
                ) : (
                  ""
                )}
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

function AdminUploads(props) {
  let docnum = 0;
  var imgArray = [];
  if (props.doc_images !== undefined) {
    props.doc_images.map((item, idx) => {
      if (Array.isArray(item)) {
        {
          item.map((item) => {
            imgArray.push(item.url);
          });
        }
      } else {
        imgArray.push(item.url);
      }
    });
  }
  docnum = imgArray.length;

  if (props.doc_images !== undefined) {
    docnum = props.doc_images.length;
  }

  let idx = 1;
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">
                Officer / Administrator Uploads
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
              <div className="row ">
                <div className="col-md-3">
                  <Button
                    color="white"
                    className="doc-button"
                    disabled={!props.isEditable}
                    onClick={() => {
                      props.openDocumentUploadModal(idx);
                    }}
                  >
                    Upload Documents
                  </Button>
                  <br />
                  <Button
                    color="white"
                    className="doc-button relative-box"
                    onClick={() => {
                      props.openDocumentViewModal(idx);
                    }}
                  >
                    View Documents
                    <span className="button__badge">{docnum}</span>
                  </Button>
                </div>
                <div className="col-md-9"></div>
                {props.documentModalIsOpen ? (
                  <UploadDocumentModal
                    type={props.type}
                    checkId={props.checkId}
                    handleCloseModal={props.openDocumentUploadModal}
                    addDocuments={props.addDocuments}
                    isOpen={props.documentModalIsOpen}
                  />
                ) : (
                  ""
                )}

                {props.viewDocumentModalIsOpen ? (
                  <ViewDocumentModal
                    handleCloseModal={props.openDocumentViewModal}
                    isOpen={props.viewDocumentModalIsOpen}
                    viewUploadedDocuments={props.viewUploadedDocuments}
                    type={props.type}
                    checkId={props.checkId}
                    uploaded_documents={props.uploaded_documents}
                    idx={idx}
                    deleteDocuments={props.deleteDocuments}
                    isEditable={props.isEditable}
                  >
                    {" "}
                  </ViewDocumentModal>
                ) : (
                  ""
                )}
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

function TaxDetails(props) {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Tax Details</div>
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
function BiometricCheck(props) {
  const status = props.biometricDetails[0].biometrics_status;
  let BioStatus;
  if (status === "declined") {
    BioStatus = "Rejected";
  } else if (status === "needs_review") {
    BioStatus = "Awaiting";
  } else if (status === "complete") {
    BioStatus = "Verified";
  } else {
    BioStatus = "";
  }
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">
                Biometric Identity Check
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
                      GBG Group Plc - Check Result :
                      <span
                        className={` ${
                          BioStatus === "Verified"
                            ? "statusText-green"
                            : "statusText"
                        } capitalize`}
                      >
                        {BioStatus}
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

function RightToWork(props) {
  const imgArray = props.right_to_work.map((m, idx) => (
    <a key={idx} href={m.url} target="_blank" title={m.url}>
      <img src={m.url} alt="m.type" className="sliderimg" />
    </a>
  ));
  const responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  };

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Right to Work Check</div>
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
                  <div className="col-md-8 col-sm-12">
                    <p className="card-text">
                      GBG Group Plc - Check Result :
                      <span className="statusText">NO CHECK PERFORMED</span>
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <Link
                      to="#"
                      className="reportLink"
                      onClick={() => props.openModal()}
                    >
                      View Evidence
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12"></div>
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

      <Modal isOpen={props.modalIsOpen} className="modal">
        <div onClick={props.openModal} className="closeStyles">
          <Icon color="#7F8DAA" type="close" />
        </div>
        <div className="modal-div">
          <AliceCarousel
            items={imgArray}
            responsive={responsive}
            autoPlayInterval={2000}
            autoPlayDirection="rtl"
            autoPlay={false}
            buttonsDisabled={true}
            fadeOutAnimation={true}
            mouseTrackingEnabled={true}
            disableAutoPlayOnAction={true}
          ></AliceCarousel>
        </div>
      </Modal>
    </div>
  );
}

function IdentityCheck(props) {
  let imagesToDisplay = props.dbs_identity.filter((itm) => itm !== null);
  const imgArray = imagesToDisplay.map((m, idx) => (
    <a key={idx} href={m.url} target="_blank" title={m.url}>
      <img src={m.url} className="sliderimg" alt="m.type" />
    </a>
  ));
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Identity Check</div>
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
                  <div className="col-md-8 col-sm-12">
                    <p className="card-text">
                      GBG Group Plc - Check Result :
                      <span className="statusText">NO CHECK PERFORMED</span>
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <Link
                      to="#"
                      className="reportLink"
                      onClick={() => props.openModal()}
                    >
                      View Evidence
                    </Link>
                  </div>
                </div>
              </div>
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={props.checkId}
                annotationReset={props.annotationReset}
                type={props.type}
                userID={props.userID}
                annotationFetch={props.annotationFetch}
                annotationData={props.annotationData}
                complaince_response={props.complaince_response}
                notes={props.notes}
                side={props.side}
                check_status={props.check_status}
                requestId={props.requestId}
                resetSuccess={props.resetSuccess}
                isEditable={props.isEditable}
              ></AnnotationComponent>
              <NotesHistory
                notesHistory={props.annotationData.check_data}
              ></NotesHistory>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={props.modalIsOpen} className="modal">
        <div onClick={props.openModal} className="closeStyles">
          <Icon color="#7F8DAA" type="close" />
        </div>
        <div className="modal-div">
          <AliceCarousel
            items={imgArray}
            autoPlayInterval={2000}
            autoPlayDirection="rtl"
            fadeOutAnimation={true}
            mouseTrackingEnabled={true}
            disableAutoPlayOnAction={true}
          ></AliceCarousel>
        </div>
      </Modal>
    </div>
  );
}

function CIFAS(props) {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header">
              <div className="col-md-6 checkTitle">CIFAS</div>
              <div className="col-md-6 noPadding">
                <LinkedButton className="border-btn checkButton" to="#">
                  CLEAR
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">DETAILS</h4>
              <div className="row ">
                <div className="col-md-12 noPadding">
                  <div className="col-md-8 col-sm-12">
                    <p className="card-text">
                      GBG Group Plc - Check Result :{" "}
                      <span className="statusText-green">
                        {props.statuscifas}
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

function GPDR(props) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth()); //January is 0!
  var mm = months[mm];
  var yyyy = today.getFullYear();
  today = dd + " " + mm + " " + yyyy;
  if (props.data1) {
    var data1 = props.data1;
    let responseIsEmpty = 1
    if(Object.keys(data1).length > 0){
      responseIsEmpty = 0
    }
    return (
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12 col-sm-12 card-row">
            <div className="card">
              <div className="card-header-gray">
                <div className="col-md-6">Impellam GDPR Declaration</div>
                <div className="col-md-6 noPadding">
                  <LinkedButton
                    className="border-btn checkButton"
                    color="blue"
                    to="#"
                  >
                    Complete
                  </LinkedButton>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li>Name</li>
                      <li>Date</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li>{props.candidateName}</li>
                      <li>{today}</li>
                    </ul>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="mb-3">
                      Sensitive Personal Data Collection Consent
                    </h4>
                    <div className="mb-3">
                      <p className="card-text">
                        Medical history as requested :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {JSON.stringify(
                            data1["Medical history as requested "]
                          ).toUpperCase()}
                        </span>
                         }
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="card-text">
                        Any other relevant health-related data :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(
                            data1["Any other relevant health related-data"]
                          ).toUpperCase()}
                        </span>
                          }
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="card-text">
                        Data relating to equal opportunities :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(
                            data1["Data relating to equal opportunities"]
                          ).toUpperCase()}
                        </span>
                        }
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="card-text">
                        Data relating to DBS check results or criminal
                        convictions :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(
                            data1[
                              "Data relating to DBS check results or criminal convictions"
                            ]
                          ).toUpperCase()}
                        </span>
                        }
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-3">Future Contact Consent</h4>
                    <div className="mb-3">
                      <p className="card-text">
                        Phone :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(data1["Phone"]).toUpperCase()}
                        </span>
                        }
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="card-text">
                        By SMS :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(data1["By SMS"]).toUpperCase()}
                        </span>
                        }
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="card-text">
                        By Email :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(data1["By Email"]).toUpperCase()}
                        </span>
                        }
                      </p>
                    </div>
                    <div className="mb-3">
                      <p className="card-text">
                        By Post :
                        {responseIsEmpty ? null :
                        <span className="statusText">
                          {" "}
                          {JSON.stringify(data1["Post"]).toUpperCase()}
                        </span>
                        }
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
                  check_status={props.check_status}
                  requestId={props.requestId}
                  resetSuccess={props.resetSuccess}
                  annotationReset={props.annotationReset}
                  userID={props.userID}
                  side={props.side}
                  orgId={props.orgId}
                  isEditable={props.isEditable}
                ></AnnotationComponent>

              <NotesHistory
                notesHistory={props.annotationData.check_data}
              ></NotesHistory>
               </div>
            </div>
            {/* <AnnotationComponent
                  annotationSubmit={props.annotationSubmit}
                  checkId={props.checkId}
                  type={props.type}
                  annotationFetch={props.annotationFetch}
                  annotationData={props.annotationData}
                  complaince_response={props.complaince_response}
                  notes={props.notes}
                ></AnnotationComponent> */}
          </div>
        </div>
      </div>
    );
  }
}

function AddressHistory(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Address History</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="blue"
                  to="#"
                >
                  Complete
                </LinkedButton>
              </div>
            </div>

            <div className="card-body">
              {props.add_history.formArray.map((add, key) => {
                var fromdate = new Date(add.from);
                var dd1 = String(fromdate.getDate()).padStart(2, "0");
                var mm1 = String(fromdate.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy1 = fromdate.getFullYear();
                fromdate = dd1 + "/" + mm1 + "/" + yyyy1;
                if (add.to !== null) {
                  var todate = new Date(add.to);
                  var dd2 = String(todate.getDate()).padStart(2, "0");
                  var mm2 = String(todate.getMonth() + 1).padStart(2, "0"); //January is 0!
                  var yyyy2 = todate.getFullYear();
                  todate = dd2 + "/" + mm2 + "/" + yyyy2;
                } else {
                  todate = "Present";
                }
                var months;
                var d1 = (add.from !== null) ? new Date(add.from) : new Date();
                var d2 = (add.to !== null) ? new Date(add.to) : new Date();
                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth();
                months += d2.getMonth();
                var ishighlight = (add.country !== 'GB' && months > 6) ? true : false;
                const style = classNames({'highlight' : ishighlight})
                return (
                  <div key={key}>
                    <div className="row " key={key + "row1"}>
                      <div className="col-md-4">
                        <h4 className="mb-3">ADDRESS {key + 1}</h4>
                      </div>
                      <div className="col-md-8 mb-3">
                        {key === 0 ? (
                          <Link
                            to="#"
                            className="mb-3"
                            onClick={() => props.openModal()}
                          >
                            <strong>
                              <u>PROOF OF CURRENT ADDRESS</u>
                            </strong>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="row mb-3" key={key + "row2"}>
                      <div className="col-md-12">
                        <table className="table-data">
                          <tbody>
                            <tr>
                              <td>Line 1</td>
                              <td className={style}>{add.line1}</td>
                            </tr>
                            <tr>
                              <td>Line 2</td>
                              <td className={style}>{add.line2}</td>
                            </tr>
                            <tr>
                              <td>Town</td>
                              <td className={style}>{add.town}</td>
                            </tr>
                            <tr>
                              <td>Country</td>
                              <td className={style}>{countryISO.getCountry(add.country)}</td>
                            </tr>
                            <tr>
                              <td>Postcode</td>
                              <td className={style}>{add.postcode}</td>
                            </tr>
                            <tr>
                              <td>County</td>
                              <td className={style}>{add.county}</td>
                            </tr>
                            <tr> 
                              <td>Resident From</td>
                              <td className={style}>{fromdate}</td>
                            </tr>
                            <tr>
                              <td>Resident To</td>
                              <td className={style}>{todate}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
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
      <Modal isOpen={props.modalIsOpen} className="modal">
        <div className="modal-div">
          {props.add_history.imageUploadedResponse ? (
            <img
              src={props.add_history.imageUploadedResponse.document.url}
              className="modal-img img-fluid"
              alt="Address Proof"
            />
          ) : (
            <p>No uploaded document.</p>
          )}
          <LinkedButton
            className="CandidateNewRequestsHeader__btn NewRequestButton modal-button"
            color="red"
            to={"#"}
            onClick={() => props.openModal()}
          >
            Exit
          </LinkedButton>
        </div>
      </Modal>
    </div>
  );
}

function NationalInsurance(props) {
  let insType = props.national_insurance.formArray.type;
  insType = insType.charAt(0).toUpperCase() + insType.slice(1);

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Proof of National Insurance</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="blue"
                  to="#"
                >
                  Complete
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-12">
                  <h4>DETAILS</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">Proof Type</div>
                <div className="col-md-8">
                  <span>{insType}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">National Insurance Number</div>
                <div className="col-md-8">
                  <span>{props.national_insurance.nationalInsuranceNo}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <img
                    src={props.national_insurance.formArray.url}
                    alt="Nationa Insurance Proof"
                    className="nationaInsuranceImg img-fluid"
                  ></img>
                </div>
                <div className="col-md-8"></div>
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
              {/* <div className="row mb-3 pt-3">
                <div className='col-md-3'>
                  <p>COMPLIANCE OFFICER</p>
                  <div className="mb-3">
                    <input
                      type="checkbox"
                      id="ch3"
                      name="ch3"
                    />
                    <label htmlFor="ch3">Progress</label>
                  </div>
                  <div className="mb-3">
                    <input
                      type="checkbox"
                      id="ch4"
                      name="ch4"
                    />
                    <label htmlFor="ch4">Not Progress</label>
                  </div>
                </div>
                <div className='col-md-9'>
                  <p>NOTES</p>
                  <textarea className="fullBox"></textarea>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmpVerification(props) {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Employment Verification</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="blue"
                  to="#"
                >
                  Complete
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              {props.employement_verification.map((item, idx) => {
                var RefFrom = new Date(item.start_date);
                var dd1 = String(RefFrom.getDate()).padStart(2, "0");
                var mm1 = String(RefFrom.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy1 = RefFrom.getFullYear();
                RefFrom = dd1 + "/" + mm1 + "/" + yyyy1;
                if (item.end_date !== null) {
                  var RefTo = new Date(item.end_date);
                  var dd2 = String(RefTo.getDate()).padStart(2, "0");
                  var mm2 = String(RefTo.getMonth() + 1).padStart(2, "0"); //January is 0!
                  var yyyy2 = RefTo.getFullYear();
                  RefTo = dd2 + "/" + mm2 + "/" + yyyy2;
                } else {
                  RefTo = "Present";
                }
                let status = item.verified_status.toUpperCase();
                return (
                  <div key={idx} className="mb-3 mt-3">
                    {item.companyVerifRequest === true ? (
                      <div>
                        <div className="row mb-3">
                          <div className="col-md-3">VERIFICATION {idx + 1}</div>
                          <div className="col-md-6">
                            <strong>VERIFIED: </strong>
                            <span className="ref-status-green">{status}</span>
                          </div>
                          <div className="col-md-3">
                            <Link to="#" className="reportLink">
                              EVIDENCE
                            </Link>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">Type</div>
                          <div className="col-md-9">
                            <strong>EMPLOYMENT</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">Reference From</div>
                          <div className="col-md-9">{RefFrom}</div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">Reference To</div>
                          <div className="col-md-9">{RefTo}</div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">Organisation Name</div>
                          <div className="col-md-9">{item.company}</div>
                        </div>
                        <div className="row">
                          <div className="col-md-3  mb-3">
                            Position Held by Applicant
                          </div>
                          <div className="col-md-9  mb-3">{item.position}</div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
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

function EduVerification(props) {
  //let data = props.education_verification[0]
  let data1 = props.education_verification[0];
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Education Verification</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="blue"
                  to="#"
                >
                  Complete
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              {data1.map((data, idx) => {
                let startDate = data.start_date;
                let endDate = data.end_date;
                startDate = moment(startDate).format('DD/MM/YYYY');
                endDate = endDate ? moment(endDate).format('DD/MM/YYYY'): 'Present';
                let status1 = data.verified_status.toUpperCase();

                return (
                  <div>
                    {data.companyVerifRequest === true ? (
                      <div>
                        {data.type === "higher" ? (
                          <div>
                            <div className="row mb-3 mt-3">
                              <div className="col-md-3">
                                VERIFICATION {idx + 1}
                              </div>
                              <div className="col-md-6">
                                <strong>VERIFIED: </strong>
                                <span className="ref-status-green">
                                  {status1}
                                </span>
                              </div>
                              <div className="col-md-3">
                                <a className="reportLink" target="_blank">
                                  UPLOAD TRANSCRIPT
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Type</div>
                              <div className="col-md-9">
                                <strong>HIGHER EDUCATION</strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Reference From</div>
                              <div className="col-md-9">{startDate}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Reference To</div>
                              <div className="col-md-9">{endDate}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Organisation Name</div>
                              <div className="col-md-9">{data.institution}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Studied</div>
                              <div className="col-md-9">{data.studied}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Degree Type</div>
                              <div className="col-md-9">{data.degree}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Awarded</div>
                              <div className="col-md-9">{data.grade}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-3">Student No.</div>
                              <div className="col-md-9 mb-3">
                                {data.student_number}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="row mb-3 mt-3">
                              <div className="col-md-3">
                                VERIFICATION {idx + 1}
                              </div>
                              <div className="col-md-6">
                                <strong>VERIFIED: </strong>
                                <span className="ref-status-green">
                                  {status1}
                                </span>
                              </div>
                              <div className="col-md-3">
                                <a
                                  className="reportLink"
                                  target="_blank"
                                  disabled
                                >
                                  UPLOAD TRANSCRIPT
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Type</div>
                              <div className="col-md-9">
                                <strong>SECONDARY EDUCATION</strong>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Reference From</div>
                              <div className="col-md-9">{startDate}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Reference To</div>
                              <div className="col-md-9">{endDate}</div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">Organisation Name</div>
                              <div className="col-md-9">{data.institution}</div>
                            </div>
                            {data.results.map((item, idx) => {
                              return (
                                <div className="row">
                                  <div className="col-md-3">
                                    Course {idx + 1}
                                  </div>
                                  <div className="col-md-9">{item.subject}</div>
                                </div>
                              );
                            })}

                            <div className="row">
                              <div className="col-md-3">Student No.</div>
                              <div className="col-md-9">
                                {data.student_number}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={props.checkId}
                type={props.type}
                annotationFetch={props.annotationFetch}
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

function CompanyAndVAT(props) {
  let data = props.companyVAT[0].data;
  let options = props.companyVAT[0].options;
  let employeeliability = options.employeeliability;
  let professionalindemnity = options.professionalindemnity;
  let publicliability = options.publicliability;
  let with_self_billing = options.with_self_billing;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">COMPANY & VAT </div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="blue"
                  to="#"
                >
                  COMPLETE
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              {data.map((itm, idx) => {
                return (
                  <div key={idx}>
                    {itm.name === "company" && itm.snapshot[0] !== null ? (
                      <div>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <h4>COMPANY</h4>
                          </div>
                          <div className="col-md-3">Status</div>
                          <div className="col-md-9 capitalize">
                            {itm.snapshot[0].status}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">Registration Date</div>
                          <div className="col-md-9">
                            {moment(itm.snapshot[0].registration_date).format(
                              "DD/MM/YYYY"
                            )}
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-3">Officers</div>
                          <div className="col-md-9">
                            {itm.snapshot[0].officers && itm.snapshot[0].officers.map(
                              (
                                {
                                  name,
                                  forenames,
                                  surname,
                                  dob,
                                  appointed_on,
                                  resigned_on,
                                },
                                index
                              ) => {
                                const displayDob = dob
                                  ? ` (born ${moment(dob, "YYYY-MM").format(
                                      "MMMM YYYY"
                                    )})`
                                  : "";
                                const range = `from ${moment(
                                  appointed_on
                                ).format("MMM Do YYYY")}${
                                  resigned_on
                                    ? ` to ${moment(resigned_on).format(
                                        "MMM Do YYYY"
                                      )}`
                                    : ""
                                }`;
                                return (
                                  <span key={index}>
                                    <strong
                                      className={classNames({
                                        "UserData__officer-resigned": !!resigned_on,
                                      })}
                                    >
                                      {forenames
                                        ? `${forenames} ${surname}`
                                        : name}
                                    </strong>
                                    {displayDob} {range}
                                    <br />
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <br />

                        <div className="row mb-3">
                          <div className="col-md-3">
                            Persons with Significant Control
                          </div>
                          <div className="col-md-9">
                            {itm.snapshot[0].significant_control && itm.snapshot[0].significant_control.map(
                              (
                                { forename, surname, dob, natures_of_control },
                                index
                              ) => {
                                const displayDob = dob ? `(born ${moment(
                                  dob,
                                  "YYYY-MM"
                                ).format("MMMM YYYY")})` : '';

                                return (
                                  <span key={index}>
                                    {forename} {surname} {displayDob} <br />
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">VAT Registered Name</div>
                          <div className="col-md-9">
                            {itm.snapshot.vat_name}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">VAT Address</div>
                          <div className="col-md-9">
                            {itm.snapshot[0].vat_address}
                          </div>
                        </div>
                        <hr />
                      </div>
                    ) : (
                      ""
                    )}

                    {itm.name === "insurance_details" ? (
                      <div>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <h4>COMPANY INSURANCE</h4>
                          </div>
                        </div>
                        {professionalindemnity !== "0" ? (
                          <div className="row">
                            <div className="col-md-3">
                              Professional Indemnity
                            </div>
                            <div className="col-md-9">
                              £{professionalindemnity}m (Confirmed)
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {publicliability !== "0" ? (
                          <div className="row">
                            <div className="col-md-3">Public Liability</div>
                            <div className="col-md-9">
                              £{publicliability}m (Confirmed)
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {employeeliability !== "0" ? (
                          <div className="row">
                            <div className="col-md-3">Employers Liability</div>
                            <div className="col-md-9">
                              £{employeeliability}m (Confirmed)
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <hr />
                      </div>
                    ) : (
                      ""
                    )}

                    {itm.name === "self_biller_declaration" ? (
                      <div>
                        <div className="row mb-3">
                          <div className="col-md-12 mb-3">
                            <h4>SELF BILLING</h4>
                          </div>
                          <div className="col-md-3">Self Billing</div>
                          <div className="col-md-9">
                            {with_self_billing === true
                              ? "Confirmed"
                              : "Not Confirmed"}
                          </div>
                        </div>
                        <hr />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
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
    </div>
  );
}

function UmbrellaCompany(props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Umbrella Company Details</div>
              <div className="col-md-6 noPadding">
                <LinkedButton
                  className="border-btn checkButton"
                  color="blue"
                  to="#"
                >
                  COMPLETE
                </LinkedButton>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">DETAILS</div>
                <div className="col-md-8">
                  <strong>CANDIDATE RESPONSE</strong>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">Umbrella Company Name</div>
                <div className="col-md-8">
                  {props.type === "umbrella_preferred_suppliers" ? (
                    <strong>
                      {
                        props.umbrella_details[0].attribute_ids
                          .umbrellaOrganisationDetails.name
                      }
                    </strong>
                  ) : (
                    <strong>
                      {props.umbrella_details[0].attribute_ids.name}
                    </strong>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">Primary Contact First Name</div>
                <div className="col-md-8">
                  {props.type === "umbrella_preferred_suppliers" ? (
                    <span>
                      {props.umbrella_details[0].attribute_ids.pc_fst_name}
                    </span>
                  ) : (
                    <span>
                      {
                        props.umbrella_details[0].attribute_ids
                          .umbrellaOrganisationDetails.pc_fst_name
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">Primary Contact Last Name</div>
                <div className="col-md-8">
                  {props.type === "umbrella_preferred_suppliers" ? (
                    <span>
                      {" "}
                      {props.umbrella_details[0].attribute_ids.pc_last_name}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      {
                        props.umbrella_details[0].attribute_ids
                          .umbrellaOrganisationDetails.pc_last_name
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">Primary Contact Phone No.</div>
                <div className="col-md-8">
                  {props.type === "umbrella_preferred_suppliers" ? (
                    <span>
                      {props.umbrella_details[0].attribute_ids.pc_tel_no}
                    </span>
                  ) : (
                    <span>
                      {
                        props.umbrella_details[0].attribute_ids
                          .umbrellaOrganisationDetails.pc_tel_no
                      }
                    </span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">Primary Contact Email</div>
                <div className="col-md-8">
                  {props.type === "umbrella_preferred_suppliers" ? (
                    <span>
                      {props.umbrella_details[0].attribute_ids.pc_email}
                    </span>
                  ) : (
                    <span>
                      {
                        props.umbrella_details[0].attribute_ids
                          .umbrellaOrganisationDetails.pc_email
                      }
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3"></div>
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

function IdentityCheckOrg(props) {
  let docnum = 0;
  var imgArray = [];

  if (props.doc_images !== undefined) {
    props.doc_images.map((itm) => {
      if (Array.isArray(itm.snapshot)) {
        if (itm.snapshot[0].hasOwnProperty("data")) {
          if (
            itm.snapshot[0].data.hasOwnProperty("Imageurl") &&
            itm.snapshot[0].data.Imageurl.length > 0
          ) {
            itm.snapshot[0].data.Imageurl.map((item) => {
              imgArray.push(item);
            });
          }
        } else if (itm.snapshot[0].hasOwnProperty("url")) {
          let uploaded_doc = { url: itm.snapshot[0].url };
          imgArray.push(uploaded_doc);
        } else {
        }
      }
    });
  }
  docnum = imgArray.length;

  let idx = 1;
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Identity Check</div>
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
              <div className="row ">
                <div className="col-md-3">
                  <Button
                    color="white"
                    className="doc-button"
                    disabled={!props.isEditable}
                    onClick={() => {
                      props.openDocumentUploadModal(idx);
                    }}
                  >
                    Upload Documents
                  </Button>
                  <br />
                  <Button
                    color="white"
                    className="doc-button relative-box"
                    onClick={() => {
                      props.openDocumentViewModal(idx);
                    }}
                  >
                    View Documents
                    <span className="button__badge">{docnum}</span>
                  </Button>
                </div>
                <div className="col-md-9"></div>
                {props.documentModalIsOpen ? (
                  <UploadDocumentModal
                    type={props.type}
                    checkId={props.checkId}
                    handleCloseModal={props.openDocumentUploadModal}
                    addDocuments={props.addDocuments}
                    isOpen={props.documentModalIsOpen}
                  />
                ) : (
                  ""
                )}

                {props.viewDocumentModalIsOpen ? (
                  <ViewDocumentModal
                    handleCloseModal={props.openDocumentViewModal}
                    isOpen={props.viewDocumentModalIsOpen}
                    viewUploadedDocuments={props.viewUploadedDocuments}
                    type={props.type}
                    checkId={props.checkId}
                    uploaded_documents={props.uploaded_documents}
                    idx={idx}
                    deleteDocuments={props.deleteDocuments}
                    isEditable={props.isEditable}
                  >
                    {" "}
                  </ViewDocumentModal>
                ) : (
                  ""
                )}
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

function RightToWorkOrg(props) {
  let docnum = 0;
  var imgArray = [];
  if (props.doc_images !== undefined) {
    props.doc_images.map((itm) => {
      if (Array.isArray(itm.snapshot)) {
        if (itm.snapshot[0].hasOwnProperty("data")) {
          if (
            itm.snapshot[0].data.hasOwnProperty("Imageurl") &&
            itm.snapshot[0].data.Imageurl.length > 0
          ) {
            itm.snapshot[0].data.Imageurl.map((item) => {
              imgArray.push(item);
            });
          }
        } else if (itm.snapshot[0].hasOwnProperty("url")) {
          let uploaded_doc = { url: itm.snapshot[0].url };
          imgArray.push(uploaded_doc);
        } else {
        }
      }
    });
  }
  docnum = imgArray.length;

  let idx = 1;
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Right to Work Check</div>
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
              <div className="row ">
                <div className="col-md-3">
                  <Button
                    color="white"
                    className="doc-button"
                    disabled={!props.isEditable}
                    onClick={() => {
                      props.openDocumentUploadModal(idx);
                    }}
                  >
                    Upload Documents
                  </Button>
                  <br />
                  <Button
                    color="white"
                    className="doc-button relative-box"
                    onClick={() => {
                      props.openDocumentViewModal(idx);
                    }}
                  >
                    View Documents
                    <span className="button__badge">{docnum}</span>
                  </Button>
                </div>
                <div className="col-md-9"></div>
                {props.documentModalIsOpen ? (
                  <UploadDocumentModal
                    type={props.type}
                    checkId={props.checkId}
                    handleCloseModal={props.openDocumentUploadModal}
                    addDocuments={props.addDocuments}
                    isOpen={props.documentModalIsOpen}
                  />
                ) : (
                  ""
                )}

                {props.viewDocumentModalIsOpen ? (
                  <ViewDocumentModal
                    handleCloseModal={props.openDocumentViewModal}
                    isOpen={props.viewDocumentModalIsOpen}
                    viewUploadedDocuments={props.viewUploadedDocuments}
                    type={props.type}
                    checkId={props.checkId}
                    uploaded_documents={props.uploaded_documents}
                    idx={idx}
                    deleteDocuments={props.deleteDocuments}
                    isEditable={props.isEditable}
                  >
                    {" "}
                  </ViewDocumentModal>
                ) : (
                  ""
                )}
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

const WorkPassCheckDetailsView = ({
  type,
  checkId,
  userID,
  requestId,
  candidateId,
  orgId,
  status,
  DBSstatus,
  data1,
  bankDetails,
  advData,
  statuscifas,
  candidateName,
  openModal,
  modalIsOpen,
  openDocumentUploadModal,
  EmpdocumentModalIsOpen,
  EdudocumentModalIsOpen,
  AgencydocumentModalIsOpen,
  SelfdocumentModalIsOpen,
  UnempdocumentModalIsOpen,
  PersonaldocumentModalIsOpen,
  documentModalIsOpen,
  openDocumentViewModal,
  viewDocumentModalIsOpen,
  add_history,
  driver_license,
  national_insurance,
  work_gaps,
  employment_reference,
  employement_verification,
  education_verification,
  right_to_work,
  dbs_identity,
  companyVAT,
  umbrella_details,
  criminal_record_details,
  adverse_media_data,
  checkData,
  annotationSubmit,
  annotationFetch,
  annotationReset,
  workpassSubmit,
  annotationData,
  addReferee,
  addDocuments,
  viewUploadedDocuments,
  uploaded_documents,
  viewModalIndex,
  deleteDocuments,
  docModalIndex,
  biometricDetails,
  doc_images,
  side,
  optiontype,
  display_typename_dbs,
  dbsButtonStatus,
  dbs_status,
  loading,
  closeCheck,
  softDeleteCheck,
  check_status,
  resetSuccess,
  dbsCheckSubmit,
  updateDbsType,
  editCheck,
  saveCheck,
  cancelEditCheck,
  editRefIds,
  cancelRefIds,
  officerData,
  sanctionData,
  refOption,
  organisations,
  filterOrganisation,
  saveEmploymentReference,
  saveEmpEliData,
  editEmpEliData,
  certifyEmpEliData,
  openLetterModal,
  letterModalIsOpen,
  letterModalIndex,
  tuberData,
  isEditable,
  isManullyCompleted
}) => {
  if (Object.keys(annotationData).length !== 0) {
    if (annotationData.check_data.length !== 0) {
      var complaince_response = annotationData.check_data[0].status;
      var notes = annotationData.check_data[0].notes;
    } else {
      var complaince_response = "";
      var notes = "";
    }
  }
  
  if(isManullyCompleted ==true){
    return <ManuallyCompleted 
      type={type} 
      annotationSubmit={annotationSubmit}
      annotationFetch={annotationFetch}
      checkId={checkId}
      complaince_response={complaince_response}
      notes={notes}
      annotationData={annotationData}
      resetSuccess={resetSuccess}
      side={side}
      check_status={check_status}
      requestId={requestId}
      annotationReset={annotationReset}
      userID={userID}
      orgId={orgId}
      isEditable={isEditable}
    />
  }

  if (type === "sanction_peps" && status !== undefined) {
    return (
      <Sanctions
        sanctionData={sanctionData}
        status={status}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "client_specific_documentation") {
    return (
      <ClientSpecificDocument
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        resetSuccess={resetSuccess}
        side={side}
        check_status={check_status}
        requestId={requestId}
        annotationReset={annotationReset}
        userID={userID}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if (type === "tax_details") {
    return (
      <TaxDetails
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "biometric_identity" && biometricDetails !== undefined) {
    return (
      <BiometricCheck
        biometricDetails={biometricDetails}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (
    type === "criminal_record_declaration" &&
    criminal_record_details !== undefined
  ) {
    return (
      <CriminalRecord
        criminal_record_details={criminal_record_details}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        side={side}
        check_status={check_status}
        userID={userID}
        annotationReset={annotationReset}
        requestId={requestId}
        resetSuccess={resetSuccess}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if(type === 'tuberculosis_questionnaire' && tuberData !== undefined){
    return (
      <TuberCulosis
        data1={tuberData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    )
  }
  if (type === "immigration_details") {
    return (
      <ImmigrationDetails
        data1={data1}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }

  if (
    type === "right_to_work" &&
    right_to_work !== undefined &&
    side === "candidate"
  ) {
    return (
      <RightToWork
        right_to_work={right_to_work}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "dbs" && DBSstatus !== undefined) {
    return (
      <DBS
        DBSstatus={DBSstatus}
        annotationSubmit={annotationSubmit}
        checkId={checkId}
        type={type}
        annotationFetch={annotationFetch}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        userID={userID}
        annotationReset={annotationReset}
        check_status={check_status}
        side={side}
        requestId={requestId}
        resetSuccess={resetSuccess}
        orgId={orgId}
        optiontype={optiontype}
        display_typename_dbs={display_typename_dbs}
        dbsButtonStatus={dbsButtonStatus}
        dbs_status={dbs_status}
        loading={loading}
        dbsCheckSubmit={dbsCheckSubmit}
        updateDbsType={updateDbsType}
        isEditable={isEditable}
      />
    );
  }
  if (
    type === "dbs_identity" &&
    dbs_identity !== undefined &&
    side === "candidate"
  ) {
    return (
      <IdentityCheck
        dbs_identity={dbs_identity}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        annotationSubmit={annotationSubmit}
        annotationReset={annotationReset}
        annotationFetch={annotationFetch}
        checkId={checkId}
        userID={userID}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        side={side}
        check_status={check_status}
        requestId={requestId}
        resetSuccess={resetSuccess}
        isEditable={isEditable}
      />
    );
  }

  if (type === "gpdr_declaration" && data1 !== undefined) {
    return (
      <GPDR
        data1={data1}
        candidateName={candidateName}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationReset={annotationReset}
        userID={userID}
        side={side}
        check_status={check_status}
        requestId={requestId}
        resetSuccess={resetSuccess}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if (type === "cifas_check" && statuscifas !== undefined) {
    return (
      <CIFAS
        statuscifas={statuscifas}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "adverse_finance_check" && advData !== undefined) {
    return (
      <AdverseFinance
        advData={advData}
        checkId={checkId}
        type={type}
        annotationFetch={annotationFetch}
        annotationSubmit={annotationSubmit}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "bank_details" && bankDetails !== undefined) {
    return (
      <Bank
        bankDetails={bankDetails}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        resetSuccess={resetSuccess}
        side={side}
        check_status={check_status}
        requestId={requestId}
        annotationReset={annotationReset}
        userID={userID}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if (
    (type === "address_history" || type === "proof_of_address_capture") &&
    add_history !== undefined
  ) {
    return (
      <AddressHistory
        add_history={add_history}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        resetSuccess={resetSuccess}
        side={side}
        check_status={check_status}
        requestId={requestId}
        annotationReset={annotationReset}
        userID={userID}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if (type === "driver_license_check" && driver_license !== undefined) {
    return (
      <DriverLicense
        driver_license={driver_license}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "national_insurance_check" && national_insurance !== undefined) {
    return (
      <NationalInsurance
        national_insurance={national_insurance}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "work_gaps" && work_gaps !== undefined) {
    return (
      <WorkGap
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        work_gaps={work_gaps}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        resetSuccess={resetSuccess}
        side={side}
        check_status={check_status}
        requestId={requestId}
        annotationReset={annotationReset}
        userID={userID}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if (type === "employment_reference" && employment_reference !== undefined) {
    return (
      <EmpReference
        employment_reference={employment_reference}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
        openDocumentUploadModal={openDocumentUploadModal}
        openDocumentViewModal={openDocumentViewModal}
        documentModalIsOpen={documentModalIsOpen}
        viewDocumentModalIsOpen={viewDocumentModalIsOpen}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        addReferee={addReferee}
        addDocuments={addDocuments}
        checkId={checkId}
        userID={userID}
        type={type}
        orgId={orgId}
        requestId={requestId}
        candidateId={candidateId}
        candidateName={candidateName}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        EmpdocumentModalIsOpen={EmpdocumentModalIsOpen}
        EdudocumentModalIsOpen={EdudocumentModalIsOpen}
        AgencydocumentModalIsOpen={AgencydocumentModalIsOpen}
        SelfdocumentModalIsOpen={SelfdocumentModalIsOpen}
        UnempdocumentModalIsOpen={UnempdocumentModalIsOpen}
        PersonaldocumentModalIsOpen={PersonaldocumentModalIsOpen}
        viewUploadedDocuments={viewUploadedDocuments}
        uploaded_documents={uploaded_documents}
        viewModalIndex={viewModalIndex}
        deleteDocuments={deleteDocuments}
        docModalIndex={docModalIndex}
        closeCheck={closeCheck}
        softDeleteCheck={softDeleteCheck}
        annotationReset={annotationReset}
        side={side}
        check_status={check_status}
        requestId={requestId}
        resetSuccess={resetSuccess}
        editCheck={editCheck}
        saveCheck={saveCheck}
        cancelEditCheck={cancelEditCheck}
        editRefIds={editRefIds}
        cancelRefIds={cancelRefIds}
        officerData={officerData}
        refOption={refOption}
        loading={loading}
        organisations={organisations}
        filterOrganisation={filterOrganisation}
        saveEmploymentReference={saveEmploymentReference}
        workpassSubmit={workpassSubmit}
        openLetterModal={openLetterModal}
        letterModalIsOpen={letterModalIsOpen}
        letterModalIndex={letterModalIndex}
        isEditable={isEditable}
      />
    );
  }
  if (
    type === "education_verification" &&
    education_verification !== undefined
  ) {
    return (
      <EduVerification
        education_verification={education_verification}
        annotationFetch={annotationFetch}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (
    type === "employment_verification" &&
    employement_verification !== undefined
  ) {
    return (
      <EmpVerification
        employement_verification={employement_verification}
        checkId={checkId}
        type={type}
        annotationFetch={annotationFetch}
        annotationSubmit={annotationSubmit}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        isEditable={isEditable}
      />
    );
  }
  if (type === "company" && companyVAT !== undefined) {
    return (
      <CompanyAndVAT
        companyVAT={companyVAT}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        resetSuccess={resetSuccess}
        side={side}
        check_status={check_status}
        requestId={requestId}
        annotationReset={annotationReset}
        userID={userID}
        orgId={orgId}
        isEditable={isEditable}
      />
    );
  }
  if (
    (type === "umbrella_workers_declaration" ||
      type === "umbrella_preferred_suppliers") &&
    umbrella_details !== undefined
  ) {
    return (
      <UmbrellaCompany
        umbrella_details={umbrella_details}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        isEditable={isEditable}
      />
    );
  }
  if (type === "directorship_checks") {
    return (
      <Directorship
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        openDocumentUploadModal={openDocumentUploadModal}
        openDocumentViewModal={openDocumentViewModal}
        documentModalIsOpen={documentModalIsOpen}
        viewDocumentModalIsOpen={viewDocumentModalIsOpen}
        addDocuments={addDocuments}
        uploaded_documents={uploaded_documents}
        viewUploadedDocuments={viewUploadedDocuments}
        doc_images={doc_images}
        deleteDocuments={deleteDocuments}
        isEditable={isEditable}
      />
    );
  }

  if (type === "administrator_uploads") {
    return (
      <AdminUploads
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        openDocumentUploadModal={openDocumentUploadModal}
        openDocumentViewModal={openDocumentViewModal}
        documentModalIsOpen={documentModalIsOpen}
        viewDocumentModalIsOpen={viewDocumentModalIsOpen}
        addDocuments={addDocuments}
        uploaded_documents={uploaded_documents}
        viewUploadedDocuments={viewUploadedDocuments}
        doc_images={doc_images}
        deleteDocuments={deleteDocuments}
        isEditable={isEditable}
      />
    );
  }

  if (type === "dbs_identity" && side === "organisation") {
    return (
      <IdentityCheckOrg
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        openDocumentUploadModal={openDocumentUploadModal}
        openDocumentViewModal={openDocumentViewModal}
        documentModalIsOpen={documentModalIsOpen}
        viewDocumentModalIsOpen={viewDocumentModalIsOpen}
        addDocuments={addDocuments}
        uploaded_documents={uploaded_documents}
        viewUploadedDocuments={viewUploadedDocuments}
        doc_images={doc_images}
        deleteDocuments={deleteDocuments}
        side={side}
        isEditable={isEditable}
      />
    );
  }

  if (type === "right_to_work" && side === "organisation") {
    return (
      <RightToWorkOrg
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        openDocumentUploadModal={openDocumentUploadModal}
        openDocumentViewModal={openDocumentViewModal}
        documentModalIsOpen={documentModalIsOpen}
        viewDocumentModalIsOpen={viewDocumentModalIsOpen}
        addDocuments={addDocuments}
        uploaded_documents={uploaded_documents}
        viewUploadedDocuments={viewUploadedDocuments}
        doc_images={doc_images}
        deleteDocuments={deleteDocuments}
        isEditable={isEditable}
      />
    );
  }

  if (type === "adverse_media_checks") {
    return (
      <AdverseMedia
        adverse_media_data={adverse_media_data}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        isEditable={isEditable}
      />
    );
  }
  if (type === "candidate_uploads") {
    return (
      <CandidateUploads
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        openDocumentUploadModal={openDocumentUploadModal}
        openDocumentViewModal={openDocumentViewModal}
        documentModalIsOpen={documentModalIsOpen}
        viewDocumentModalIsOpen={viewDocumentModalIsOpen}
        addDocuments={addDocuments}
        uploaded_documents={uploaded_documents}
        viewUploadedDocuments={viewUploadedDocuments}
        doc_images={doc_images}
        deleteDocuments={deleteDocuments}
        isEditable={isEditable}
      />
    );
  }

  if (type === 'employment_eligibility_verification') {
    return (
      <EmployeeEligibilityVerification
        checkData={checkData}
        annotationSubmit={annotationSubmit}
        annotationFetch={annotationFetch}
        checkId={checkId}
        type={type}
        complaince_response={complaince_response}
        notes={notes}
        annotationData={annotationData}
        side={side}
        resetSuccess={resetSuccess}
        check_status={check_status}
        requestId={requestId}
        annotationReset={annotationReset}
        userID={userID}
        candidateId={candidateId}
        orgId={orgId}
        saveEmpEliData={saveEmpEliData}
        editEmpEliData={editEmpEliData}
        certifyEmpEliData={certifyEmpEliData}
        isEditable={isEditable}
      />
    )
  }
  return (
    <div className="Candidates__loader">
      <Loader size={65} color="#72d371" />
    </div>
  );
};

WorkPassCheckDetailsView.defaultProps = {
  className: "",
};

export default WorkPassCheckDetailsView
