import React, { Component } from "react";
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { renderValidation } from 'containers/Profile/utils/validation'
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import Datetime from "react-datetime";
import Select from 'react-select'
import PropTypes from "prop-types"
import Loader from "components/Loader";
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'
import { gapArray } from '../../utils/reference'
import TextArea from 'components/FormElements/TextArea'

import "react-datetime/css/react-datetime.css";
import 'react-tabs/style/react-tabs.css';
import './style.css'
const countryData = require('./../../utils/countries.json')

const referenceField = [
    {
        title: 'Birth Nationality',
        type: 'select',
        name: 'birth_nationality',
        required: true,
        options: [ { label: 'United Kingdom', value: 'GB'},{ label: 'Ireland', value: 'IE' },{ label: 'India', value: 'IN' } ]
    },
    {
        title: 'Have you ever held another nationality?',
        type: 'select',
        name: 'another_nationality',
        options: [ { label: 'United Kingdom', value: 'GB'},{ label: 'Ireland', value: 'IE' },{ label: 'India', value: 'IN' } ]
    },
    {
        title: 'Home Office or port reference number, and your ARC reference',
        type: 'text',
        name: 'reference_number',
    },
    {
        title: 'Are you subject to immigration control?',
        type: 'checkbox',
        name: 'immigration_control',
    },
    {
        title: 'Your residence in the U.K. is unlawful?',
        type: 'checkbox',
        name: 'residence_unflawful',
    },
    {
        title: 'Are there any restrictions on your continued residence in the U.K.?',
        type: 'checkbox',
        name: 'continued_residence',
    },
    {
        title: 'Are there any restrictions on your continued freedom to take employment in the U.K.?',
        type: 'checkbox',
        name: 'continued_freedom',
    },
]

