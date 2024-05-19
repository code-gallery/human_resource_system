import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames';
import DatePicker from "react-datepicker";
import Button from 'components/Button';
import Select from 'react-select';
// import { renderValidation } from 'containers/Profile/utils/validation'
import { organizationsAutocomplete } from 'utils/refereeOrgRequests.js'
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  organisation_name: '',
  refree_firstname: '',
  refree_lastname: '',
  refreeemail: '',
  contact_phone: '',
  refree_permission: false,
  comingfrom: 'web',
  position_applicant: '',
  referenceVersion: ''
}

const requiredFields = ['refreeemail', 'organisation_name']

class EmpRefData extends Component {
  constructor(props) {
    super();
    let data = {}
    props.refData.map(res => {
      data[res.officer_res.name] = res.officer_res.edit_value
      return data
    })
    this.state = {
      data: initialState,
      name: props.name,
      checkId: props.checkId,
      requestId: props.requestId,
      candidateId: props.candidateId,
      orgId: props.orgId,
      invalidFields: [],
      invalidFieldsMessage: '',
      disabled: false,
      fields: data
    }
    this.getOptions =this.getOptions.bind(this)
  }

  componentDidUpdate() {
    if (this.props.name !== this.state.name) {
      this.setState({
        name: this.props.name
      })
    }
    /* if (this.props.cancelRefIds.indexOf(this.props.reference_id) !== -1) {
      let data = {}
      this.props.refData.map(res => {
        data[res.officer_res.name] = res.officer_res.value
        return data
      })
      this.setState({
        fields: data
      })
    }*/
  }

  onFieldChange = (field, value) => {
    this.setState({
      data: {
        ...this.state.data,
        position_applicant:this.props.position,
        referenceVersion:this.props.referenceVersion,
        [field]: value
      }
    })
  }

  async getOptions(q) {
    if (!q) {
      return []
    }
    const response = await organizationsAutocomplete(q, this.props.orgId);
    const data = await response.data;
    let options = data.map((item) => {
      let properties = {
        value:item.umbrellaOrganisationDetails.id,
        text:item.umbrellaOrganisationDetails.name,
        first_name: item.pc_fst_name,
        last_name: item.pc_last_name,
        email: item.pc_email
      };
      return properties
    })
    return { options: options }
  }

  optionRenderer(option) {
    return (
      <div className="institution-select">
        <span className="org">{option.text}</span><br/>
        <span className="email">{option.email}</span>
      </div>
    )
  }

  selectAsyncChange = (v) => {
    this.setState({
      data: {
        ...this.state.data,
        organisation_name: v ? v.text : '',
        refree_firstname: v ? v.first_name : '',
        refree_lastname: v ? v.last_name : '',
        refreeemail: v ? v.email : ''
      },
      disabled: true
    })
  }

  selectAsyncBlur = (event) => {
    if (event.target.value && event.target.value.length) {
      this.setState({
        data: {
          ...this.state.data,
          organisation_name: event.target.value,
          refree_firstname: '',
          refree_lastname: '',
          refreeemail: '',
        },
        disabled: false
      })
    } else {
      this.onFieldChange('organisation_name', this.state.data.organisation_name)
    }
  }

  sendMail=()=>{
    const invalidFields = requiredFields.filter((field) => !this.state.data[field])
    if (!invalidFields.length) {
      const { name, checkId, data, requestId, candidateId, orgId } = this.state
      this.props.addReferee({
        data,
        name,
        checkId,
        requestId,
        candidateId,
        orgId
      })
      this.setState({
        data: initialState
      })
    } else {
      this.setState({
        invalidFields,
        invalidFieldsMessage: 'Please fill all required fields!!'
      })
    }
  }

