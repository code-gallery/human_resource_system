import React, { Component } from "react";
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import Datetime from "react-datetime";
import Select from 'react-select'
import PropTypes from "prop-types"
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs'
import classNames from 'classnames'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'

import "react-datetime/css/react-datetime.css";
import 'react-tabs/style/react-tabs.css';
import './style.css'
const countryData = require('./../../utils/countries.json')
const nationalityData = countryData.map(country => {
  return {
    value: country.nationality,
    label: `${country.nationality} (${country.label})`
  }
})
const referenceData = [
  { index: 0, value: 'personal_info', label: 'Personal Info', isLast: false },
  { index: 1, value: 'place_of_birth', label: 'Place of Birth', isLast: false },
  { index: 2, value: 'account_address', label: 'Addresses', isLast: true }
]
const referenceField = {
  'personal_info': [
    {
      title: 'Gender',
      type: 'select',
      name: 'gender',
      required: true,
      options: [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' } ]
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
      title: 'Forename',
      type: 'text',
      name: 'forename',
      required: true,
      options: []
    },
    {
      title: 'Middle Name',
      type: 'text',
      name: 'middle_names',
      required: false,
      options: []
    },
    {
      title: 'Surname',
      type: 'text',
      name: 'surname',
      required: true,
      options: []
    },
    {
      title: 'Mother Maiden Name',
      type: 'text',
      name: 'mothermaidenname',
      required: false,
      options: []
    },
    {
      title: 'Date of Birth',
      type: 'date',
      name: 'dob',
      required: true,
      options: []
    },
    {
      title: 'NI Number',
      type: 'text',
      name: 'national_insurance_number',
      required: false,
      placeholder: '(format: AA999999A)',
      options: []
    },
    {
      title: 'SSN',
      type: 'text',
      name: 'social_security_number',
      required: false,
      placeholder: '(format: 856-45-6789)',
      options: []
    },
    {
      title: 'Email',
      type: 'text',
      name: 'email',
      required: true,
      options: []
    },
    {
      title: 'Tel. No.',
      type: 'text',
      name: 'phone',
      required: true,
      options: []
    },
    {
      title: 'Emergency Contact Name 1',
      type: 'text',
      name: 'emergency_contact_name',
      required: false,
      options: []
    },
    {
      title: 'Emergency Contact Number 1',
      type: 'text',
      name: 'emergency_contact_number',
      required: false,
      options: []
    },
    {
      title: 'Emergency Contact Name 2',
      type: 'text',
      name: 'emergency_contact_name2',
      required: false,
      options: []
    },
    {
      title: 'Emergency Contact Number 2',
      type: 'text',
      name: 'emergency_contact_number2',
      required: false,
      options: []
    },
    {
      title: 'Criminal Record Check Reference',
      type: 'text',
      name: 'criminal_record_check_ref',
      required: false,
      options: []
    },
    {
      title: 'Do you have any health issues or a disability relevent to the position or role?',
      type: 'checkbox',
      name: 'is_disable',
      required: false,
      options: []
    },
    {
      title: 'Other Names',
      type: 'multiple',
      name: 'other_names',
      required: false,
      options: []
    }
  ],
  'other_names': [
    {
      title: 'Forename',
      type: 'text',
      name: 'forename',
      required: true,
      options: []
    },
    {
      title: 'Surname',
      type: 'text',
      name: 'surname',
      required: true,
      options: []
    },
    {
      title: 'Used From',
      type: 'date',
      name: 'from',
      required: true,
      options: []
    },
    {
      title: 'Used To',
      type: 'date',
      name: 'to',
      required: true,
      options: []
    },
    {
      title: 'Present Name',
      type: 'checkbox',
      name: 'present_name',
      required: false,
      options: []
    }
  ],
  'place_of_birth': [
    {
      title: 'Birth Town',
      type: 'text',
      name: 'town',
      required: false,
      options: []
    },
    {
      title: 'Birth County',
      type: 'text',
      name: 'county',
      required: false,
      options: []
    },
    {
      title: 'Birth Country',
      type: 'select',
      name: 'country',
      required: false,
      options: [ { label: 'United Kingdom', value: 'GB'},{ label: 'United State of America', value: 'US' } ]
    },
    {
      title: 'Birth Nationality',
      type: 'select',
      name: 'nationality',
      required: false,
      options: [ { label: 'British(United Kingdom)', value: 'GB'},{ label: 'America (United State of America)', value: 'US' } ]
    }
  ],
  'account_address': [
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
}

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
  heading: 'Personal Information',
  gender: null,
  dob: null,
  title: null,
  forename: null,
  middle_names: null,
  surname: null,
  national_insurance_number: null,
  social_security_number: null,
  phone: null,
  mothermaidenname: null,
  criminal_record_check_ref: null,
  place_of_birth: null,
  email: null,
  is_disable: null,
  emergency_contact_name: null,
  emergencyName2: null,
  emergency_contact_number: null,
  account_address: {
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
  },
  other_names: []
}

const initialOtherName = {
  forename: null,
  surname: null,
  to: null,
  from: null,
  present_name: true
}

const renderValidation = (invalidFields, field, type) => {
  if (invalidFields[type] && (type === 'account_address' || type === 'place_of_birth' || type === 'personal_info' || type === 'othername')) {
    return classNames({ 'required-error': invalidFields[type].indexOf(field) !== -1 })
  }
  return classNames({ 'required-error': invalidFields.indexOf(field) !== -1 })
}

class AddPersonalInformation extends Component {

  /* static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props, state)
    if (props.data !== state.data) {
      const data = props.personalinfo.personalInformation ? props.personalinfo.personalInformation : {}
      return {
        data
      };
    }
  } */

  constructor(props) {
    super(props)
    let data = initialState
    let address_id = ''
    if (Object.keys(props.personalinfo).length !== 0) {
      data = { ...props.personalinfo };
      delete data.snapshot;
      //delete data.addresses
      if (data.place_of_birth && typeof data.place_of_birth === 'string') {
        data.place_of_birth = JSON.parse(data.place_of_birth)
      }
      if (data.middle_names && Array.isArray(data.middle_names)) {
        const middle_names = (data.middle_names[0] && data.middle_names[0].includes('{')) ? JSON.parse(data.middle_names[0]) : data.middle_names[0]
        data.middle_names = Array.isArray(middle_names) ? middle_names[0] : middle_names
      }
      if (data.account_address) {
        address_id = data.account_address.id
      }
    }
    this.state = {
      data,
      searchQuery: '',
      activeTab: 0,
      invalidFields: [],
      errorMessage: [],
      add_address: false,
      address_id,
      edit_address: '',
      othernameActive: false,
      othername_id: '',
      othername: initialOtherName
    }
  }

  /* componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps)
    if (Object.keys(nextProps.personalinfo).length !== 0) {
      const data = nextProps.personalinfo;
      let address_id = ''
      let place_of_birth = null
      delete data.snapshot;
      // console.log('componentWillReceiveProps === ', data)
      /* if (address_id === '' && data.account_address && data.account_address.id) {
        address_id = data.account_address.id
      }
      /* else {
        data.account_address = this.state.data.account_address
        data.account_address.user_id = this.props.userId
        if (nextProps.addressList.length && nextProps.addressList[0].id) {
          data.account_address = nextProps.addressList[0]
          address_id = nextProps.addressList[0].id
        }
      }
      if (data.place_of_birth && typeof data.place_of_birth === 'string') {
        data.place_of_birth = JSON.parse(data.place_of_birth)
      }
      if (data.middle_names && Array.isArray(data.middle_names)) {
        const middle_names = (data.middle_names[0] && data.middle_names[0].includes('{')) ? JSON.parse(data.middle_names[0]) : data.middle_names[0]
        data.middle_names = Array.isArray(middle_names) ? middle_names[0] : middle_names
      }
      if (data) {
        this.setState({
          address_id,
          data
        })
      }
    }
  }*/

  onInputChange = (searchQuery) => {
    if (searchQuery) {
      this.setState({
        searchQuery
      })
    }
  }
  onFieldChange = (field, value, ref_type = '') => {
    if (ref_type === 'place_of_birth' || ref_type === 'account_address') {
      if (field === 'is_present') {
        value = !this.state.data[ref_type][field]
        this.setState({
          searchQuery: '',
          data: {
            ...this.state.data,
            [ref_type]: {
              ...this.state.data[ref_type],
              [field]: value,
              to: null
            }
          }
        })
      } else {
        this.setState({
          searchQuery: '',
          data: {
            ...this.state.data,
            [ref_type]: {
              ...this.state.data[ref_type],
              [field]: value
            }
          }
        })
      }
    } else if (ref_type === 'othername') {
      if (field === 'present_name') {
        value = !this.state.othername[field]
        this.setState({
          othername: {
            ...this.state.othername,
            [field]: value,
            to: null
          }
        })
      } else {
        this.setState({
          othername: {
            ...this.state.othername,
            [field]: value
          }
        })
      }
    } else {
      if (field === 'is_disable') {
        value = !this.state.data.is_disable
      }
      if (field === 'social_security_number') {
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{3})/, '$1-');
        value = value.replace(/-(\d{2})/, '-$1-');
        value = value.replace(/(\d)-(\d{4}).*/, '$1-$2');
      }
      this.setState({
        // errorMessage,
        data: {
          ...this.state.data,
          [field]: value
        }
      })
    }
  }

  saveInformation = () => {
    const errorMessage = []
    const invalidFields = [ ...this.state.invalidFields ]
    const { data, address_id } = this.state
    referenceData.map(ref => {
      referenceField[ref.value].map(field => {
        const fieldName = field.name
        const ref_value = ref.value
        if (ref_value === 'account_address') {
          return null
        }
        if (field.required) {
          if (ref_value === 'place_of_birth') {
            if (!(data[ref_value] && data[ref_value][fieldName] && data[ref_value][fieldName].length > 0)) {
              invalidFields[ref_value] = invalidFields[ref_value] ? invalidFields[ref_value] : []
              invalidFields[ref_value].push(fieldName)
            }
          } else if (!(data[fieldName] && data[fieldName].length > 0)) {
            invalidFields[ref_value] = invalidFields[ref_value] ? invalidFields[ref_value] : []
            invalidFields[ref_value].push(fieldName)
          }
        }
      })
    })
    if (address_id === '') {
      invalidFields['account_address'] = invalidFields['account_address'] ? invalidFields['account_address'] : []
      invalidFields['account_address'].push('address_id')
      errorMessage['account_address'] = 'Please select your current address'
    }
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const no_pattern = /^[0|+][0-9]{9,16}$/
    const no_pattern = /^[0|+][1-9][0-9]{9,16}$/
    const ni_pattern = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/
    const ssn_pattern = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/
    const digit_pattern = /\d/g
    if (!pattern.test(data.email)) {
      invalidFields['personal_info'] = invalidFields['personal_info'] ? invalidFields['personal_info'] : []
      invalidFields['personal_info'].push('email')
      errorMessage['email'] = 'Invalid email address format'
    }
    const match_no = data.phone ? data.phone.match(/\d/g) : ''
    const ph_no_digit = match_no ? match_no.join('') : ''
    if (data.phone && (!no_pattern.test(data.phone) || ph_no_digit.length < 11 || ph_no_digit.length > 15)) {
      invalidFields['personal_info'] = invalidFields['personal_info'] ? invalidFields['personal_info'] : []
      invalidFields['personal_info'].push('phone')
      errorMessage['phone'] = 'Should start from + or 0 and length between 11-15 numbers'
    }
    if (data.national_insurance_number && !ni_pattern.test(data.national_insurance_number)) {
      invalidFields['personal_info'] = invalidFields['personal_info'] ? invalidFields['personal_info'] : []
      invalidFields['personal_info'].push('national_insurance_number')
      errorMessage['national_insurance_number'] = 'Invalid format. Minimum length 9 characters'
    }
    if (data.social_security_number && !ssn_pattern.test(data.social_security_number)) {
      invalidFields['personal_info'] = invalidFields['personal_info'] ? invalidFields['personal_info'] : []
      invalidFields['personal_info'].push('social_security_number')
      errorMessage['social_security_number'] = 'Invalid format.'
    }
    this.setState({
      invalidFields,
      errorMessage
    })
    if (!invalidFields.personal_info && !invalidFields.account_address && !invalidFields.place_of_birth
      && !errorMessage.email && !errorMessage.phone && !errorMessage.account_address) {
      let userData = {}
      const postData = { ...this.state.data }
      postData.place_of_birth = JSON.stringify(postData.place_of_birth)
      postData.middle_names = [ postData.middle_names ]
      if (this.props.userId) {
        userData = {
          data: postData,
          address_id: this.state.address_id,
          user_id: this.props.userId,
        }
      } else {
        userData = {
          data: postData,
          address_id: this.state.address_id,
          candidateId: this.props.candidateId ? this.props.candidateId : '',
        }
      }
      this.props.editPersonalInfo(userData,
      () => {
        notify.show('Personal Information saved successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          activeTab: 0,
          add_address: false,
          edit_address: '',
          othernameToggle: false,
          othernameActive: false,
          othername_id: '',
          othername: initialOtherName,
          invalidFields: [],
          errorMessage: []
        })
        this.props.closeReferenceModal()
      },
      () => notify.show('Failed to saved Personal Information!!', 'error', NOTIFICATION_TIMEOUT))
    }
  }

  saveAddress = () => {
    const invalidFields = [ ...this.state.invalidFields ]
    const errorMessage = []
    const data = this.state.data
    referenceField.account_address.map(field => {
      const fieldName = field.name
      if (field.required) {
        if (!(data.account_address[fieldName] && data.account_address[fieldName].length > 0)) {
          invalidFields['account_address'] = invalidFields['account_address'] ? invalidFields['account_address'] : []
          invalidFields['account_address'].push(fieldName)
        }
      }
    })
    if (!data.account_address.is_present && !data.account_address.to) {
      invalidFields.account_address.push('to')
    }
    if (data.account_address.to && moment(data.account_address.to) < moment(data.account_address.from)) {
      invalidFields['account_address'] = invalidFields['account_address'] ? invalidFields['account_address'] : []
      invalidFields['account_address'].push('to')
      errorMessage['to'] = 'Date in Resident To field cannot be earlier than Resident From field'
    }
    this.setState({ invalidFields, errorMessage })

    if (!invalidFields.account_address) {
      let userData = {}
      const postData = { ...this.state.data }
      if (this.props.userId) {
        postData.account_address.user_id = this.props.userId
        userData = {
          address: postData.account_address,
          address_id: this.state.edit_address,
          user_id: this.props.userId
        }
      } else {
        let addresses = postData.addresses ? postData.addresses : []
        if (this.state.edit_address !== '') {
          addresses = addresses.filter(address => address.id !== this.state.edit_address)
        }
        postData.account_address.id = addresses.length && parseInt(addresses[addresses.length - 1].id) + 1
        addresses.push(postData.account_address)
        postData.addresses = addresses
        userData = {
          data: postData,
          candidateId: this.props.candidateId ? this.props.candidateId : '',
        }
        this.setState({
          data: postData
        })
      }
      this.props.saveAddress(userData,
      () => {
        // notify.show('address saved successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          add_address: false,
          invalidFields: [],
          errorMessage: []
        })
      },
      () => {
        // notify.show('Failed to save address!!', 'error', NOTIFICATION_TIMEOUT)
      })
    }
  }

  onSelectAddress = (e) => {
    const address_id = e.target.value
    const account_address = this.props.addressList.filter(address => address.id == address_id)
    this.setState({
      address_id,
      add_address: false,
      data: {
        ...this.state.data,
        account_address: account_address.length ? account_address[0] : initialState.account_address
      }
    })
  }

  addAddress = () => {
    this.setState({
      address_id: '',
      edit_address: '',
      add_address: !this.state.add_address,
      data: {
        ...this.state.data,
        account_address: initialState.account_address
      }
    })
  }

  editOtherName = (id) => {
    const othername = { ...this.state.data.other_names[id] }
    othername.present_name = othername.to ? false : true
    this.setState({
      othernameActive: true,
      othername_id: id,
      invalidFields: [],
      errorMessage: [],
      othername
    })
  }

  addOtherName = () => {
    this.setState({
      othernameActive: !this.state.othernameActive,
      errorMessage: [],
      invalidFields: [],
      othername: initialOtherName
    })
  }

  cancelOtherName = () => {
    this.setState({
      othernameActive: false,
      othername_id: ''
    })
  }

  deleteOtherName = (id) => {
    const other_names = [ ...this.state.data.other_names ]
    other_names.splice(id, 1)
    this.setState({
      othername: initialOtherName,
      othername_id: '',
      othernameActive: false,
      data: {
        ...this.state.data,
        other_names
      }
    })
  }

  saveOtherName = () => {
    const invalidFields = [...this.state.invalidFields ]
    referenceField.other_names.map(field => {
      const fieldName = field.name
      if (field.required) {
        if (!(this.state.othername[fieldName] && this.state.othername[fieldName].length > 0)) {
          if (!(field.name === 'to' && this.state.othername.present_name)) {
            invalidFields['othername'] = invalidFields['othername'] ? invalidFields['othername'] : []
            invalidFields['othername'].push(fieldName)
          }
        }
      }
    })
    const othername = { ...this.state.othername }
    const errorMessage = []
    if (othername.to && moment(othername.to) < moment(othername.from)) {
      errorMessage['othername'] = 'Date in Used To field cannot be earlier than Used From field'
    }
    this.setState({ invalidFields, errorMessage })
    if (!invalidFields.othername && !errorMessage.othername) {
      const other_names = [ ...this.state.data.other_names ]
      if (this.state.othername_id !== '') {
        other_names[this.state.othername_id] = othername
      } else {
        other_names.push(othername)
      }
      this.setState({
        othernameActive: false,
        othername: initialOtherName,
        othername_id: '',
        data: {
          ...this.state.data,
          other_names
        }
      })
    }
  }

  closeReferenceModal = () => {
    this.setState({
      activeTab: 0,
      add_address: false,
      edit_address: '',
      address_id: '',
      othernameToggle: false,
      othernameActive: false,
      othername_id: '',
      othername: initialOtherName,
      invalidFields: [],
      errorMessage: []
    })
    this.props.closeReferenceModal()
  }

  editAddress = (id) => {
    let address = this.props.addressList.filter(add => add.id === id)
    address = address.length ? address[0] : []
    if (!address.to) {
      address.is_present = true
    }
    this.setState({
      edit_address: id,
      address_id: '',
      add_address: true,
      data: {
        ...this.state.data,
        account_address: address
      }
    })
  }

  deleteAddress = (id) => {
    let userData = {}
    if (this.props.userId) {
      userData = {
        address_id: id,
        user_id: this.props.userId
      }
    } else {
      const postData = { ...this.state.data }
      const addresses = postData.addresses.filter(address => address.id !== id)
      postData.addresses = addresses
      userData = {
        data: postData,
        candidateId: this.props.candidateId ? this.props.candidateId : '',
      }
      this.setState({
        data: postData
      })
    }
    this.props.deleteAddress(userData,
      () => {
        // notify.show('Address deleted successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          add_address: false,
          address_id: '',
          edit_address: '',
          invalidFields: [],
          errorMessage: []
        })
      },
      () => notify.show('Failed to delete address!!', 'error', NOTIFICATION_TIMEOUT))
  }

  render() {
    const { invalidFields, numberOfFiles, data, othername, othernameActive } = this.state
    const addressList = this.props.addressList.map(address => {
      return (
        <p className="othername-list" key={address.id}>
          <span className="col-md-6">
            <input
              name="address"
              type="radio"
              value={address.id}
              checked={parseInt(this.state.address_id) === parseInt(address.id)}
              onChange={this.onSelectAddress}
            />
            {`${address.line1} ${address.town} ${address.county}`}
          </span>
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
    const otherNameList = (data.other_names && data.other_names.length) ? data.other_names.map((name, idx) => {
      return (
        <p className="othername-list" key={name.id}>
          <span className="address">{`${name.forename} ${name.surname}`}</span>
          <span className="othername-action">
            <FontAwesomeIcon
              className="fa-icon"
              icon={faEdit}
              onClick={() => this.editOtherName(idx)}
            />
            <FontAwesomeIcon
              className="fa-icon"
              icon={faTrash}
              onClick={() => this.deleteOtherName(idx)}
            />
          </span>
        </p>
      )
    })
      : ''
    const otherNameFields = referenceField['other_names'].map(field => {
      const fieldName = field.name
      const fieldType = field.type
      let fieldValue = othername[fieldName]
      /* if (fieldName === 'present_name' && !othername.to) {
        fieldValue = true
      }*/
      return (
        (fieldName === 'to' && (othername.present_name)) ? ''
          :
          <div className="form-group row" key={field.id}>
            <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, fieldName, 'othername')}`}>
              {field.title}
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
                      this.onFieldChange(fieldName, date.format('YYYY-MM-DD'), 'othername')
                    }
                  }}
                />
                :
                fieldType === 'checkbox' ?
                  <div className="switch-container">
                    <label>
                      <input
                        checked={fieldValue}
                        onChange={e => this.onFieldChange(fieldName, e.target.value, 'othername')}
                        className="switch"
                        type="checkbox" />
                      <div><div></div></div>
                    </label>
                  </div>
                  :
                  <input type={fieldType} className="form-control" name={fieldName}
                    value={fieldValue || ''}
                    onChange={e => this.onFieldChange(fieldName, e.target.value, 'othername')}
                  />
              }
            </div>
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
                    <h3 className="modal-title">Personal Information</h3>
                  </div>
                  <div className="col-md-6 pull-right">
                    <LoaderButton
                      className="Button close-reference-btn"
                      onClick={this.closeReferenceModal}
                    >Close</LoaderButton>
                    <LoaderButton
                      className="Button save-reference-btn"
                      onClick={this.saveInformation}
                      // loading={this.props.loading}
                    >Submit</LoaderButton>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="body-message add-personal-form">
                  <Tabs
                    selectedIndex={this.state.activeTab}
                    onSelect={index => this.setState({ activeTab: index })}
                  >
                    <TabList>
                      {
                        referenceData.map(ref => {
                          const color = invalidFields[ref.value] && invalidFields[ref.value].length ? 'red' : ''
                          return (
                            <Tab key={ref.value} style={{ color }}>{ref.label}</Tab>
                          )
                        })
                      }
                    </TabList>
                    {
                      referenceData.map((ref, index) => {
                        return (
                          <TabPanel key={index}>
                            {ref.value === 'account_address' &&
                              <div className="row address-list">
                                {addressList}
                                <small className="required-error">{this.state.errorMessage['account_address']}</small>
                                <label className="add-address" onClick={this.addAddress}>
                                  { addressList.length ? 'Click here to add other address' : 'Please ADD your current address' }
                                </label>
                              </div>
                            }
                            {referenceField[ref.value].map((field, idx) => {
                              const fieldName = field.name
                              const fieldType = field.type
                              const fieldTitle = field.title
                              const ref_value = ref.value
                              let fieldValue = data[fieldName]
                              const dataValue = data[ref_value]
                              let is_present = false
                              if (dataValue) {
                                fieldValue = dataValue[fieldName]
                                is_present = dataValue.is_present
                              }
                              // let options = fieldName === 'country' ? countryData : fieldName === 'nationality' ? nationalityData : field.options
                              let options = field.options
                              if (fieldName === 'country') {
                                options = countryData.filter(country => country.value === 'GB' || country.value === 'US' || country.value === fieldValue)
                                if (this.state.searchQuery) {
                                  options = countryData
                                }
                              }
                              if (fieldName === 'nationality') {
                                options = nationalityData.filter(country => country.value === 'British' || country.value === 'American' || country.value === fieldValue)
                                if (this.state.searchQuery) {
                                  options = nationalityData
                                }
                              }
                              if (
                                (fieldName === 'national_insurance_number' && this.props.region === 'United States')
                                || (fieldName === 'social_security_number' && this.props.region !== 'United States')
                              ) {
                                return null
                              }
                              return (
                                (
                                  (ref_value === 'account_address' && !this.state.add_address)
                                  || (fieldName === 'to' && is_present)
                                ) ?
                                  ''
                                  :
                                  fieldName === 'other_names' ?
                                    <React.Fragment>
                                      <div className="form-group row">
                                        <div className="col-md-12">
                                          <p className="othername-heading">
                                            Have you legally been known by another name?
                                          </p>
                                          {otherNameList}
                                          <label className="add-address" onClick={this.addOtherName}>
                                            Add Other Names
                                          </label>
                                        </div>
                                      </div>
                                      {othernameActive ?
                                        <React.Fragment>
                                          { otherNameFields }
                                          <small className="required-error">{this.state.errorMessage['othername']}</small>
                                          <div className="form-group row">
                                            <div className="col-md-12">
                                              {/* <LoaderButton
                                                className="Button close-reference-btn"
                                                onClick={this.cancelOtherName}
                                              >Cancel</LoaderButton> */ }
                                              <LoaderButton
                                                className="Button save-reference-btn"
                                                onClick={this.saveOtherName}
                                              >Save Name</LoaderButton>
                                            </div>
                                            <p className="othername-list"></p>
                                          </div>
                                        </React.Fragment>
                                        : ''}
                                    </React.Fragment>
                                    :
                                    <div className="form-group row" key={idx}>
                                      <label className={`col-md-5 col-form-label ${renderValidation(invalidFields, fieldName, ref_value)}`}>
                                        {fieldTitle}
                                      </label>
                                      <div className="col-md-7">
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
                                                this.onFieldChange(fieldName, date.format('YYYY-MM-DD'), ref_value)
                                              }
                                            }}
                                          />
                                          :
                                          fieldType === 'checkbox' ?
                                            <div className="switch-container">
                                              <label>
                                                <input checked={fieldValue}
                                                  onChange={e => this.onFieldChange(fieldName, e.target.value, ref_value)}
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
                                                onChange={e => this.onFieldChange(fieldName, e.value, ref_value)}
                                              />
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
                                                  value={fieldValue || ''}
                                                  placeholder={field.placeholder ? field.placeholder : ''}
                                                  onChange={e => this.onFieldChange(fieldName, e.target.value, ref_value)}
                                                />
                                        }
                                        <small className="required-error">{this.state.errorMessage[fieldName]}</small>
                                      </div>
                                    </div>
                              )
                            })}
                            <div className="form-group row">
                              <div className="col-md-12">
                                { (ref.value === 'account_address' && this.state.add_address) &&
                                  <LoaderButton
                                    className="Button save-reference-btn"
                                    onClick={this.saveAddress}
                                    loading={this.props.loading}
                                  >Save Address</LoaderButton>
                                }
                                { !ref.isLast &&
                                  <LoaderButton
                                    className="Button save-reference-btn"
                                    onClick={() => this.setState({ activeTab: parseInt(ref.index) + 1 })}
                                  >Next</LoaderButton>
                                }
                              </div>
                            </div>
                          </TabPanel>
                        )
                      })
                    }
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        }
      </Modal>
    )
  }
}

AddPersonalInformation.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeReferenceModal: PropTypes.func.isRequired,
  editPersonalInfo: PropTypes.func.isRequired,
  personalinfo: PropTypes.object,
  addressList: PropTypes.array
}
export default AddPersonalInformation;
