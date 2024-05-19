import React, { useState } from "react";
import moment from 'moment';
import Icon from 'components/Icon';
import Button from "components/Button";
import Modal from 'components/Modal';
import AliceCarousel from 'react-alice-carousel';
import UploadDocumentModal from './UploadDocumentModal/UploadDocumentModal.js';
import ViewDocumentModal from './ViewDocumentModal/ViewDocumentModal.js';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import AddEmployementReference from '../../../AddReference/AddEmployementReference'
import NotesHistory from './NotesHistory/NotesHistory.js';
import EmpRefData from './EmpRefData';
import { gapArray } from '../../../../utils/reference'

const EmpReference = (props) => {

  const [ modalOpen, setModalOpen ] = useState(false)

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const {
    orgId,
    checkId,
    requestId,
    candidateId,
    employment_reference,
    candidateName,
    organisations,
    refOption
  } = props
  const resetReferencesList = employment_reference.filter((ref) => {
    let itm = JSON.parse(ref.work_pass_check_type);
    return (
      itm.type !== undefined && itm.RefrenceType !== undefined && itm.RefrenceType !== 'Work_Gaps'
    )
  })
  const orderedresetReferencesList = resetReferencesList.sort((a, b) => {
    let date1 = JSON.parse(a.work_pass_check_type).details.dateto;
    let date2 = JSON.parse(b.work_pass_check_type).details.dateto;
    date1 = date1.split("/");
    date2 = date2.split("/");
    date1 = new Date(Date.UTC(date1[2], date1[1] - 1, date1[0]));
    date2 = new Date(Date.UTC(date2[2], date2[1] - 1, date2[0]));
    var x = moment(date1);
    var y = moment(date2);
    if (x === y) {
      return 0;
    }
    if (isNaN(x) || x < y) {
      return 1;
    }
    if (isNaN(y) || x > y) {
      return -1;
    }
  });

  const notResetReferencesList = employment_reference.filter((ref) => {
    let itm = JSON.parse(ref.work_pass_check_type);
    return (
      itm.type === undefined && itm.RefrenceType !== undefined && itm.RefrenceType !== 'Work_Gaps'
    )
  })

  const orderedNotResetReferencesList = notResetReferencesList.sort((a, b) => {
    let date1 = JSON.parse(a.work_pass_check_type).details.dateto;
    let date2 = JSON.parse(b.work_pass_check_type).details.dateto;
    date1 = date1.split("/");
    date2 = date2.split("/");
    date1 = new Date(Date.UTC(date1[2], date1[1] - 1, date1[0]));
    date2 = new Date(Date.UTC(date2[2], date2[1] - 1, date2[0]));
    var x = moment(date1);
    var y = moment(date2);
    if (x === y) {
      return 0;
    }
    if (isNaN(x) || x < y) {
      return 1;
    }
    if (isNaN(y) || x > y) {
      return -1;
    }
  });
  let listToDisplay = [ ...orderedresetReferencesList, ...orderedNotResetReferencesList ]

  const addedYear = parseInt(refOption.substring(0, 1))
  // code for blank dateto
  const dateArray = listToDisplay.map(a => {
    const details = JSON.parse(a.work_pass_check_type).details
    return {
      from: new Date(moment(details.datefrom, 'DD/MM/YYYY').format('MM/DD/YYYY')).getTime(),
      to: new Date(moment(details.dateto, 'DD/MM/YYYY').format('MM/DD/YYYY')).getTime()
    }
  })
  const gaps = gapArray(dateArray, addedYear)

  const name = candidateName.split(' ')
  const officer_firstname = name[0] ? name[0] : ''
  const officer_lastname = name[1] ? name[1] : ''
  return (
    <div className="container-fluid emp-reference">
      <div className="row">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6">Employment References</div>
              <div className="col-md-6 noPadding">
                { // props.check_status === 'pending' &&
                  <Button
                    className="Button add-reference-btn"
                    color="green"
                    onClick={ () => setModalOpen(true)}
                    disabled={!props.isEditable }
                  >
                    ADD
                  </Button>
                }
              </div>
            </div>
            <div className="card-body">
              {listToDisplay.map((item, idx) => {
                var isData = true
                var itm = JSON.parse(item.work_pass_check_type);
                var reference_id = item.id
                var refCloseStatus = item.response_detail.toLowerCase() === 'closed' ? 'OFFICER RECEIVED' : item.response_detail
                var type = itm.RefrenceType;
                var isReset = itm.type !== undefined ? true : false
                var docnum = itm.documentNumber !== undefined ? itm.documentNumber : 0
                var refDetails = JSON.parse(item.work_pass_check_type).details;
                var softDeleteData = itm.softdelete
                var ref_soft_deleted = softDeleteData === 'success' ? true : false
                var hasSplashData = JSON.parse(item.work_pass_check_type).hasOwnProperty('splashdata');
                var splashdata = JSON.parse(item.work_pass_check_type).splashdata;
                var refVersion = JSON.parse(item.work_pass_check_type).referenceVersion;
                var response = item.response_status.toUpperCase();
                var officerAdded = refDetails.comingfromofficer ? true : false
                var refGeneratedFrom = (refDetails.hasOwnProperty('comingfrom') && refDetails.comingfrom === 'web') ? 'WEB' : officerAdded ? 'OFFICER ADDED' : 'MOBILE';
                var refee_type = ''
                var refee_orgname = ''
                var refee_positionheldcan = ''
                var refee_positionheldyou = ''
                var today = new Date()
                today.setHours(0, 0, 0, 0)
                var todate = moment(refDetails.dateto, "DD/MM/YYYY").format("MM/DD/YYYY")
                var ref_to = new Date(todate).getTime() === today.getTime() ? 'Present date' : 'Reference To'
                var refee_datefrom = (splashdata !== undefined && splashdata.datefrom !== '') ? moment(splashdata.datefrom, 'DD-MM-YYYY').format('DD/MM/YYYY') : refDetails.datefrom
                var refee_dateto = (splashdata !== undefined && splashdata.dateto !== '') ? moment(splashdata.dateto, 'DD-MM-YYYY').format('DD/MM/YYYY') : refDetails.dateto
                var refee_firstname = splashdata !== undefined && splashdata.firstname !== '' ? splashdata.firstname : refDetails.refree_firstname
                var refee_lastname = splashdata !== undefined && splashdata.lastname !== '' ? splashdata.lastname : refDetails.refree_lastname
                var name = candidateName.split(' ')
                var refee_candidatfname = splashdata !== undefined && splashdata.candidatefirstname !== '' ? splashdata.candidatefirstname : name[0]
                var refee_candidatlname = splashdata !== undefined && splashdata.candidatelastname !== '' ? splashdata.candidatelastname : name[1]
                var position = refDetails.position_applicant ? refDetails.position_applicant : ''
                var job_letter = ''
                var responsive = ''
                var officerData = {}
                var filterOfficerData = props.officerData.filter(res => res.updated_by == reference_id)
                if (filterOfficerData.length) {
                  officerData = JSON.parse(filterOfficerData[0].work_pass_check_type)
                }
                var refData = [
                  {
                    title: 'Reference From',
                    value: refDetails.datefrom,
                    refree_res: refee_datefrom,
                    officer_res: {
                      type: 'date',
                      value: officerData.datefrom ? officerData.datefrom : officerAdded ? refDetails.datefrom : '',
                      edit_value: officerData.datefrom ? officerData.datefrom : refDetails.datefrom,
                      name: 'datefrom'
                    },
                    officer_ref: 'first_name'
                  },
                  {
                    title: ref_to,
                    value: refDetails.dateto,
                    refree_res: refee_dateto,
                    officer_res: {
                      type: 'date',
                      value: officerData.dateto ? officerData.dateto : officerAdded ? refDetails.dateto : '',
                      edit_value: officerData.dateto ? officerData.dateto : refDetails.dateto,
                      name: 'dateto'
                    },
                    officer_ref: 'last_name'
                  },
                  {
                    title: itm.RefrenceType === 'self_employment_reference' ? 'Company Accountant Name' :'Referee Name',
                    value: itm.RefrenceType === 'self_employment_reference' ? refDetails.refree_firstname : refDetails.refree_firstname + ' ' + refDetails.refree_lastname,
                    refree_res: itm.RefrenceType === 'self_employment_reference' ? refee_firstname + ' ' : refee_firstname + ' ' + refee_lastname,
                    officer_res: {
                      type: 'text',
                      value: officerData.refree_name ? officerData.refree_name : officerAdded ? itm.RefrenceType === 'self_employment_reference' ? refDetails.refree_firstname : refDetails.refree_firstname + ' ' + refDetails.refree_lastname : '',
                      edit_value: officerData.refree_name ? officerData.refree_name : itm.RefrenceType === 'self_employment_reference' ? refDetails.refree_firstname : refDetails.refree_firstname + ' ' + refDetails.refree_lastname,
                      name: 'refree_name'
                    },
                    officer_ref: 'email'
                  },
                  {
                    title: 'Candidate Name',
                    value: candidateName,
                    refree_res: refee_candidatfname + ' ' + refee_candidatlname,
                    officer_res: {
                      type: 'text',
                      value: officerData.candidate_name ? officerData.candidate_name : officerAdded ? candidateName : '',
                      edit_value: officerData.candidate_name ? officerData.candidate_name : candidateName,
                      name: 'candidate_name'
                    },
                    officer_ref: 'contact_no'
                  },
                  {
                    title: 'Referee Email',
                    value: refDetails.refreeemail,
                    refree_res: refDetails.refreeemail,
                    officer_res: {
                      type: 'email',
                      value: officerData.refree_email ? officerData.refree_email : officerAdded ? refDetails.refreeemail : '',
                      edit_value: officerData.refree_email ? officerData.refree_email : refDetails.refreeemail,
                      name: 'refree_email'
                    }
                  }
                ]
                if (itm.RefrenceType === 'employment_reference') {
                  refee_type = (splashdata !== undefined && splashdata.referencetype !== '') ? splashdata.referencetype : 'EMPLOYMENT'
                  refee_orgname = (splashdata !== undefined && splashdata.organisationname !== '') ? splashdata.organisationname : refDetails.organisation_name
                  refee_positionheldcan = (splashdata !== undefined && splashdata.positionheldcandidate !== '') ? splashdata.positionheldcandidate : refDetails.position_applicant
                  refee_positionheldyou = (splashdata !== undefined && splashdata.positionheldyou !== '') ? splashdata.positionheldyou : refDetails.position_refree
                  refData.unshift(
                    {
                      title: 'Type',
                      value: 'EMPLOYMENT',
                      refree_res: refee_type,
                      officer_res: {
                        type: 'text',
                        value: officerData.ref_type ? officerData.ref_type : officerAdded ? 'EMPLOYMENT' : '',
                        edit_value: officerData.ref_type ? officerData.ref_type : 'EMPLOYMENT',
                        name: 'ref_type'
                      },
                      isbold: true,
                      officer_ref: 'organisation'
                    }
                  )
                  refData.push(
                    {
                      title: 'Organisation Name',
                      value: refDetails.organisation_name,
                      refree_res: refee_orgname,
                      officer_res: {
                        type: 'text',
                        value: officerData.organisation_name ? officerData.organisation_name : officerAdded ? refDetails.organisation_name : '',
                        edit_value: officerData.organisation_name ? officerData.organisation_name : refDetails.organisation_name,
                        name: 'organisation_name'
                      }
                    },
                    {
                      title: 'Contact Phone No.',
                      value: refDetails.contact_phone,
                      refree_res: refDetails.contact_phone,
                      officer_res: {
                        type: 'text',
                        value: officerData.contact_phone ? officerData.contact_phone : officerAdded ? refDetails.contact_phone : '',
                        edit_value: officerData.contact_phone ? officerData.contact_phone : refDetails.contact_phone,
                        name: 'contact_phone'
                      }
                    },
                    {
                      title: 'Position Held By Applicant',
                      value: refDetails.position_applicant,
                      refree_res: refee_positionheldcan,
                      officer_res: {
                        type: 'text',
                        value: officerData.position_applicant ? officerData.position_applicant : officerAdded ? refDetails.position_applicant : '',
                        edit_value: officerData.position_applicant ? officerData.position_applicant : refDetails.position_applicant,
                        name: 'position_applicant'
                      }
                    },
                    {
                      title: 'Position Held By Referee',
                      value: refDetails.position_refree,
                      refree_res: refee_positionheldyou,
                      officer_res: {
                        type: 'text',
                        value: officerData.position_refree ? officerData.position_refree : officerAdded ? refDetails.position_refree : '',
                        edit_value: officerData.position_refree ? officerData.position_refree : refDetails.position_refree,
                        name: 'position_refree'
                      }
                    },
                    {
                      title: 'Reason for Leaving',
                      value: refDetails.reason_for_leaving,
                      refree_res: refDetails.reason_for_leaving,
                      officer_res: {
                        type: 'text',
                        value: officerData.reason_for_leaving ? officerData.reason_for_leaving : officerAdded ? refDetails.reason_for_leaving : '',
                        edit_value: officerData.reason_for_leaving ? officerData.reason_for_leaving : refDetails.reason_for_leaving,
                        name: 'reason_for_leaving'
                      },
                      isShow: refDetails.reason_for_leaving ? true : false,
                      ishighlight: refDetails.reason_for_leaving === 'Dismissal' ? true : false
                    }
                  )
                } else if (itm.RefrenceType === 'education_reference') {
                  let eduSnap = JSON.parse(item.work_pass_check_type).snapshotdata;
                  refee_type = (splashdata !== undefined && splashdata.referencetype !== '') ? splashdata.referencetype : 'EDUCATION'
                  refee_orgname = (splashdata !== undefined && splashdata.organisationname !== '') ? splashdata.organisationname : refDetails.organisation_name
                  var refee_course = (splashdata !== undefined && splashdata.coursename !== '') ? splashdata.coursename : refDetails.course
                  var refee_qualification = (splashdata !== undefined && splashdata.qualificationtype !== '') ? splashdata.qualificationtype : refDetails.qualification
                  var refee_award = (splashdata !== undefined && splashdata.awardtype !== '') ? splashdata.awardtype : refDetails.award
                  var refee_studentno = (splashdata !== undefined && splashdata.studentNumber !== '') ? splashdata.studentNumber : refDetails.student_number
                  refData.unshift(
                    {
                      title: 'Type',
                      value: 'EDUCATION',
                      refree_res: refee_type,
                      officer_res: {
                        type: 'text',
                        name: 'ref_type',
                        value: officerData.ref_type ? officerData.ref_type : officerAdded ? 'EDUCATION' : '',
                        edit_value: officerData.ref_type ? officerData.ref_type : 'EDUCATION'
                      },
                      isbold: true,
                      officer_ref: 'organisation'
                    }
                  )
                  refData.push(
                    {
                      title: 'Organisation Name',
                      value: refDetails.organisation_name,
                      refree_res: refee_orgname,
                      officer_res: {
                        type: 'text',
                        value: officerData.organisation_name ? officerData.organisation_name : officerAdded ? refDetails.organisation_name : '',
                        edit_value: officerData.organisation_name ? officerData.organisation_name : refDetails.organisation_name,
                        name: 'organisation_name'
                      }
                    },
                    {
                      title: 'Contact Phone No.',
                      value: refDetails.contact_phone,
                      refree_res: refDetails.contact_phone,
                      officer_res: {
                        type: 'text',
                        value: officerData.contact_phone ? officerData.contact_phone : officerAdded ? refDetails.contact_phone : '',
                        edit_value: officerData.contact_phone ? officerData.contact_phone : refDetails.contact_phone,
                        name: 'contact_phone'
                      },
                    },
                    {
                      title: 'Course',
                      value: refGeneratedFrom === 'WEB' ? eduSnap.course : refDetails.course,
                      refree_res: refee_course,
                      officer_res: {
                        type: 'text',
                        value: officerData.course ? officerData.course : officerAdded ? refGeneratedFrom === 'WEB' ? eduSnap.course : refDetails.course : '',
                        edit_value: officerData.course ? officerData.course : refGeneratedFrom === 'WEB' ? eduSnap.course : refDetails.course,
                        name: 'course'
                      },
                      isShow: (refGeneratedFrom === 'WEB' && eduSnap !== undefined && eduSnap.course !== '')
                                || (refGeneratedFrom === 'MOBILE' && refDetails !== undefined && refDetails.course !== '')
                    },
                    {
                      title: 'Qualification',
                      value: refGeneratedFrom === 'WEB' ? eduSnap.qualification : refDetails.qualification,
                      refree_res: refee_qualification,
                      officer_res: {
                        type: 'text',
                        value: officerData.qualification ? officerData.qualification : officerAdded ? refGeneratedFrom === 'WEB' ? eduSnap.qualification : refDetails.qualification : '',
                        edit_value: officerData.qualification ? officerData.qualification : refGeneratedFrom === 'WEB' ? eduSnap.qualification : refDetails.qualification,
                        name: 'qualification'
                      },
                      isShow: (refGeneratedFrom === 'WEB' && eduSnap !== undefined && eduSnap.course !== '')
                      || (refGeneratedFrom === 'MOBILE' && refDetails !== undefined && refDetails.course !== '')
                    },
                    {
                      title: 'Award',
                      value: refGeneratedFrom === 'WEB' ? eduSnap.award : refDetails.award,
                      refree_res: refee_award,
                      officer_res: {
                        type: 'text',
                        value: officerData.award ? officerData.award : officerAdded ? refGeneratedFrom === 'WEB' ? eduSnap.award : refDetails.award : '',
                        edit_value: officerData.award ? officerData.award : refGeneratedFrom === 'WEB' ? eduSnap.award : refDetails.award,
                        name: 'award'
                      },
                      isShow: (refGeneratedFrom === 'WEB' && eduSnap !== undefined && eduSnap.award !== '')
                      || (refGeneratedFrom === 'MOBILE' && refDetails !== undefined && refDetails.award !== '')
                    },
                    {
                      title: 'Student Number',
                      value: refGeneratedFrom === 'WEB' ? eduSnap.student_number : refDetails.student_number,
                      refree_res: refee_studentno,
                      officer_res: {
                        type: 'text',
                        value: officerData.student_number ? officerData.student_number : officerAdded ? refGeneratedFrom === 'WEB' ? eduSnap.student_number : refDetails.student_number : '',
                        edit_value: officerData.student_number ? officerData.student_number : refGeneratedFrom === 'WEB' ? eduSnap.student_number : refDetails.student_number,
                        name: 'student_number'
                      },
                      isShow: (refGeneratedFrom === 'WEB' && eduSnap !== undefined && eduSnap.student_number !== '')
                      || (refGeneratedFrom === 'MOBILE' && refDetails !== undefined && refDetails.student_number !== '')
                    }
                  )
                } else if (itm.RefrenceType === 'employment_agency_reference') {
                  refee_type = (splashdata !== undefined && splashdata.referencetype !== '') ? splashdata.referencetype : 'AGENCY'
                  refee_orgname = (splashdata !== undefined && splashdata.organisationname !== '') ? splashdata.organisationname : refDetails.organisation_name
                  refee_positionheldcan = (splashdata !== undefined && splashdata.positionheldcandidate !== '') ? splashdata.positionheldcandidate : refDetails.position_applicant
                  refee_positionheldyou = (splashdata !== undefined && splashdata.positionheldyou !== '') ? splashdata.positionheldyou : refDetails.position_refree
                  refData.unshift(
                    {
                      title: 'Type',
                      value: 'AGENCY',
                      refree_res: refee_type,
                      officer_res: {
                        type: 'text',
                        name: 'ref_type',
                        value: officerData.ref_type ? officerData.ref_type : officerAdded ? 'AGENCY' : '',
                        edit_value: officerData.ref_type ? officerData.ref_type : 'AGENCY'
                      },
                      isbold: true,
                      officer_ref: 'organisation'
                    }
                  )
                  refData.push(
                    {
                      title: 'Organisation Name',
                      value: refDetails.organisation_name,
                      refree_res: refee_orgname,
                      officer_res: {
                        type: 'text',
                        name: 'organisation_name',
                        value: officerData.organisation_name ? officerData.organisation_name : officerAdded ? refDetails.organisation_name : '',
                        edit_value: officerData.organisation_name ? officerData.organisation_name : refDetails.organisation_name
                      }
                    },
                    {
                      title: 'Contact Phone No.',
                      value: refDetails.contact_phone,
                      refree_res: refDetails.contact_phone,
                      officer_res: {
                        type: 'text',
                        value: officerData.contact_phone ? officerData.contact_phone : officerAdded ? refDetails.contact_phone : '',
                        edit_value: officerData.contact_phone ? officerData.contact_phone : refDetails.contact_phone,
                        name: 'contact_phone'
                      }
                    },
                    {
                      title: 'Position Held By Applicant',
                      value: refDetails.position_applicant,
                      refree_res: refee_positionheldcan,
                      officer_res: {
                        type: 'text',
                        value: officerData.position_applicant ? officerData.position_applicant : officerAdded ? refDetails.position_applicant : '',
                        edit_value: officerData.position_applicant ? officerData.position_applicant : refDetails.position_applicant,
                        name: 'position_applicant'
                      }
                    },
                    {
                      title: 'Position Held By Referee',
                      value: refDetails.position_refree,
                      refree_res: refee_positionheldyou,
                      officer_res: {
                        type: 'text',
                        value: officerData.position_refree ? officerData.position_refree : officerAdded ? refDetails.position_refree : '',
                        edit_value: officerData.position_refree ? officerData.position_refree : refDetails.position_refree,
                        name: 'position_refree'
                      }
                    }
                  )
                } else if (itm.RefrenceType === 'personal_reference') {
                  refee_type = (splashdata !== undefined && splashdata.referencetype !== '') ? splashdata.referencetype : 'PERSONAL'
                  let address = ''
                  if (typeof refDetails.refree_address === 'string') {
                    address = refDetails.refree_address
                  } else {
                    var line1 = refDetails.refree_address.line1 !== '' ? refDetails.refree_address.line1 + ', ' : ''
                    var line2 = refDetails.refree_address.line2 !== '' ? refDetails.refree_address.line2 + ', ' : ''
                    var town = refDetails.refree_address.town !== '' ? refDetails.refree_address.town + ', ' : ''
                    var county = refDetails.refree_address.county !== '' ? refDetails.refree_address.county + ', ' : ''
                    var country = refDetails.refree_address.country !== '' ? refDetails.refree_address.country + ', ' : ''
                    var postcode = refDetails.refree_address.postcode !== '' ? refDetails.refree_address.postcode + ', ' : ''
                    address = line1 + line2 + town + county + country + postcode
                  }
                  var refee_address = (splashdata !== undefined && splashdata.currentaddress !== '') ? splashdata.currentaddress : address
                  refData.unshift(
                    {
                      title: 'Type',
                      value: 'PERSONAL',
                      refree_res: refee_type,
                      officer_res: {
                        type: 'text',
                        name: 'ref_type',
                        value: officerData.ref_type ? officerData.ref_type : officerAdded ? 'PERSONAL' : '',
                        edit_value: officerData.ref_type ? officerData.ref_type : 'PERSONAL'
                      },
                      isbold: true,
                      officer_ref: 'organisation'
                    }
                  )
                  refData.push(
                    {
                      title: 'Referee Current Address',
                      value: address,
                      refree_res: refee_address,
                      officer_res: {
                        type: 'text',
                        name: 'address',
                        value: officerData.address ? officerData.address : officerAdded ? address : '',
                        edit_value: officerData.address ? officerData.address : address
                      }
                    },
                    {
                      title: 'Contact Phone No.',
                      value: refDetails.contact_phone,
                      refree_res: refDetails.contact_phone,
                      officer_res: {
                        type: 'text',
                        name: 'contact_phone',
                        value: officerData.contact_phone ? officerData.contact_phone : officerAdded ? refDetails.contact_phone : '',
                        edit_value: officerData.contact_phone ? officerData.contact_phone : refDetails.contact_phone
                      }
                    }
                  )
                } else if (itm.RefrenceType === 'self_employment_reference') {
                  refee_type = (splashdata !== undefined && splashdata.referencetype !== '') ? splashdata.referencetype : 'SELF EMPLOYMENT'
                  refee_orgname = (splashdata !== undefined && splashdata.organisationname !== '') ? splashdata.organisationname : refDetails.organisation_name
                  refData.unshift(
                    {
                      title: 'Type',
                      value: 'SELF EMPLOYMENT',
                      refree_res: refee_type,
                      officer_res: {
                        type: 'text',
                        name: 'ref_type',
                        value: officerData.ref_type ? officerData.ref_type : officerAdded ? 'SELF EMPLOYMENT' : '',
                        edit_value: officerData.ref_type ? officerData.ref_type : 'SELF EMPLOYMENT'
                      },
                      isbold: true,
                      officer_ref: 'organisation'
                    }
                  )
                  refData.push(
                    {
                      title: 'Organisation Name',
                      value: refDetails.organisation_name,
                      refree_res: refee_orgname,
                      officer_res: {
                        type: 'text',
                        name: 'organisation_name',
                        value: officerData.organisation_name ? officerData.organisation_name : officerAdded ? refDetails.organisation_name : '',
                        edit_value: officerData.organisation_name ? officerData.organisation_name : refDetails.organisation_name
                      }
                    }
                  )
                } else if (itm.RefrenceType === 'unemployment_reference') {
                  refee_type = (splashdata !== undefined && splashdata.referencetype !== '') ? splashdata.referencetype : 'UNEMPLOYMENT'
                  if (refDetails.document_images && refDetails.document_images !== '[]') {
                    job_letter = JSON.parse(refDetails.document_images).map(
                      (item) => item.url
                    );
                    job_letter = job_letter.map((m, idx) => (
                      <a key={idx} href={m} target="_blank" title={m}>
                        <img src={m} className="sliderimg" alt="Job Letter" />
                      </a>
                    ));
                  }
                  refData.unshift(
                    {
                      title: 'Type',
                      value: 'UNEMPLOYMENT',
                      refree_res: refee_type,
                      officer_res: {
                        type: 'text',
                        name: 'ref_type',
                        value: officerData.ref_type ? officerData.ref_type : officerAdded ? 'UNEMPLOYMENT' : '',
                        edit_value: officerData.ref_type ? officerData.ref_type : 'UNEMPLOYMENT'
                      },
                      isbold: true,
                      officer_ref: 'organisation'
                    }
                  )
                  refData.push(
                    {
                      title: 'Job Centre Letter',
                      value: 'job_letter',
                      refree_res: '',
                      officer_res: {
                        type: 'text',
                        value: ''
                      }
                    }
                  )
                  responsive = {
                    0: { items: 1 },
                    1024: { items: 2 }
                  }
                } else {
                  isData = false
                }
                return (
                  isData &&
                  <div key={idx} className="mt-3 mb-3">
                    <div className="row">
                      <div className="col-md-12 employmentReferenceContainer">
                        <EmpRefData
                          idx={idx}
                          refData={refData}
                          docnum={docnum}
                          response={response}
                          reference_id={reference_id}
                          hasSplashData={hasSplashData}
                          refCloseStatus={refCloseStatus}
                          ref_soft_deleted={ref_soft_deleted}
                          refGeneratedFrom={refGeneratedFrom}
                          editRefIds={props.editRefIds}
                          cancelRefIds={props.cancelRefIds}
                          editCheck={props.editCheck}
                          saveCheck={props.saveCheck}
                          closeCheck={props.closeCheck}
                          softDeleteCheck={props.softDeleteCheck}
                          cancelEditCheck={props.cancelEditCheck}
                          openDocumentUploadModal={props.openDocumentUploadModal}
                          openDocumentViewModal={props.openDocumentViewModal}
                          name={itm.RefrenceType}
                          addReferee={props.addReferee}
                          checkId={checkId}
                          requestId={requestId}
                          candidateId={candidateId}
                          position={position}
                          referenceVersion={refVersion}
                          orgId={orgId}
                          isReset={isReset}
                          check_status={props.check_status}
                          openLetterModal={props.openLetterModal}
                          officerAdded={officerAdded}
                          isEditable={props.isEditable}
                        />
                        { /* <span className="vertical-line"></span>
                        <div className="refreeTable">
                          <p><b>OFFICER INITIATED REFERENCE</b></p>
                          <AddReferenceComponent
                            name={itm.RefrenceType}
                            addReferee={props.addReferee}
                            checkId={checkId}
                            requestId={requestId}
                            candidateId={candidateId}
                            position={position}
                            referenceVersion={refVersion}
                            orgId={orgId}
                            isReset={isReset}
                            check_status={props.check_status}
                            ref_soft_deleted={ref_soft_deleted}
                          ></AddReferenceComponent>
                        </div> */ }
                        {(props.documentModalIsOpen && props.docModalIndex === idx) && (
                          <UploadDocumentModal
                            type={type}
                            checkId={checkId}
                            referenceVersion={refVersion}
                            handleCloseModal={props.openDocumentUploadModal}
                            addDocuments={props.addDocuments}
                            isOpen={props.documentModalIsOpen}
                          />
                        )
                        }
                        {(props.viewDocumentModalIsOpen && props.viewModalIndex === idx) && (
                          <ViewDocumentModal
                            handleCloseModal={props.openDocumentViewModal}
                            isOpen={props.viewDocumentModalIsOpen}
                            viewUploadedDocuments={props.viewUploadedDocuments}
                            type={type}
                            checkId={checkId}
                            requestId={requestId}
                            candidateId={candidateId}
                            orgId={orgId}
                            referenceVersion={refVersion}
                            uploaded_documents={props.uploaded_documents}
                            idx={idx}
                            deleteDocuments={props.deleteDocuments}
                            isEditable={props.isEditable}
                          >
                            {" "}
                          </ViewDocumentModal>
                        )}
                      </div>
                    </div>
                    <hr className="refseparator" />
                    { /* idx + 1 === orderedReferences.length ? <hr className="listSeparator" /> */ }
                    { itm.RefrenceType === 'unemployment_reference' &&
                      <Modal
                        isOpen={props.letterModalIsOpen && props.letterModalIndex === idx}
                        className="modal"
                        ariaHideApp={false}
                      >
                        <div onClick={ () => props.openLetterModal(idx)} className="closeStyles">
                          <Icon color="#7F8DAA" type="close" />
                        </div>
                        <div className="modal-div">
                          {job_letter ? (
                            <AliceCarousel
                              responsive={responsive}
                              autoPlayInterval={2000}
                              autoPlayDirection="rtl"
                              autoPlay={false}
                              buttonsDisabled={true}
                              fadeOutAnimation={true}
                              mouseTrackingEnabled={true}
                              disableAutoPlayOnAction={true}
                            >
                              {job_letter}
                            </AliceCarousel>
                          ) : (
                            <p>No Uploaded document</p>
                          )}
                        </div>
                      </Modal>
                    }
                  </div>
                );
              }
              )}
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={checkId}
                type={props.type}
                userID={props.userID}
                annotationFetch={props.annotationFetch}
                annotationData={props.annotationData}
                complaince_response={props.complaince_response}
                notes={props.notes}
                annotationReset={props.annotationReset}
                check_status={props.check_status}
                side={props.side}
                requestId={requestId}
                resetSuccess={props.resetSuccess}
                orgId={orgId}
                workpassSubmit={props.workpassSubmit}
                gapArray={gaps}
                refernceCount={listToDisplay.length}
                isEditable={props.isEditable}
              ></AnnotationComponent>

              <NotesHistory
                notesHistory={props.annotationData.check_data}
              ></NotesHistory>
            </div>
          </div>
        </div>
      </div>
      <AddEmployementReference
        checkId={checkId}
        loading={props.loading}
        requestId={requestId}
        orgId={orgId}
        candidateId={candidateId}
        isModalOpen={modalOpen}
        organisations={organisations}
        comingfromofficer={true}
        officer_firstname={officer_firstname}
        officer_lastname={officer_lastname}
        fetchOrganisations={props.filterOrganisation}
        closeReferenceModal={handleCloseModal}
        saveEmploymentReferenceData={props.saveEmploymentReference}
        getData={props.getRequest}
      />
    </div>
  );
}

export default EmpReference;
