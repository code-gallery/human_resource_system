import React, { Component } from "react";
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import PropTypes from "prop-types"
import TextArea from 'components/FormElements/TextArea'

import './style.css'

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

const referenceField = [
    {
        title: 'Have you ever been found guilty by Court of any offence in any country (excluding parking but including all motoring offences even where a spot fine has been administered by the police) or have you ever been put on probation (probation order are now called community rehabilitation order) or absolutely/conditionally discharged or bound over after being charged with any offence or is there any action pending against you? You need not declare convictions which are "spent" under the Rehabilitation of Offenders Act(1974).',
        type: 'checkbox',
        name: 'guilty_by_court',
        required: true,
    },
    {
        title: 'Have you ever been convicted by a Court Martial or sentenced to detention whilst serving in the armed Forces of the UK or any Commonwealth or foreign country? You need not declare convictions which are "spent" under the Rehabilitation of Offenders act (1974).',
        type: 'checkbox',
        name: 'convicted_by_court',
        required: true,
    }, {
        title: 'Do you know of any other matters in your background which might cause your reliability or suitability to have access to Government assets to be called into question?',
        type: 'checkbox',
        name: 'government_assets',
        required: true,
    }
]

const initialState = {
    guilty_by_court: false,
    convicted_by_court: false,
    government_assets: false
}

const initialDescription = {
    guilty_by_court_desc: null,
    convicted_by_court_desc: null,
    government_assets_desc: null,
}

