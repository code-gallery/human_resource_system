import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import isNull from 'lodash/isNull'
import Avatar from 'components/$Avatar'
import { Table, TableData } from 'components/Table'
import './style.css'
import moment from 'moment'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Pagination from 'react-bootstrap/lib/Pagination'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/fontawesome-free-solid'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Assets from './assets'

/** :: candidate -> string */
const getName = ({ userId, email, firstName, lastName }) => isNull(userId)
  ? email
  : `${firstName} ${lastName}`

/** :: candidate -> string */
const getProfileImage = ({ profileImage }) => profileImage

/** :: request[] -> request */
const getLatestRequest = requests => requests
  .reduce((r1, r2) => r1.createdAt > r2.createdAt ? r1 : r2)

/** :: candidate -> string */
const getLatestRole = ({ requests }) => requests.length > 0
  ? getLatestRequest(requests).role
  : '––'
const getLatestOrg = ({ requests }) => requests.length > 0
  ? getLatestRequest(requests).employerName
  : '––'

/**::officer name */
const getLatestOfficerName = ({ requests }) => requests.length > 0
  ? getLatestRequest(requests).checker : '––'

/** :: candidate -> string */
const getLatestRequestDate = ({ requests }) => requests.length > 0
  ? getLatestRequest(requests).createdAt.format('YYYY-MM-DD')
  : '––'

const nudgeDate = ({ requests }) => {
  const dates = requests.filter(req => req.last_nudge != null)
  const date = new Date(Math.max(...dates.map(e => new Date(e.last_nudge))));
  return moment(date).format('YYYY-MM-DD')
}
const getAssignStatus = ({ assignStatus }) => assignStatus
/** :: candidate -> string */
const getRequestsStatus = ({ userId, requests }) => {
  const totalRequests = requests.length
  if (totalRequests === 0) {
    return {
      value: 'No Request',
      class: 'status-amber'
    }
  }

  if (isNull(userId)) {
    return {
      value: 'Invitation Pending',
      class: ''
    }
  }

  const finishedRequests = requests
    .filter(({ status }) => status === 'complete' || status === 'failed')
    .length

  const incomplete = totalRequests - finishedRequests
  if (!incomplete) {
    return {
      value: 'All Requests Completed',
      class: 'status-green'
    }
  }

  return {
    value: `${incomplete} Request${incomplete !== 1 ? 's' : ''} incomplete`,
    class: 'status-amber'
  }
}


/**
 @NOTE: This is presentational component is currently used for displaying both
 all work pass candidates and candidates that match a search result.
 @HACK: The Route component below is used instead of a <Link /> as cannot wrap
 a <tr> element with a anchor element. This was the cleanest way without passing
 the history prop from parent or using the React context api.
 */
