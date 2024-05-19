import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isUndefined from "lodash/isUndefined";
import { ROUTE_URL } from "containers/constants";
import RequestStatus from "components/RequestStatus";
import gbgResponse from '../../../utils/gbg_response'
import "./style.css";

const typeNames = require('../../../utils/reference_type.json')

class RequestChecks extends Component {
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
    const { checks, className, biometric_data, candidateId, orgId, vOrgId, requestId } = this.props;

    const isLoading = isUndefined(checks) || checks === "fetching";

    /** @NOTE: No loading animation at the moment :( */
    if (isLoading) {
      return null;
    }
    const candidateChecks = checks.filter(({ side }) => side === "candidate");
    const organisationChecks = checks.filter(
      ({ side }) => side === "organisation"
    );

    return (
      <>
        {/* Added for user story OFFSHORE-1801 */}
        <tr className="header-container tr-background">
          <td colSpan="4" className="RequestChecks__check candidate_check_item candidate_check_item">
            <div className="candidate_btn_sec">CANDIDATE CHECKS</div>
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
        </tr>
        {
          candidateChecks.map(({data, id, type, status, options, side }) => {
            if (type === 'directorship_checks' || type === 'administrator_uploads') {
              status = "admin"
            }
            var display_typename = options.type;
            const gbg_response = gbgResponse(data, biometric_data, typeNames[type])
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
            if (data.length > 0) {
              if (type === 'employment_reference') {
                let historyRecords = []
                historyRecords = data.filter((itm) => itm.latestHistory.length > 0)
                if (historyRecords.length > 0) {
                  latestHistory1 = historyRecords[0].latestHistory
                  latestHistory = latestHistory1.filter((itm) => (itm.status !== "Officer Deleted" && itm.status !== "Officer Edited"))
                }
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
              .replace(":orgId", vOrgId)
              .replace(":candidateId", candidateId)
              .replace(":requestId", requestId)
              .replace(":checkId", id)
              .replace(":type", type)
              .replace(":side", side)
              .replace(":status", status)
              .replace(":optiontype", options.type || type)
              .replace(":vOrgId", orgId);
            return (
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
                <td className="text-center">
                  <div>
                    <span className={'officer_response officer_res_mx' + ' ' + status_class}>{officerResponse}</span>
                  </div>
                </td>
                <td colSpan="2" className="text-center">
                  <div>
                    <div>
                      <span className={'gbg_response_status' + ' ' + gbg_response}>{gbg_response}</span>
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
                        className={`${
                          ((status === 'complete' || status === 'admin' || officerResponse === 'RESET')) ?
                            'enableButton' : 'disableButton'
                        }`}
                      >
                        <RequestStatus status={status} />
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}

        {organisationChecks.length > 0 ?
          <tr className="tr-background">
            <td colSpan="8"><h3 className="RequestChecks__header m-0 p-0 lh-20 mt-8">Organisation Checks</h3></td>
          </tr>
          : ''}
        {/* <ul className="RequestChecks__list"> */}
        {organisationChecks.map(({ data, id, type, status, side }) => {
          const link = ROUTE_URL.workPassCheckDetails
            .replace(":orgId", vOrgId)
            .replace(":candidateId", candidateId)
            .replace(":requestId", requestId)
            .replace(":checkId", id)
            .replace(":type", type)
            .replace(":side", side)
            .replace(":status", status)
            .replace(":optiontype", type)
            .replace(":vOrgId", orgId);

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
            </tr>
          );
        })}
        {/* </ul> */}
        <tr className="tr-background"><td colSpan="8"></td></tr>
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