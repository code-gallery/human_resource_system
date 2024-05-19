import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddEmployementReference from './../../AddReference/AddEmployementReference'
import AddPersonalInformation from './../../AddReference/AddPersonalInformation'
import AddressHistory from '../../AddReference/AddressHistory'
import BankDetails from '../../AddReference/BankDetails'
import AddRightToWork from '../../AddReference/AddRightToWork'
import AddImmigrationDetails from '../../AddReference/AddImmigrationDetails'
import AddCriminalRecord from '../../AddReference/AddCriminalRecord'
import { Table, TableHeading, TableData } from "components/Table";
import { CircularProgressbar } from 'react-circular-progressbar';
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import RequestStatus from "components/RequestStatus";
import ChecksView from "../ChecksView";
// import AddReference from './../AddReference/AddReference'
import Icon from "components/Icon";
import moment from 'moment'

import 'react-circular-progressbar/dist/styles.css';
import "./style.css";

class WorkPassCandidateChecks extends Component {
  state = {
    requestDropdowns: {},
    isModalOpen: false,
    region: '',
    refOption: '',
    reference_type: '',
    requestId: '',
    check_id: ''
  };

  /* componentDidMount() {
    this.props.candidateRequests;
  }*/

  componentDidMount() {
    this.props.fetchCandidatePersonalInfo({user_id: this.props.userId})
    this.props.fetchBankAddresses()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.key !== prevProps.location.key) {
      this.props.updateBreadcrumb();
      this.setState({ requestDropdowns: {} })
    }
  }

  toggleDropdown = (id) => () => {
    this.props.fetchCandidateCheckDetails(id);
    //this.props.fetchCandidatePersonalInfo()
    this.props.updateBreadcrumb(id);
    this.updateState(id);
  };

  updateState = (id) => {
    this.setState(({ requestDropdowns }) => {
      return {
        requestDropdowns: {
          ...requestDropdowns,
          [id]: !requestDropdowns[id]
        },
      };
    });
  };

  addReference = (id, type, region, refOption = '', check_id) => {
    this.setState({
      isModalOpen: true,
      region,
      refOption,
      reference_type: type,
      check_id: check_id,
      requestId: id
    })
  }

  closeReferenceModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  /* dateFormat = (reqDate) => {
    var fromdate = new Date(reqDate);
    var dd = String(fromdate.getDate()).padStart(2, "0");
    var mm = String(fromdate.getMonth()).padStart(2, "0"); //January is 0!
    var yyyy = fromdate.getFullYear();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    fromdate = months[toNumber(mm)] + " " + dd + " " + yyyy;
    return fromdate;
  }; */

  submitRequest = reqNum => {
    this.props.submitWorkPass(reqNum,
      () => notify.show('Request submitted successfully', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to submit. Please try again', 'error', NOTIFICATION_TIMEOUT))
  }

  renderNoRequests() {
    return (
      <tbody>
        <tr>
          <TableData
            colSpan="9"
            className="CandidateRequestsTable__table-data CandidateRequestsTable__empty"
          >
            <h2 className="CandidateRequestsTable__empty-header">
              No Requests
            </h2>
            <p>When officer sends you work-pass request, they will appear here</p>
          </TableData>
        </tr>
      </tbody>
    );
  }

  renderTable() {
    const candidateRequests = this.props.candidateRequests;
    const { userId, addresses } = this.props;
    const personalinfo = this.props.personalinfo ? this.props.personalinfo : {}
    const personalinfo_status = (personalinfo.forename && personalinfo.surname && personalinfo.email && personalinfo.gender && personalinfo.title && personalinfo.dob && personalinfo.account_address && personalinfo.phone) ? 'complete' : 'pending'
    const address_count = addresses?.length
    return (
      <tbody>
        {candidateRequests.map((request, idx) => {
          const completed_checks = request.completed_checks ? request.completed_checks : 0
          const total_checks = request.total_checks ? request.total_checks : 0
          const isDropdownOpen = this.state.requestDropdowns[request.id];
          const region = request.region ? request.region : ''
          const requestRow = [
            <tr key={request.id} id={request.id} onClick={this.toggleDropdown(request.id)}>
              <TableData
                top={true}
                className="CandidateRequestsTable__table-data cell-width"
              >
                {moment(request.created_at).format('MMM DD YYYY')}
              </TableData>

              <TableData
                top={true}
                className="CandidateRequestsTable__table-data cell-width"
              >
                {request.role}
              </TableData>

              <TableData
                top={true}
                className="CandidateRequestsTable__table-data cell-width"
              >
                <Link
                  to={"#"}
                  className="CandidateRequestsTable__table-data--view-data"
                >
                  #{request.id}
                </Link>
              </TableData>

              <TableData
                top={true}
                className="CandidateRequestsTable__table-data cell-width"
              >
                <RequestStatus status={request.status} />
              </TableData>

              <TableData
                top={true}
                className="CandidateRequestsTable__table-data cell-width"
              >
                <Link
                  to={"#"}
                  className="CandidateRequestsTable__table-data--view-data"
                >
                  {request.employerName}
                </Link>
              </TableData>
              {/* <TableData
                top={true}
                className="CandidateRequestsTable__table-data CandidateRequestsTable__table-data--view-data"
              >
                View Data
              </TableData>*/ }
              <TableData
                top={true}
                className="CandidateRequestsTable__table-data"
              >
                <Link
                  to={"#"}
                  className="CandidateRequestsTable__table-data--view-data"
                >
                  {request.checker !== null
                    ? request.checker.first_name +
                      " " +
                      request.checker.last_name
                    : " "}
                </Link>
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data arrow_circle_container"
              >
                <div className="arrow_circle_container_div">
                  <div className="progress_container">
                    {total_checks !== 0 &&
                    <CircularProgressbar
                      value={(completed_checks / total_checks) * 100}
                      text={completed_checks + '/' + total_checks}
                      styles={{
                        path: {
                          stroke: `${(completed_checks / total_checks) === 1 ? `rgba(45, 182, 45, ${(completed_checks / total_checks) + 1})` : `rgba(128, 128, 128, ${(completed_checks / total_checks) + 1})` }`,
                        },
                        trail: {
                          stroke: '#d6d6d6'
                        },
                        text: {
                          fill: `${(completed_checks / total_checks) === 1 ? `rgba(45, 182, 45)` : `rgba(128, 128, 128)`}`,
                          fontSize: '22px',
                          fontWeight: 'bold'
                        },
                        background: {
                          fill: '#3e98c7'
                        }
                      }}
                    />}
                  </div>
                  <button className="CandidateRequestsTable__chevron">
                    {isDropdownOpen ? (
                      <Icon type="chevronUp" color="#498df0" />
                    ) : (
                      <Icon type="chevronDown" color="#498df0" />
                    )}
                  </button>
                </div>
              </TableData>
              {/* <TableData
                top={false}
                className="CandidateRequestsTable__table-data"
              >
                <LinkedButton className="submit" to="#" color="blue" onClick={() => {this.submitRequest(request.id)}}>
                  Submit
                </LinkedButton>
              </TableData> */}
            </tr>,
          ];

          if (isDropdownOpen) {
            // if (this.props.loading === false) {
            requestRow.push(
              // (this.props.loading === false && Object.keys(this.props.data).length > 0) &&
              <ChecksView
                requestId={request.id}
                userId={userId}
                //fetchCandidateCheckDetails={this.props.fetchCandidateCheckDetails}
                personalinfo_status={personalinfo_status}
                address_count={address_count}
                data={this.props.data}
                region={region}
                addReference={this.addReference}
              ></ChecksView>
            );
            //}
          }
          return requestRow;
        })}
      </tbody>
    );
  }

  render() {
    const {
      data,
      userId,
      loading,
      candidateRequests,
      editPersonalInfo,
      addresses,
      saveAddress,
      organisations,
      deleteAddress,
      editAddress,
      submitAddressHistory,
      fetchCandidateCheckDetails,
      fetchOrganisations,
      saveEmploymentReferenceData,
      saveBankDetails,
      bankAddresses,
      deleteBankAddress,
      submitBankDetails,
      submitRightToWork,
      submitCriminalRecord,
      submitImmigrationDetails
    } = this.props
     // const personalinfo = this.props.personalinfo.personalInformation ? this.props.personalinfo.personalInformation : {}
    const personalinfo = this.props.personalinfo ? this.props.personalinfo : {}    
    const checkData = (data.request && data.request.checks && data.request.checks.length) && data.request.checks.filter(check => check.type === 'employment_reference')
    const { isModalOpen, reference_type, requestId, check_id, refOption, region } = this.state
    const table =
      candidateRequests.length > 0
        ? this.renderTable()
        : this.renderNoRequests();
    let options = []
    if (organisations !== undefined) {
      options = organisations.data.map((org)=>{
        return {
          id: org.id,
          value: org.name
        }
      })
    }
    return (
      <section className="candidateChecks myWorkPass">
        <h3 className="checksheader">Work Pass Requests</h3>
        <Notifications />
        <Table className="CandidateRequestsTable__table">
          <thead>
            <tr>
              <TableHeading className="cell-width">Date</TableHeading>
              <TableHeading className="cell-width">Job Role</TableHeading>
              <TableHeading className="cell-width">Request ID</TableHeading>
              <TableHeading className="cell-width">Status</TableHeading>
              <TableHeading className="cell-width">
                Company- Requested By
              </TableHeading>
              {/* <TableHeading className="cell-width">Submitted Data</TableHeading> */}
              <TableHeading className="cell-width">Organisation Contact</TableHeading>
              <TableHeading className="cell-width"></TableHeading>
            </tr>
          </thead>

          {table}
        </Table>
        { reference_type === 'personal_information' &&
          <AddPersonalInformation
            isModalOpen={isModalOpen}
            closeReferenceModal={this.closeReferenceModal}
            personalinfo={personalinfo}
            editPersonalInfo={editPersonalInfo}
            saveAddress={saveAddress}
            addressList={addresses}
            userId={userId}
            loading={loading}
            region={region}
            reference_type={reference_type}
            deleteAddress={deleteAddress}
            editAddress={editAddress}
            fetchCandidateCheckDetails={fetchCandidateCheckDetails}
            myworkpass={true}
          />
        }
        { reference_type === 'address_history' &&
          <AddressHistory
            isModalOpen={isModalOpen}
            closeReferenceModal={this.closeReferenceModal}
            personalinfo={personalinfo}
            editPersonalInfo={editPersonalInfo}
            saveAddress={saveAddress}
            addressList={addresses}
            userId={userId}
            check_id={check_id}
            loading={loading}
            region={region}
            refOption={refOption}
            reference_type={reference_type}
            deleteAddress={deleteAddress}
            editAddress={editAddress}
            submitAddressHistory={submitAddressHistory}
            requestId={requestId}
            fetchCandidateCheckDetails={this.props.getRequest}
            // fetchCandidateCheckDetails={fetchCandidateCheckDetails}
          />
        }
        { reference_type === 'bank_details' &&
          <BankDetails
            userId={userId}
            loading={loading}
            check_id={check_id}
            requestId={requestId}
            isModalOpen={isModalOpen}
            bankAddresses={bankAddresses}
            saveBankDetails={saveBankDetails}
            deleteBankAddress={deleteBankAddress}
            submitBankDetails={submitBankDetails}
            closeReferenceModal={this.closeReferenceModal}
            getData={this.props.getRequest}
          />
        }
        { reference_type === 'right_to_work' &&
          <AddRightToWork
            loading={loading}
            check_id={check_id}
            requestId={requestId}
            isModalOpen={isModalOpen}
            submitRightToWork={submitRightToWork}
            closeReferenceModal={this.closeReferenceModal}
            getData={this.props.getRequest}
          />
        }
        { reference_type === 'immigration_details' &&
          <AddImmigrationDetails
            loading={loading}
            check_id={check_id}
            requestId={requestId}
            isModalOpen={isModalOpen}
            submitImmigrationDetails={submitImmigrationDetails}
            closeReferenceModal={this.closeReferenceModal}
            getData={this.props.getRequest}
          />
        }
        { reference_type === 'criminal_record_declaration' &&
          <AddCriminalRecord
            userId={userId}
            loading={loading}
            check_id={check_id}
            requestId={requestId}
            isModalOpen={isModalOpen}
            submitCriminalRecord={submitCriminalRecord}
            closeReferenceModal={this.closeReferenceModal}
            getData={this.props.getRequest}
          />
        }
        { reference_type === 'employment_reference' &&
          <AddEmployementReference
            loading={this.props.loader}
            checkId={check_id}
            requestId={requestId}
            checkData={checkData}
            refOption={refOption}
            organisations={options}
            isModalOpen={isModalOpen}
            workpassSubmit={this.props.workpassSubmit}
            fetchOrganisations={fetchOrganisations}
            closeReferenceModal={this.closeReferenceModal}
            saveEmploymentReferenceData={saveEmploymentReferenceData}
            getRequest={this.props.getRequest}
            getData={fetchCandidateCheckDetails}
          />
        }
      </section>
    );
  }
}

WorkPassCandidateChecks.propTypes = {
  fetchCandidateCheckDetails: PropTypes.func.isRequired,
  fetchCandidatePersonalInfo: PropTypes.func.isRequired,
  fetchCandidateAddresses: PropTypes.func.isRequired,
  fetchOrganisations: PropTypes.func.isRequired,
  editPersonalInfo: PropTypes.func.isRequired,
  saveAddress: PropTypes.func.isRequired,
  candidateRequests: PropTypes.array.isRequired,
  updateBreadcrumb: PropTypes.func.isRequired,
  submitWorkPass: PropTypes.func.isRequired,
  personalinfo: PropTypes.object,
  addresses: PropTypes.array,
  userId: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  saveBankDetails: PropTypes.func.isRequired,
  bankAddresses: PropTypes.array,
  // data: PropTypes.object
};

export default WorkPassCandidateChecks;
