import React, { Component } from "react"
import PropTypes from "prop-types"
import isUndefined from "lodash/isUndefined"
import RequestStatus from "components/RequestStatus"
import { ROUTE_URL } from "containers/constants"
import { Link, Redirect } from "react-router-dom"

const typeNames = require('../../../utils/reference_type.json')

class ChecksView extends Component {

  componentDidMount() {
    const { getRequest, requestId } = this.props;
    getRequest(requestId);
  }

  render() {
    const { checks, requestId, userId, addReference, region, personalinfo_status, address_count } = this.props
    const isLoading = isUndefined(checks) || checks === "fetching";
    if (isLoading) {
      return null;
    }

    const link1 = ROUTE_URL.candidateChecksView
      .replace(':requestId', requestId)
      .replace(':userId', userId)
      .replace(':type', 'personal_info')
    const checkData = checks.filter(check => {
      return check.side === 'candidate' && check.type !== 'administrator_uploads'
    })
    /* const checkData = data.request.checks.length && data.request.checks.filter(check => {
      return check.side === 'candidate' && check.type !== 'administrator_uploads'
    })*/
    let personalinfoStatus = ''
    if (personalinfo_status === 'complete') {
      personalinfoStatus = 'EDIT'
    } else {
      personalinfoStatus = 'ADD'
    }

    return (
      <>
        <tr className="header-container tr-background">
          <td colSpan="4" className="RequestChecks__check candidate_check_item candidate_check_item">
            <div className="candidate_btn_sec">CANDIDATE CHECKS</div>
          </td>
          <td colSpan="2" className="text-center">
            <div className="request_candidate_status_r">
              <div className="RequestChecks__check request_candidate_status">CANDIDATE</div>
            </div>
          </td>
          <td className="text-center">
            <div className="request_candidate_status_r">
              <div className="RequestChecks__check request_candidate_status">INPUT</div>
            </div>
          </td>
        </tr>
        <tr className="tr-background">
          <td colSpan="4">Personal Information</td>
          <td colSpan="2" className="text-center">
            <Link to={link1} className="disableButton">
              <RequestStatus status={personalinfo_status} />
            </Link>
          </td>
          <td className="text-center">
            <span
              className="addEmpBtn"
              onClick={() => addReference(requestId, 'personal_information', region)}>
              {personalinfoStatus}</span>
          </td>
        </tr>
        {
          checkData.map(({ id, type, status, options, data }) => {
            console.log('type', type);
            console.log('status', status);
            const link = ROUTE_URL.candidateChecksView
              .replace(':requestId', requestId)
              .replace(':userId', userId)
              .replace(':type', type)
            let officerResponse = ''
            let enableStatus = false
            const latestHistory = (data.length && data[0].latestHistory) ? data[0].latestHistory : []
            if (latestHistory.length > 0 && latestHistory[0].status !== null && latestHistory[0].status !== '') {
              officerResponse = latestHistory[0].status.toUpperCase()
            }
            let refOption = options.with_address_1year ? '1ref' : options.with_address_2year ? '2ref' : options.with_address_3year ? '3ref' : options.with_address_4year ? '4ref' : options.with_address_5year ? '5ref' : '1ref'
            if (type === 'employment_reference') {
              refOption = options.Employee_1_ref ? '1ref' : options.Employee_2_ref ? '2ref' : options.Employee_3_ref ? '3ref' : options.Employee_4_ref ? '4ref' : options.Employee_5_ref ? '5ref' : options.Employee_6_ref ? '6ref' : options.Employee_7_ref ? '7ref' : '1ref'
            }
            if (data.length > 0 && type === 'employment_reference') {
              enableStatus = true
            }
            return (
              <tr key={id} className="tr-background">
                <td colSpan="4">{typeNames[type]}</td>
                <td colSpan="2" className="text-center">
                  <Link
                    to={link}
                    className={`disableButton ${((type === 'address_history' && address_count && status === 'pending') || enableStatus) && ' in-progress'}`}
                  >
                    <RequestStatus status={status} />
                  </Link>
                </td>
                <td className="text-center">
                  { ((type === 'address_history' && officerResponse !== 'APPROVED' && officerResponse !== 'WAIVER' && status === 'pending') || (type === 'employment_reference' && status === 'pending') || (type === 'bank_details' && status === 'pending') || (type === 'criminal_record_declaration' && status === 'pending') || (type === 'immigration_details' && status === 'pending')
                  || (type === 'right_to_work' && status === 'pending')
                  ) &&
                    <span
                      className="addEmpBtn"
                      onClick={() => addReference(requestId, type, region, refOption, id)}
                    >{((type === 'address_history' && address_count) || enableStatus) ? 'EDIT' : 'ADD'}
                    </span>
                  }
                </td>
              </tr>
            )
          })
        }
      </>
    );
  }
}

ChecksView.propTypes = {
  addReference: PropTypes.func.isRequired,
  requestId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  data: PropTypes.object
};

export default ChecksView;
