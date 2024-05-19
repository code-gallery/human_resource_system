import React, { Component } from 'react'
import { Table, TableData } from 'components/Table'
import { renderValidation } from 'containers/Profile/utils/validation'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import LoaderButton from 'react-bootstrap-button-loader';
import { notify } from 'react-notify-toast'
import { Button } from 'react-bootstrap'
import Icon from 'components/Icon'
import Select from 'react-select'
import Modal from 'react-modal'
import moment from 'moment'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgba(0,0,0,.2)",
    boxShadow: "0 3px 9px rgba(0,0,0,.5)",
    background: "rgb(255, 255, 255)",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
    minWidth: "550px",
    maxWidth: "550px",
    maxHeight: "600px",
  }
}

const initialState = {
  note_type: '',
  note_status: '',
  note_detail: '',
  files: [],
  org_id: null,
  candidate_id: null,
  officer: null,
  created_by: null,
  created_at: null,
  updated_by: null,
  updated_at: null,
  assigned_by: null,
  deleted_at: null,
  deleted_by: null,
  other: null
}

const requiredFields = [ 'note_type', 'note_status', 'note_detail' ]

const statusOption = [ { label: 'Phone', value: 'Phone' }, { label: 'Email', value: 'Email' }, { label: 'Text', value: 'Text' }, { label: 'IM', value: 'IM' }, { label: 'Web Chat', value: 'Web Chat' }, { label: 'Video', value: 'Video' } ]

class Notes extends Component {

  constructor(props) {
    super(props)
    if (props.edit_note.id) {
      const {
        id: note_id,
        note_type,
        note_status,
        note_detail,
        files,
        org_id,
        candidate_id,
        officer,
        created_by,
        created_at,
        updated_by,
        updated_at,
        assigned_by,
        deleted_at,
        deleted_by,
        other
      } = props.edit_note
      /* const documents = this.isJsonString(files) && JSON.parse(files).map(doc => {
      const documents = files.map(doc => {
        return {
          fileContent: doc.url,
          filename: doc.docName
        }
      })*/
      this.state = {
        data: {
          note_type,
          note_status,
          note_detail,
          files,
          org_id,
          candidate_id,
          officer,
          created_by,
          created_at,
          updated_by,
          updated_at,
          assigned_by,
          deleted_at,
          deleted_by,
          other
        },
        note_id,
        isOpen: false,
        attachment: '',
        attachment_id: '',
        attachment_type: '',
        isEditable: false,
        invalidFields: []
      }
    } else {
      this.state = {
        data: initialState,
        note_id: '',
        isOpen: false,
        attachment: '',
        attachment_id: '',
        attachment_type: '',
        isEditable: true,
        invalidFields: []
      }
    }
    this.fileUploader = this.fileUploader.bind(this)
  }

  componentDidUpdate(nextProps) {
    if (this.props.edit_note.id && this.props.edit_note.id !== nextProps.edit_note.id) {
      const {
        id: note_id,
        note_type,
        note_status,
        note_detail,
        files,
        org_id,
        candidate_id,
        officer,
        created_by,
        created_at,
        updated_by,
        updated_at,
        assigned_by,
        deleted_at,
        deleted_by,
        other
      } = this.props.edit_note
      /* const documents = this.isJsonString(files) && JSON.parse(files).map(doc => {
      const documents = files.map(doc => {
        return {
          fileContent: doc.url,
          filename: doc.docName
        }
      })*/
      this.setState({
        data: {
          ...this.state.data,
          note_type,
          note_status,
          note_detail,
          files,
          org_id,
          candidate_id,
          officer,
          created_by,
          created_at,
          updated_by,
          updated_at,
          assigned_by,
          deleted_at,
          deleted_by,
          other
        },
        note_id,
        isOpen: false,
        attachment: '',
        attachment_id: '',
        attachment_type: '',
        isEditable: false,
        invalidFields: []
      })
    }
    if (!this.props.edit_note.id && this.state.note_id) {
      this.setState({
        data: initialState,
        note_id: '',
        isOpen: false,
        attachment: '',
        attachment_id: '',
        attachment_type: '',
        isEditable: true,
        invalidFields: []
      })
    }
  }