  onInputChange = (field, value) => {
    if (field === 'datefrom' || field === 'dateto') {
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
    const fields = this.state.fields
    fields[field] = value
    this.setState({ fields })
  }

  render() {
    const {idx, refData, docnum, response, reference_id, hasSplashData, refCloseStatus, ref_soft_deleted, refGeneratedFrom, editRefIds, officerAdded, isEditable } = this.props
    const {data, invalidFields, invalidFieldsMessage} = this.state
    return (
      <div className="table-data1">
        <table>
          <tbody>
            <tr>
              <td>
                <p>REFERENCE {idx + 1}
                  <span><br />
                    <strong>({refGeneratedFrom} {!officerAdded && 'Generated'} - #{reference_id})</strong>
                  </span>
                </p>
              </td>
              <td className="border-left"><strong> CANDIDATE RESPONSE</strong></td>
              <td>
                <strong> REFEREE RESPONSE: </strong>
                {
                  (hasSplashData || response === 'AGREE' || response === 'DISAGREE') ?
                    <React.Fragment>
                      {response === 'AGREE' ? (
                        <span>
                          <span className="ref-status-green">{response}<br /></span>
                          {hasSplashData && '(with following changes)'}
                        </span>
                      ) : (
                        <span className="ref-status-red">{response}</span>
                      )}
                    </React.Fragment>
                    :
                    <span className="ref-status-red">NOT RECEIVED</span>
                }
              </td>
              <td className="border-left">
                <strong>{ officerAdded ? 'OFFICER ADDED' : 'OFFICER RESPONSE'}</strong><br />
                <span className="closeStatus"><strong>{refCloseStatus}</strong></span><br />
                {ref_soft_deleted && <strong><span className="softDeletedStatus">OFFICER DELETED</span></strong>}
              </td>
              <td className="border-left"><strong>OFFICER INITIATED REFERENCE</strong></td>
            </tr>
            {
              refData.map((res, index) => {
                const fieldName = res.officer_res.name
                const fieldType = res.officer_res.type
                var date = new Date()
                if (fieldType === 'date') {
                  const val = this.state.fields[fieldName].split('/')
                  date = new Date(Date.UTC(val[2], val[1] - 1, val[0]))
                }
                return (
                  (typeof res.isShow === 'undefined' || res.isShow) &&
                  <tr key={index}>
                    <td>{res.title}</td>
                    {!ref_soft_deleted ?
                      <React.Fragment>
                        <td className={classNames({'highlight': res.ishighlight && true, 'border-left': true })}>
                          {
                            !officerAdded &&
                            (res.value === 'job_letter' ?
                              <Link
                                to="#"
                                onClick={() => this.props.openLetterModal(idx)}
                                className="reportLink-left"
                              >LETTER</Link>
                              : res.isbold ? <b>{res.value}</b> : res.value)
                          }
                        </td>
                        <td className={classNames({'highlight': res.ishighlight && true })}>
                          { (hasSplashData || response === 'AGREE' || response === 'DISAGREE') &&
                            <span>{ res.isbold ? <b>{res.refree_res}</b> : res.refree_res }</span>
                          }
                        </td>
                      </React.Fragment>
                      :
                      <td colSpan="2" className="border-left">
                        { res.title === 'Type' &&
                          <span className="margin-left">
                            <b>{res.value}</b>
                            <b className="softDeletedStatus"> REFERENCE DELETED</b>
                          </span>
                        }
                      </td>
                    }
                    <td className="pt-0 border-left">
                      { !ref_soft_deleted ?
                        (editRefIds.indexOf(reference_id) !== -1) ?
                          (res.value !== 'job_letter')
                            ?
                            res.officer_res.type === 'date'
                              ?
                              <DatePicker
                                selected={date}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date)=> this.onInputChange(fieldName, date)}
                                //onChange={date => setStartDate(date)} 
                              />
                              :
                              <input
                                className="inputBox"
                                type={fieldType}
                                value={this.state.fields[fieldName]}
                                // value={this.state.fields[fieldName] || res.officer_res.value}
                                onChange={(e)=>{e.preventDefault(); this.onInputChange(fieldName, e.target.value)}}
                              />
                            : ''
                          :
                          (res.value === 'job_letter')
                            ?
                            <Link
                              to="#"
                              onClick={() => this.props.openLetterModal(idx)}
                              className="reportLink-left"
                            >LETTER</Link>
                            : res.officer_res.value
                        : ''
                      }
                    </td>
                    <td className="pt-0 border-left">
                      { res.officer_ref === 'organisation' &&
                        <Select.Async
                          loadOptions={this.getOptions}
                          autosize={true}
                          labelKey="text"
                          valueKey="text"
                          value={{ text: data.organisation_name ? data.organisation_name : 'Select Organisation...'}}
                          onChange={this.selectAsyncChange}
                          onBlur={this.selectAsyncBlur}
                          onBlurResetsInput={false}
                          onCloseResetsInput={false}
                          autoBlur={false}
                          optionRenderer={this.optionRenderer}
                          noResultsText="Can't find your organisation? Add it manually and we’ll investigate."
                          //className={`${renderValidation(invalidFields, 'organisation_name')}`}
                        />
                      }
                      { res.officer_ref === 'first_name' &&
                        <input
                          type="text"
                          className={`form-control inputBox`}
                          name="refree_firstname"
                          value={data.refree_firstname}
                          autoComplete="off"
                          disabled={this.state.disabled}
                          placeholder="First Name"
                          onChange={(e)=>{e.preventDefault(); this.onFieldChange('refree_firstname', e.target.value)}}
                        />
                      }
                      {
                        res.officer_ref === 'last_name' &&
                        <input
                          type="text"
                          className={`form-control inputBox`}
                          name="refree_lastname"
                          value={data.refree_lastname}
                          autoComplete="off"
                          disabled={this.state.disabled}
                          placeholder="Last Name"
                          onChange={(e)=>{e.preventDefault(); this.onFieldChange('refree_lastname',e.target.value)}}/>
                      }
                      {
                        res.officer_ref === 'email' &&
                        <input
                          type="email"
                          //className={`form-control inputBox ${renderValidation(invalidFields, 'refreeemail')}`}
                          className={`form-control inputBox`}
                          name="refreeemail"
                          value={data.refreeemail}
                          autoComplete="off"
                          disabled={this.state.disabled}
                          placeholder="Email Address"
                          onChange={(e)=>{e.preventDefault(); this.onFieldChange('refreeemail',e.target.value)}}/>
                      }
                      {
                        res.officer_ref === 'contact_no' &&
                        <input
                          type="tel"
                          className={`form-control inputBox`}
                          name="contact_phone"
                          value={data.contact_phone}
                          autoComplete="off"
                          placeholder="Contact No."
                          onChange={(e)=>{e.preventDefault(); this.onFieldChange('contact_phone',e.target.value)}}/>
                      }
                    </td>
                  </tr>
                )
              })
            }
            <tr>
              <td className="border-top">
                <span className="button_col1">
                  Do you want to upload any evidence?
                </span>
                <span className="button_col2">
                  <Button
                    color="white"
                    className="action-button"
                    onClick={() => {
                      this.props.openDocumentUploadModal(idx);
                    }}
                    disabled={!isEditable}
                  >
                    Upload
                  </Button>
                  <Button
                    color="white"
                    className="action-button relative-box"
                    onClick={() => {
                      this.props.openDocumentViewModal(idx);
                    }}
                  >
                    View
                    <span className="ref_doc_view">{docnum}</span>
                  </Button>
                </span>
              </td>
              <td colSpan="2" className="border-left border-top">
                <span className="button_col1">
                  Reference Action
                </span>
                <span className="button_col2 btn-mt">
                  {(!ref_soft_deleted) &&
                    <Button
                      color="red"
                      className="softDelete"
                      onClick={() => {
                        this.props.softDeleteCheck(reference_id);
                      }}
                      disabled={!isEditable}
                    >
                      Soft Delete
                    </Button>
                  }
                </span>
              </td>
              <td className="border-left border-top officer-ref">
                <span className="button_col1">
                  Officer Update
                </span>
                <span className="button_col2 btn-mt">
                  {
                    (editRefIds.indexOf(reference_id) === -1) &&
                      <React.Fragment>
                        <Button
                          color="white"
                          className="action-button"
                          onClick={() => {
                            this.props.editCheck(reference_id);
                          }}
                          // disabled={(ref_soft_deleted || refCloseStatus === 'OFFICER RECEIVED') ? true : false}
                          disabled={(ref_soft_deleted ? true : false) || !isEditable}
                        >
                          Edit
                        </Button>
                        {(!ref_soft_deleted && refCloseStatus !== 'OFFICER RECEIVED') &&
                          <Button
                            color="white"
                            className="action-button"
                            onClick={() => {
                              this.props.closeCheck(reference_id);
                            }}
                            disabled={!isEditable}
                          >
                            Received
                          </Button>
                        }
                      </React.Fragment>
                  }
                  {
                    (editRefIds.indexOf(reference_id) !== -1) &&
                    <React.Fragment>
                      <Button
                        color="white"
                        className="action-button"
                        onClick={() => {
                          this.props.saveCheck(this.state.fields, reference_id, refGeneratedFrom);
                        }}
                        disabled={!isEditable}
                      >
                        Save
                      </Button>
                      <Button
                        color="white"
                        className="action-button"
                        onClick={() => {
                          this.props.cancelEditCheck(reference_id);
                        }}
                        disabled={!isEditable}
                      >
                        Cancel
                      </Button>
                    </React.Fragment>
                  }
                </span>
              </td>
              <td className="border-left officer-ref">
                <span className="button_col1 required-error">
                &nbsp;{invalidFieldsMessage}
                {(this.props.isReset && this.props.check_status !== "pending") || this.props.ref_soft_deleted ?
                  <span className="resetLabel">Officer Initiated references are not allowed after RESET/ SOFT DELETE.</span>
                  : ''
                }
              </span>
                <span className="button_col3 btn-mt">
                <Button
                  color="white"
                  className="action-button"
                  onClick={() => this.sendMail()}
                  disabled={!isEditable || (this.props.isReset && this.props.check_status !== "pending") || this.props.ref_soft_deleted ? true : false}
                >
                  Send
                </Button>
              </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default EmpRefData;