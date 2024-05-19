
import React, { Component } from "react";
import moment from 'moment';
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { renderValidation } from 'containers/Profile/utils/validation'
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import {camelCase, toUpper} from 'lodash';
import { gapArray } from '../../utils/reference'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpen, faPhone } from '@fortawesome/fontawesome-free-solid'

import "react-datepicker/dist/react-datepicker.css";

const customStyle = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #999',
    boxShadow: '0 3px 9px rgba(0,0,0,.5)',
    background: 'rgb(255, 255, 255)',
    borderRadius: '6px',
    outline: 'none',
    padding: '0px',
    minWidth: '600px',
    maxHeight: '600px'
  }
}

const empReferenceData = [
  {
    title: 'Date From',
    type: 'date',
    name: 'datefrom',
    required: { education_reference: true, employment_reference: true, employment_agency_reference: true, personal_reference: true, self_employment_reference: true, unemployment_reference: true },
    refType: [ 'education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  },
  {
    title: 'Present Date',
    type: 'checkbox',
    name: 'is_present',
    required: { education_reference: false, employment_reference: false, employment_agency_reference: false, personal_reference: false, self_employment_reference: false, unemployment_reference: false },
    refType: [ 'education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  },
  {
    title: 'Date To',
    type: 'date',
    name: 'dateto',
    required: { education_reference: true, employment_reference: true, employment_agency_reference: true, personal_reference: true, self_employment_reference: true, unemployment_reference: true },
    refType: ['education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  },
  /* {
    title: 'Do not contact the referee before an offer is made',
    type: 'checkbox',
    name: 'refree_permission',
    required: { education_reference: false, employment_reference: false, employment_agency_reference: false, personal_reference: false, self_employment_reference: false, unemployment_reference: false },
    refType: [ 'education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  }, */
  {
    title: 'Referee First Name',
    type: 'text',
    name: 'refree_firstname',
    required: { education_reference: true, employment_reference: true, employment_agency_reference: true, personal_reference: true, self_employment_reference: false, unemployment_reference: true },
    refType: [ 'education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  },
  {
    title: 'Referee Last Name',
    type: 'text',
    name: 'refree_lastname',
    required: { education_reference: true, employment_reference: true, employment_agency_reference: false, personal_reference: false, unemployment_reference: false },
    refType: [ 'education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'unemployment_reference']
  },
  {
    title: 'Referee Email',
    type: 'email',
    name: 'refreeemail',
    required: { education_reference: true, employment_reference: true, employment_agency_reference: true, personal_reference: true, self_employment_reference: true, unemployment_reference: true },
    refType: ['education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  },
  {
    title: 'Confirm Referee Email',
    type: 'email',
    name: 'confirmrefreeemail',
    required: { education_reference: true, employment_reference: true, employment_agency_reference: true, personal_reference: true, unemployment_reference: true },
    refType: ['education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'unemployment_reference']
  },
  {
    title: 'Referee Current Address',
    type: 'text',
    name: 'refree_address',
    required: { personal_reference: true },
    refType: ['personal_reference']
  },
  {
    title: 'Contact Phone No.',
    type: 'text',
    name: 'contact_phone',
    required: { education_reference: false, employment_reference: false, employment_agency_reference: false, personal_reference: false, self_employment_reference: false, unemployment_reference: false },
    refType: ['education_reference', 'employment_reference', 'employment_agency_reference', 'personal_reference', 'self_employment_reference', 'unemployment_reference']
  },
  {
    title: 'NI/SSN',
    type: 'text',
    name: 'national_insurance_number',
    required: { 'employment_reference': false },
    refType: [ 'employment_reference' ]
  },
  {
    title: 'Organisation Name',
    type: 'select',
    name: 'organisation_name',
    options: [],
    required: { education_reference: true, employment_reference: true, employment_agency_reference: true, self_employment_reference: true },
    refType: [ 'education_reference', 'employment_reference', 'employment_agency_reference', 'self_employment_reference' ],
  },
  {
    title: 'Position held by Applicant',
    type: 'text',
    name: 'position_applicant',
    required: { employment_reference: true, employment_agency_reference: false },
    refType: [ 'employment_reference', 'employment_agency_reference' ]
  },
  {
    title: 'Position held by Referee',
    type: 'text',
    name: 'position_refree',
    required: { employment_reference: true, employment_agency_reference: false },
    refType: [ 'employment_reference', 'employment_agency_reference' ]
  },
  {
    title: 'Location',
    type: 'text',
    name: 'location_refree',
    required: { employment_reference: false, employment_agency_reference: false },
    refType: [ 'employment_reference', 'employment_agency_reference' ]
  },
  {
    title: 'Reason for Leaving',
    type: 'select',
    name: 'reason_for_leaving',
    options: [
      {
        value: 'Dismissal',
        text: 'Dismissal'
      },
      {
        value: 'Redundancy',
        text: 'Redundancy'
      },
      {
        value: 'Resignation',
        text: 'Resignation'
      },
      {
        value: 'Retirement',
        text: 'Retirement'
      },
      {
        value: 'Furlough',
        text: 'Furlough'
      },
      {
        value: 'Leave of Absence',
        text: 'Leave of Absence'
      },
      {
        value: 'Still Employed',
        text: 'Still Employed'
      },
      {
        value: 'Other',
        text: 'Other'
      }
    ],
    required: { employment_reference: false },
    refType: [ 'employment_reference' ]
  },
  {
    title: 'Course',
    type: 'text',
    name: 'course',
    required: { education_reference: false },
    refType: [ 'education_reference' ]
  },
  {
    title: 'Qualification',
    type: 'text',
    name: 'qualification',
    required: { education_reference: false },
    refType: [ 'education_reference' ]
  },
  {
    title: 'Award',
    type: 'text',
    name: 'award',
    required: { education_reference: false },
    refType: [ 'education_reference' ]
  },
  {
    title: 'Student Number',
    type: 'text',
    name: 'student_number',
    required: { education_reference: false },
    refType: [ 'education_reference' ]
  },
  {
    title: 'Nature of Acquaintance',
    type: 'text',
    name: 'nature_of_acquintance',
    required: { personal_reference: true },
    refType: [ 'personal_reference' ]
  },
  {
    title: 'Evidence',
    type: 'file',
    name: 'document_images',
    required: { employment_reference: false, education_reference: false, employment_agency_reference: false, unemployment_reference: false },
    refType: ['education_reference', 'employment_reference', 'employment_agency_reference', 'unemployment_reference' ]
  },
  /* {
    title: 'Job center Letter',
    type: 'file',
    name: 'jobcentre_letter',
    required: { unemployment_reference: false },
    refType: [ 'unemployment_reference' ]
  } */
]

const initialState = {
  datefrom: '',
  dateto: '',
  is_present: false,
  refree_permission: true,
  refree_firstname: '',
  refree_lastname: '',
  refreeemail: '',
  confirmrefreeemail: '',
  refree_address: '',
  contact_phone: '',
  national_insurance_number: '',
  organisation_name: '',
  position_applicant: '',
  position_refree: '',
  location_refree: '',
  reason_for_leaving: '',
  course: '',
  qualification: '',
  student_number: '',
  nature_of_acquintance: ''
}

class AddEmployementReference extends Component {

  constructor(props) {
    super(props)
    this.state = {
      reference_type: 'employment_reference',
      data: initialState,
      document_images: [],
      maxDate: new Date(),
      minDate: '',
      invalidFields: [],
      errorMessage: [],
      numberOfFiles: '',
      searchQuery: ''
    }
    this.fileUploader = this.fileUploader.bind(this)
  }

  async fileUploader(event) {
    const files = [ ...event.target.files ]
    const images = await Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
          return resolve({
            image: fileReader.result,
            imagename: (file.name).split('.').slice(0, -1).join('.'),
            type: file.type
          })
        }
        fileReader.readAsDataURL(file)
        fileReader.onerror = error => reject(error)
      })
    }))
    const filterImage = images.filter(img => !img.type.includes('image'))
    const errorMessage = []
    if (filterImage.length) {
      errorMessage['document_images'] = 'Invalid image format'
      this.setState({
        numberOfFiles: '',
        document_images: [],
        errorMessage
      })
    } else {
      this.setState({
        numberOfFiles: images.length,
        document_images: images,
        errorMessage
      })
    }
  }

  onFieldChange = (field, value) => {
    let searchQuery = ''
    if (field === 'organisation_name' && value.length > 2) {
      this.props.fetchOrganisations({
        q: value
      })
      searchQuery = value
    }
    if (field === 'reference_type') {
      this.setState({
        reference_type: value,
        data: {
          ...initialState,
          datefrom: this.state.data.datefrom,
          dateto: this.state.data.dateto
        },
        invalidFields: [],
        document_images: [],
        errorMessage: [],
        numberOfFiles: ''
      })
    } else {
      const minDate = field === 'datefrom' ? value : ''
      if ((field === 'datefrom' || field === 'dateto') && value) {
        let dd = value.getDate()
        let mm = value.getMonth() + 1
        const yyyy = value.getFullYear()
        if (dd < 10)
        {
          dd = `0${dd}`
        }
        if (mm < 10)
        {
          mm = `0${mm}`
        }
        value = `${yyyy}/${mm}/${dd}`
      }
      if (field === 'refree_permission' || field === 'is_present') {
        value = !this.state.data[field]
      }
      if (field === 'datefrom' && this.state.data.dateto) {
        this.setState({
          minDate,
          searchQuery,
          data: {
            ...this.state.data,
            dateto: '',
            [field]: value
          }
        })
      } else if (field === 'is_present' && value) {
        this.setState({
          minDate,
          searchQuery,
          data: {
            ...this.state.data,
            dateto: moment(new Date()).format('YYYY/MM/DD'),
            [field]: value
          }
        })
      } else {
        this.setState({
          minDate,
          searchQuery,
          data: {
            ...this.state.data,
            [field]: value
          }
        })
      }
    }
  }

  saveEmpReference = () => {
    const { checkId, requestId, comingfromofficer, officer_firstname, officer_lastname, candidateId, orgId } = this.props;
    const { data, reference_type, document_images } = this.state
    const arr = {}
    const requiredFields = []
    const errorMessage = []
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const no_pattern = /^[0|+][0-9]{9,16}$/

    empReferenceData.map(refData => {
      if (refData.refType.includes(reference_type)) {
        const fieldName = refData.name
        arr[fieldName] = (fieldName === 'dateto' && data.is_present) ? moment(new Date()).format('YYYY/MM/DD') : data[fieldName]
        if (refData.required[reference_type]) {
          requiredFields.push(fieldName)
        }
      }
    })
    const invalidFields = requiredFields.filter((field) => !(data[field] && data[field].length > 0))
    if (data.refreeemail && !pattern.test(data.refreeemail)) {
      errorMessage['refreeemail'] = 'Invalid email address format'
    }
    if (data.confirmrefreeemail && data.refreeemail.trim() !== data.confirmrefreeemail.trim()) {
      errorMessage['confirmrefreeemail'] = 'Referee email and confirm referee email must be same'
    }
    const match_no = data.contact_phone ? data.contact_phone.match(/\d/g) : ''
    const ph_no_digit = match_no ? match_no.join('') : ''
    if (data.contact_phone && (!no_pattern.test(data.contact_phone) || ph_no_digit.length < 11 || ph_no_digit.length > 15)) {
      errorMessage['contact_phone'] =  'Should start from + or 0 and length between 11-15 numbers'
    }
    this.setState({
      errorMessage,
      invalidFields
    })
    if (!invalidFields.length && !errorMessage.refreeemail && !errorMessage.confirmrefreeemail && !errorMessage.contact_phone) {
      arr.comingfromofficer = comingfromofficer ? comingfromofficer : false
      if (officer_firstname) {
        arr.officer_firstname = officer_firstname
      }
      if (officer_lastname) {
        arr.officer_lastname = officer_lastname
      }
      const postData = {
        data: arr,
        name: reference_type,
        document_images,
        checkId,
        requestId,
        candidateId: candidateId ? candidateId : '',
        orgId: orgId ? orgId : ''
      }
      this.props.saveEmploymentReferenceData(postData,
        () => {
          notify.show('Employment reference added successfully!!', 'success', NOTIFICATION_TIMEOUT)
          if (!candidateId && !orgId) {
            this.props.getData(requestId)
          }
          if (!this.props.checkData) {
            this.props.closeReferenceModal()
          }
          this.setState({
            data: initialState,
            invalidFields: [],
            document_images: [],
            numberOfFiles: '',
            errorMessage: []
          })
        },
        () => notify.show('Failed to add Employment reference!!', 'error', NOTIFICATION_TIMEOUT))
    }
  }

  workpassSubmit = () => {
    const { requestId, checkId } = this.props
    this.props.workpassSubmit({ checkId },
      () => {
        notify.show('Check submitted successfully.', 'success', NOTIFICATION_TIMEOUT)
        this.props.getData(requestId)
        this.props.getRequest(requestId)
        this.closeReferenceModal()
        /* let complaince_response_data = {
          complaince_response: 'No Status',
          notes: 'Check completed',
          check_id: checkId,
          check_type: type,
          user_id: candidateId,
          requestId: requestId
        }
        this.props.annotationSubmit(complaince_response_data,
          () => notify.show('Response saved successfully.', 'success', NOTIFICATION_TIMEOUT),
          () => notify.show('Failed to save response.', 'error', NOTIFICATION_TIMEOUT))
        */
      },
      () => notify.show('Failed to complete workpass.', 'error', NOTIFICATION_TIMEOUT))
  }

  closeReferenceModal = () => {
    this.setState({
      data: initialState,
      invalidFields: [],
      document_images: [],
      numberOfFiles: '',
      errorMessage: []
    })
    this.props.closeReferenceModal()
  }

  addMissingReference = (datefrom, dateto) => {
    this.setState({
      data: {
        ...this.state.data,
        datefrom: moment(datefrom).format('YYYY/MM/DD'),
        dateto: moment(dateto).format('YYYY/MM/DD')
      }
    })
  }

  render() {
    const { data, reference_type, invalidFields, numberOfFiles } = this.state
    const { organisations, refOption, checkData } = this.props
    const employmentData = (checkData && checkData.length) ? checkData[0].data : []
    const status = (checkData && checkData.length) ? checkData[0].status : ''
    const addedYear = refOption ? parseInt(refOption.substring(0, 1)) : 1
    const dateArray = employmentData.map(empdata => {
      const from = new Date(moment(empdata.snapshot[0].datefrom, 'DD/MM/YYYY').format('MM/DD/YYYY')).getTime()
      const to = empdata.snapshot[0].dateto ? new Date(moment(empdata.snapshot[0].dateto, 'DD/MM/YYYY').format('MM/DD/YYYY')).getTime() : new Date().getTime()
      return { from, to }
    })
    const gaps = gapArray(dateArray, addedYear)
    const gapListHtml = gaps.map((gap, idx) => {
      return (
        <p className="othername-list add-missing" key={idx} onClick={() => this.addMissingReference(gap.from, gap.to)}>
          <span className="col-md-6 address-gap">Missing Reference</span>
          <span className="col-md-6 emp-list-right">{`${moment(gap.from).format('DD/MM/YYYY')} - ${moment(gap.to).format('DD/MM/YYYY')}`}</span>
        </p>
      )
    })

    const empReferenceList = employmentData.map(data => {
      const snapshot = data.snapshot.length ? data.snapshot[0] : {}
      let org_name = camelCase(data.name).replace(/^(.)/, toUpper)
      return (
        data.snapshot.length &&
          <div className="othername-list employment-list" key={data.id}>
            <span className="col-md-6">
              <p>
                <strong>{`${snapshot.refree_firstname ? snapshot.refree_firstname : ''} ${snapshot.refree_lastname ? snapshot.refree_lastname : '' }`}</strong>
              </p>
              <small>
                {snapshot.organisation_name ? snapshot.organisation_name : org_name}
              </small>
            </span>
            <span className="col-md-6 emp-list-right">
              {/* <p>{`${moment(snapshot.datefrom, 'DD/MM/YYYY').format('DD/MM/YYYY')} - ${snapshot.dateto ? moment(snapshot.dateto, 'DD/MM/YYYY').format('DD/MM/YYYY') : 'Present'}`}</p> */}
              <p>
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={faEnvelopeOpen}
                />{snapshot.refreeemail}
              </p>
              <p>
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={faPhone}
                />{snapshot.contact_phone}</p>
            </span>
          </div>
      )
    })
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.closeReferenceModal}
        style={customStyle}
        contentLabel="Add Reference"
        ariaHideApp={false}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="row">
                <div className="col-md-6">
                  <h3 className="modal-title">Employment Reference</h3>
                </div>
                <div className="col-md-6 pull-right">
                  <LoaderButton
                    className="Button close-reference-btn"
                    onClick={this.closeReferenceModal}
                  >Close</LoaderButton>
                  {this.props.workpassSubmit ?
                    <LoaderButton
                      className="Button save-reference-btn"
                      onClick={this.workpassSubmit}
                      //loading={this.props.loading}
                      disabled={(status === 'complete' || gaps.length || employmentData.length <= 1) ? true : false}
                    >Submit</LoaderButton>
                    :
                    <LoaderButton
                      className="Button save-reference-btn"
                      onClick={this.saveEmpReference}
                      loading={this.props.loading}
                    >Save</LoaderButton>
                  }
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="body-message add-reference-form">
                {
                  this.props.checkData &&
                  <div className="form-group row">
                    <div className="col-md-12" style={{'border-bottom': '1px solid #e5e5e5'}}>
                      {employmentData.length ?
                        <React.Fragment>
                          {(gaps.length === 0 && employmentData.length <= 1) &&
                            <p>
                              <span className="address-gap">A Minimum of 2 references are required</span>
                            </p>
                          }
                          {gapListHtml}
                        </React.Fragment>
                        :
                        (<p>
                          <span className="address-gap">
                            Please add {addedYear} {addedYear > 1 ? 'years' : 'year'} of employment reference
                          </span>
                        </p>)
                      }
                      {empReferenceList}
                    </div>
                  </div>
                }
                <div className="form-group row">
                  <label className="col-md-4 col-form-label reference-label">Type</label>
                  <div className="col-md-8 emp-type">
                    <Select
                      name="reference_type"
                      options={[
                        {
                          value: 'education_reference',
                          label: 'Education Reference'
                        },
                        {
                          value: 'employment_agency_reference',
                          label: 'Employment Agency Reference'
                        },
                        {
                          value: 'employment_reference',
                          label: 'Employment Reference'
                        },
                        {
                          value: 'personal_reference',
                          label: 'Personal Reference'
                        },
                        {
                          value: 'self_employment_reference',
                          label: 'Self Employment Reference'
                        },
                        {
                          value: 'unemployment_reference',
                          label: 'Unemployment Reference'
                        }
                      ]}
                      value={reference_type || ''}
                      onChange={(e)=>{this.onFieldChange('reference_type', e.value)}}
                    />
                  </div>
                  <p className="split"></p>
                </div>
                {empReferenceData.map((refData, idx) => {
                  const fieldName = refData.name
                  const fieldType = refData.type
                  if (refData.refType.includes(reference_type)) {
                    var dateValue = ''
                    if (fieldType === 'date' && data[fieldName]) {
                      const val = data[fieldName].split('/')
                      dateValue = new Date(Date.UTC(val[0], val[1] - 1, val[2]))
                    }
                    let title = refData.title
                    if (reference_type === 'self_employment_reference') {
                      if (fieldName === 'refree_firstname') {
                        title = 'Company Accountant Name'
                      }
                      if (fieldName === 'refreeemail') {
                        title = 'Company Accountant Email'
                      }
                      if (fieldName === 'contact_phone') {
                        title = 'Company Accountant Contact No.'
                      }
                    }
                    if (reference_type === 'unemployment_reference' && fieldName === 'document_images') {
                      title = 'Job Center Letter'
                    }
                    let options = []
                    if (fieldName === 'organisation_name') {
                      options = organisations
                    } else {
                      options = refData.options
                    }
                    let labelClassName = fieldName === 'document_images' ? 'reference-label' : ''
                    return (
                      <div className="form-group row" key={idx}>
                        { (fieldName === 'dateto' && data.is_present) ? '' :
                          <React.Fragment>
                            <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, fieldName)} ${labelClassName}`}>
                              {title}
                            </label>
                            <div className="col-md-8">
                              { fieldType === 'date' ?
                                <DatePicker
                                  selected={dateValue}
                                  dateFormat="dd/MM/yyyy"
                                  onChange={date => this.onFieldChange(fieldName, date)}
                                  maxDate={this.state.maxDate}
                                  minDate={fieldName === 'dateto' ? this.state.minDate : ''}
                                  showYearDropdown
                                  showMonthDropdown
                                />
                                :
                                fieldType === 'checkbox' ?
                                  <div className="switch-container">
                                    <label>
                                      <input checked={data[fieldName]}
                                        onChange={e => this.onFieldChange(fieldName, e.target.value)}
                                        className="switch"
                                        type="checkbox" />
                                      <div><div></div></div>
                                    </label>
                                  </div>
                                  : fieldType === 'select' ?
                                    <div>
                                      <input list={fieldName} type="text" onChange={e => this.onFieldChange(fieldName, e.target.value)}
                                        className="form-control"
                                        autoComplete="off" placeholder="Select" />
                                      <datalist id={fieldName}>
                                        {!options.length && <option key={this.state.searchQuery} value={this.state.searchQuery} >{this.state.searchQuery}</option> }
                                        {options.map((org, idx) => {
                                          return (
                                            <option key={idx} value={org.value} >{org.value}</option>
                                          )
                                        })}</datalist>
                                    </div>
                                    : fieldType === 'file' ?
                                      <div className="btn-custom-file-upload">
                                        <label>
                                          <input
                                            type="file"
                                            onChange={this.fileUploader}
                                            accept="image/jpeg" multiple
                                          />
                                          <span className="btn-placeholder">{numberOfFiles ? `${numberOfFiles} ${`Files`}` : 'Click here to upload Image only'}</span>
                                        </label>
                                      </div>
                                      :
                                      <input type={fieldType} className="form-control" name={fieldName}
                                        value={data[fieldName]}
                                        onChange={e => this.onFieldChange(fieldName, e.target.value)}
                                        autoComplete="off"
                                      />
                              }
                              <small className="required-error">{this.state.errorMessage[fieldName]}</small>
                            </div>
                          </React.Fragment>
                        }
                      </div>
                    )
                  }
                })}
                <div className="form-group row">
                  <div className="col-md-12">
                    <LoaderButton
                      className="Button save-reference-btn"
                      onClick={this.saveEmpReference}
                      loading={this.props.loading}
                    >Save</LoaderButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default AddEmployementReference;