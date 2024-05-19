import React, { Component } from "react";
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { renderValidation } from 'containers/Profile/utils/validation'
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'
import httpFetch from 'utils/httpFetch'

import './style.css'

const referenceField = [
  {
      title: 'Country',
      type: 'select',
      name: 'bank_acct_country',
      required: true,
      options: [ { label: 'United Kingdom', value: 'GB'} ]
  },
  {
    title: 'Title',
    type: 'select',
    name: 'title',
    required: true,
    options: [
      {
        value: 'Baron',
        label: 'Baron'
      },
      {
        value: 'Baroness',
        label: 'Baroness'
      },
      {
        value: 'Brigadier',
        label: 'Brigadier'
      },
      {
        value: 'Canon',
        label: 'Canon'
      },
      {
        value: 'Captain',
        label: 'Captain'
      },
      {
        value: 'Dr',
        label: 'Dr'
      },
      {
        value: 'Duchess',
        label: 'Duchess'
      },
      {
        value: 'Duke',
        label: 'Duke'
      },
      {
        value: 'Esq',
        label: 'Esq'
      },
      {
        value: 'Father',
        label: 'Father'
      },
      {
        value: 'Hon',
        label: 'Hon'
      },
      {
        value: 'Inspector',
        label: 'Inspector'
      },
      {
        value: 'Lady',
        label: 'Lady'
      },
      {
        value: 'Lord',
        label: 'Lord'
      },
      {
        value: 'Lt Col',
        label: 'Lt Col'
      },
      {
        value: 'Major',
        label: 'Major'
      },
      {
        value: 'Miss',
        label: 'Miss'
      },
      {
        value: 'Most Rever',
        label: 'Most Rever'
      },
      {
        value: 'Mr',
        label: 'Mr'
      },
      {
        value: 'Mrs',
        label: 'Mrs'
      },
      {
        value: 'Ms',
        label: 'Ms'
      },
      {
        value: 'Pastor',
        label: 'Pastor'
      },
      {
        value: 'Professor',
        label: 'Professor'
      },
      {
        value: 'Rabbi',
        label: 'Rabbi'
      },
      {
        value: 'Rev Dr',
        label: 'Rev Dr'
      },
      {
        value: 'Reverend',
        label: 'Reverend'
      },
      {
        value: 'Rt Reveren',
        label: 'Rt Reveren'
      },
      {
        value: 'Sir',
        label: 'Sir'
      },
      {
        value: 'Sister',
        label: 'Sister'
      },
      {
        value: 'Squadron L',
        label: 'Squadron L'
      },
      {
        value: 'Wg Cdr',
        label: 'Wg Cdr'
      }
    ]
  },
  {
      title: 'Gender',
      type: 'select',
      name: 'gender',
      required: true,
      options: [ { label: 'Male', value: 'male'},{ label: 'Female', value: 'female' } ]
  },
  {
    title: 'Bank or Building Society Name',
    type: 'text',
    name: 'organisation_name',
    required: true,
    options: []
  },
  {
    title: 'Sort Code',
    type: 'text',
    name: 'bank_code',
    required: true,
    options: []
  },
  {
    title: 'Account Number',
    type: 'text',
    name: 'account_no',
    required: true,
    options: []
  },
  {
    title: 'Bank or Building Society Ref',
    type: 'text',
    name: 'bank_reference_no',
    required: true,
    options: []
  },
  {
    title: 'Account Name',
    type: 'text',
    name: 'account_name',
    required: true,
    options: []
  },
  {
    title: 'Bank Branch Address',
    type: 'text',
    name: 'address',
    required: true,
    options: []
  }
]

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
    maxWidth: '600px',
    minHeight: '500px',
    maxHeight: '600px'
  }
}

const initialState = {
  bank_acct_country: null,
  title: null,
  gender: null,
  organisation_name: null,
  bank_code: null,
  account_no: null,
  bank_reference_no: null,
  account_name: null
}

const addressDetails = {
  line_1: null,
  line_2: null,
  townCity: null,
  county: null,
  district: null,
  country: null,
  postCode: null,
  addressNotFound: false
}

class BankDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: initialState,
      bank_id: '',
      edit_bank_id: '',
      invalidFields: [],
      errorMessage: [],
      haveBankAccount: false,
      addBankAccount: false,
      showAllFields: false,
      showAddressDetails: false,
      addressDetails: addressDetails,
      address: '',
      addressArray: [],
      selectedAddress: false
    }
  }

  closeReferenceModal = () => {
    this.setState({
      data: initialState,
      bank_id: '',
      edit_bank_id: '',
      invalidFields: [],
      errorMessage: [],
      haveBankAccount: false,
      addBankAccount: false,
      showAllFields: false,
      showAddressDetails: false
    })
    this.props.closeReferenceModal()
  }

  haveBankAccountFunc = () => {
    this.setState({
      haveBankAccount: !this.state.haveBankAccount
    })
  }

  addBankAccount = () => {
    this.setState({
      bank_id: '',
      edit_bank_id: '',
      showAllFields: false,
      showAddressDetails: false,
      addBankAccount: !this.state.addBankAccount,
      data: initialState,
      errorMessage: [],
      addressDetails: {
        line_1: '',
        line_2: '',
        townCity: '',
        county: '',
        district: '',
        country: '',
        postCode: '',
        addressNotFound: false
      },
      address: ''
    })
  }

  editBankDetail = (id) => {
    let address = this.props.bankAddresses.filter(add => add.id === id)
    address = address.length ? address[0] : []
    const accountAddress = JSON.parse(address.account_address);
    this.setState({
      showAllFields: true,
      showAddressDetails: true,
      addBankAccount: true,
      bank_id: '',
      edit_bank_id: id,
      errorMessage: [],
      invalidFields: [],
      selectedAddress: true,
      data: {
        bank_acct_country: address.bank_acct_country,
        title: address.userPersonal.title,
        gender: address.userPersonal.gender,
        organisation_name: address.organisation_name,
        bank_code: address.bank_code,
        account_no: address.account_no,
        bank_reference_no: address.bank_reference_no,
        account_name: address.account_name,
        address: accountAddress.postCode
      },
      addressDetails: {
        line_1: accountAddress.line1,
        line_2: accountAddress.line_2,
        townCity: accountAddress.townCity,
        county: accountAddress.county,
        district: accountAddress.district,
        country: accountAddress.country,
        postCode: accountAddress.postCode,
        addressNotFound: false
      }
    })
  }

  closeBankDetails = () => {
    this.setState({
      addBankAccount: false,
      showAllFields: false,
      showAddressDetails: false
    })
  }

  saveBankDetails = () => {
    const invalidFields = []
    const errorMessage = []
    const data = this.state.data
    referenceField.map(field => {
      const fieldName = field.name
      if (field.required) {
        if (!(this.state.data[fieldName])) {
          invalidFields.push(fieldName)
        }
        else{
          if(fieldName === "address"){
            if(this.state.selectedAddress === false)
               invalidFields.push(fieldName)
          }      
        }
      }
    })
    const no_pattern = /^[0-9]*$/
    if (data.account_no && (!no_pattern.test(data.account_no) || data.account_no.length !== 8)) {
      errorMessage['account_no'] = 'Account number should be of 8 digits'
    }
    if (data.bank_code) {
      const code = data.bank_code.replaceAll('-', '')
      if (code.length !== 6) {
        errorMessage['bank_code'] = 'Sort code should be of 6 digits'
      }
    }
    this.setState({ invalidFields, errorMessage })
    if (!invalidFields.length && !errorMessage.account_no && !errorMessage.bank_code) {
      let postData = { ...this.state.data }
      postData.account_address = JSON.stringify({
        line1: this.state.addressDetails.line_1,
        line2: this.state.addressDetails.line_2,
        townCity: this.state.addressDetails.townCity,
        county: this.state.addressDetails.county,
        district: this.state.addressDetails.district,
        country: this.state.addressDetails.country,
        postCode: this.state.addressDetails.postCode,
      })
      let successMessage = 'Bank details saved successfully!!'
      if (this.state.bank_id) {
        successMessage = 'Changes saved successfully'
      }
      this.props.saveBankDetails({
        address: postData,
        bank_id: this.state.edit_bank_id
      },
      () => {
        notify.show(successMessage, 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          bank_id: '',
          edit_bank_id: '',
          invalidFields: [],
          errorMessage: [],
          haveBankAccount: false,
          addBankAccount: false,
          showAllFields: false,
          showAddressDetails: false
        })
      },
      () => notify.show('Failed to save Bank details!!', 'error', NOTIFICATION_TIMEOUT))
    }
  }

  onFieldChange = (field, value) => {
    /* if (field === 'account_no' && value.length > 8) {
      return
    }*/
    if (field === 'bank_code') {
      var val = value.replace(/\D/g, '')
      var newVal = ''
      if (val.length > 3) {
        value = val
      }
      if ((val.length > 2) && (val.length < 5)) {
        newVal += val.substr(0, 2) + '-'
        val = val.substr(2);
      }
      if (val.length > 4) {
        newVal += val.substr(0, 2) + '-'
        newVal += val.substr(2, 2) + '-'
        val = val.substr(4);
      }
      newVal += val;
      value = newVal.substring(0, 8)
    }
    if (field === 'address') {
      this.setState({
        data: {
          ...this.state.data,
          [field]: value.toUpperCase()
        }
      })
      return
    }
    if (field === 'bank_acct_country') {
      if (window.confirm('Please confirm that this bank account is with a United Kingdom bank')) {
        this.setState({
          showAllFields: true
        })
      } else {
        this.setState({
          showAllFields: false
        })
      }
    }
    this.setState({
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  textIsNumberOrNot = (e, fieldName) => {
    if ((fieldName === 'account_no' || fieldName === 'bank_code') && (e.which < 48 || e.which > 57)) {
      e.preventDefault()
    }
  }

  findAddress = async () => {
    this.setState({ showAddressDetails: false })
    const url = `https://api.getaddress.io/find/${this.state.data.address}?api-key=NffjIGYowEyyGs2yRE6elA9228&expand=true`
    const res = await httpFetch(url, { method: 'GET' })
    if (res.addresses) {
      res.addresses.map((field) => {
        field.postCode = res.postcode
        return field
      })
      this.setState({
           showAddressDetails: true,
           addressArray:res.addresses,
           selectedAddress:false,
           addressNotFound: false,
           addressDetails: {
            addressNotFound: false
           }
      })
    } else {
      this.setState({
        showAddressDetails: true,
        addressDetails: {
          addressNotFound: true,
        },
        selectedAddress:false
      })
    }
  
  }

  selectAddress(address) {
   const { line_1, line_2, town_or_city, county, district, country, postCode } = address
        this.setState({
        showAddressDetails: true,
        addressDetails: {
          line_1: line_1,
          line_2: line_2,
          townCity: town_or_city,
          county: county,
          district: district,
          country: country,
          postCode: postCode,
          addressNotFound: false
        },
        selectedAddress: true
      })
  }


  onSelectBank = (e) => {
    this.setState({
      bank_id: e.target.value,
      addBankAccount: false,
      showAllFields: false,
      showAddressDetails: false
    })
  }

  submitBankDetails = () => {
    if (this.state.haveBankAccount) {
      this.props.submitBankDetails({
        check_id: this.props.check_id
      },
      () => {
        notify.show('Bank details submitted successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.props.getData(this.props.requestId)
        this.closeReferenceModal()
      },
      () => notify.show('Failed to save bank details!!', 'error', NOTIFICATION_TIMEOUT))
    } else {
      let bankDetails = this.props.bankAddresses.filter(add => add.id == this.state.bank_id)
      bankDetails = bankDetails.length ? bankDetails[0] : []
      const address = bankDetails.account_address
      bankDetails.addressObject = address
      const accountAddress = JSON.parse(address);
      bankDetails.account_address = `${accountAddress.line1} ${accountAddress.townCity} ${accountAddress.country}`
      //delete bankDetails.account_address
      bankDetails.unencrypted_account_no = bankDetails.account_no
      bankDetails.title = bankDetails.userPersonal.title
      bankDetails.gender = bankDetails.userPersonal.gender
      this.props.submitBankDetails({
        bankDetails,
        check_id: this.props.check_id
      },
      () => {
        notify.show('Bank details submitted successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.props.getData(this.props.requestId)
        this.closeReferenceModal()
      },
      () => notify.show('Failed to save bank details!!', 'error', NOTIFICATION_TIMEOUT))
    }

  }

  deleteBankDetail = (id) => {
    this.props.deleteBankAddress({
      bank_id: id
    },
    () => {
      notify.show('Bank details deleted successfully!!', 'success', NOTIFICATION_TIMEOUT)
      this.setState({
        bank_id: '',
        edit_bank_id: '',
        invalidFields: [],
        errorMessage: [],
        haveBankAccount: false,
        addBankAccount: false,
        showAllFields: false,
        showAddressDetails: false
      })
    },
    () => notify.show('Failed to delete bank details!!', 'error', NOTIFICATION_TIMEOUT))
  }

  render() {
    const { line_1, line_2, townCity, county, district, country, postCode, addressNotFound } = this.state.addressDetails
    const { bankAddresses } = this.props
    const addressListHtml = this.props.bankAddresses.map(address => {
      return (
        <div className="form-group" key={address.id} style={{paddingBottom:'5px'}}>
          <p className="othername-list" style={{marginBottom:0}}>
            <span className="col-md-6">
              <input
                name="address"
                type="radio"
                value={address.id}
                checked={this.state.bank_id == address.id}
                onChange={this.onSelectBank}
              />
              {address.bank_acct_country}
            </span>
            <span className="col-md-4">{address.organisation_name}</span>
            <span className="othername-action col-md-2">
              <FontAwesomeIcon
                className="fa-icon"
                icon={faEdit}
                onClick={() => this.editBankDetail(address.id)}
              />
              <FontAwesomeIcon
                className="fa-icon"
                icon={faTrash}
                onClick={() => this.deleteBankDetail(address.id)}
              />
            </span>
          </p>
        </div>
      )
    })

    let addressDetailSec = "";
    if (this.state.showAllFields && this.state.showAddressDetails && !this.state.haveBankAccount && !this.state.selectedAddress) {
      addressDetailSec = ( 
         <>
          <div className="form-group row">
            <div className="col-md-4"></div>
            <div className="col-md-8"><b>Select your address</b></div>
          </div>
          { this.state.addressArray.map((address, idx) => {
              return (
              <div key={idx}>
                <div className="form-group row">
                  <div className="col-md-4"></div>
                  <label className="col-md-8">
                  <a onClick={() => this.selectAddress(address)} style={{cursor:"pointer", color:"black"}}>{address.formatted_address[0]}  {address.formatted_address[1]}  {address.formatted_address[2]}  {address.formatted_address[3]}  {address.formatted_address[4]}</a>
                  </label>
                </div>
              </div>
              )
           })
          }
        </>
      )
    }
    if (this.state.showAllFields && this.state.showAddressDetails && !this.state.haveBankAccount && this.state.selectedAddress) {
      addressDetailSec =  (
        <> 
            <div className="form-group row">
              <div className="col-md-4"></div>
              <label className="col-md-4">Line 1:</label>
              <div className="col-md-4">{line_1}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4"></div>
              <label className="col-md-4">Line 2:</label>
              <div className="col-md-4">{line_2}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4"></div>
              <label className="col-md-4">Town/City:</label>
              <div className="col-md-4">{townCity}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4"></div>
              <label className="col-md-4">County:</label>
              <div className="col-md-4">{county}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4"></div>
              <label className="col-md-4">District:</label>
              <div className="col-md-4">{district}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4"></div>
              <label className="col-md-4">Country:</label>
              <div className="col-md-4">{country}</div>
            </div>
          </>
      );
    }


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
                  <h3 className="modal-title">Bank Details</h3>
                </div>
                <div className="col-md-6 pull-right">
                  <LoaderButton
                    className="Button close-reference-btn"
                    onClick={this.closeReferenceModal}
                  >Close</LoaderButton>
                  <LoaderButton
                    className="Button save-reference-btn"
                    onClick={this.submitBankDetails}
                    disabled={!this.state.haveBankAccount && !this.state.bank_id}
                    loading={this.props.loading}
                  >Submit</LoaderButton>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="body-message add-personal-form">
                { bankAddresses.length ? addressListHtml :
                  (<div className="form-group row">
                    <label className='col-md-4 col-form-label' style={{width: "50%"}}>
                      I don't have any Bank Account
                    </label>
                    <div className="col-md-8" style={{width: "25%"}}>
                      <div className="switch-container">
                        <label>
                          <input
                            checked={this.state.haveBankAccount}
                            onChange={this.haveBankAccountFunc}
                            className="switch"
                            type="checkbox" />
                          <div><div></div></div>
                        </label>
                      </div>
                    </div>
                  </div>)}
                {!this.state.haveBankAccount && 
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label className="add-address" onClick={this.addBankAccount}>Add Bank Account</label>
                    </div>
                  </div>}
                {this.state.addBankAccount && !this.state.haveBankAccount && referenceField.map((field, idx) => {
                  const fieldName = field.name
                  const fieldType = field.type
                  const fieldTitle = field.title
                  const fieldValue = this.state.data[fieldName]
                  const options = field.options
                  return (
                    <div className="form-group row" key={idx}>
                      {fieldName === 'bank_acct_country' ?
                        <label className={`col-md-4 col-form-label ${renderValidation(this.state.invalidFields, fieldName)}`}>
                          {fieldTitle}
                        </label> : this.state.showAllFields &&
                        <label className={`col-md-4 col-form-label ${renderValidation(this.state.invalidFields, fieldName)}`}>
                          {fieldTitle}
                        </label>}
                      <div className={`${fieldName === 'address' ? 'col-md-5' : 'col-md-8'}`}>
                        {fieldName === 'bank_acct_country' ?
                          <Select
                            options={options}
                            value={fieldValue}
                            onChange={e => this.onFieldChange(fieldName, e.value)}
                          />
                          : this.state.showAllFields && fieldType === 'select' ?
                            <Select
                              options={options}
                              value={fieldValue}
                              onChange={e => this.onFieldChange(fieldName, e.value)}
                            />
                            : this.state.showAllFields &&
                            <>
                              <input type={fieldType} className="form-control" name={fieldName}
                                value={fieldValue || ''}
                                placeholder={field.placeholder ? field.placeholder : ''}
                                // onKeyPress={e => this.textIsNumberOrNot(e, fieldName)}
                                onChange={e => this.onFieldChange(fieldName, e.target.value)}
                              />
                            </>
                        }
                        <small className="required-error">{this.state.errorMessage[fieldName]}</small>
                      </div>
                      {fieldName === 'address' && this.state.showAllFields &&
                        <div className="col-md-3">
                          <LoaderButton
                            onClick={this.findAddress}
                            className="Button Button--blue find-address-btn"
                            disabled={this.state.data.address ? false : true}
                          >Find Address</LoaderButton>
                        </div>}
                    </div>
                  )
                })}
                {this.state.showAllFields && !this.state.haveBankAccount && addressNotFound ?
                  <div className="form-group row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8" style={{color: 'red'}}>Address not found</div>
                  </div>
                  :
                    addressDetailSec
                }
                <div className="form-group row">
                  <div className="col-md-12">
                    { this.state.addBankAccount && !this.state.haveBankAccount && this.state.showAllFields &&
                      <React.Fragment>
                        <LoaderButton
                          className="Button close-reference-btn"
                          onClick={this.closeBankDetails}
                        >Close</LoaderButton>
                        <LoaderButton
                          className="Button save-reference-btn"
                          onClick={this.saveBankDetails}
                          loading={this.props.loading}
                        >Save Bank Details</LoaderButton>
                      </React.Fragment>
                    }
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

export default BankDetails;
