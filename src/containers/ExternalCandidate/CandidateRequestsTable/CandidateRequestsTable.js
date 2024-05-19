import React, { Component } from "react";
import PropTypes from "prop-types";
import isUndefined from "lodash/isUndefined";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import RequestStatus from "components/RequestStatus";
import { Table, TableHeading, TableData } from "components/Table";
import RequestChecks from "../RequestChecks";
import { ROUTE_URL } from "containers/constants";
import isNull from "lodash/isNull";
import "./style.css";

class CandidateRequestsTable extends Component {
  state = {
    requestDropdowns: {},
  };

  componentWillMount() {
    const { requests } = this.props;
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
      if (this.props.location.state.redirectTo === 'requestNum') {
        elem = document.getElementById(this.props.location.state.requestId);
        this.scrollToBottom(elem);
      }
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
            [this.props.location.state.requestId]: !requestDropdowns[this.props.location.state.requestId],
          },
        };
      });
      elem.focus();
    }
  }

  /** @NOTE: toggle the right request dropdown */
  toggleDropdown = (id) => () => {
    this.setState(({ requestDropdowns }) => {
      return {
        requestDropdowns: {
          ...requestDropdowns,
          [id]: !requestDropdowns[id], // true = open, false = close
        },
      };
    });
  };

  renderTable() {
    const { requests, orgId, vOrgId, candidateId } = this.props;

    // this is horrible, but quickly make it so requests are ordered descending
    // const orderedRequests = [...requests];
    const orderedRequests = requests.filter(req => req.employer === orgId)

    return (
      <tbody>
        {orderedRequests.map((request, idx) => {
          const isDropdownOpen = this.state.requestDropdowns[request.id];
          const officerName = isNull(request.checker)
            ? "––"
            : `${request.checker.first_name} ${request.checker.last_name}`;
          const toggleDropdown = this.toggleDropdown(request.id);

          const reqID = request.id;
          const viewDataPath = ROUTE_URL.workPassViewRequestData
            .replace(':orgId', vOrgId)
            .replace(':candidateId', candidateId)
            .replace(':requestId', reqID)
            .replace(':vOrgId', orgId);
          const requestRow = [
            <tr key={`${request.id}-row`} id={reqID} ref={reqID}>
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
                {request.candidate.organisation.name}
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              >
                {request.role}
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
                className="CandidateRequestsTable__table-data cell-width"
                onClick={toggleDropdown}
              >
                {officerName}
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data cell-width"
              >
                <Link
                  to={viewDataPath}
                  className="CandidateRequestsTable__table-data--view-data cell-width candidate_view_data"
                >
                  View Data
                </Link>
              </TableData>
              <TableData
                className="CandidateRequestsTable__table-data"
                onClick={toggleDropdown}
              >
                <button className="CandidateRequestsTable__chevron">
                  {isDropdownOpen ? (
                    <Icon type="chevronUp" color="#498df0" />
                  ) : (
                    <Icon type="chevronDown" color="#498df0" />
                  )}
                </button>
              </TableData>
            </tr>,
          ];

          /** @NOTE: The dropdown is just another row that is visable on click*/
          if (isDropdownOpen) {
            requestRow.push(
              <RequestChecks
                requestId={request.id}
                orgId={orgId}
                vOrgId={vOrgId}
                candidateId={candidateId}
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
            colSpan="7"
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
    const { requests } = this.props;

    const table = requests.length
      ? this.renderTable()
      : this.renderNoRequests();

    return (
      <section className="CandidateRequestsTable">
        <h1 className="CandidateRequestsTable__header">Work Pass Requests</h1>

        <Table className="CandidateRequestsTable__table CandidateRequestsTable_table_custom">
          <thead>
            <tr>
              <TableHeading>Date</TableHeading>
              <TableHeading>Verifying Organisation</TableHeading>
              <TableHeading>Role</TableHeading>
              <TableHeading>Request ID</TableHeading>
              <TableHeading>Status</TableHeading>
              <TableHeading>Officer Name</TableHeading>
              <TableHeading></TableHeading>
              <TableHeading></TableHeading>
            </tr>
          </thead>
          {table}
        </Table>
      </section>
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