const customStyle = {
    content: {
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
    birth_nationality: '',
    another_nationality: '',
    reference_number: '',
    immigration_control: null,
    residence_unflawful: null,
    continued_residence: null,
    continued_freedom: null
}

const initialDesc = {
    immigration_control_desc: "",
    residence_unflawful_desc: "",
    continued_residence_desc: "",
    continued_freedom_desc: ""
}

class AddImmigrationDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: initialState,
            invalidFields: [],
            errorMessage: [],
            fieldName: '',
            description: initialDesc,
            disabledSubmitBtn: true,
            searchQuery: ''
        }
    }

    closeReferenceModal = () => {
        this.setState({
            invalidFields: [],
            errorMessage: [],
            data: initialState,
            fieldName: '',
            description: initialDesc,
            disabledSubmitBtn: true,
            searchQuery: ''
        })
        this.props.closeReferenceModal()
    }

    submitImmigrationDetails = () => {
        const invalidFields = []
        const errorMessage = []
        referenceField.map(field => {
            const fieldName = field.name
            if (field.required) {
                if (!(this.state.data[fieldName] && this.state.data[fieldName].length > 0) && typeof(this.state.data[fieldName]) === 'string') {
                    invalidFields.push(fieldName)
                }
            }
        })
        this.setState({ invalidFields, errorMessage })

        if(!invalidFields.length){
            if(this.state.data.another_nationality && (this.state.data.birth_nationality===this.state.data.another_nationality)){
                alert("'Birth Nationality' and 'Another Nationality' cannot be same.")
            } else {
                const obj = {
                    birth_nationality: this.state.data.birth_nationality,
                    other_nationality: this.state.data.another_nationality,
                    port_ref_number:  this.state.data.reference_number,
                    immigration_control_description: this.state.description.immigration_control_desc,
                    immigration_control_switcher: this.state.data.immigration_control,
                    lawful_resident_description: this.state.description.residence_unflawful_desc,
                    lawful_resident_switcher: this.state.data.residence_unflawful,
                    restrictions_resident_description: this.state.description.continued_residence_desc,
                    restrictions_resident_switcher: this.state.data.continued_residence,
                    restrictions_employment_description: this.state.description.continued_freedom_desc,
                    restrictions_employment_switcher: this.state.data.continued_freedom,
                }
                this.props.submitImmigrationDetails({
                        check_id: this.props.check_id,
                        data: obj
                    },
                    () => {
                        notify.show('Immigration details submitted successfully!!', 'success', NOTIFICATION_TIMEOUT)
                        this.props.getData(this.props.requestId)
                        this.closeReferenceModal()
                    },
                    () => notify.show('Failed to submit details!!', 'error', NOTIFICATION_TIMEOUT)
                )
            }
        }
    }

    onFieldChange = (fieldName) => {
        let disabledBtn = false
        Object.keys(this.state.data).map((keyName) => {
            if (keyName === fieldName && typeof (this.state.data[keyName]) !== 'string') {
                if (!this.state.data[fieldName] && !this.state.description[keyName + '_desc']) {
                    disabledBtn = true
                }
            }
            else if (this.state.data[keyName] && !this.state.description[keyName + '_desc'] && typeof (this.state.data[keyName]) !== 'string') {
                disabledBtn = true
            }
        })
        this.setState({
            data: {
                ...this.state.data,
                [fieldName]: !this.state.data[fieldName]
            },
            description: {
                ...this.state.description,
                [fieldName + '_desc']: null
            },
            disabledSubmitBtn: disabledBtn
        })
    }

    onInputChange = (fieldName, value) => {
        this.setState({
            data: {
                ...this.state.data,
                [fieldName]: value
            },
        })
    }

    onCountryFieldChange = (field, value) => {

        this.setState({
            searchQuery: '',
            data: {
              ...this.state.data,
              [field]: value
            }
          },
          function() {
            if(field === "birth_nationality") {
              let disabledBtn = false
              Object.keys(this.state.data).map((keyName) => {
                if(this.state.data['birth_nationality']==="") {
                    disabledBtn = true
                } else {
                    if (this.state.data[keyName] && (this.state.description[keyName + '_desc']===null || this.state.description[keyName + '_desc']=== "") && typeof (this.state.data[keyName]) !== 'string') {
                        disabledBtn = true
                    }
                }
              })
              this.setState({
                disabledSubmitBtn: disabledBtn
              })
            }
          }
        )

        
      }

    onCountryInputChange = (searchQuery) => {
        if (searchQuery) {
            this.setState({
                searchQuery
            })
        }
    }

    onChangeDescription = (e, fieldName) => {
        this.setState({
            description: {
                ...this.state.description,
                [e.target.name]: e.target.value
            },
        },
        function() {
            let disabledBtn = false
            Object.keys(this.state.data).map((keyName) => {
                if(this.state.data['birth_nationality']==="") {
                    disabledBtn = true
                } else {
                    if (this.state.data[keyName] && (this.state.description[keyName + '_desc']===null || this.state.description[keyName + '_desc']=== "") && typeof (this.state.data[keyName]) !== 'string') {
                        disabledBtn = true
                    }
                }
            })
            this.setState({
                disabledSubmitBtn: disabledBtn
            })
        })
        
    }

    render() {
        const { data, invalidFields, description, disabledSubmitBtn } = this.state
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                onRequestClose={this.closeReferenceModal}
                style={customStyle}
                contentLabel="Add Reference"
                ariaHideApp={false}
            >
                {this.props.loading ?
                    <div className="PI__loader">
                        <Loader size={65} color="#72d371" />
                    </div>
                    :
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3 className="modal-title">U.K. Immigration Status</h3>
                                    </div>
                                    <div className="col-md-6 pull-right">
                                        <LoaderButton
                                            className="Button close-reference-btn"
                                            onClick={this.closeReferenceModal}
                                        >Close</LoaderButton>
                                        <LoaderButton
                                            className="Button save-reference-btn"
                                            onClick={this.submitImmigrationDetails}
                                            disabled={disabledSubmitBtn}
                                            loading={this.props.loading}
                                            style={{ marginRight: '5px' }}
                                        >Submit</LoaderButton>
                                    </div>
                                </div>
                                <p className="mt-3">Providing your nationality and immigration details helps us determine that you are able to gain work in the U.K. and continue to work in the U.K.</p>
                            </div>
                            <div className="modal-body">
                                <div className="body-message">
                                    {referenceField.map((field, idx) => {
                                        const fieldName = field.name
                                        const fieldTitle = field.title
                                        const fieldType = field.type
                                        const fieldValue = data[fieldName]
                                        let options = field.options
                                        if (fieldName === 'birth_nationality') {
                                            options = countryData.filter(country => country.value === 'GB' || country.value === 'IE' || country.value === 'IN' || country.value === fieldValue)
                                            if (this.state.searchQuery) {
                                              options = countryData
                                            }
                                          }
                                        if (fieldName === 'another_nationality') {
                                        options = countryData.filter(country => country.value === 'GB' || country.value === 'IE' || country.value === 'IN' || country.value === fieldValue)
                                        if (this.state.searchQuery) {
                                            options = countryData
                                        }
                                        }
                                        return (
                                            <div className="immigrationWork">
                                                {
                                                    fieldType === 'text' ?
                                                        <div className="form-group row" key={idx}>
                                                            <label className={`col-md-8 col-form-label ${renderValidation(invalidFields, fieldName)}`}>
                                                               <span> {fieldTitle}</span>
                                                            </label>
                                                            <div className="col-md-4">
                                                                <input type={fieldType} className="form-control" name={fieldName}
                                                                    value={fieldValue || ''}
                                                                    placeholder={field.placeholder ? field.placeholder : ''}
                                                                    onChange={e => this.onInputChange(fieldName, e.target.value)}
                                                                />
                                                            </div>
                                                        </div> : fieldType === 'select' ?
                                                        <div className="form-group row" key={idx}>
                                                         <label className={`col-md-8 col-form-label ${renderValidation(invalidFields, fieldName)}`}>
                                                           <span> {fieldTitle}</span>
                                                         </label>
                                                         <div className="col-md-4 selectFormat">
                                                                <Select
                                                                    options={options}
                                                                    value={fieldValue}
                                                                    onInputChange={(e) => this.onCountryInputChange(e)}
                                                                    onChange={e => this.onCountryFieldChange(fieldName, e.value)}
                                                                />
                                                         </div>
                                                        </div> :
                                                        <div className="form-group row" key={idx}>
                                                            <label className='col-md-10 col-form-label'>
                                                             <span> {fieldTitle}</span>
                                                            </label>
                                                            <div className="col-md-2">
                                                                <div className="switch-container">
                                                                    <label className={`${renderValidation(invalidFields, fieldName)}`}>
                                                                        <input
                                                                            checked={fieldValue}
                                                                            onChange={e => this.onFieldChange(fieldName)}
                                                                            className="switch"
                                                                            type="checkbox" />
                                                                        <div><div></div></div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                                {data[fieldName] && fieldType !== 'text'  && fieldType !== 'select' && <TextArea name={fieldName + '_desc'} defaultValue={description[fieldName + '_desc']} label="Please provide further details" onChange={e => this.onChangeDescription(e, fieldName)} />}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Modal>
        )
    }
}

AddImmigrationDetails.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeReferenceModal: PropTypes.func.isRequired,
    addressList: PropTypes.array
}
export default AddImmigrationDetails;
