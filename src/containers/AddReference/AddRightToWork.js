import React, { Component } from "react";
import LoaderButton from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import { renderValidation } from 'containers/Profile/utils/validation'
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { notify } from "react-notify-toast";
import PropTypes from "prop-types"
import Loader from "components/Loader";

import './style.css'

const referenceField = [
  {
    title: 'Passport',
    name: 'passport',
    description: 'A passport showing that you are a British citizen or a citizen of the United Kingdom and Colonies and have the right of abode in the United Kingdom'
  },
  {
    title: 'EU National Identity Card',
    name: 'eu_id_card',
    description: 'A passport or national identity card showing that you are a national of the European Economic Area or Switzerland'
  },
  {
    title: 'Proof of Residence',
    name: 'proof_of_residence',
    description: 'A residence permit, registration or certificate or document certifying or indicating permanent residence issued by the Home Office, Border and Immigration Agency or UK Border Agency to a national of a European Economic Area country or Switzerland'
  },
  {
    title: 'Permanent Residence Card',
    name: 'permanent_residence_card',
    description: 'A permanent residence card issued by the Home Office, Border and Immigration Agency or UK Border Agency to a family member of a national of a European Economic Area country or Switzerland'
  },
  {
    title: 'Biometric Immigration Document',
    name: 'biometric_residence_permit',
    description: 'A Biometric Immigration Document issued by the UK Border Agency to the holder which indicates the person named in it is allowed to stay indefinitely in the United Kingdom, or has no time limit on their stay in the United Kingdom'
  },
  {
    title: 'Immigration Control Exemption',
    name: 'immigration_control_exemption',
    description: 'A passport or other travel document endorsed to show that the holder is exempt from immigration control, is allowed to stay indefinitely in the United Kingdom, has the right of abode in the United Kingdom, or has no time limit on their stay in the United Kingdom'
  },
  {
    title: 'Immigration Status Document',
    name: 'immigration_status_document',
    description: 'An Immigration Status Document issued by the Home Office, Border and Immigration Agency or UK Border Agency to the holder with an endorsement indicating that the person named in it is allowed to stay indefinitely in the United Kingdom or has no time limit on their stay in the United Kingdom, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
  },
  {
    title: 'Birth Certificate (UK)',
    name: 'birth_certificate',
    description: 'A full birth certificate issued in the United Kingdom which includes the name(s) of at least one of the holder’s parents, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
  },
  {
    title: 'Adoption Certificate (UK)',
    name: 'adoption_certificate',
    description: 'A full adoption certificate issued in the United Kingdom which includes the name(s) of at least one of the holder’s adoptive parents, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
  },
  {
    title: 'Birth Certificate (Channel Islands, Isle of Man or Ireland)',
    name: 'birth_certificate_british_isles',
    description: 'A birth certificate issued in the Channel Islands, the Isle of Man or Ireland, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
  },
  {
    title: 'Adoption Certificate (Channel Islands, Isle of Man or Ireland)',
    name: 'adoption_certificate_british_isles',
    description: 'An adoption certificate issued in the Channel Islands, the Isle of Man or Ireland, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
  },
  {
    title: 'British Citizen Naturalisation Certificate',
    name: 'british_naturalisation_certificate',
    description: 'A certificate of registration or naturalisation as a British citizen, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
  },
  {
    title: 'Official Government Letter',
    name: 'government_agency_document',
    description: 'A letter issued by the Home Office, Border and Immigration Agency or UK Border Agency to the holder which indicates that the person named in it is allowed to stay indefinitely in the United Kingdom, when produced in combination with an official document giving the person’s permanent National Insurance Number and their name issued by a Government agency or a previous employer'
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

class AddRightToWork extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: initialState,
      invalidFields: [],
      errorMessage: [],
      document_images: '',
      numberOfFiles: '',
      documentName: '',
      fieldName: '',
    }
    this.fileUploader = this.fileUploader.bind(this)
  }

  async fileUploader(event) {
    const fileName =  event.target.files[0]
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
        document_images: fileName,
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

  closeReferenceModal = () => {
    this.setState({
      invalidFields: [],
      errorMessage: [],
      address_id: '',
      add_address: false,
      data: initialState,
      documentName: '',
      fieldName: '',
      numberOfFiles: '',
      document_images: ''
    })
    this.props.closeReferenceModal()
  }

  submitRightToWork = () => {
    this.props.submitRightToWork({
       check_id: this.props.check_id,
       document_images: this.state.document_images,
       referencetype: this.props.reference_type,
       fieldName: this.state.fieldName,
      },
      () => {
        notify.show('Right to work submitted successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.props.getData(this.props.requestId)
        this.closeReferenceModal()
      },
      () => notify.show('Failed to submit details!!', 'error', NOTIFICATION_TIMEOUT)
    )
  }

  uploadImage = (documentName, fieldName) => {
    this.setState({
      documentName,
      fieldName
    })
  }

  backButtonFunc = () => {
    this.setState({
      documentName: '',
      fieldName: '',
      numberOfFiles: '',
      document_images: ''
    })
  }

  render() {
    const { data, invalidFields, numberOfFiles } = this.state
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.closeReferenceModal}
        style={customStyle}
        contentLabel="Add Reference"
        ariaHideApp={false}
      >
        { this.props.loading ?
          <div className="PI__loader">
            <Loader size={65} color="#72d371" />
          </div>
          :
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="modal-title">Right To Work Check</h3>
                  </div>
                  <div className="col-md-6 pull-right" style={{marginTop: '5px'}}>
                    <LoaderButton
                      className="Button close-reference-btn"
                      onClick={this.closeReferenceModal}
                    >Close</LoaderButton>
                    {this.state.documentName && 
                    <LoaderButton
                      className="Button save-reference-btn"
                      style={{marginRight: '5px'}}
                      onClick={this.submitRightToWork}
                      disabled={numberOfFiles ? false : true }
                      // loading={this.props.loading}
                    >Submit</LoaderButton>}
                  </div>
                </div>
                {!this.state.documentName && <p className="m-0">Confirm your right to work by uploading one of these documents</p>}
              </div>
              <div className="modal-body">
                <div className="body-message right-to-work-form">
                  {referenceField.map((field, idx) => {
                    const fieldName = field.name
                    const fieldTitle = field.title
                    const fieldDescription = field.description
                    const fieldValue = data[fieldName]
                    return (
											<div>
                        {!this.state.documentName && 
                        <div className="form-group row" key={idx} onClick={() => this.uploadImage(fieldTitle, fieldName)}>
                          <label className={`col-md-8 col-form-label ${renderValidation(invalidFields, fieldName)} rightToWorkTitle`} style={{cursor: 'pointer'}}>
                            {fieldTitle}:
                          </label>
                          <p className="col-md-12 rightToWorkDesc">
                            {fieldDescription}
                          </p>
                        </div>}
                        {this.state.documentName && this.state.documentName === fieldTitle &&
                        <>
                        <div className="form-group row">
                          <LoaderButton className='col-md-2 Button back-btn' style={{marginLeft: '15px'}} onClick={this.backButtonFunc}>Back</LoaderButton>
                        </div>
                        <div className="form-group row" key={idx}>
                          <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, fieldName)}`} style={{marginTop: '15px'}}>
                            {fieldTitle}:
                          </label>
                          <div className="col-md-8">
                            <div className="btn-custom-file-upload">
                              <label>
                                <input
                                  type="file"
                                  onChange={this.fileUploader}
                                  accept="image/jpeg"
                                />
                                <span className="btn-placeholder">{numberOfFiles ? `${numberOfFiles} ${`Files`}` : 'Click here to upload Image only'}</span>
                              </label>
                            </div>
                            <small className="required-error">{this.state.errorMessage[fieldName]}</small>
                          </div>
											  </div>
                        </>
                        }
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

AddRightToWork.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeReferenceModal: PropTypes.func.isRequired,
  addressList: PropTypes.array
}
export default AddRightToWork;
