import React, { Component } from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import moment from "moment";
import './../style.css';

class WorkGap extends Component {
  constructor(props) {
    super();
    this.state = {
      divClicked: ''
    }
  }
  render() {
    var check_data_length;
    var sortedWorkGapData = []
    if (this.props.work_gaps.data.check_data.length !== 0) {
      if (this.props.work_gaps.data.check_data[0] === null) {
        check_data_length = 0;
      } else {
        check_data_length = this.props.work_gaps.data.check_data.length;
      }
    } else {
      check_data_length = this.props.work_gaps.data.check_data.length;
    }
    if (check_data_length) {
      sortedWorkGapData = this.props.work_gaps.data.check_data.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    }
    return (
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12 col-sm-12 card-row">
            <div className="card mb-3">
              <div className="card-header-gray">
                <div className="col-md-6">Work Gaps</div>
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

                {check_data_length > 0 ? (
                  <div>
                    {sortedWorkGapData.map((item, idx) => {
                      if (!item.from || !item.to || !item.detail || !item.reason) {
                        return (
                          <div key={idx} className="mt-3 mb-3 EmpGapContainer">
                            <div className="row mb-3">
                              <h4>Employment Gap {idx + 1}</h4>
                            </div>
                            <div className="row mt-3 mb-3">
                              <div className="col-md-12 mb-3">No Employment Gaps</div>
                            </div>
                          </div>
                        )
                      } else {
                        var fromdt = new Date(item.from);
                        var fromMonth = fromdt.toLocaleString('us-en', { month: 'short' });
                        var fromYear = fromdt.getFullYear();

                        var todt = new Date(item.to);
                        var toMonth = todt.toLocaleString('us-en', { month: 'short' });
                        var toYear = todt.getFullYear();
                        return (
                          <div key={idx} className="mt-3 mb-3 EmpGapContainer">
                            <div className="row mb-3">
                              <h4>Employment Gap {idx + 1}</h4>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <p>
                                  {fromMonth} {fromYear} - {toMonth} {toYear}
                                </p>
                              </div>
                              <div className="col-md-6 ">
                                <Link
                                  to="#"
                                  className="report"
                                  onClick={() => {
                                    this.setState({
                                      divClicked: idx,
                                    });
                                    this.props.openModal();
                                  }}
                                >
                                  EVIDENCE
                                </Link>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">REASON</div>
                              <div className="col-md-6">
                                <strong> {item.reason} </strong>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-md-6 mb-3">DETAIL</div>
                              <div className="col-md-6 mb-3">{item.detail}</div>
                            </div>
                            { item.personal_reference1
                              &&
                              <div>
                                <div className="row personal-reference mb-3">
                                  <div className="col-md-6 mb-1">
                                    <p><h4>Personal Reference 1</h4></p>
                                    <p>Date From</p>
                                    <p>Date To</p>
                                    <p>First Name</p>
                                    <p>Last Name</p>
                                    <p>Referee Email</p>
                                    <p>Contact Phone</p>
                                    <p>Nature Of Acquintance</p>
                                    { /*<p>Referee Address</p> */ }
                                  </div>
                                  <div className="col-md-6">
                                    <p><h4>CANDIDATE RESPONSE</h4></p>
                                    <p>{moment(item.personal_reference1.datefrom).format('DD/MM/YYYY')}</p>
                                    <p>{moment(item.personal_reference1.dateto).format('DD/MM/YYYY')}</p>
                                    <p>{item.personal_reference1.refree_firstname}</p>
                                    <p>{item.personal_reference1.refree_lastname}</p>
                                    <p>{item.personal_reference1.refreeemail}</p>
                                    <p>{item.personal_reference1.contact_phone}</p>
                                    <p>{item.personal_reference1.nature_of_acquintance}</p>
                                    { /*<p>{item.personal_reference1.refree_address.country}</p>*/ }
                                  </div>
                                  { /* <div className="colum25">
                                    <p><h4>REFEREE RESPONSE</h4></p>
                                  </div>
                                  <div className="colum30">
                                    <p><h4>OFFICER INITIATED REFERENCE</h4></p>
                                    </div> */ }
                                </div>
                                <div className="row personal-reference">
                                  <div className="col-md-6">
                                    <p><h4>Personal Reference 2</h4></p>
                                    <p>Date From</p>
                                    <p>Date To</p>
                                    <p>First Name</p>
                                    <p>Last Name</p>
                                    <p>Referee Email</p>
                                    <p>Contact Phone</p>
                                    <p>Nature Of Acquintance</p>
                                    { /* <p>Referee Address</p> */ }
                                  </div>
                                  <div className="col-md-6">
                                    <p><h4>CANDIDATE RESPONSE</h4></p>
                                    <p>{moment(item.personal_reference2.datefrom).format('DD/MM/YYYY')}</p>
                                    <p>{moment(item.personal_reference2.dateto).format('DD/MM/YYYY')}</p>
                                    <p>{item.personal_reference2.refree_firstname}</p>
                                    <p>{item.personal_reference2.refree_lastname}</p>
                                    <p>{item.personal_reference2.refreeemail}</p>
                                    <p>{item.personal_reference2.contact_phone}</p>
                                    <p>{item.personal_reference2.nature_of_acquintance}</p>
                                    { /*<p>{item.personal_reference2.refree_address.country}</p>*/ }
                                  </div>
                                  { /* <div className="colum25">
                                    <h4>REFEREE RESPONSE</h4>
                                  </div>
                                  <div className="colum30">
                                    <p><h4>OFFICER INITIATED REFERENCE</h4></p>
                                  </div> */ }
                                </div>
                              </div>
                            }
                            <div className="row personal-reference">
                              {/* <span className="button_col2">
                                <OutlineButton
                                  color="blue"
                                  onClick={() => {
                                    this.props.openDocumentUploadModal(idx);
                                  }}
                                >
                                  Upload
                                </OutlineButton>
                              </span>
                              <span className="button_col2">
                                <OutlineButton
                                  color="blue"
                                  onClick={() => {
                                    this.props.openDocumentViewModal(idx);
                                  }}
                                  className="relative-box"
                                >
                                  View
                                  <span className="ref_doc_view">{docnum}</span>
                                </OutlineButton>
                                </span>
                              <span className="button_col2">
                                {refCloseStatus !== "OFFICER CLOSED"?
                                  <OutlineButton
                                    color="blue"
                                    onClick={() => {
                                      this.props.closeCheck(reference_id);
                                    }}
                                  >
                                    Close
                                  </OutlineButton>
                                :""}
                              </span>
                              <span className="button_col2">
                                {!ref_soft_deleted ?
                                <Button
                                  color="red"
                                  className="softDelete"
                                  onClick={() => {
                                    this.props.softDeleteCheck(reference_id);
                                  }}
                                >
                                  Soft Delete
                                </Button>
                                :""}
                              </span>*/ }
                            </div>
                            <hr className="refseparator"></hr>
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div className="row mt-3 mb-3">
                    <div className="col-md-12 mb-3">No Employment Gaps</div>
                  </div>
                )}
                <AnnotationComponent
                  annotationSubmit={this.props.annotationSubmit}
                  checkId={this.props.checkId}
                  type={this.props.type}
                  annotationFetch={this.props.annotationFetch}
                  complaince_response={this.props.complaince_response}
                  notes={this.props.notes}
                  userID={this.props.userID}
                  annotationData={this.props.annotationData}
                  annotationReset={this.props.annotationReset}
                  check_status={this.props.check_status}
                  side={this.props.side}
                  requestId={this.props.requestId}
                  resetSuccess={this.props.resetSuccess}
                  orgId={this.props.orgId}
                  isEditable={this.props.isEditable}
                />
                <NotesHistory
                  notesHistory={this.props.annotationData.check_data}
                ></NotesHistory>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.props.modalIsOpen} className="modal work_gap_modal">
          <div className="modal-div">
            {this.state.divClicked !== '' &&
            this.props.work_gaps.data.check_data[this.state.divClicked]
              .uploadEvidence !== '' ? (
                <img
                  src={ this.props.work_gaps.data.check_data[this.state.divClicked].uploadEvidence.document.url }
                  className="modal-img img-fluid"
                  alt="Evidence"
                />
              ) : (
                <p className="modal-div">No Uploaded document.</p>
              )}

            <LinkedButton
              className="CandidateNewRequestsHeader__btn NewRequestButton modal-button evidence_exit_btn"
              color="red"
              to={"#"}
              onClick={() => this.props.openModal()}
            >
              Exit
            </LinkedButton>
          </div>
        </Modal>
      </div>
    );
  }
}

export default WorkGap;