const CandidatesTable = ({ candidates, title, organisationId, onSelectCandidates }) => {

  /*Created a new Array of objects of Candidates and sorted data based on latest requests in desc order*/
  const newSortedCandidates = candidates.candidates.map((candidate, idx) => {
    let properties = {
      id: candidate.id,
      user: candidate.user,
      candid_completed_checks: candidate.candid_completed_checks,
      candid_total_checks: candidate.candid_total_checks,
      "name": getName(candidate),
      "email": candidate.email,
      "profileImage": getProfileImage(candidate),
      "latestRole": getLatestRole(candidate),
      "latestRequest": getLatestRequestDate(candidate),
      "officerName": getLatestOfficerName(candidate),
      "orgName": getLatestOrg(candidate),
      "status": getRequestsStatus(candidate),
      "lastNudgeDate": nudgeDate(candidate),
      'assignStatus': getAssignStatus(candidate),
    };
    return properties
  })

  const candidateArr = [...newSortedCandidates];
  const [newArr, setNewArr] = useState(candidateArr)

  //Set organization filter box
  const allOrgNameFunc = (filteredCandidateArr) => {
    const orgName = filteredCandidateArr.map(item => {
      if (item.orgName && item.orgName !== "––") {
        return {
          value: item.orgName,
          label: item.orgName
        }
      }
    }).filter(Boolean)

    const allOrgName = [...new Map(orgName.map(item => [item.label, item])).values()]
    allOrgName.sort((a, b) => {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    let orgNameOptions = [
      {
        options: allOrgName
      }
    ];
    return orgNameOptions
  }

  //Set officer filter box
  const allOfficerNameFunc = (filteredCandidateArr) => {
    const officerName = filteredCandidateArr.map(item => {
      if (item.officerName?.first_name) {
        return {
          value: item.officerName.first_name + ' ' + item.officerName.last_name,
          label: item.officerName.first_name + ' ' + item.officerName.last_name
        }
      }
    }).filter(Boolean)

    const allOfficers = [...new Map(officerName.map(item => [item.label, item])).values()]
    allOfficers.sort((a, b) => {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    let allOfficersOption = [
      {
        options: allOfficers
      }
    ];
    return allOfficersOption
  }

  //Set status filter box
  const allOfficerStatusFunc = (filteredCandidateArr) => {
    const statusName = filteredCandidateArr.map(item => {
      if (item.status.value === "Invitation Pending") {
        return {
          value: "Invitation Pending",
          label: "Invitation Pending"
        }
      } else if (item.status.value === "All Requests Completed") {
        return {
          value: "All Requests Completed",
          label: "All Requests Completed"
        }
      } else if (item.status.value === "No Request") {
        return {
          value: "No Request",
          label: "No Request"
        }
      } else {
        return {
          value: "Requests Pending",
          label: "Requests Pending"
        }
      }
    }).filter(Boolean)

    const allStatus = [...new Map(statusName.map(item => [item.label, item])).values()]
    let allStatusOption = [
      {
        options: allStatus
      }
    ];
    return allStatusOption
  }

  const [allOfficerName, setAllOfficerName] = useState(allOfficerNameFunc(candidateArr))
  const [allOrgName, setAllOrgName] = useState(allOrgNameFunc(candidateArr))
  const [allOfficerStatus, setAllOfficerStatus] = useState(allOfficerStatusFunc(candidateArr))
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rangeDate, setRangeDate] = useState("Select...");
  const [clearLatestReq, setClearLatestReq] = useState(false)

  //call from latest request filter box
  const onChange = (dates) => {
    if (dates == null) {
      setStartDate(null);
      setEndDate(null);
      setRangeDate("Select...");
      setClearLatestReq(true)
      filterCandidateArr('latestReqClear')
    }
    let sDate
    let eDate
    if (dates) {
      let rangeValue = '1 day selected';
      let start = dates[0];
      let end = dates[1];
      if (start & end) {
        let Difference_In_Time = end.getTime() - start.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        rangeValue = (Difference_In_Days + 1) + ' days selected';
      }
      sDate = moment(start).isValid() ? moment(start).format('YYYY-MM-DD') : null
      eDate = moment(end).isValid() ? moment(end).format('YYYY-MM-DD') : null
      setStartDate(start);
      setEndDate(end);
      setRangeDate(rangeValue);
      if (start & end) {
        filterCandidateArr('latest_req', { "bothDate": true, "startDate": start, "endDate": end })
      }
    }
  };

  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [rangeDate2, setRangeDate2] = useState("Select...");
  const [clearLastNudge, setClearLastNudge] = useState(false)

  //call from last nudge filter box
  const onChange2 = (dates) => {
    if (dates == null) {
      setStartDate2(null);
      setEndDate2(null);
      setRangeDate2("Select...");
      setClearLastNudge(true)
      filterCandidateArr('lastNudgeClear')
    }
    let sDate
    let eDate
    if (dates) {
      let rangeValue = '1 day selected';
      let start = dates[0];
      let end = dates[1];

      if (start & end) {
        let Difference_In_Time = end.getTime() - start.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        rangeValue = (Difference_In_Days + 1) + ' days selected';
      }
      sDate = moment(start).isValid() ? moment(start).format('YYYY-MM-DD') : null
      eDate = moment(end).isValid() ? moment(end).format('YYYY-MM-DD') : null
      setStartDate2(start);
      setEndDate2(end);
      setRangeDate2(rangeValue);
      if (start & end) {
        filterCandidateArr('last_nudge', { "bothDate": true, "startDate": start, "endDate": end })
      }
    }
  };

  const [isClear, setIsClear] = useState(false)

  const myRefnameOrg= useRef(null);
  const myRefnameOfficer= useRef(null);
  const myRefnameStatus= useRef(null);

  const cancelData = (e, name) => {
    if(isClear){
      if(name === 'orgName'){
        setPreSelectOrgName([])
        setSelectedOrgArr([])
        filterCandidateArr('orgNameClear')
      } else if(name === 'officerName'){
        setPreSelectOfficerName([])
        setSelectedOfficerArr([])
        filterCandidateArr('officerNameClear')
      } else if(name === 'status'){
        setPreSelectStatusName([])
        setSelectedStatusArr([])
        filterCandidateArr('statusClear')
      }      
      setIsClear(false)    
      return
    }
    myRefnameOrg.current.state.inputValue = ''
    myRefnameOfficer.current.state.inputValue = ''
    myRefnameStatus.current.state.inputValue = ''
    myRefnameOrg.current.state.isOpen = false;
    myRefnameOfficer.current.state.isOpen = false;
    myRefnameStatus.current.state.isOpen = false;
    
    let preSelectOrg = []
    let preSelectOrg2 = [];
    if (candidates.requestArr.latest_organization != "null") {
      preSelectOrg = [candidates.requestArr.latest_organization]
      preSelectOrg2 = [...allOrgNameFunc(candidateArr)[0].options]
      setPreSelectOrgName(preSelectOrg2)
      setSelectedOrgArr(preSelectOrg)
    } else {
      setPreSelectOrgName([])
      setSelectedOrgArr([])
    }

    let preSelectOfficer = []
    let preSelectOfficer2 = [];
    if (candidates.requestArr.officer_name != "null") {
      preSelectOfficer = [candidates.requestArr.officer_name]
      preSelectOfficer2 = [...allOfficerNameFunc(candidateArr)[0].options]
      setPreSelectOfficerName(preSelectOfficer2)
      setSelectedOfficerArr(preSelectOfficer)
    } else {
      setPreSelectOfficerName([])
      setSelectedOfficerArr([])
    }

    let preSelectStatus = []
    let preSelectStatus2 = [];
    if (candidates.requestArr.candidate_status != "null") {
      preSelectStatus = [candidates.requestArr.candidate_status]
      preSelectStatus2 = [...allOfficerStatusFunc(candidateArr)[0].options]
      setPreSelectStatusName(preSelectStatus2)
      setSelectedStatusArr(preSelectStatus)
    } else {
      setPreSelectStatusName([])
      setSelectedStatusArr([])
    }
  }

  //organization prefill
  let preSelectOrg = []
  let preSelectOrg2 = [];
  if (candidates.requestArr.latest_organization != "null") {
    preSelectOrg = [candidates.requestArr.latest_organization]
    preSelectOrg2 = [...allOrgNameFunc(candidateArr)[0].options]
  }
  const [preSelectOrgName, setPreSelectOrgName] = useState(preSelectOrg2)

  //officer prefill
  let preSelectOfficer = []
  let preSelectOfficer2 = [];
  if (candidates.requestArr.officer_name != "null") {
    preSelectOfficer = [candidates.requestArr.officer_name]
    preSelectOfficer2 = [...allOfficerNameFunc(candidateArr)[0].options]
  }
  const [preSelectOfficerName, setPreSelectOfficerName] = useState(preSelectOfficer2)

  //status prefill
  let preSelectStatus = []
  let preSelectStatus2 = [];
  if (candidates.requestArr.candidate_status != "null") {
    preSelectStatus = [candidates.requestArr.candidate_status]
    preSelectStatus2 = [...allOfficerStatusFunc(candidateArr)[0].options]
  }
  const [preSelectStatusName, setPreSelectStatusName] = useState(preSelectStatus2)

  //Latest request prefill
  const reqStartDate = candidates.requestArr.latest_request_start
  const reqEndDate = candidates.requestArr.latest_request_end
  if (reqStartDate !== "null" && startDate === null && !clearLatestReq) {
    setStartDate(new Date(reqStartDate))
    setEndDate(new Date(reqEndDate))
    let rangeValue = '1 day selected';
    if (reqStartDate && reqEndDate !== 'null') {
      let Difference_In_Time = new Date(reqEndDate) - new Date(reqStartDate);
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      rangeValue = (Difference_In_Days + 1) + ' days selected'
      if (isNaN((Difference_In_Days + 1))) {
        rangeValue = '1 day selected';
      }
    }
    setRangeDate(rangeValue);
  }

  //last nudge prefill
  const nudgeStartDate = candidates.requestArr.last_nudge_start
  const nudgeEndDate = candidates.requestArr.last_nudge_end
  if (nudgeStartDate !== "null" && startDate2 === null && !clearLastNudge) {
    setStartDate2(new Date(nudgeStartDate))
    setEndDate2(new Date(nudgeEndDate))
    let rangeValue = '1 day selected';
    if (nudgeStartDate && nudgeEndDate !== 'null') {
      let Difference_In_Time = new Date(nudgeEndDate) - new Date(nudgeStartDate);
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      rangeValue = (Difference_In_Days + 1) + ' days selected'
      if (isNaN((Difference_In_Days + 1))) {
        rangeValue = '1 day selected';
      }
    }
    setRangeDate2(rangeValue)
  }
  const [selectedOrgArr, setSelectedOrgArr] = useState(preSelectOrg)
  const [selectedOfficerArr, setSelectedOfficerArr] = useState(preSelectOfficer)
  const [selectedStatusArr, setSelectedStatusArr] = useState(preSelectStatus)

  //Set state when change on filter data
  const setFilteredData = (e, name) => {
    if(!e.length){
      setIsClear(true)
      return
    }
    const arr = []
    const arr2 = []
    e.map(data => {
      arr.push(data.value)
      arr2.push({ value: data.value, label: data.value })
    })
    if (name === "orgName") {
      setSelectedOrgArr(arr)
      setPreSelectOrgName(arr2)
    }
    else if (name === "officerName") {
      setSelectedOfficerArr(arr)
      setPreSelectOfficerName(arr2)
    }
    else if (name === "status") {
      setSelectedStatusArr(arr)
      setPreSelectStatusName(arr2)
    }
  }

  //Call API when change on filter data
  const filterCandidateArr = (clearFieldName, dateObj) => {
    const {
      search,
      latest_organization,
      candidate_status,
      officer_name,
      latest_request_start,
      latest_request_end,
      last_nudge_start,
      last_nudge_end
    } = candidates.requestArr
    const filterFields = {}

    let org_filter = false;
    let officer_filter = false;
    let status_filter = false;
    let latest_request_filter = false;
    let latest_nudge_filter = false;

    //call API when search
    if (search != "null") {
      filterFields.search = search
    }

    //call API when change organization
    if (true) {
      let arr = []
      preSelectOrgName.map(data => {
        arr.push(data.value)
      })
      if (latest_organization === 'null') {
        if (selectedOrgArr.length) {
          org_filter = true;
        }
      }
      if (latest_organization !== 'null') {
        let preArr = [];
        allOrgName[0].options.map(data => {
          preArr.push(data.value)
        })
        if (!preArr.every((value, index) => value === arr[index])) {
          org_filter = true;
        }
      }
      if (arr.length > 0)
        arr = arr.join(",");
      else
        arr = null;
      filterFields.latest_organization = arr
    }

    //call API when change officer
    if (true) {
      let arr = []
      preSelectOfficerName.map(data => {
        arr.push(data.value)
      })
      if (officer_name === 'null') {
        if (selectedOfficerArr.length) {
          officer_filter = true;
        }
      }
      if (officer_name !== 'null') {
        let preArr = [];
        allOfficerName[0].options.map(data => {
          preArr.push(data.value)
        })
        if (!preArr.every((value, index) => value === arr[index])) {
          officer_filter = true;
        }
      }
      if (arr.length > 0)
        arr = arr.join(",");
      else
        arr = null;
      filterFields.officer_name = arr
    }

    //call API when change status
    if (true) {
      let arr = []
      preSelectStatusName.map(data => {
        arr.push(data.value)
      })
      if (candidate_status === 'null') {
        if (selectedStatusArr.length) {
          status_filter = true;
        }
      }
      if (candidate_status !== 'null') {
        let preArr = [];
        allOfficerStatus[0].options.map(data => {
          preArr.push(data.value)
        })
        if (!preArr.every((value, index) => value === arr[index])) {
          status_filter = true;
        }
      }
      if (arr.length > 0)
        arr = arr.join(",");
      else
        arr = null;
      filterFields.candidate_status = arr
    }

    if (true) {
      let startDateVal = startDate;
      // let endDateVal = endDate;
      let endDateVal
     
      if(dateObj){
        if(new Date(dateObj.startDate).getTime() === new Date(dateObj.endDate).getTime()){
          endDateVal = null
        } else {
          endDateVal = dateObj.endDate
        }
      } else if(JSON.stringify(endDate) === 'null'){
        endDateVal = null;
      } else {
        if(new Date(startDate).getTime() === new Date(endDate).getTime()){
          endDateVal = null
        } else {
          endDateVal = endDate;
        }
      }

      if (typeof dateObj === 'object' && dateObj.bothDate === true) {
        startDateVal = dateObj.startDate;
        // endDateVal = dateObj.endDate;
      }
      if (latest_request_start === 'null') {
        if (startDateVal) {
          filterFields.latest_request_start = startDateVal
          latest_request_filter = true;
        }
        else
          filterFields.latest_request_start = null;
      }
      if (latest_request_start !== 'null') {
        if (startDateVal) {
          if (startDateVal !== latest_request_start) {
            filterFields.latest_request_start = startDateVal;
            latest_request_filter = true;
          }
          else
            filterFields.latest_request_start = latest_request_start;
        }
      }
      let prev_request_end = null
      if (latest_request_end === 'null') {
        if (endDateVal) {
          filterFields.latest_request_end = endDateVal
          latest_request_filter = true;
        }
        else {
            filterFields.latest_request_end = null;
        }
        prev_request_end = null
      }
      if (latest_request_end !== 'null') {
        if (endDateVal) {
          if (endDateVal !== latest_request_end) {
            filterFields.latest_request_end = endDateVal;
            latest_request_filter = true;
          }
          else {
            filterFields.latest_request_end = latest_request_end;
          }
        }
        prev_request_end = latest_request_end
      }
      if(clearFieldName === 'last_nudge'){
        filterFields.latest_request_start = startDate
        if(JSON.stringify(endDate) === 'null'){
          filterFields.latest_request_end = null
        } else {
          filterFields.latest_request_end = endDate
        }
      }
      if(new Date(latest_request_start).getTime() === new Date(startDateVal).getTime() && new Date(prev_request_end).getTime() === new Date(endDateVal).getTime()){
        latest_request_filter = false;
      }
    }

    //call API when change last nudge
    if (true) {
      let startDateVal = startDate2;
      // let endDateVal = endDate;
      let endDateVal
      if(dateObj){
        if(new Date(dateObj.startDate).getTime() === new Date(dateObj.endDate).getTime()){
          endDateVal = null
        } else {
          endDateVal = dateObj.endDate
        }
      } else if(JSON.stringify(endDate2) === 'null'){
        endDateVal = null;
      } else {
        if(new Date(startDate2).getTime() === new Date(endDate2).getTime()){
          endDateVal = null
        } else {
          endDateVal = endDate2;
        }
      }
      if (typeof dateObj === 'object' && dateObj.bothDate === true) {
        startDateVal = dateObj.startDate;
      }
      if (last_nudge_start === 'null') {
        if (startDateVal) {
          filterFields.last_nudge_start = startDateVal
          latest_nudge_filter = true;
        }
        else
          filterFields.last_nudge_start = null;
      }
      if (last_nudge_start !== 'null') {
        if (startDateVal) {
          if (startDateVal !== last_nudge_start) {
            filterFields.last_nudge_start = startDateVal;
            latest_nudge_filter = true;
          }
          else
            filterFields.last_nudge_start = last_nudge_start;
        }
      }

      let prev_nudge_end = null
      if (last_nudge_end === 'null') {
        if (endDateVal) {
          filterFields.last_nudge_end = endDateVal
          latest_nudge_filter = true;
        }
        else
          filterFields.last_nudge_end = null;
      }
      if (last_nudge_end !== 'null') {
        if (endDateVal) {
          if (endDateVal !== last_nudge_end) {
            filterFields.last_nudge_end = endDateVal;
            latest_nudge_filter = true;
          }
          else
            filterFields.last_nudge_end = last_nudge_end;
        }
        prev_nudge_end = last_nudge_end
      }
      if(clearFieldName === 'latest_req'){
        filterFields.last_nudge_start = startDate2
        if(JSON.stringify(endDate2) === 'null'){
          filterFields.last_nudge_end = null
        } else {
          filterFields.last_nudge_end = endDate2
        }
      }
      if(new Date(last_nudge_start).getTime() === new Date(startDateVal).getTime() && new Date(prev_nudge_end).getTime() === new Date(endDateVal).getTime()){
        latest_nudge_filter = false;
      }
    }
    if (clearFieldName === 'latestReqClear') {
      filterFields.latest_request_start = null;
      filterFields.latest_request_end = null;
      latest_request_filter = true
    }
    if (clearFieldName === 'lastNudgeClear') {
      filterFields.last_nudge_start = null;
      filterFields.last_nudge_end = null;
      latest_nudge_filter = true;
    }

   
    if(clearFieldName === 'orgNameClear'){	
      if (latest_organization !== 'null') {
       filterFields.latest_organization = null	
       org_filter = true	
      } else {
        org_filter = false	
      }
    }	
    if(clearFieldName === 'officerNameClear'){	
      if (officer_name  !== 'null') {
        filterFields.officer_name = null	
        officer_filter = true	
      } else {
        officer_filter = false	
      }
    }	
    if(clearFieldName === 'statusClear'){	
      if (candidate_status   !== 'null') {
        filterFields.candidate_status = null	
        status_filter = true	
      } else {
        status_filter = false	
      }
    }

    if (org_filter || officer_filter || status_filter || latest_request_filter || latest_nudge_filter)
      onSelectCandidates(filterFields)
  }

  //Call API On Pagination
  const [currentPage, setCurrentPage] = useState(parseInt(candidates.page))
  const onSelectPage = (page) => {
    setCurrentPage(page)
    onSelectCandidates({ page: page })
  }

  const lastPage = candidates.last_page

  let GroupHeading = props => (
    <div style={{ "text-align": "right" }} className="dropdownBtn">
      <button style={{'width': '70px'}} onClick={e => filterCandidateArr(e)}>OK</button>
      <button style={{'width': '70px'}} onClick={e => cancelData(e)}>Cancel</button>
    </div>
  );


  return (
    <section className="CandidatesTable df">
      <div className="CandidatesTable__header_container df">
        <h1 className="CandidatesTable__header">{title}</h1>
        {newArr.length ?
          <Pagination
            prev
            next
            ellipsis
            boundaryLinks
            maxButtons={4}
            activePage={currentPage}
            items={lastPage}
            onSelect={onSelectPage}
          />
          : " "}
      </div>

      <Table className="CandidatesTable__table candidate_table_layout">
        <thead>
          <tr className="candidate_row_vt candidate_row_heading">
            <th className="TableHeading candidate-image">
              <div className="candidate-heading-container candidate-heading-app">
                <img src={Assets.mobile} alt="mobile" />
                <span>Has<br />App</span>
              </div>
            </th>
            <th className="TableHeading candidate-name">
              <div className="candidate-heading-container candidate-heading-name">
                <img src={Assets.name} alt="name" />
                <span>Name</span>
              </div>
            </th>
            <th className="TableHeading candidate-org">
              <div className="candidate-heading-container">
                <img src={Assets.latest_organization} alt="latest_organization" />
                <span>Latest Organisation</span>
              </div>
            </th>
            <th className="TableHeading candidate-role">
              <div className="candidate-heading-container candidate-heading-role">
                <img src={Assets.latest_role} alt="latest_role" />
                <span>Latest Role</span>
              </div>
            </th>
            <th className="TableHeading candidate-request">
              <div className="candidate-heading-container">
                <img src={Assets.latest_request} alt="latest_request" />
                <span>Latest Request</span>
              </div>
            </th>
            <th className="TableHeading candidate-officer-name">
              <div className="candidate-heading-container">
                <img src={Assets.officer_name} alt="officer_name" />
                <span>Officer Name</span>
              </div>
            </th>
            <th className="TableHeading candidate-status">
              <div className="candidate-heading-container">
                <img src={Assets.status} alt="status" />
                <span>Status</span>
              </div>
            </th>
            <th className="TableHeading candidate-last-nudge">
              <div className="candidate-heading-container candidate-heading-nudge">
                <img src={Assets.last_nudge} alt="last_nudge" />
                <span>Last Nudge</span>
              </div>
            </th>
            {/* <th className="TableHeading candidate-ratio"></th> */}
            <th className="TableHeading candidate-view">
              <div className="candidate-heading-container candidate-heading-last">
                <img src={Assets.last_activity} alt="last_activity" />
                <span>Last <br />Activity</span>
              </div>
            </th>
          </tr>
        </thead>

        <Route
          path="/"
          render={({ history }) => (
            <tbody>
              <tr className="candidate-search">
                <td></td>
                <td></td>
                <td className="org-name persona">
                  <ReactMultiSelectCheckboxes
                    value={preSelectOrgName}
                    options={allOrgName}
                    onMenuClose={e => cancelData(e, 'orgName')}
                    isClearable={true}
                    onChange={e => setFilteredData(e, 'orgName')}
                    components={{ GroupHeading }}
                    classNamePrefix="gm"
                    ref={myRefnameOrg}
                  />
                </td>
                <td></td>
                <td>
                  <div className="calender_sec">
                    <DatePicker
                      selected={startDate}
                      value={rangeDate}
                      selectsRange
                      startDate={startDate}
                      endDate={endDate}
                      onChange={onChange}
                      isClearable={true}
                      shouldCloseOnSelect={false}
                      popperProps={{
                        positionFixed: true
                      }}
                      onCalendarClose={e => filterCandidateArr('latest_req', e)}
                      maxDate={new Date()}
                    />
                  </div>
                </td>
                <td className="officer-name persona">
                  <ReactMultiSelectCheckboxes
                    value={preSelectOfficerName}
                    options={allOfficerName}
                    onMenuClose={e => cancelData(e, 'officerName')}
                    isClearable={true}
                    onChange={e => setFilteredData(e, 'officerName')}
                    components={{ GroupHeading }}
                    classNamePrefix="gm"
                    ref={myRefnameOfficer}
                  />
                </td>
                <td className="officer-name persona">
                  <ReactMultiSelectCheckboxes
                    value={preSelectStatusName}
                    options={allOfficerStatus}
                    onMenuClose={(e) => cancelData(e, 'status')}
                    isClearable={true}
                    onChange={e => setFilteredData(e, 'status')}
                    components={{ GroupHeading }}
                    classNamePrefix="gm"
                    ref={myRefnameStatus}
                  />
                </td>
                <td className="calender_sec nudge_calender_sec">
                  <DatePicker
                    selected={startDate2}
                    value={rangeDate2}
                    selectsRange
                    startDate={startDate2}
                    endDate={endDate2}
                    onChange={onChange2}
                    isClearable={true}
                    shouldCloseOnSelect={false}
                    popperProps={{
                      positionFixed: true
                    }}
                    onCalendarClose={e => filterCandidateArr('last_nudge', e)}
                    maxDate={new Date()}
                  />
                </td>
                <td></td>
                {/* <td></td> */}
              </tr>


              {
                newArr.map((candidate, idx) => {
                  const completed_checks = candidate.candid_completed_checks
                  const total_checks = candidate.candid_total_checks

                  const isFirst = idx === 0
                  let date = moment(candidate.latestRequest)
                  let lastNudge = moment(candidate.lastNudgeDate)
                  let officerName = isNull(candidate.officerName) || candidate.officerName === "––" ? '––' : `${candidate.officerName.first_name} ${candidate.officerName.last_name}`
                  const assignStatus = candidate.status.value === 'No Request' ? false : candidate.assignStatus
                  return (
                    <tr
                      className="CandidatesTable__table-row candidaite-dashboard-row"
                      key={candidate.id}
                      onClick={() => (
                        history.push(`/organisations/${organisationId}/candidates/${candidate.id}`)
                      )}
                    >
                      <TableData className="CandidatesTable__table-data" top={isFirst}>
                        <span className="CandidatesTable__avatar CandidatesTable__person">
                          <Avatar imgUrl={candidate.profileImage} alt={candidate.name} status={assignStatus} />
                        </span>
                      </TableData>

                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        <div className="mobile_font_awesome_div">
                          <span className="mobile_font_awesome">{candidate.user?.mobile_address && <FontAwesomeIcon icon={faMobileAlt} />}</span>
                          <span>{candidate.name}</span>
                        </div>
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        {candidate.orgName}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        {candidate.latestRole}
                      </TableData>

                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        {date.isValid() ? date.format("MMM Do YYYY") : '––'}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        {officerName}
                      </TableData>

                      <TableData
                        className={`${candidate.status.class} CandidatesTable__table-data CandidatesTable__table-data--status cell-width`}
                        top={isFirst}
                      >
                        {candidate.status.value}
                      </TableData>

                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        {lastNudge.isValid() ? lastNudge.format("MMM Do YYYY") : ''}
                      </TableData>

                      <TableData className="CandidatesTable__table-data cell-width" top={isFirst}>
                        <div className="arrow_circle_container_div">
                          <div className="progress_container">
                            {total_checks !== 0 &&
                              <CircularProgressbar
                                value={(completed_checks / total_checks) * 100}
                                text={completed_checks + '/' + total_checks}
                                styles={{
                                  path: {
                                    stroke: `${(completed_checks / total_checks) === 1 ? `rgba(45, 182, 45, ${(completed_checks / total_checks) + 1})` : `rgba(128, 128, 128, ${(completed_checks / total_checks) + 1})`}`,
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
                        </div>
                      </TableData>

                      {/* <TableData
                        className="CandidatesTable__table-data CandidatesTable__table-data--view text-center"
                        top={isFirst}
                      >
                        View
                      </TableData> */}
                    </tr>
                  )
                })}
            </tbody>
          )}
        />
      </Table>
      {newArr.length ?
          <div style={{display: 'flex'}}>
            <div style={{marginLeft: 'auto'}}>
              <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                maxButtons={4}
                activePage={currentPage}
                items={lastPage}
                onSelect={onSelectPage}
              />
            </div>
          </div>
        : " "}
    </section>
  )
}

CandidatesTable.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    requests: PropTypes.array.isRequired,
    userId: PropTypes.number,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })).isRequired,
  title: PropTypes.string,
  organisationId: PropTypes.number.isRequired
}

CandidatesTable.defaultProps = {
  title: 'Candidates'
}

export default CandidatesTable
