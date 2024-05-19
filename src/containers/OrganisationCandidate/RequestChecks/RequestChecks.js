import React, { Component } from "react";
import PropTypes from "prop-types";
import isUndefined from "lodash/isUndefined";
import RequestStatus from "components/RequestStatus";
import { ROUTE_URL } from "containers/constants";
import { Link } from "react-router-dom";
import Button from "components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import Modal from 'react-modal'
import { notify } from "react-notify-toast";
import { NOTIFICATION_TIMEOUT, getApiUrl } from "containers/constants";
import httpFetch from "utils/httpFetch";
import "./style.css";

const typeNames = require('../../../utils/reference_type.json')

class RequestChecks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showCompleteModal: false,
      incompleteId: ''
    }
  }

  componentDidMount() {
    const { getRequest, requestId } = this.props;
    /** @NOTE: If not defined it is either fetching or is fetched */
    // if (isUndefined(checks)) {
    //   getRequest(requestId);
    // }
    /** @NOTE: Above condition commented for calling API to fetch Officer Response coming from check screen -  OFFSHORE-1801*/
    getRequest(requestId);
  }

  render() {
    const { checks, className, candidateId, orgId, requestId, biometric_data, status, changeStatus, region, personalinfo_status, refreshRequest } = this.props;
    const isLoading = isUndefined(checks) || checks === "fetching";
    let personalinfoStatus = ''
    if (personalinfo_status === 'complete') {
      personalinfoStatus = 'EDIT'
    } else {
      personalinfoStatus = 'ADD'
    }
    /** @NOTE: No loading animation at the moment :( */
    if (isLoading) {
      return null;
    }
    const candidateChecks = checks.filter(({ side }) => side === "candidate");
    const organisationChecks = checks.filter(
      ({ side }) => side === "organisation"
    );
    let isIncomplete = false;
    candidateChecks.map(({ status }) => {
      if (status === 'pending') {
        isIncomplete = true
      }
    })
    organisationChecks.map(({ status }) => {
      if (status === 'pending') {
        isIncomplete = true
      }
    })
    const showCompleteModalFunc = (e, id) => {
      e.stopPropagation()
      this.setState({ showCompleteModal: !this.state.showCompleteModal, incompleteId: id })
    }
    const handleOnComplete = async () => {
      this.setState({ showCompleteModal: !this.state.showCompleteModal })
      const { requestId, orgId, candidateId } = this.props;
      const url = getApiUrl("manualComplete").replace(":check_id", this.state.incompleteId);
      const json = await httpFetch(url, { method: "POST" });
      if(json.status === "success"){
        notify.show(
          "Completed Successfully",
          "success",
          NOTIFICATION_TIMEOUT
        );
      }
      refreshRequest(
        requestId,
        orgId,
        candidateId,
        () => {},
        () => {}
      );
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(0,0,0,.2)',
        boxShadow: '0 3px 9px rgba(0,0,0,.5)',
        background: 'rgb(255, 255, 255)',
        borderRadius: '6px',
        outline: 'none',
        padding: '0px',
        minWidth: '500px'
      }
    }
    return (
      <>
        {/* Added for user story OFFSHORE-1801 */}
        <tr className="header-container tr-background">
          <td colSpan="4" className="RequestChecks__check candidate_check_item candidate_check_item">
            <div className="candidate_btn_sec">CANDIDATE CHECKS</div>
          </td>
          <td>
            <Button
              color="green"
              className="complete_button"
              disabled={status === 'complete' || isIncomplete ? true : false}
              onClick={() => changeStatus(requestId)}>
              COMPLETE
            </Button>
          </td>
          <td className="text-center">
            <span className="RequestChecks__check candidate_check_item">OFFICER</span>
          </td>
          <td colSpan="2" className="text-center">
            <div className="text-center">
              <span className="RequestChecks__check candidate_check_item">3rd PARTY VALIDATION</span>
            </div>
          </td>
          <td className="text-center">
            <div className="request_candidate_status_r">
              <div className="RequestChecks__check request_candidate_status">CANDIDATE</div>
            </div>
          </td>
          <td className="text-center">
            <div className="request_candidate_status_r">
              <div className="RequestChecks__check request_candidate_status">ADMIN</div>
            </div>
          </td>
        </tr>
        <tr className="tr-background">
          <td colSpan="4" className="RequestChecks__check">Personal Information</td>
          <td></td>
          <td></td>
          <td colSpan="2"></td>
          <td className="text-center">
            <Link to={personalinfo_status} className="disableButton">
              <RequestStatus status={personalinfo_status} />
            </Link>
          </td>
          <td className="text-center">
            <span
              className="addEmpBtn"
              onClick={() => this.props.addReference(requestId, '', 'personal_information', region)}
            >
              {personalinfoStatus}</span>
          </td>
        </tr>
        {
          candidateChecks.map(checkData => {
            let { data, id, type, status, options, side, penstatus } = checkData

            if (type === 'directorship_checks' || type === 'administrator_uploads') {
              status = "admin"
            }
            var display_typename = options.type;
            if (type === 'dbs') {
              if (options.type === 'basic') {
                display_typename = "Criminal Records Check - Basic"
              } else if (options.type === 'enhanced') {
                display_typename = "Criminal Records Check - Enhanced"
              } else if (options.type === "basicscotland") {
                display_typename = "Criminal Records Check - Scotland Basic"
              } else if (options.type === "standard") {
                display_typename = "Criminal Records Check - Standard"
              } else {
                display_typename = "DBS"
              }
            }

            let latestHistory = [];
            let latestHistory1 = [];
            let officerResponse = "NO STATUS";
            let status_class = "officer_response_nostatus";
            let enableStatus = false
            let refOption = '1ref'
            let gbg_response = ''
            let gbg_color = ''
            if (data.length > 0) {
              if (type === 'employment_reference') {
                if (data.length) {
                  enableStatus = true
                }
                refOption = options.Employee_1_ref ? '1ref' : options.Employee_2_ref ? '2ref' : options.Employee_3_ref ? '3ref' : options.Employee_4_ref ? '4ref' : options.Employee_5_ref ? '5ref' : options.Employee_6_ref ? '6ref' : options.Employee_7_ref ? '7ref' : '1ref'
                let historyRecords = []
                historyRecords = data.filter((itm) => itm.latestHistory.length > 0)
                if (historyRecords.length > 0) {
                  latestHistory1 = historyRecords[0].latestHistory
                  latestHistory = latestHistory1.filter((itm) => (itm.status !== "Officer Deleted" && itm.status !== "Officer Edited"))
                }
                const externalResponse = checkData.external_response.filter(ref => {
                  let itm = JSON.parse(ref.work_pass_check_type);
                  return (
                    itm.RefrenceType !== undefined && itm.RefrenceType !== 'Work_Gaps'
                  )
                })
                const receviedResponse = externalResponse.filter(res => {
                  return (
                    res.response_detail === 'closed' || res.response_status === 'agree' || res.response_status === 'disagree'
                  )
                })
                gbg_response = `${receviedResponse.length} / ${externalResponse.length}`
                gbg_color = 'pass'
              } else {
                latestHistory = data[0].latestHistory
              }
            }
            if (latestHistory.length > 0 && latestHistory[0].status !== null && latestHistory[0].status !== "") {
              officerResponse = latestHistory[0].status.toUpperCase()
            }
            if (officerResponse === 'APPROVED') {
              status_class = "officer_response_approved";
            } else if (officerResponse === 'NOT APPROVED') {
              status_class = "officer_response_notapproved";
            } else if (officerResponse === 'WAIVER') {
              status_class = "officer_response_waiver";
            }
            const link = ROUTE_URL.workPassCheckDetails
              .replace(":orgId", orgId)
              .replace(":candidateId", candidateId)
              .replace(":requestId", requestId)
              .replace(":checkId", id)
              .replace(":type", type)
              .replace(":side", side)
              .replace(":status", status)
              .replace(":refOption", refOption)
              .replace(":optiontype", options.type || type);
            if (data.length > 0 && data[0].gbg_response !== null && data[0].gbg_response !== '') {
              const response_data = JSON.parse(data[0].gbg_response)
              if (typeNames[type] === 'Bank Details') {
                if (typeof response_data.Bank_Accounts_GBG_response !== 'undefined') {
                  gbg_response = response_data.Bank_Accounts_GBG_response.outcome.overall
                }
                /* if (gbg_response === "Indeterminate") {
                  gbg_response = 'Check Address'
                } */
              }
              if (typeNames[type] === 'Sanctions & PEPs') {
                if (typeof response_data.GBG_response !== 'undefined') {
                  const response = JSON.parse(JSON.stringify(response_data))
                  gbg_response = response.GBG_response.AuthenticateSPResult.BandText._text
                }
                gbg_response = gbg_response === 'No Match' ? 'clear' : 'match'
              }
              if (typeNames[type] === 'CIFAS Checks') {
                if (typeof response_data.Cifas_check_response !== 'undefined') {
                  gbg_response = response_data.Cifas_check_response.cifas_check_response.decision.current
                }
              }
              if (typeNames[type] === 'Adverse Finance Check') {
                if (response_data.checks) {
                  gbg_response = response_data.checks[1].outcome.overall
                }
                if (response_data.hasOwnProperty("GBG_response")) {
                  gbg_response = response_data.GBG_response
                }
                if (response_data.hasOwnProperty('statuscode') && response_data.statuscode === 200) {
                  gbg_response = response_data.response
                }
              }
              if (typeNames[type] === 'Adverse Media') {
                gbg_response = 'clear'
                if (response_data.GBG_response !== 'undefined') {
                  var gbgdata = response_data.GBG_response.AuthenticateSPResult.ResultCodes.GlobalItemCheckResultCodes.SanctionsMatches
                  if (gbgdata.hasOwnProperty('GlobalSanctionsMatch')) {
                    gbg_response = 'match'
                  }
                }
              }
            }
            if (typeNames[type] === 'Disclosure Scotland - Basic') {
              const gbgdata = data.filter(res => res.name === 'dbs_gbg_response');
              gbg_response = ' '
              if (gbgdata.length > 0) {
                gbg_response = JSON.parse(gbgdata[0].gbg_response)
                if (gbg_response.hasOwnProperty('DBS_response')) {
                  gbg_response = gbg_response.DBS_response.outcome.overall
                } else if (gbg_response.hasOwnProperty('response')) {
                  gbg_response = gbg_response.response
                }
              }
            }
            if (typeNames[type] === 'Identity') {
              gbg_response = ''
            }
            if (biometric_data.length > 0 && typeNames[type] === 'Biometric Identity') {
              const status = biometric_data[0].biometrics_status;
              if (status === 'declined') {
                gbg_response = 'Rejected'
              } else if (status === 'needs_review') {
                gbg_response = 'Awaiting'
              } else if (status === 'complete') {
                gbg_response = 'Verified'
              } else {
                gbg_response = ''
              }
            }
            return (
              <>
                <Modal
                  isOpen={this.state.showCompleteModal}
                  style={customStyles}
                  overlayClassName={{
                    afterOpen: 'myOverlayClass_after-open'
                  }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-body">
                        Do you want to mark this check as Complete?
                      </div>
                      <div className="modal-footer">
                        <Button
                          color="green"
                          className="CandidateHeader__button"
                          onClick={handleOnComplete}
                        // disabled={this.state.disableSaveButton}
                        >
                          YES
                        </Button>
                        <Button
                          color="red"
                          className="CandidateHeader__button"
                          onClick={showCompleteModalFunc}
                          disabled={this.state.disableSaveButton}
                        >
                          NO
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
                <tr key={id} className="tr-background">
                  <td colSpan="4">
                    <div>
                      {type === 'dbs' ?
                        <span className="RequestChecks__check">{display_typename}</span>
                        :
                        <span className="RequestChecks__check">{typeNames[type]}</span>
                      }
                    </div>
                  </td>
                  <td></td>
                  <td className="text-center">
                    <div>
                      <span className={'officer_response officer_res_mx' + ' ' + status_class}>{officerResponse}</span>
                    </div>
                  </td>
                  <td colSpan="2" className="text-center">
                    <div>
                      <div>
                        <span className={'gbg_response_status' + ' ' + gbg_response + ' ' + gbg_color}>{gbg_response}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="request_candidate_status_r">
                      <div className="request_candidate_status">
                        <Link
                          to={{
                            pathname: link
                          }}
                          className={`${((status === "complete" || status === "admin" || officerResponse === 'RESET' || enableStatus)) ?
                              "enableButton" : "disableButton"
                            } ${enableStatus ? 'active-link' : ''}`}
                        >
                          <RequestStatus status={status} />
                        </Link>
                        {(type !== 'administrator_uploads' && status === 'pending' && penstatus) &&
                          <span style={{cursor: 'pointer'}} onClick={(e) => showCompleteModalFunc(e, id)} className="pl-8 mr--21">
                            <FontAwesomeIcon icon={faPencilAlt} />
                         </span>}
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    {
                      (type === 'employment_reference') &&
                      <span className="addEmpBtn"
                        onClick={() => this.props.addReference(requestId, id, type, region)}>ADD</span>
                    }
                  </td>
                </tr>
              </>
            );
          })}

        {organisationChecks.length > 0 ?
          <tr className="tr-background">
            <td colSpan="10"><h3 className="RequestChecks__header m-0 p-0 lh-20 mt-8">Organisation Checks</h3></td>
          </tr>
          : ''}
        {/* <ul className="RequestChecks__list"> */}
        {organisationChecks.map(({ data, id, type, status, side }) => {
          const link = ROUTE_URL.workPassCheckDetails
            .replace(":orgId", orgId)
            .replace(":candidateId", candidateId)
            .replace(":requestId", requestId)
            .replace(":checkId", id)
            .replace(":type", type)
            .replace(":side", side)
            .replace(":status", status)
            .replace(":optiontype", type);

          let latestHistory = [];
          let officerResponse = "NO STATUS";
          let status_class = "officer_response_nostatus";
          if (data.length > 0) {
            latestHistory = data[0].latestHistory
          }
          if (latestHistory.length > 0 && latestHistory[0].status !== null && latestHistory[0].status !== "") {
            officerResponse = latestHistory[0].status.toUpperCase()
          }
          if (officerResponse === 'APPROVED') {
            status_class = "officer_response_approved";
          } else if (officerResponse === 'NOT APPROVED') {
            status_class = "officer_response_notapproved";
          } else if (officerResponse === 'WAIVER') {
            status_class = "officer_response_waiver";
          }
          return (
            <tr className="tr-background" key={id}>
              <td colSpan="4">
                <div>
                  <span className="RequestChecks__check">{typeNames[type]}</span>
                </div>
              </td>
              <td></td>
              <td className="text-center">
                <div>
                  <span className={'officer_response officer_res_mx' + " " + status_class}>{officerResponse}</span>
                </div>
              </td>
              <td colSpan="2" className="text-center">
                <div>
                  <div>
                    <span className={'gbg_response_status'}></span>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <div className="request_candidate_status_r">
                  <div className="request_candidate_status">
                    <Link
                      to={{
                        pathname: link,
                      }}>
                      <RequestStatus status={status} />
                    </Link>
                  </div>
                </div>
              </td>
              <td></td>
            </tr>
          );
        })}
        {/* </ul> */}
        <tr className="tr-background"><td colSpan="10"></td></tr>
      </>
    );
  }
}

RequestChecks.propTypes = {
  getRequest: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
  checks: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  className: PropTypes.string,
};

export default RequestChecks;