  async fileUploader({ target }) {
    const files = [ ...target.files ]
    const images = await Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = function () {
          return resolve({
            name: (file.name).split('.').slice(0, -1).join('.'),
            url: fileReader.result,
            type: file.type,
            id: Math.random()
          })
        }
        fileReader.readAsDataURL(file)
        fileReader.onerror = error => reject(error)
      })
    }))
    const filterImage = images.filter(img => !img.type.includes('image') && !img.type.includes('pdf'))
    if (filterImage.length) {
      notify.show('Please upload images/pdf', 'error', NOTIFICATION_TIMEOUT)
    } else {
      /* const attachment = images.map(img => {
        return {
          name: img.name,
          url: img.url
        }
      })*/
      const documents = [ ...this.state.data.files, ...images ]
      this.setState({
        data: {
          ...this.state.data,
          files: documents
        }
      })
    }
    target.value = null
  }

  getDate = () => {
    const currentDate = new Date(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))
    return moment(currentDate).format('YYYY-MM-DDTHH:mm:ss')
  }

  onFieldChange = (field, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  editNote = () => {
    this.setState({
      isEditable: true
    })
  }

  addNewNotes = () => {
    const { data, note_id } = this.state
    const { org_id, candidate_id, user_id } = this.props
    const invalidFields = requiredFields.filter((field) => !(data[field] && data[field].length > 0))
    this.setState({ invalidFields })
    let postData = {}
    const files = data.files.map(doc => {
      if (doc.type) {
        return {
          url: doc.url,
          name: doc.name
        }
      } else {
        return doc
      }
    })
    if (!invalidFields.length) {
      if (note_id) {
        postData = {
          ...data,
          files,
          updated_by: user_id,
          updated_at: this.getDate()
        }
      } else {
        postData = {
          ...data,
          files,
          org_id,
          candidate_id,
          officer: user_id,
          created_by: user_id,
          created_at: this.getDate(),
          updated_by: null,
          updated_at: null,
          assigned_by: user_id,
          deleted_at: null,
          deleted_by: null,
          other: null
        }
      }
      let successMessage = 'Note saved successfully!!'
      let errorMessage = 'Failed to save note!!'
      if (this.state.note_id) {
        successMessage = 'Changes saved successfully!!'
        errorMessage = 'Failed to update note!!'
      }
      this.props.saveNote({ data: postData, note_id },
        () => {
          notify.show(successMessage, 'success', NOTIFICATION_TIMEOUT)
          this.setState({
            data: initialState,
            note_id: '',
            invalidFields: []
          })
          this.props.closeNoteForm()
        },
        () => notify.show(errorMessage, 'error', NOTIFICATION_TIMEOUT))
    }
  }

  deleteNote = () => {
    const { data, note_id } = this.state
    const { user_id } = this.props
    const postData = {
      ...data,
      deleted_at: this.getDate(),
      deleted_by: user_id
    }
    this.props.deleteNote({ data: postData, note_id },
      () => {
        notify.show('Item deleted successfully!!', 'success', NOTIFICATION_TIMEOUT)
        this.setState({
          data: initialState,
          note_id: '',
          invalidFields: []
        })
        this.props.closeNoteForm()
      },
      () => notify.show('Failed to delete item!!', 'error', NOTIFICATION_TIMEOUT))
  }

  handleCloseModal = () =>{
    this.setState({
      isOpen: false,
      attachment: '',
      attachment_id: '',
      attachment_type: ''
    })
  }

  openAttachment = (attachment_id, attachment, attachment_type) =>{
    this.setState({
      isOpen: true,
      attachment,
      attachment_id,
      attachment_type
    })
  }

  deleteAttachment = () => {
    const { data, note_id, attachment, attachment_id, attachment_type } = this.state
    const files = data.files.filter(file => file.id !== attachment_id)
    const postData = {
      ...data,
      files
    }
    this.setState({
      data: postData,
      isOpen: false,
      attachment: '',
      attachment_id: '',
      attachment_type: ''
    })
    if (attachment_id) {
      if (attachment_type) {
        /* this.setState({
          data: postData,
          isOpen: false,
          attachment: '',
          attachment_id: '',
          attachment_type: ''
        }) */
      } else {
        this.props.saveNote({ data: postData, note_id },
          () => {
            notify.show('Document deleted successfully', 'success', NOTIFICATION_TIMEOUT)
            /* this.setState({
              data: postData,
              isOpen: false,
              attachment: '',
              attachment_id: '',
              attachment_type: ''
            })*/
          },
          () => notify.show('Failed to delete Document', 'error', NOTIFICATION_TIMEOUT))
      }
    }
  }

  cancelNote = () => {
    if (this.state.note_id) {
      const {
        note_type,
        note_status,
        note_detail,
        files,
        org_id,
        candidate_id,
        officer,
        created_by,
        created_at,
        updated_by,
        updated_at,
        assigned_by,
        deleted_at,
        deleted_by,
        other
      } = this.props.edit_note
      this.setState({
        data: {
          ...this.state.data,
          note_type,
          note_status,
          note_detail,
          files,
          org_id,
          candidate_id,
          officer,
          created_by,
          created_at,
          updated_by,
          updated_at,
          assigned_by,
          deleted_at,
          deleted_by,
          other
        },
        isEditable: false
      })
    } else {
      this.setState({
        data: initialState
      })
    }
  }

  render() {
    const { data, invalidFields, isEditable, attachment, attachment_id, attachment_type } = this.state
    let extension = ''
    if (attachment_id) {
      if (attachment_type) {
        extension = attachment.split(';')[0].split('/')[1]
      } else {
        extension = attachment.split('.').pop()
      }
    }
    let document = ''
    if (extension === 'pdf') {
      document =
          (/* <a
            href={attachment}
            target="_blank"
            title="Click to open document in new tab."
            className="linkwrap"
          > */
            <iframe width="400" className="iframe" height="500"
              src={attachment}
              frameBorder="0"
            ></iframe>
          )
    } else {
      document =
        (/* <a href={attachment} target="_blank"> */
          <img src={attachment} className="sliderimg" alt='' />
        )
    }
    const toDate = new Date(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))
    const currentDate = moment(toDate).format('YYYY-MM-DD HH:mm')
    const createdDate = data.created_at ? moment(new Date(data.created_at)).format('DD/MM/YYYY HH:mm') : currentDate
    return (
      <section className="CandidateRequestsTable notes-form">
        <h1 className="CandidateRequestsTable__header">
          Note Detail
          <span
            className="close-note closeButtonContainer"
            onClick={this.props.closeNoteForm}
          >
            {/* <FontAwesomeIcon
              className="fa-icon"
              icon={faWindowClose}
              onClick={this.props.closeNoteForm}
            /> */}
            <Icon
              color="#7F8DAA"
              type="close"
            />
          </span>
        </h1>
        <p className={`TableHeading ${renderValidation(invalidFields, 'note_detail')}`}>Note</p>
        <div>
          <div className="form-group row">
            <div className="col-md-12">
              <textarea
                className="form-control"
                onChange={e => this.onFieldChange('note_detail', e.target.value)}
                value={data.note_detail}
                disabled={!isEditable}
              ></textarea>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3">
              <label className={`col-form-label ${renderValidation(invalidFields, 'note_status')}`}>Status</label>
              <Select
                options={[ { label: 'Open', value: 'Open' }, { label: 'Closed', value: 'Closed' } ]}
                value={data.note_status}
                onChange={e => this.onFieldChange('note_status', e.value)}
                disabled={!isEditable}
              />
            </div>
            <div className="col-md-3">
              <label className={`col-form-label ${renderValidation(invalidFields, 'note_type')}`}>Type</label>
              <Select
                options={statusOption}
                value={data.note_type}
                onChange={e => this.onFieldChange('note_type', e.value)}
                disabled={!isEditable}
              />
            </div>
          </div>
          {data.files.length ?
            <div className="form-group row attachment-list">
              <div className="col-md-12">
                <Table className="CandidateRequestsTable__table" >
                  <thead>
                    <tr>
                      <th className="TableHeading left-align">Attachment Name</th>
                      <th className="TableHeading right-align">Attached</th>
                    </tr>
                  </thead>
                  <tbody>
                    { data.files && data.files.map((file, idx) => {
                      return (
                        <tr className="CandidatesTable__table-row" key={idx}>
                          <TableData
                            className="CandidatesTable__table-data left-align cell-width"
                            onClick={() => this.openAttachment(file.id, file.url, file.type)}
                          >
                            {file.name}
                          </TableData>
                          <TableData className="CandidatesTable__table-data right-align cell-width">
                            {createdDate}
                          </TableData>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </Table>
              </div>
            </div>
            : ''}
          <div className="form-group row action-list">
            {this.state.note_id &&
              <Button
                className="Button red-btn"
                onClick={() => { if (window.confirm('Are you sure to delete this item?')) {this.deleteNote()} } }
              >Delete</Button>
            }
            <LoaderButton
              className="Button green-btn"
              onClick={this.addNewNotes}
              disabled={!isEditable}
              loading={this.state.attachment_id === '' && this.props.pendingNote}
            >Save</LoaderButton>
            {this.state.note_id &&
              <Button
                className="Button gray-btn"
                onClick={this.editNote}
              >Edit</Button>
            }
            {/* <Button className={`btn-custom-file-upload blue-btn ${!isEditable ? 'disabled' : ''}`}>
              <input
                type="file"
                onChange={this.fileUploader}
                disabled={!isEditable}
                accept="application/pdf, image/jpeg" multiple
              />
              Upload
          </Button>*/}
            <div className="Button btn-custom-file-upload blue-btn">
              <label>
                <input
                  type="file"
                  onChange={this.fileUploader}
                  disabled={!isEditable}
                  accept="application/pdf, image/jpeg" multiple
                />
                <span className={`btn-placeholder ${!isEditable ? 'disabled' : ''}`}>Upload</span>
              </label>
            </div>
            <Button
              className="Button white-btn"
              onClick={() => this.cancelNote() }
              disabled={!isEditable}
            >Cancel</Button>
          </div>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          contentLabel="Attachment"
          ariaHideApp={false}
          overlayClassName={{
            afterOpen: 'myOverlayClass_after-open'
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Uploaded Attachment</h3>
                <div
                  onClick={this.handleCloseModal}
                  className="closeButtonContainer"
                >
                  <Icon color="#7F8DAA" type="close" />
                </div>
              </div>
              <div className="modal-body">
                <div className="modal-div note-modal">
                  {isEditable &&
                    <Button
                      className="Button red-btn delete-attachment"
                      onClick={this.deleteAttachment}
                      // disabled={!isEditable}
                    >Delete</Button>
                  }
                  <div className="uploaded-file">
                    {document}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    )
  }
}

export default Notes
