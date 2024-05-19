import React, { Component } from "react";
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { renderValidation } from 'containers/Profile/utils/validation'
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import Datetime from "react-datetime";
import Select from 'react-select'
import PropTypes from "prop-types"
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'
import { gapArray } from '../../utils/reference'

import "react-datetime/css/react-datetime.css";
import 'react-tabs/style/react-tabs.css';
import './style.css'
const countryData = require('./../../utils/countries.json')

const referenceField = [
  {
    title: 'Line 1',
    type: 'text',
    name: 'line1',
    required: true,
    options: []
  },
  {
    title: 'Line 2',
    type: 'text',
    name: 'line2',
    required: false,
    options: []
  },
  {
    title: 'Town / City',
    type: 'text',
    name: 'town',
    required: true,
    options: []
  },
  {
    title: 'County',
    type: 'text',
    name: 'county',
    required: true,
    options: []
  },
  {
    title: 'Country',
    type: 'select',
    name: 'country',
    required: true,
    options: [ { label: 'United Kingdom', value: 'GB'},{ label: 'United State of America', value: 'US' } ]
  },
  {
    title: 'Postcode',
    type: 'text',
    name: 'postcode',
    required: true,
    options: []
  },
  {
    title: 'Resident From',
    type: 'date',
    name: 'from',
    required: true,
    options: []
  },
  {
    title: 'Present Address',
    type: 'checkbox',
    name: 'is_present',
    required: false,
    options: []
  },
  {
    title: 'Resident To',
    type: 'date',
    name: 'to',
    required: false,
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
  //id: null,
  user_id: null,
  //address_type: null,
  line1: null,
  line2: null,
  town: null,
  county: null,
  country: null,
  from: null,
  to: null,
  documents: null,
  is_present: true
}

class AddressHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: initialState,
      invalidFields: [],
      errorMessage: [],
      add_address: false,
      address_id: '',
      document_images: '',
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
        document_images: '',
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

  handleImageChange = (e) => {
    this.setState({
      document_images: e.target.files[0]
    })
  };

  onFieldChange = (field, value) => {
    if (field === 'is_present') {
      value = !this.state.data.is_present
    }
    this.setState({
      searchQuery: '',
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  onInputChange = (searchQuery) => {
    if (searchQuery) {
      this.setState({
        searchQuery
      })
    }
  }

  saveAddress = () => {
    const invalidFields = []
    const errorMessage = []
    const data = this.state.data
    referenceField.map(field => {
      const fieldName = field.name
      if (field.required) {
        if (!(this.state.data[fieldName] && this.state.data[fieldName].length > 0)) {
          invalidFields.push(fieldName)
        }
      }
    })
    if (!data.is_present && !data.to) {
      invalidFields.push('to')
    }
    if (data.to && moment(data.to) < moment(data.from)) {
      invalidFields.push('to')
      errorMessage['to'] = 'Date in Resident To field cannot be earlier than Resident From field'
    }
    this.setState({ invalidFields, errorMessage })

    if (!invalidFields.length) {
      const postData = { ...this.state.data }
      let successMessage = 'Address saved successfully!!'
      if (this.state.address_id) {
        successMessage = 'Changes saved successfully'
      }
      this.props.saveAddress({
        address: postData,
        address_id: this.state.address_id
      },
      () => {
        notify.show(successMessage, 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          add_address: false,
          address_id: '',
          invalidFields: [],
          errorMessage: []
        })
      },
      () => notify.show('Failed to save address!!', 'error', NOTIFICATION_TIMEOUT))
    }
  }

  addAddress = () => {
    this.setState({
      address_id: '',
      add_address: !this.state.add_address,
      data: initialState
    })
  }

  editAddress = (id) => {
    let address = this.props.addressList.filter(add => add.id === id)
    address = address.length ? address[0] : []
    if (!address.to) {
      address.is_present = true
    }
    this.setState({
      address_id: id,
      add_address: true,
      data: address
    })
  }

  closeReferenceModal = () => {
    this.setState({
      invalidFields: [],
      errorMessage: [],
      address_id: '',
      add_address: false,
      data: initialState
    })
    this.props.closeReferenceModal()
  }

  deleteAddress = (id) => {
    this.props.deleteAddress({
      address_id: id
    },
      () => {
        // notify.show('Address deleted successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          add_address: false,
          address_id: '',
          invalidFields: [],
          errorMessage: [],
          data: initialState
        })
      },
      () => notify.show('Failed to delete address!!', 'error', NOTIFICATION_TIMEOUT))
  }

  submitAddressHistory = (e) => {
    e.preventDefault()
    if (this.state.document_images) {
      const { check_id, requestId, addressList, reference_type, submitAddressHistory, fetchCandidateCheckDetails} = this.props
      submitAddressHistory(
        {
          addressList: addressList,
          document_images: this.state.document_images,
          referencetype: reference_type,
          check_id
        },
        () => {
          notify.show('Address history submitted successfully!!', 'success', NOTIFICATION_TIMEOUT)
          this.setState({
            invalidFields: [],
            errorMessage: [],
            document_images: [],
            numberOfFiles: ''
          })
          fetchCandidateCheckDetails(requestId)
          this.closeReferenceModal()
        },
        () => notify.show('Failed to submit address history!!', 'error', NOTIFICATION_TIMEOUT))
    } else {
      const errorMessage = []
      errorMessage['document_images'] = 'Please upload current address proof'
      this.setState({
        errorMessage
      })
    }
  }

  render() {
    const { data, invalidFields, numberOfFiles } = this.state
    const { addressList, refOption } = this.props

    const addedYear = parseInt(refOption.substring(0, 1))
    const dateArray = addressList.map(address => {
      const from = new Date(moment(address.from, 'YYYY-MM-DD').format('MM/DD/YYYY')).getTime()
      const to = address.to ? new Date(moment(address.to, 'YYYY-MM-DD').format('MM/DD/YYYY')).getTime() : new Date().getTime()
      return { from, to }
    })
    const gaps = gapArray(dateArray, addedYear)
    const gapListHtml = gaps.map((gap, idx) => {
      return (
        <p className="othername-list" key={idx}>
          <span className="col-md-6 address-gap">Missing</span>
          <span className="col-md-6">{`${moment(gap.from).format('DD/MM/YYYY')} - ${moment(gap.to).format('DD/MM/YYYY')}`}</span>
        </p>
      )
    })

    const addressListHtml = this.props.addressList.map(address => {
      return (
        <p className="othername-list" key={address.id}>
          <span className="col-md-6">{`${address.line1} ${address.town} ${address.county}`}</span>
          <span className="col-md-4">{`${moment(address.from).format('DD/MM/YYYY')} - ${address.to ? moment(address.to).format('DD/MM/YYYY') : 'Present'}`}</span>
          <span className="othername-action col-md-2">
            <FontAwesomeIcon
              className="fa-icon"
              icon={faEdit}
              onClick={() => this.editAddress(address.id)}
            />
            <FontAwesomeIcon
              className="fa-icon"
              icon={faTrash}
              onClick={() => this.deleteAddress(address.id)}
            />
          </span>
        </p>
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
        {/* this.props.loading ?
          <div className="PI__loader">
            <Loader size={65} color="#72d371" />
          </div>
          : */
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="modal-title">Address History</h3>
                  </div>
                  <div className="col-md-6 pull-right">
                    <LoaderButton
                      className="Button close-reference-btn"
                      onClick={this.closeReferenceModal}
                    >Close</LoaderButton>
                    <LoaderButton
                      className="Button save-reference-btn"
                      onClick={this.submitAddressHistory}
                      disabled={(gaps.length) ? true : false}
                      //loading={this.props.loading}
                    >Submit</LoaderButton>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="body-message add-personal-form">
                  <div className="form-group row">
                    <div className="col-md-12">
                      { addressList.length ? gapListHtml
                        :
                        (
                        <div className="form-group row">
                          <div className="col-md-12" style={{'border-bottom': '1px solid #e5e5e5'}}>
                            <p>
                              <span className="address-gap">Please add {addedYear} {addedYear > 1 ? 'years' : 'year'} of address history</span>
                            </p>
                          </div>
                        </div>
                        )
                      }
                      {addressListHtml}
                      <small className="required-error">{this.state.errorMessage['account_address']}</small>
                      <label className="add-address" onClick={this.addAddress}>
                        { addressList.length ? 'Click here to add other address' : 'Add Address' }
                      </label>
                      <form encType="multipart/form-data" action="" onSubmit={this.submitAddressHistory}>
                        <div className="btn-custom-file-upload">
                          <label>
                            <input
                              type="file"
                              onChange={this.fileUploader}
                              accept="image/jpeg"
                            />
                            <span className={`btn-placeholder ${this.state.errorMessage['document_images'] ? `required-error` : 'abbbbb'}`}>{numberOfFiles ? `${numberOfFiles} ${`Files`}` : 'Upload proof of current address'}</span>
                          </label>
                        </div>
                        {/* <button type="submit">submit image</button> */}
                      </form>
                    </div>
                  </div>
                  {this.state.add_address && referenceField.map((field, idx) => {
                    const fieldName = field.name
                    const fieldType = field.type
                    const fieldTitle = field.title
                    const fieldValue = data[fieldName]
                    let options = field.options
                    if (fieldName === 'country') {
                      options = countryData.filter(country => country.value === 'GB' || country.value === 'US' || country.value === fieldValue)
                      if (this.state.searchQuery) {
                        options = countryData
                      }
                    }
                    return (
                      (fieldName === 'to' && data.is_present)
                        ? ''
                        :
                        <div className="form-group row" key={idx}>
                          <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, fieldName)}`}>
                            {fieldTitle}
                          </label>
                          <div className="col-md-8">
                            { fieldType === 'date' ?
                              <Datetime
                                value={fieldValue ? moment(fieldValue) : ''}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                                closeOnSelect={true}
                                disableCloseOnClickOutside={true}
                                isValidDate={current =>current.isBefore(moment())}
                                onChange={(date) => {
                                  if (date && date.format) {
                                    this.onFieldChange(fieldName, date.format('YYYY-MM-DD'))
                                  }
                                }}
                              />
                              :
                              fieldType === 'checkbox' ?
                                <div className="switch-container">
                                  <label>
                                    <input checked={fieldValue}
                                      onChange={e => this.onFieldChange(fieldName, e.target.value)}
                                      className="switch"
                                      type="checkbox" />
                                    <div><div></div></div>
                                  </label>
                                </div>
                                : fieldType === 'select' ?
                                  <Select
                                    options={options}
                                    value={fieldValue}
                                    onInputChange={(e) => this.onInputChange(e)}
                                    onChange={e => this.onFieldChange(fieldName, e.value)}
                                  />
                                    :
                                    <input type={fieldType} className="form-control" name={fieldName}
                                      value={fieldValue || ''}
                                      placeholder={field.placeholder ? field.placeholder : ''}
                                      onChange={e => this.onFieldChange(fieldName, e.target.value)}
                                    />
                            }
                            <small className="required-error">{this.state.errorMessage[fieldName]}</small>
                          </div>
                        </div>
                    )
                  })
                  }
                  <div className="form-group row">
                    <div className="col-md-12">
                      { this.state.add_address &&
                        <LoaderButton
                          className="Button save-reference-btn"
                          onClick={this.saveAddress}
                          loading={this.props.loading}
                        >Save Address</LoaderButton>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </Modal>
    )
  }
}

AddressHistory.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeReferenceModal: PropTypes.func.isRequired,
  addressList: PropTypes.array
}
export default AddressHistory;
