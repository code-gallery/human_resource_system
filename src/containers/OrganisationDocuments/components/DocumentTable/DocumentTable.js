import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeading, TableData } from 'components/Table'
import SearchBox from 'components/SearchBox'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import ColorButton from 'components/ColorButton'
import Modal from 'react-modal'
import Select from 'react-select'
import { renderValidation } from 'containers/Profile/utils/validation'
import isNull from 'lodash/isNull'
import moment from 'moment'
import './style.css'

const customStyles = {
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
    minWidth: '600px'
  }
}
const initialState = {
  documentName: '',
  documentType: '',
  associatedOrganisation: '',
  associatedFile: '',
  associatedHyperlink: '',
  actionType: '',
  orgID: '',
  documentID: '',
  persona: []
}
const requiredFields = [ 'documentName', 'documentType', 'associatedOrganisation', 'actionType' ]

class DocumentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      data: initialState,
      fileName: '',
      invalidFields: [],
      invalidMessages: '',
      isValid: true,
      associatedPersona: [],
      isAllSelected: false,
      isEdit: false,
      personaModal: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.addNewDocument = this.addNewDocument.bind(this)
    this.updateDocument = this.updateDocument.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('body')
    this.reader = new FileReader()
    this.reader.addEventListener('load', this.onFileLoad)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workPassPersonas !== this.state.persona && typeof nextProps.workPassPersonas !== 'undefined') {
      let persona = []
      let options = nextProps.workPassPersonas.map((persona) => {
        return {
          value: JSON.stringify(persona.id),
          label: persona.persona_name
        }
      })
      if (nextProps.workPassPersonas.length > 0) {
        options.unshift(
          {
            value: 'all',
            label: 'All'
          }
        )
      }
      if (!nextProps.organisationDocument.loading && nextProps.organisationDocument.persona.length) {
        if (this.state.data.associatedOrgId == nextProps.organisationDocument.persona[0].key) {
          persona = nextProps.organisationDocument.persona.map((persona) => {
            return {
              value: JSON.stringify(persona.persona_id),
              label: persona.persona_name
            }
          })
        }
      }
      this.setState({
        associatedPersona: options,
        data: {
          ...this.state.data,
          persona
        }
      })
    }
  }

  componentWillUnmount() {
    this.reader.removeEventListener('load', this.onFileLoad)
  }

  handleOpenModal() {
    this.setState({
      modalIsOpen: true,
      invalidFields: [],
      invalidMessages: '',
      data: initialState,
      isValid: true,
      fileName: '',
      isEdit: false
    });
  }

  handleCloseModal() {
    this.setState({ modalIsOpen: false});
  }

  addNewDocument() {
    const { data } = this.state
    data.persona = data.persona.filter(val => val.value !== 'all')
    const invalidFields = requiredFields.filter((field) => !(this.state.data[field] && this.state.data[field].length > 0))
    let valid = true
    if ((data.associatedFile === '' && data.associatedHyperlink === '') || (data.associatedHyperlink.length && data.associatedFile.length)) {
      valid = false
      this.setState({ invalidMessages: 'Either Upload a file, or enter a hyperlink', isValid: false })
    }
    if (!invalidFields.length && valid) {
      this.props.addDocument({
        data
      })
      this.setState({
        data: initialState,
        fileName: '',
        modalIsOpen: false,
        isValid: true,
        invalidMessages: ''
      })
    } else {
      this.setState({invalidFields})
    }
  }

  updateDocument() {
    const { data } = this.state
    data.persona = data.persona.filter(val => val.value !== 'all')
    const reqFields = [ 'documentType', 'associatedOrganisation', 'actionType' ]
    const invalidFields = reqFields.filter((field) => !(this.state.data[field] && this.state.data[field].length > 0))
    if (!invalidFields.length) {
      this.props.updateDocument({
        associatedOrgId: data.associatedOrgId,
        documentType: data.documentType,
        associatedOrganisation: data.associatedOrganisation,
        actionType: data.actionType,
        orgID: data.orgID,
        documentID: data.documentID,
        persona: data.persona
      })
      this.setState({
        data: initialState,
        fileName: '',
        modalIsOpen: false,
        isValid: true,
        invalidMessages: ''
      })
    } else {
      this.setState({invalidFields})
    }
  }

  onFileLoad = () => {
    this.setState({
      data: {
        ...this.state.data,
        associatedFile: this.reader.result
      }
    })
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]
    this.setState({fileName:file.name})
    if (file) {
      this.reader.readAsDataURL(file)
    }
  }

  selectChange = (event) => {
    this.props.fetchUserPersona(parseInt(this.props.organisationId), parseInt(event.value))
    this.setState({
      data: {
        ...this.state.data,
        associatedOrganisation: event.text,
        associatedOrgId: event.value,
        orgID: this.props.organisationId,
        persona: []
      }
    })
  }

  selectPersona = persona => {
    const selected = persona.filter(val => val.value === 'all')
    if (selected.length) {
      this.setState({
        data: {
          ...this.state.data,
          persona: this.state.associatedPersona
        },
        isAllSelected: true
      })
    } else if (this.state.isAllSelected) {
      this.setState({
        data: {
          ...this.state.data,
          persona: []
        },
        isAllSelected: false
      })
    } else {
      this.setState({
        data: {
          ...this.state.data,
          persona
        }
      })
    }
  }

  onFieldChange = (field, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  editDocument = (orgName, doc) => {
    this.props.fetchUserPersona(parseInt(this.props.organisationId), parseInt(doc.organisation.id))
    this.props.getDocPersona({ id: doc.document_id, orgId: doc.organisation.id })
    this.setState({
      modalIsOpen: true,
      isEdit: true,
      data: {
        ...this.state.data,
        orgID: this.props.organisationId,
        documentID: doc.document_id,
        documentType: doc.doc_type,
        actionType: doc.action,
        associatedOrganisation: doc.organisation.name,
        associatedOrgId: doc.organisation.id
        // persona: this.state.associatedPersona
      }
    })
  }

  toggleDropdown = data => () => {
    const { status, id, org_id } = data
    var updatedStatus = 'Active'
    if (status === 'Active') {
      updatedStatus = 'Inactive'
    }
    this.props.edit({ updatedStatus, id, org_id })
  }

  getDocPersona = (id) => {
    this.props.getDocPersona({ id: id })
    this.setState({ personaModal: true })
  }

  handleClosePersonModal = () => {
    this.setState({ personaModal: false});
  }

  getAssociatedPersonaLabel = ({ placeholderButtonLabel, value }) => {
    if (value && value.some((o) => o.value === "all")) {
      return 'All';
    } else if(value.length === 0){
      return placeholderButtonLabel
    } else {
      return `${value.length} selected`;
    }
  }

  render() {
    const { title, orgOptions, organisationDocument, onSearch} = this.props
    const { data, invalidFields, fileName, invalidMessages, isValid } = this.state
    let documents = organisationDocument.data
    if (organisationDocument.q) {
      documents = organisationDocument.searchedDoc
    }
    return (
      <section className="CandidatesTable">
        <div className="row">
          <div className="col-md-6 pull-left">
            <h1 className="CandidatesTable__header">{title}</h1>
          </div>
          <div className='col-md-4'>
            <SearchBox
              className="Candidates__search"
              placeholder="Search by Document Name"
              onSearch={onSearch}
            />
          </div>
          <div className='col-md-2 pull-right'>
            <ColorButton color="green" onClick={this.handleOpenModal}>New Document</ColorButton>
          </div>
        </div>

        <Table className="CandidatesTable__table document-table">
          <thead >
            <tr style={{borderTop:"2px solid #262626",borderBottom:"2px solid #262626"}}>
              <TableHeading>Doc ID</TableHeading>
              <TableHeading>Organisation</TableHeading>
              <TableHeading>Document</TableHeading>
              <TableHeading>Type</TableHeading>
              <TableHeading>Persona</TableHeading>
              <TableHeading>Action</TableHeading>
              <TableHeading>Created Date</TableHeading>
              <TableHeading>Uploaded By</TableHeading>
              { /* <TableHeading>Updated Date</TableHeading> */}
              <TableHeading>Updated By</TableHeading>
              <TableHeading>Status</TableHeading>
              <TableHeading></TableHeading>
            </tr>
          </thead>
          <tbody>
            {
              documents.length > 0 ?
                documents.map((doc, idx) => {
                  const isFirst = idx === 0
                  const createdAt = new moment(doc.created_at)
                  const orgName = isNull(doc.organisation) || isNull(doc.organisation.name) ? '––' : doc.organisation.name
                  const updatedBy = isNull(doc.updatedBy) || isNull(doc.updatedBy.first_name) || isNull(doc.updatedBy.last_name) ? '––' : `${doc.updatedBy.first_name} ${doc.updatedBy.last_name}`
                  const createdBy = isNull(doc.createdBy) || isNull(doc.createdBy.first_name) || isNull(doc.createdBy.last_name) ? '––' : `${doc.createdBy.first_name} ${doc.createdBy.last_name}`
                  var documentURL = isNull(doc.document) || isNull(doc.document.url) ? '' : doc.document.url
                  var prefix = 'https://';
                  if (documentURL.substr(0, prefix.length) !== prefix) {
                    documentURL = prefix + documentURL
                  }
                  const toggleDropdown = this.toggleDropdown(doc)
                  return (
                    <tr
                      className="CandidatesTable__table-row"
                      key={doc.id}>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:"middle"}} top={isFirst}>
                        {idx + 1}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:"middle"}} top={isFirst}>
                        {orgName}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width CandidatesTable__table-data--view" style={{verticalAlign:"middle"}} top={isFirst}>
                        <a href={documentURL} target="_blank" rel="noreferrer noopener" >{doc.doc_name}</a>
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:"middle"}} top={isFirst}>
                        {doc.doc_type}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width persona" style={{verticalAlign:"middle"}} top={isFirst} onClick={ () => this.getDocPersona(doc.document_id)}>
                        {idx + 1}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        {doc.action}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        {createdAt.format("DD/MM/YYYY")}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        {createdBy}
                      </TableData>
                      { /* <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        {updatedAt.format("DD/MM/YYYY")}
                        </TableData> */ }
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        {updatedBy}
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        <ColorButton color={(doc.status==='Active') ? "blue" : "red"} onClick={toggleDropdown}>{doc.status}</ColorButton>
                      </TableData>
                      <TableData className="CandidatesTable__table-data cell-width" style={{verticalAlign:" middle"}} top={isFirst}>
                        <ColorButton color="green" onClick={() => this.editDocument(orgName, doc)}>Edit</ColorButton>
                      </TableData>
                    </tr>
                  )
                }) : ''
            }
          </tbody>
        </Table>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName={{
            afterOpen: 'myOverlayClass_after-open'
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row">
                  <div className="col-md-9">
                    <h3 className="modal-title">Upload Document</h3>
                  </div>
                  <div className="col-md-3 pull-right">
                    <ColorButton color="red" onClick={this.handleCloseModal}>Close</ColorButton>
                  </div>
                </div>
                { /* <div onClick={this.handleCloseModal} className=" closeButtonContainer" >
                    <Icon color="#7F8DAA" type="close" />
                </div> */}
              </div>
              <div className="modal-body">
                <div className="body-message add-document-form">
                  { !this.state.isEdit &&
                    <div className="form-group row">
                      <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'documentName')}`}>Document Name</label>
                      <div className="col-md-8">
                        <input type="text" className={`form-control`} name="documentName"
                          value={data.documentName} 
                          onChange={(e)=>{e.preventDefault(); this.onFieldChange('documentName',e.target.value)}}
                        />
                      </div>
                    </div>
                  }
                  <div className="form-group row">
                    <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'documentType')}`}>Document Type</label>
                    <div className="col-md-8">
                      <Select
                        name="documentType"
                        options={[
                          {
                            value: 'Policy',
                            label: 'Policy'
                          },
                          {
                            value: 'Contract',
                            label: 'Contract'
                          },
                          {
                            value: 'NDA',
                            label: 'NDA'
                          },
                          {
                            value: 'Declarations',
                            label: 'Declarations'
                          },
                          {
                            value: 'Process & Procedure',
                            label: 'Process & Procedure'
                          },
                          {
                            value: 'Guide',
                            label: 'Guide'
                          }
                        ]}
                        value={data.documentType || ''}
                        onChange={(e)=>{this.onFieldChange('documentType', e.value)}}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'associatedOrganisation')}`}>Associated Organisation</label>
                    <div className="col-md-8">
                      <Select
                        name="select-content"
                        options={orgOptions}
                        labelKey="text"
                        valueKey="text"
                        value={{ text: data.associatedOrganisation || "Select..."}}
                        onChange={this.selectChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'associatedPersona')}`}>Associated Persona</label>
                    <div className="col-md-8 persona">
                      <ReactMultiSelectCheckboxes
                        options={this.state.associatedPersona}
                        onChange={this.selectPersona}
                        value={data.persona}
                        getDropdownButtonLabel={this.getAssociatedPersonaLabel}
                      />
                    </div>
                  </div>
                  { !this.state.isEdit &&
                  <React.Fragment>
                    <div className="form-group row">
                      <label className={`col-md-4 col-form-label ${isValid ? "" : "required-error"}`}>Associated File</label>
                      <div className="col-md-8">
                        <div className="btn-custom-file-upload">
                          <label>
                            <input
                              type="file"
                              onChange={this.handleFileChange}
                              accept="application/pdf"
                              ref={ref=> this.fileInput = ref}
                            />
                            <span>{fileName ? fileName : 'Click here to upload file(PDF only)'}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className={`col-md-4 col-form-label ${isValid ? "" : "required-error"}`}>Associated Hyperlink</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" name="associatedHyperlink"
                          value={data.associatedHyperlink} 
                          onChange={(e)=>{e.preventDefault(); this.onFieldChange('associatedHyperlink',e.target.value)}}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                  }
                  <div className="form-group row">
                    <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'actionType')}`}>Action Type</label>
                    <div className="col-md-8">
                      <Select
                        name="actionType"
                        options={[
                          {
                            value: 'Agreed & Signed',
                            label: 'Agree and Sign'
                          },
                          {
                            value: 'Confirm Read',
                            label: 'Confirm Read'
                          },
                          {
                            value: 'Print and Sign',
                            label: 'Print and Sign'
                          }
                        ]}
                        value={data.actionType|| ''} 
                        onChange={(e)=>{this.onFieldChange('actionType',e.value)}}
                      />
                    </div>
                  </div>
                  {!isValid && (<div className="required-error">{invalidMessages}</div>)}
                </div>
              </div>
              <div className="modal-footer">
                <center>
                  { this.state.isEdit ?
                    <ColorButton color="green" onClick={this.updateDocument} >Update</ColorButton>
                    :
                    <ColorButton color="green" onClick={this.addNewDocument} >Save</ColorButton>
                  }
                </center>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.personaModal}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleClosePersonModal}
          style={customStyles}
          contentLabel="Persona Modal"
          overlayClassName={{
            afterOpen: 'myOverlayClass_after-open'
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row">
                  <div className="col-md-9">
                    <h3 className="modal-title">Associated Persona</h3>
                  </div>
                  <div className="col-md-3 pull-right">
                    <ColorButton color="red" onClick={this.handleClosePersonModal}>Close</ColorButton>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="body-message">
                  {
                    organisationDocument.loading ? 'Loading...' :
                      organisationDocument.persona.length ?
                        <ul className="persona-list">
                          {organisationDocument.persona.map((val, id) => <li key={id}>{val.persona_name}</li>
                          )}
                        </ul>
                        :
                        'No Associated Persona'
                  }
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    )
  }
}

DocumentTable.propTypes = {
  // candidates: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   email: PropTypes.string.isRequired,
  //   requests: PropTypes.array.isRequired,
  //   userId: PropTypes.number,
  //   profileImage: PropTypes.string,
  //   firstName: PropTypes.string,
  //   lastName: PropTypes.string
  // })).isRequired,
  title: PropTypes.string,
  // organisationId: PropTypes.number.isRequired
}

DocumentTable.defaultProps = {
  title: 'Documents'
}

export default DocumentTable
