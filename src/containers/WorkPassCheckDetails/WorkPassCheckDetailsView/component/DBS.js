import React, { useState } from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import Button from 'react-bootstrap-button-loader';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

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
  },
};

const DBS = (props) => {
  const [ modalOpen, setModalOpen ] = useState(false)
  const [dbsType, setDbsType] = useState()
  const [ errorMessage, setErrorMessage ] = useState('')

  const updateType = type => {
    setModalOpen(true)
    if (type) {
      setDbsType(type)
    }
  }

  const onFieldChange =  e => {
    setDbsType(e.currentTarget.value)
  }

  const updateDbsType = () => {
    console.log('dbsType', dbsType)
    if (dbsType) {
      props.updateDbsType(dbsType)
      setModalOpen(false)
      setErrorMessage('')
    } else {
      setErrorMessage('Please Select DBS Type')
    }
  }

  const rejectDbsType = () => {
    setErrorMessage('')
    setModalOpen(false)
  }

  const isdbssubmitted = (props.dbs_status && props.dbs_status.includes('DBS check cannot be Initiated -GBG response is already there')) ? true : false
  let message = ''
  if (props.optiontype === 'basic' || props.optiontype === 'enhanced' || props.optiontype === 'standard') {
    message = `This will reset the DBS ${props.optiontype} and will issue a DBS Scotland check`
  }
  if (props.optiontype === 'basicscotland') {
    message = 'This will reset the DBS scotland check. Choose from below to issue a new check :'
  }
  const className = props.DBSstatus === 'Pass' ||
  props.DBSstatus === 'pass' ? 'statusText-green' : props.DBSstatus === 'Indeterminate' ? 'statusText-amber' : 'statusText';
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">
                {props.display_typename_dbs}
              </div>
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
              <h4 className="card-title">DETAILS
              { (props.optiontype === 'basic' || props.optiontype === 'enhanced' || props.optiontype === 'standard') &&
                <React.Fragment>
                  <Button
                    className="Button dbsButton2"
                    onClick={() => updateType('dbscotland')}
                    disabled={!props.isEditable || isdbssubmitted || props.check_status === 'pending'}
                  >
                    Disclosure Scotland
                  </Button>
                  <Button
                    className="Button dbsButton"
                    onClick={() => props.dbsCheckSubmit(props.checkId)}
                    disabled={!props.dbsButtonStatus || !props.isEditable || props.check_status === 'pending'}
                    loading={props.loading}
                  >
                    DBS
                  </Button>
                </React.Fragment>
              }
              { (props.optiontype === 'basicscotland') &&
                <React.Fragment>
                  <Button
                    className="Button dbsButton2"
                    onClick={() => props.dbsCheckSubmit(props.checkId)}
                    disabled={!props.dbsButtonStatus || !props.isEditable || props.check_status === 'pending'}
                    loading={props.loading}
                  >
                    Disclosure Scotland
                  </Button>
                  <Button
                    className="Button dbsButton"
                    onClick={() => updateType() }
                    disabled={!props.isEditable || isdbssubmitted || props.check_status === 'pending'}
                  >
                    DBS
                  </Button>
                </React.Fragment>
              } 
              </h4>
              <div className="row ">
                <div className="col-md-12 noPadding">
                  <div className="col-md-8 col-sm-12">
                    <p className="card-text">
                      GBG Plc - Check Result :
                      <span className = {className}>
                        {props.DBSstatus}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-12"></div>
                </div>
              </div>
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={props.checkId}
                type={props.type}
                annotationFetch={props.annotationFetch}
                annotationData={props.annotationData}
                complaince_response={props.complaince_response}
                notes={props.notes}
                userID={props.userID}
                annotationReset={props.annotationReset}
                check_status={props.check_status}
                side={props.side}
                requestId={props.requestId}
                resetSuccess={props.resetSuccess}
                orgId={props.orgId}
                isEditable={props.isEditable}
              ></AnnotationComponent>
              <NotesHistory
                notesHistory={props.annotationData.check_data}
              ></NotesHistory>
              <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}
                contentLabel="Modal"
                overlayClassName={{
                  afterOpen: "myOverlayClass_after-open",
                }}
              >
                <div className="modal-body">
                  <div className="body-message add-personal-form">
                    <p>{message}</p>
                    {(props.optiontype === 'basicscotland') &&
                      <div className="form-group row">
                        <label className="col-md-12 col-form-label">
                          <input
                            type="radio"
                            className="dbsType"
                            value="basic"
                            checked={dbsType === 'basic'} 
                            onChange={onFieldChange} />DBS Basic
                        </label>
                        <label className="col-md-12 col-form-label">
                        <input
                          type="radio"
                          className="dbsType"
                          value="standard"
                          checked={dbsType === 'standard'} 
                          onChange={onFieldChange} />DBS Standard
                        </label>
                        <label className="col-md-12 col-form-label">
                        <input
                          type="radio"
                          className="dbsType"
                          value="enhanced"
                          checked={dbsType === 'enhanced'} 
                          onChange={onFieldChange} />DBS Enhanced
                        </label>
                        <label className="col-md-12 col-form-label required-error">
                        {errorMessage}
                        </label>
                      </div>
                    }
                    <p className="dbsaction">
                      <Button
                        className="Button acceptButton"
                        onClick={updateDbsType}
                      >Accept</Button>
                      <Button
                        className="Button rejectButton"
                        onClick={rejectDbsType}
                      >Reject</Button>
                    </p>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DBS;