class AddCriminalRecord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: initialState,
            description: initialDescription,
            disabledSubmitBtn: false,
            showAlertModal: false,
            showDeclarationModal: false
        }
    }

    closeReferenceModal = () => {
        this.setState({
            data: initialState,
            description: initialDescription
        })
        this.props.closeReferenceModal()
    }

    showAlertModal = () => {
        this.setState({
            showAlertModal: true
        })
    }

    hideAlertModal = () => {
        this.setState({
            showAlertModal: false
        })
    }

    showDeclarationAlert = () => {
        this.setState({
            showDeclarationModal: true,
            showAlertModal: false
        })
    }

    hideDeclarationAlert = () => {
        this.setState({
            showDeclarationModal: false,
        })
    }

    submitCriminalRecord = () => {
        this.props.submitCriminalRecord({
            check_id: this.props.check_id,
            criminalRecord: {
                criminalDeclarationMultiLineInputBox1: this.state.description.guilty_by_court_desc,
                criminalDeclarationMultiLineInputBox2: this.state.description.convicted_by_court_desc,
                criminalDeclarationMultiLineInputBox3: this.state.description.government_assets_desc
            }
        },
            () => {
                notify.show('Criminal record submitted successfully!!', 'success', NOTIFICATION_TIMEOUT)
                this.props.getData(this.props.requestId)
                this.closeReferenceModal()
            },
            () => notify.show('Failed to save criminal record!!', 'error', NOTIFICATION_TIMEOUT)
        )
        this.hideAlertModal()
    }

    onFieldChange = (fieldName) => {
        let disabledBtn = false
        Object.keys(this.state.data).map((keyName) => {
            if (keyName === fieldName) {
                if (!this.state.data[fieldName] && !this.state.description[keyName + '_desc']) {
                    disabledBtn = true
                }
            }
            else if (this.state.data[keyName] && !this.state.description[keyName + '_desc']) {
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

    onChangeDescription = (e, fieldName) => {
        let disabledBtn = false
        Object.keys(this.state.data).map((keyName) => {
            if (keyName === fieldName) {
                if (this.state.data[fieldName] && !e.target.value) {
                    disabledBtn = true
                }
            }
            else if (this.state.data[keyName] && !this.state.description[keyName + '_desc']) {
                disabledBtn = true
            }
        })
        this.setState({
            description: {
                ...this.state.description,
                [e.target.name]: e.target.value
            },
            disabledSubmitBtn: disabledBtn
        })
    }

    render() {
        const { data, description, disabledSubmitBtn } = this.state
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgba(0,0,0,.2)',
                boxShadow: '0 3px 9px rgba(0,0,0,.5)',
                background: 'rgb(255, 255, 255)',
                borderRadius: '6px',
                outline: 'none',
                padding: '0px',
                minWidth: '500px',
                zIndex: 20
            }
        }
        return (
            <>
                <Modal
                    isOpen={this.props.isModalOpen}
                    onRequestClose={this.closeReferenceModal}
                    style={customStyle}
                    contentLabel="Add Reference"
                    ariaHideApp={false}
                >
                    <Modal
                        isOpen={this.state.showAlertModal}
                        style={customStyles}
                        overlayClassName={{
                            afterOpen: 'myOverlayClass_after-open'
                        }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="modal-title">Important Data Protection Act(1998)</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    You are supplying "personal" data as defined by the Data Protection Act 1998. You will be supplying this data to the appropriate HR, Security or Compliance authority where it may be processed exclusively for the purpose of a check against the National Collection of Criminal Records. The HR, Security or Compliance Authority will protect the information which you have provided and will ensure that it is not passed to anyone who is not authorised to see it.\n\nBy agreeing to this declaration, you are explicitly consenting for the data you provide to be processed in the manner described above. If you have any concerns, about any of the questions or what will be done with the information you provide, please contact the person who issued this form for further information
                                </div>
                                <div className="modal-footer">
                                    <LoaderButton
                                        className="Button close-reference-btn"
                                        onClick={this.hideAlertModal}
                                    >Disagree</LoaderButton>
                                     <LoaderButton
                                        className="Button save-reference-btn"
                                        onClick={this.showDeclarationAlert}
                                        style={{ marginRight: '5px' }}
                                    >Agree</LoaderButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={this.state.showDeclarationModal}
                        style={customStyles}
                        overlayClassName={{
                            afterOpen: 'myOverlayClass_after-open'
                        }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="modal-title">Declaration</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    I declare that the information I have given is true and complete to the best of my knowledge and belief. In addition, I understand that any false information I have given above may disqualify me for employment.
                                </div>
                                <div className="modal-footer">
                                    <LoaderButton
                                        className="Button close-reference-btn"
                                        onClick={this.hideDeclarationAlert}
                                    >No</LoaderButton>
                                     <LoaderButton
                                        className="Button save-reference-btn"
                                        onClick={this.submitCriminalRecord}
                                        style={{ marginRight: '5px' }}
                                    >Yes</LoaderButton>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3 className="modal-title">Criminal Record Declaration</h3>
                                    </div>
                                    <div className="col-md-6 pull-right">
                                        <LoaderButton
                                            className="Button close-reference-btn"
                                            onClick={this.closeReferenceModal}
                                        >Close</LoaderButton>
                                        <LoaderButton
                                            className="Button save-reference-btn"
                                            onClick={this.showAlertModal}
                                            disabled={disabledSubmitBtn}
                                            loading={this.props.loading}
                                            style={{ marginRight: '5px' }}
                                        >Submit</LoaderButton>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body">
                            <p className="criminal-desc criminal-header">Your employer may be required to hold material or information that needs to be protected. Your employer has a duty to protect these assets and this obligation extends to its employees and agents. Since you may become such a person please complete the following.</p>
                                <div className="body-message add-personal-form">
                                    {referenceField.map((field, idx) => {
                                        const fieldName = field.name
                                        const fieldTitle = field.title
                                        const fieldValue = data[fieldName]
                                        return (
                                            <>
                                                <div className="form-group row" key={idx}>
                                                    <label className='col-md-10 col-form-label'>
                                                        {fieldTitle}
                                                    </label>
                                                    <div className="col-md-2">
                                                        <div className="switch-container">
                                                            <label>
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
                                                {data[fieldName] && <TextArea name={fieldName + '_desc'} defaultValue={description[fieldName + '_desc']} label="Please give details" onChange={e => this.onChangeDescription(e, fieldName)} />}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

AddCriminalRecord.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeReferenceModal: PropTypes.func.isRequired,
}
export default AddCriminalRecord;
