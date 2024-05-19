import React, { Component } from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import DatePicker from "react-datepicker";
import Button from 'components/Button';
import { renderValidation } from 'containers/Profile/utils/validation'
import { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'

import "react-datepicker/dist/react-datepicker.css";

/* const initialState = {
  document_id: '',
  document_title: '',
  document_number: '',
  issue_authority: '',
  expiration_date: ''
} */
const documentList = [
  {
    title: 'LIST A - Document',
    value: [ 'passport_us', 'emp_auth_document', 'passport_fms', 'alien_reg_receipt_card', 'passport_rmi', 'passport_foreign_form_i_94', 'passport_us_card', 'passport_foreign_form_i_94a', 'permanent_resident_card', 'passport_foreign']
  },
  {
    title: 'LIST B - Document - 1',
    value: [ 'us_id_card', 'us_merchant_mariner_card', 'native_american_tribal_doc', 'us_driver_license', 'military_draft_record', 'voter_registration_card', 'canadian_driver_license', 'school_id_card', 'school_record', 'school_report_card', 'medical_record', 'nursery_school_record']
  },
  {
    title: 'LIST C - Document - 1',
    value: [ 'us_birth_certificate', 'birth_certificate_dpt_of_state', 'dhs_employment_auth_doc', 'ssn_card', 'id_card_resident_citizen']
  }
]

const requiredFields = [ 'document_title', 'document_number', 'issue_authority', 'expiration_date' ]

class EmployeeEligibilityVerification extends Component {

  constructor(props) {
    super(props)
    let data = {}
    let certify_date = ''
    let certify = false
    let checkData = this.props.checkData ? this.props.checkData.filter(d => d.type === 'documents') : []
    checkData.map(d => { data[d.id] = {} })
    const eligibility_document = this.props.checkData.length ? this.props.checkData.filter(d => d.name === 'employment_eligibility_documents') : ''
    const documents = (eligibility_document.length && eligibility_document[0].snapshot) ? JSON.parse(eligibility_document[0].snapshot) : []
    documents.map(document => {
      if (document.document_id) {
        data[document.document_id] = {
          document_title: document.document_title,
          document_number: document.document_number,
          issue_authority: document.issue_authority,
          expiration_date: document.expiration_date
        }
      } else {
        certify_date = document.date ? document.date : ''
        certify = document.certify ? document.certify : false
      }
      return data
    })
    this.state = {
      data,
      certify_date,
      certify,
      invalidFields: [],
      editIds: [],
      currSaveId: ''
    }
  }

  editEmpEliData = (Id) => {
    let editIds = this.state.editIds
    editIds.push(Id)
    this.setState({
      editIds
    })
  }

  onInputChange = (field, value, id) => {
    if (field === 'expiration_date' && value) {
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
      value = `${dd}/${mm}/${yyyy}`
    }
    this.setState({
      data: {
        ...this.state.data,
        [id]: {
          ...this.state.data[id],
          [field]: value
        }
      }
    })
  }

  onSelectDate = (value) => {
    this.setState({
      certify_date: value
    })
  }

  updateEmpEliData = (id) => {
    const invalidFields = requiredFields.filter((field) => !(this.state.data[id][field] && this.state.data[id][field].length > 0))
    if (!invalidFields.length) {
      const postData = this.state.data[id]
      postData.document_id = id
      this.props.editEmpEliData(postData)
    }
    this.setState({invalidFields, currSaveId: id})
  }

  certifyEmpEliData = () => {
    if (this.state.certify_date) {
      const { requestId, orgId, candidateId, checkId } = this.props
      const postData = {
        name: 'employment_eligibility_documents',
        checkId,
        requestId,
        orgId,
        candidateId,
        data: {
          certify: true,
          date: this.state.certify_date
        }
      }
      this.props.certifyEmpEliData(postData,
        () => {
          notify.show('Documnent data certified successfully!!', 'success', NOTIFICATION_TIMEOUT)
          this.setState({ certify: true, invalidFields: [] })
        },
        () => {
          notify.show('Failed to certify data!!', 'error', NOTIFICATION_TIMEOUT)
          this.setState({ invalidFields: [] })
        }
      )
    } else {
      this.setState({
        invalidFields: ['certify_date']
      })
    }

    
    /* if (this.state.certify_date) {
      this.props.certifyEmpEliData({
        certify: true,
        date: this.state.certify_date
      })
      this.setState({
        certify: true
      })
    } else {
      this.setState({
        invalidFields: ['certify_date']
      })
    }*/
  }

  saveEmpEliData = (id, count = 0) => {
    const invalidFields = requiredFields.filter((field) => !(this.state.data[id][field] && this.state.data[id][field].length > 0))
    if (!invalidFields.length) {
      const { requestId, orgId, candidateId, checkId } = this.props
      const data = this.state.data[id]
      data.document_id = id
      if (count) {
        const postData = {
          checkId,
          data
        }
        this.props.editEmpEliData(postData,
          () => notify.show('Document data updated successfully!!', 'success', NOTIFICATION_TIMEOUT),
          () => notify.show('Failed to update data!!', 'error', NOTIFICATION_TIMEOUT))
      } else {
        const postData = {
          name: 'employment_eligibility_documents',
          checkId,
          requestId,
          orgId,
          candidateId,
          data
        }
        this.props.saveEmpEliData(postData,
          () => notify.show('Documnent data saved successfully!!', 'success', NOTIFICATION_TIMEOUT),
          () => notify.show('Failed to save document data!!', 'error', NOTIFICATION_TIMEOUT))
      }
      const editIds = this.state.editIds
      const idx = editIds.indexOf(id);
      if (idx > -1) {
        editIds.splice(idx, 1);
      }
      this.setState({
        invalidFields: [],
        editIds
      })
    }
    this.setState({
      invalidFields,
      currSaveId: id
    })
  }

  render() {
    const { invalidFields, data, currSaveId } = this.state
    let document_count = 0
    let checkData = this.props.checkData ? this.props.checkData.filter(d => d.type === 'documents') : []
    let eligibility_document = this.props.checkData ? this.props.checkData.filter(d => d.name === 'employment_eligibility_documents') : []
    let documents = (eligibility_document.length && eligibility_document[0].snapshot) ? JSON.parse(eligibility_document[0].snapshot) : []
    return (
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12 col-sm-12 card-row">
            <div className="card mb-3">
              <div className="card-header-gray">
                <div className="col-md-6 checkTitle">Employment Eligibility Verification</div>
                <div className="col-md-6 noPadding">
                  <LinkedButton
                    className="border-btn checkButton"
                    to="#"
                    color="blue"
                  >
                    Complete
                  </LinkedButton>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <p>Employer or Authorized Representative Review and Verification</p>
                  <p>Employers or their authorized representative must complete the information below within 3 business days of the employee’s first day of employment. A physical examination of one of the documents OR a combination of documents must be undertaken.</p>
                </div>
                {
                  documentList.map(list => {
                    const filterData = checkData.filter(d => list.value.includes(d.name))
                    const snapshot = (filterData.length && filterData[0].snapshot) ? JSON.parse(filterData[0].snapshot) : []
                    const document_id = filterData.length ? filterData[0].id : ''
                    if (snapshot.length) {
                      document_count++
                      let currInvalidFields = []
                      if (document_id === currSaveId) {
                        currInvalidFields = invalidFields
                      }
                      const document = documents.filter(doc => doc.document_id === document_id)
                      const document_title = data[document_id] ? data[document_id].document_title : ''
                      const document_number = data[document_id] ? data[document_id].document_number : ''
                      const issue_authority = data[document_id] ? data[document_id].issue_authority : ''
                      let expiration_date = data[document_id] ? data[document_id].expiration_date : ''
                      if (expiration_date) {
                        const val = expiration_date.split('/')
                        expiration_date = new Date(Date.UTC(val[2], val[1] - 1, val[0]))
                      }
                      return (
                        <div className="row emp-eli">
                          <div className="row document-header">
                            <div className="col-md-6 checkTitle">{list.title}</div>
                          </div>
                          <div className="row" key={document_id}>
                            <div className="col-md-4">
                              <img src={snapshot[0].url} className="sliderimg" alt="emp-eli" />
                            </div>
                            <div className="col-md-8">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className={`col-md-12 col-form-label ${renderValidation(currInvalidFields, 'document_title')}`}>Document Title</label>
                                  <div className="col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={document_title}
                                      onChange={(e)=> this.onInputChange('document_title', e.target.value, document_id)}
                                      disabled={(document.length && this.state.editIds.indexOf(document_id) === -1) || !this.props.isEditable}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className={`col-md-12 col-form-label ${renderValidation(currInvalidFields, 'document_number')}`}>Document Number</label>
                                  <div className="col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={document_number}
                                      onChange={(e)=> this.onInputChange('document_number', e.target.value, document_id)}
                                      disabled={(document.length && this.state.editIds.indexOf(document_id) === -1) || !this.props.isEditable}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className={`col-md-12 col-form-label ${renderValidation(currInvalidFields, 'issue_authority')}`}>Issuing Authority</label>
                                  <div className="col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={issue_authority}
                                      onChange={(e)=> this.onInputChange('issue_authority', e.target.value, document_id)}
                                      disabled={(document.length && this.state.editIds.indexOf(document_id) === -1) || !this.props.isEditable}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label className={`col-md-12 col-form-label ${renderValidation(currInvalidFields, 'expiration_date')}`}>Expiration Date</label>
                                  <div className="col-md-12 form-group">
                                    <DatePicker
                                      selected={expiration_date}
                                      dateFormat="dd/MM/yyyy"
                                      onChange={(date)=> this.onInputChange('expiration_date', date, document_id)}
                                      showYearDropdown
                                      showMonthDropdown
                                      disabled={(document.length && this.state.editIds.indexOf(document_id) === -1) || !this.props.isEditable}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <Button
                                  color="green"
                                  className="annotation-btn"
                                  onClick={ () => this.saveEmpEliData(document_id, document.length) }
                                  disabled={(document.length && this.state.editIds.indexOf(document_id) === -1) || this.state.certify || !this.props.isEditable}
                                >Save</Button>
                                <Button
                                  color="blue"
                                  className="annotation-btn"
                                  onClick={ () => this.editEmpEliData(document_id) }
                                  disabled={!document.length || (this.state.editIds.length && this.state.editIds.indexOf(document_id) !== -1) || this.state.certify || !this.props.isEditable}
                                >Edit</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                { document_count ?
                  <div className="row emp-eli" key={document_count}>
                    <div className="row document-header mb-3">
                      <div className="col-md-6 checkTitle">EMPLOYER CERTIFICATION</div>
                    </div>
                    <div className="row col-md-12 mb-3">
                      <div className="row col-md-6">
                        <label className={`col-form-label ${renderValidation(invalidFields, 'certify_date')}`}>The employee’s first day of employment is :</label>
                      </div>
                      <div className="row col-md-6">
                        <DatePicker
                          selected={this.state.certify_date && new Date(this.state.certify_date)}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date)=> this.onSelectDate(date)}
                          showYearDropdown
                          showMonthDropdown
                          disabled={!this.props.isEditable}
                        />
                      </div>
                    </div>
                    <div className="row col-md-12 mb-3">
                      <div className="row col-md-12">
                        Certification: I attest, under penalty of perjury, that (1) I have examined the document(s) presented by the employee, (2) the above-listed document(2) appear to be genuine and to relate to the person named, and (3) to the best of my knowledge the employee is authorised to work in the United States
                      </div>
                      <div className="row col-md-2 pull-right">
                        <Button
                          color="blue"
                          className="CandidateHeader__button floatingBtn"
                          onClick={ this.certifyEmpEliData }
                          disabled={ this.state.certify || documents.length !== document_count || !this.props.isEditable}
                        >Certify</Button>
                      </div>
                    </div>
                  </div>
                  : ''
                }
                <hr className="refseparator"></hr>
                <AnnotationComponent
                  annotationSubmit={this.props.annotationSubmit}
                  checkId={this.props.checkId}
                  type={this.props.type}
                  annotationFetch={this.props.annotationFetch}
                  annotationData={this.props.annotationData}
                  complaince_response={this.props.complaince_response}
                  notes={this.props.notes}
                  side={this.props.side}
                  userID={this.props.userID}
                  annotationReset={this.props.annotationReset}
                  check_status={this.props.check_status}
                  requestId={this.props.requestId}
                  resetSuccess={this.props.resetSuccess}
                  orgId={this.props.orgId}
                  isEditable={this.props.isEditable}
                />
                <NotesHistory
                  notesHistory={this.props.annotationData.check_data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeEligibilityVerification;