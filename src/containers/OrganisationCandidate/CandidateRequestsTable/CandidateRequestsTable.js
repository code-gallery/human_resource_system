import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isUndefined from "lodash/isUndefined";
import Icon from "components/Icon";
import RequestStatus from "components/RequestStatus";
import { Table, TableData } from "components/Table";
import RequestChecks from "../RequestChecks";
import { ROUTE_URL, getApiUrl } from "containers/constants";
import httpFetch from "utils/httpFetch";
import isNull from "lodash/isNull";
import { notify } from "react-notify-toast";
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import Button from "components/Button";
import "./style.css";
import moment from 'moment'
import greenTick from 'assets/images/greenTick.png'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { CircularProgressbar } from 'react-circular-progressbar';
import AddEmployementReference from './../../AddReference/AddEmployementReference'
import AddPersonalInformation from './../../AddReference/AddPersonalInformation'

import 'react-circular-progressbar/dist/styles.css';


class CandidateRequestsTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requestDropdowns: {},
      showNudge: false,
      refereshRequestId: null,
      deleteButton: false,
      showPencilIcon: false,
      pencilId: null,
      showEditRole: false,
      roleValue: '',
      disableSaveButton: true,
      addEmpRefModal: false,
      reference_type: '',
      requestId: '',
      checkId: '',
      region: ''
    }
  }

  componentWillMount() {
    const { requests } = this.props;
    const orderedRequests = [...requests];
    let deletestatus = false
    orderedRequests.map((request, idx) => {
      if(request.deletestatus) 
        deletestatus = true
    })
    this.setState({deleteButton: deletestatus})
    // first dropdown is auto-open if only one request and
    // it's not had the dropdown state explicitly changed
    if (
      requests.length === 1 &&
      isUndefined(this.state.requestDropdowns[requests[0].id])
    ) {
      this.toggleDropdown(requests[0].id)();
    }
  }

  componentDidMount() {
    var elem = ''
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.redirectTo === "requestNum") {
        elem = document.getElementById(this.props.location.state.requestId);
        this.scrollToBottom(elem);
      }
    }
    if (this.props.userId) {
      this.props.fetchCandidatePersonalInfo({user_id: this.props.userId})
    } else {
      this.props.fetchCandidatePersonalInfo({candidate_id: this.props.candidateId})
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.personalinfo) !== JSON.stringify(prevProps.personalinfo))
    {
      // this.props.fetchCandidatePersonalInfo(this.props.userId)
    }
  }

  scrollToBottom(elem) {
    if (this.props.location.state !== undefined) {
      elem.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
      this.setState(({ requestDropdowns }) => {
        return {
          requestDropdowns: {
            ...requestDropdowns,
            [this.props.location.state.requestId]: !requestDropdowns[
              this.props.location.state.requestId
            ],
          },
        };
      });
      elem.focus();

      const { orgId, candidateId } = this.props;
      this.props.refreshRequest(
      this.props.location.state.requestId,
      orgId,
      candidateId,
      () => {})
    }
  }

  /** @NOTE: toggle the right request dropdown */
  toggleDropdown = (id) => () => {
    // this.props.fetchCandidatePersonalInfo(this.props.userId)
    this.setState(({ requestDropdowns }) => {
      return {
        requestDropdowns: {
          ...requestDropdowns,
          [id]: !requestDropdowns[id], // true = open, false = close
        },
      };
    });
  };

  onclickDelete = (requestId) => {
    const { orgId, candidateId } = this.props;
    this.props.deleteRequest(
      requestId,
      orgId,
      candidateId,
      () => {
        notify.show(
          this.props.deleteReqStatus,
          "success",
          NOTIFICATION_TIMEOUT
        );
      },
      () =>
        notify.show("Failed to delete request.", "error", NOTIFICATION_TIMEOUT)
    );
  };

  changeStatus = async (requestId) => {
    const url = getApiUrl("changeStatusData").replace(":requestId", requestId);
    await httpFetch(url, { method: "PUT" })
    const { orgId, candidateId } = this.props;
    this.props.refreshRequest(
      requestId,
      orgId,
      candidateId,
      () => {
        notify.show(
         "Status changed successfully",
          "success",
          NOTIFICATION_TIMEOUT
        );
      },
      () =>
        notify.show("Failed to change status request.", "error", NOTIFICATION_TIMEOUT)
    );
  }

  onclickRefresh = (requestId) => {
    const { orgId, candidateId } = this.props;
    this.props.refreshRequest(
      requestId,
      orgId,
      candidateId,
      () => {
        notify.show(
          "Result Updated",
          "success",
          NOTIFICATION_TIMEOUT
        );
      },
      () =>
        notify.show("Failed to refresh request.", "error", NOTIFICATION_TIMEOUT)
    );
  };

  onclickNudge = async requestId => {
    const {orgId, candidateId} = this.props;
    const date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    const data = {
      organisation_id: orgId,
      candidate_id :candidateId,
      request_id :requestId,
      datetime: date
    }
    const url = getApiUrl("nudgeData");
    const res = await httpFetch(url, { method: "POST", body: JSON.stringify(data) })
    if(res.status === 'success'){
      this.setState({
        showNudge: true,
        refereshRequestId: requestId
      })
    }
  }

  exitNudge = () => {
    const {orgId, candidateId} = this.props;
    this.setState({
      showNudge: false
    })
    this.props.refreshRequest(this.state.refereshRequestId, orgId, candidateId, () => {}, () => {});
  }

  editRoleFunc = e => {
    const { requests } = this.props;
    const orderedRequests = [...requests];
    e.stopPropagation()
    this.setState({showEditRole: !this.state.showEditRole, roleValue: orderedRequests[this.state.pencilId]?.role})
  }

  addEmpReference = (requestId, checkId, reference_type, region) => {
    this.setState({
      addEmpRefModal: true,
      checkId,
      requestId,
      reference_type,
      region
    })
  }

  handleCloseModal = () => {
    this.setState({
      addEmpRefModal: false
    })
  }

  renderTable() {
    const { requests, orgId, candidateId, personalinfo } = this.props;
    // this is horrible, but quickly make it so requests are ordered descending
    const orderedRequests = [...requests];
    const personalinfo_status = (personalinfo.forename && personalinfo.surname && personalinfo.email && personalinfo.gender && personalinfo.title && personalinfo.dob && personalinfo.account_address && personalinfo.phone) ? 'complete' : 'pending'
    return (
      <tbody>

        <div id="nudge-container" style={{display: this.state.showNudge ? 'block' : 'none'}}>
          <div className="inner">
            <section className = "nudge-header">
              <h3>Nudge Candidate</h3>
              <Button
                color="red"
                className="CandidateHeader__button"
                onClick={() => this.exitNudge()}
              >
                Exit
              </Button>
            </section>
            <div className="nudge-success-text">
              <h2 className="nudge-success-heading"><img src={greenTick} alt="" /> SUCCESS!</h2>
              <p className="nudge-success-msg">
                An email has been sent to the candidate reminding them to complete outstanding tasks
              </p>
            </div>
          </div>
        </div>

        {orderedRequests.map((request, idx) => {
          const completed_checks = request.completed_checks;
          const total_checks = request.total_checks;
          const region = request.region ? request.region : ''
          let lastUpdated = "";
          if(request.latest_updated_at[0])
            lastUpdated = moment(request.latest_updated_at[0]).format('MMMM DD, YYYY HH:mm');
          const isFirst = idx === 0;
          const isDropdownOpen = this.state.requestDropdowns[request.id];
          const officerName = isNull(request.checker)
            ? "––"
            : `${request.checker.first_name} ${request.checker.last_name}`;
          const toggleDropdown = this.toggleDropdown(request.id);

          const showPencil = idx => this.setState({showPencilIcon: true, pencilId: idx})

          const hidePencil = () => this.setState({showPencilIcon: false})

          const viewDataPath = ROUTE_URL.workPassViewRequestData
            .replace(":orgId", orgId)
            .replace(":candidateId", candidateId)
            .replace(":requestId", request.id)
            .replace(':vOrgId', orgId);
          const reqID = request.id;

          const requestRow = [
            <tr key={`${request.id}-row`} id={reqID} ref={reqID}
            onMouseEnter={() => showPencil(idx)}
            onMouseLeave={hidePencil}>
              <TableData
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              >
                {request.createdAt.format("MMM Do YYYY")}
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              >
                {request.employerName}
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              > 
                <div className="cadidate_role_btn">
                  {request.role}
                  {this.state.showPencilIcon && this.state.pencilId === idx && <span onClick={this.editRoleFunc}><FontAwesomeIcon icon={faPencilAlt} /></span>}
                </div>
              </TableData>

              <TableData
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              >
                #{request.id}
              </TableData>

              <TableData
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              >
                <RequestStatus status={request.status} />
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width text-center2 pr-0"
                onClick={toggleDropdown}
              >
                {/* <div className="pl-13"> */}
                {officerName}
                {/* </div> */}
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width text-center2 pr-0"
                onClick={toggleDropdown}
              >
                {lastUpdated}
              </TableData>              
              <TableData
                className="CandidateRequestsTable__table-data"
              >
                <Link
                  to={viewDataPath}
                  className="CandidateRequestsTable__table-data--view-data cell-width candidate_view_data"
                >
                  View Data
                </Link>
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width CandidateRequestsTable_btn"
              >
                <div>
                  <Button
                    color="blue"
                    className="CandidateHeader__button nudge-btn"
                    onClick={() => this.onclickNudge(request.id)}
                    disabled = {!request.nudgestatus}
                  >
                    Nudge
                  </Button>
                  <Button
                    color="green"
                    className="CandidateHeader__button"
                    onClick={() => this.onclickRefresh(request.id)}
                  >
                    Refresh
                  </Button>
                  { request.deletestatus &&
                    <Button
                      color="red"
                      className="CandidateHeader__button"
                      onClick={() => this.onclickDelete(request.id)}
                    >
                      Delete
                    </Button>
                  }
                </div>
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data arrow_circle_container"
                onClick={toggleDropdown}
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
                          stroke: '#d6d6d6',
                        },
                        text: {
                          fill: `${(completed_checks / total_checks) === 1 ? `rgba(45, 182, 45)` : `rgba(128, 128, 128)`}`,
                          fontSize: '22px',
                          fontWeight: 'bold'
                        },
                        background: {
                          fill: '#3e98c7',
                        },
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
            </tr>
          ];

          /** @NOTE: The dropdown is just another row that is visable on click*/
          if (isDropdownOpen) {
            requestRow.push(
              <RequestChecks
                changeStatus={this.changeStatus}
                status={request.status}
                requestId={request.id}
                orgId={orgId}
                candidateId={candidateId}
                region={region}
                personalinfo_status={personalinfo_status}
                addReference={this.addEmpReference}
                refreshRequest={this.props.refreshRequest}
              />
            );
          }

          return requestRow;
        })}
      </tbody>
    );
  }

  renderNoRequests() {
    return (
      <tbody>
        <tr>
          <TableData
            colSpan="8"
            className="CandidateRequestsTable__table-data CandidateRequestsTable__empty"
          >
            <h2 className="CandidateRequestsTable__empty-header">
              No Requests
            </h2>
            <p>Create one by clicking the New Request button</p>
          </TableData>
        </tr>
      </tbody>
    );
  }

  render() {
    const {
      requests,
      organisations,
      filterOrganisation,
      saveEmploymentReference,
      loading,
      candidate,
      candidateId,
      orgId,
      userId,
      addresses,
      personalinfo,
      savePersonalInfo,
      saveAddress,
      deleteAddress,
      editAddress
    } = this.props;
    const { reference_type, requestId, checkId, addEmpRefModal } = this.state
    const orderedRequests = [...requests];
    const table = requests.length
      ? this.renderTable()
      : this.renderNoRequests();
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

    const handleRoleChange = (event) => {
      if (event.target.value === orderedRequests[this.state.pencilId].role || event.target.value === ''){
        this.setState({disableSaveButton: true})
      } else {
        this.setState({disableSaveButton: false})
      }
      this.setState({roleValue: event.target.value});
    }

    const handleRoleSubmit = async () => {
      const { orgId, candidateId } = this.props;
      const requestId = orderedRequests[this.state.pencilId].id;
      const test_acding = this.state.roleValue
      const url = getApiUrl("putRoleData")
        .replace(":org_id", orgId)
        .replace(":candidate_id", candidateId)
        .replace(":id", requestId)
      await httpFetch(url, { method: "PUT", body: JSON.stringify({"new_role": test_acding}) }).then(res => {
        this.setState({showEditRole: !this.state.showEditRole, disableSaveButton: true})
        this.props.refreshRequest(
          requestId,
          orgId,
          candidateId,
          () => {
            notify.show(
              "Role Changed Successfully",
              "success",
              NOTIFICATION_TIMEOUT
            );
          },
          () =>
            notify.show("Failed to refresh request.", "error", NOTIFICATION_TIMEOUT)
        );
      })
    }
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.showEditRole}
          style={customStyles}
          overlayClassName={{
            afterOpen: 'myOverlayClass_after-open'
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Edit Role</h3>
                <div onClick={this.editRoleFunc} className=" closeButtonContainer" >
                  <Icon color="#7F8DAA" type="close" />
                </div>
              </div>
              <div className="modal-body">
                <div className="body-message">
                  <div className="form-group row">
                    <label className="col-md-4 btn-label col-form-label">Enter Role Value</label>
                    <div className="col-md-8">
                      <label>
                        <input
                          name="role"
                          type="text"
                          placeholder="Enter Role Value"
                          value={this.state.roleValue}
                          onChange={handleRoleChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  color="green"
                  className="CandidateHeader__button"
                  onClick={handleRoleSubmit}
                  disabled={this.state.disableSaveButton}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        <Table className="CandidateRequestsTable__table candidateRequestNew CandidateRequestsTable_table_custom" >
          <thead>
            <tr>
              <th className="TableHeading candidate_heading3">Date</th>
              <th className="TableHeading candidate_heading2 text_overflow">Latest Organisation</th>
              <th className="TableHeading candidate_heading5 candidate_role_th">Role</th>
              <th className="TableHeading candidate_heading9 pr-13">Request ID</th>
              <th className="TableHeading candidate_heading">Status</th>
              <th className="TableHeading candidate_heading4 text-center2">Officer Name</th>
              <th className="TableHeading candidate_heading10">Last Updated</th>
              <th className="TableHeading candidate_heading6"></th>
              <th className={`TableHeading candidate_heading7 ${this.state.deleteButton ? ''  : "candidate_heading_delete_7"}`}></th>
              <th className="TableHeading candidate_heading8"></th>
            </tr>
          </thead>
          {table}
        </Table>
        { reference_type === 'employment_reference' &&
          <AddEmployementReference
            checkId={checkId}
            loading={this.props.saveEmpLoader}
            requestId={requestId}
            isModalOpen={addEmpRefModal}
            organisations={organisations}
            comingfromofficer={true}
            officer_firstname={candidate.firstName}
            officer_lastname={candidate.lastName}
            fetchOrganisations={filterOrganisation}
            closeReferenceModal={this.handleCloseModal}
            saveEmploymentReferenceData={saveEmploymentReference}
            getData={this.props.getRequest}
          />
        }
        { reference_type === 'personal_information' &&
          <AddPersonalInformation
            userId={userId}
            candidateId={candidateId}
            region={this.state.region}
            loading={loading}
            addressList={addresses}
            personalinfo={personalinfo}
            isModalOpen={addEmpRefModal}
            reference_type={reference_type}
            editPersonalInfo={savePersonalInfo}
            saveAddress={saveAddress}
            editAddress={editAddress}
            deleteAddress={deleteAddress}
            closeReferenceModal={this.handleCloseModal}
            myworkpass={false}
          />
        }
      </React.Fragment>
    );
  }
}

CandidateRequestsTable.propTypes = {
  orgId: PropTypes.number.isRequired,
  candidateId: PropTypes.number.isRequired,
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.object.isRequired,
      role: PropTypes.string.isRequired,
      employerName: PropTypes.string,
      status: PropTypes.oneOf([
        "complete",
        "declined",
        "pending",
        "submitted",
        "awaiting_response",
      ]).isRequired,
    })
  ).isRequired,
};

export default CandidateRequestsTable;
