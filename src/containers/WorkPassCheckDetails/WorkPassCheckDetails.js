import React, { Component } from 'react'
import isNull from 'lodash/isNull'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import WorkPassMain from 'components/WorkPassMain'
import Layout from 'containers/Layout'
import WorkPassCheckDetailsView from './WorkPassCheckDetailsView/WorkPassCheckDetailsView'
import WorkPassCheckDetailsHeader from './WorkPassCheckDetailsHeader/WorkPassCheckDetailsHeader'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT, getApiUrl } from 'containers/constants'
import httpFetch from "utils/httpFetch";
import Loader from "components/Loader";

class WorkPassCheckDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type : this.props.match.params.type,
      modalIsOpen : false,
      documentModalIsOpen: false,
      EmpdocumentModalIsOpen: false,
      EdudocumentModalIsOpen: false,
      AgencydocumentModalIsOpen: false,
      SelfdocumentModalIsOpen: false,
      UnempdocumentModalIsOpen: false,
      PersonaldocumentModalIsOpen: false,
      viewDocumentModalIsOpen:false,
      letterModalIsOpen: false,
      viewModalIndex: "",
      docModalIndex: "",
      letterModalIndex: '',
      side: "",
      check_status: "",
      typename_dbs: "",
      editRefIds: [],
      cancelRefIds: [],    
      isManullyCompleted: false
    }
  }

  componentDidMount() {
    const { requestId, orgId, candidateId, checkId, type, side, status, optiontype} = this.getUrlParams()
    if (type === 'directorship_checks' || type === 'administrator_uploads' || type === 'dbs_identity' || type === 'right_to_work' || type === 'candidate_uploads') {
      const payload = {
        referencetype: type,
        checkid: checkId,
      }
      this.props.viewUploadedDocuments({ payload })
    }
    this.setState({
      side : side,
      check_status: status,
      typename_dbs: optiontype
    })

    if (type === 'employment_reference') {
      const checkType = 'employment_reference'
      this.props.fetchChecksDetails(requestId, orgId, candidateId, checkId, checkType)
    } else {
      const checkType = type
      this.props.fetchChecksDetails(requestId, orgId, candidateId, checkId, checkType)
    }
    this.props.annotationFetch({checkId, type})
    this.props.requestCandidate(orgId, candidateId)
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    this.props.resetCheckDetails()
    //window.removeEventListener("beforeunload", this.onUnload);
  }

  onUnload = e => {
    if (this.state.editRefIds.length > 0) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  addReferee = (data) => {
    this.props.refreeMail(data, 
      () =>{notify.show('Refree added successfully!!', 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to add refree!!', 'error', NOTIFICATION_TIMEOUT))
  }

  addDocuments = (data) => {
    const { requestId, orgId, candidateId,checkId,type} = this.getUrlParams()
    let fetchData = {
      orgId: orgId,
      candidateId: candidateId,
      requestId: requestId,
      checkId: checkId,
      check_type: type
    }

    this.props.uploadDocuments(data, 
      () =>{notify.show("Documents uploaded successfully!!", 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to upload documents!!', 'error', NOTIFICATION_TIMEOUT), fetchData)
  }

  /* saveEmpEliData = (data) => {
    const { requestId, orgId, candidateId, checkId } = this.getUrlParams()
    const postData = {
      name: 'employment_eligibility_documents',
      checkId,
      requestId,
      orgId,
      candidateId,
      data
    }
    this.props.saveEmpEliData(postData,
      () => notify.show('Documnent data saved successfully!!', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to save document data!!', 'error', NOTIFICATION_TIMEOUT))
  }

  editEmpEliData = (data) => {
    console.log('editEmpData', data)
    const { checkId } = this.getUrlParams()
    const postData = {
      checkId,
      data
    }
    this.props.editEmpEliData(postData,
      () => notify.show('Document data updated successfully!!', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to update data!!', 'error', NOTIFICATION_TIMEOUT))
  }

  certifyEmpEliData = (data) => {
    const { requestId, orgId, candidateId, checkId } = this.getUrlParams()
    const postData = {
      name: 'employment_eligibility_documents',
      checkId,
      requestId,
      orgId,
      candidateId,
      data
    }
    console.log('postdataa', postData)
    this.props.certifyEmpEliData(postData,
      () => notify.show('Documnent data certified successfully!!', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to certify data!!', 'error', NOTIFICATION_TIMEOUT))
  }*/

  getUrlParams() {
    const {
      params: {
        orgId,
        candidateId,
        requestId,
        checkId,
        type,
        side, 
        status,
        refOption,
        optiontype,
        vOrgId
      }
    } = this.props.match

    return {
      orgId: parseInt(orgId, 10),
      candidateId: parseInt(candidateId, 10),
      requestId: parseInt(requestId, 10),
      checkId: parseInt(checkId, 10),
      type,
      side,
      status,
      refOption,
      optiontype,
      vOrgId: parseInt(vOrgId, 10)
    }
  }

  openModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  openLetterModal = (idx) => {
    this.setState({
      letterModalIndex: idx,
      letterModalIsOpen: !this.state.letterModalIsOpen
    })
  }

  openDocumentUploadModal = (idx) => {
    this.setState({
      docModalIndex: idx,
      documentModalIsOpen: !this.state.documentModalIsOpen
    })
  }

  openDocumentViewModal = (idx) => {
    this.setState({
      viewModalIndex: idx,
      viewDocumentModalIsOpen: !this.state.viewDocumentModalIsOpen
    })
  }

  softDeleteCheck = (refId) => {
    const { requestId, orgId, candidateId,checkId,type } = this.getUrlParams()
    this.props.softDeleteCheck({refId,requestId, orgId, candidateId,checkId,type},
      () =>{notify.show("Soft Delete Successful!!", 'success', NOTIFICATION_TIMEOUT)},
      () => notify.show('Soft Delete Failed!!', 'error', NOTIFICATION_TIMEOUT))
    let complaince_response_data = {
      complaince_response: "Officer Deleted",
      notes: `Reference #${refId} has been deleted by an officer.`,
      check_id: checkId,
      check_type: type,
      user_id: candidateId,
      requestId: requestId
    }
    this.props.annotationSubmit(complaince_response_data,
      () =>{notify.show('Response saved successfully.', 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to save response.', 'error', NOTIFICATION_TIMEOUT))
  }

  closeCheck = (refId) => {
    const { requestId, orgId, candidateId, checkId, type } = this.getUrlParams()
    this.props.closeCheck({refId, requestId, orgId, candidateId, checkId, type},
      () =>{notify.show('Reference received!!', 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to receive reference!!', 'error', NOTIFICATION_TIMEOUT))
  }

  editCheck = (refId) => {
    let editIds = this.state.editRefIds
    editIds.push(refId)
    this.setState({
      editRefIds: editIds
    })
  }

  saveCheck = (data, reference_id, refGeneratedFrom) => {
    const { requestId, candidateId, checkId, type } = this.getUrlParams()
    this.props.saveOfficerCheckData(
      {
        type,
        checkId,
        requestId,
        reference_id,
        data
      },
      () => {
        notify.show(
          this.props.successMessage ? this.props.successMessage : 'Data saved sucessfully!!',
          'success',
          NOTIFICATION_TIMEOUT
        );
        let complaince_response_data = {
          complaince_response: 'Officer Edited',
          notes: `${refGeneratedFrom} Generated #${reference_id} referenced has been edited by an officer.`,
          check_id: checkId,
          check_type: type,
          user_id: candidateId,
          requestId: requestId
        }
        this.props.annotationSubmit(complaince_response_data,
          () => notify.show('Response saved successfully.', 'success', NOTIFICATION_TIMEOUT),
          () => notify.show('Failed to save response.', 'error', NOTIFICATION_TIMEOUT))
        let editIds = this.state.editRefIds
        const id = editIds.indexOf(reference_id);
        if (id > -1) {
          editIds.splice(id, 1);
        }
        this.setState({ editRefIds: editIds })
      } ,
      () => notify.show('Failed to save data!!', 'error', NOTIFICATION_TIMEOUT))
  }

  cancelEditCheck = (refId) => {
    let editIds = this.state.editRefIds
    let cancelIds = this.state.cancelRefIds
    cancelIds.push(refId)
    const id = editIds.indexOf(refId);
    if (id > -1) {
      editIds.splice(id, 1);
    }
    this.setState({
      editRefIds: editIds,
      cancelRefIds: cancelIds
    })
  }

  annotationReset = (complaince_data) => {
    const { orgId } = this.getUrlParams()
    complaince_data.orgId = orgId
    let myColor = { background: '#f0909d', text: "#141414" };
    this.props.annotationReset(complaince_data,
      () => {
        notify.show('Response has been reset successfully.', 'custom', NOTIFICATION_TIMEOUT, myColor)
        const pathname = this.props.location.pathname
        const res = pathname.replace('complete', 'pending');
        this.props.history.push(res)
      },
      () => notify.show('Failed to reset response.', 'error', NOTIFICATION_TIMEOUT), orgId)
  }

  workpassSubmit = () => {
    const { requestId, candidateId, checkId, type } = this.getUrlParams()
    this.props.workpassSubmit({checkId},
      () => {
        notify.show(this.props.fetchCheck.successMessage ? this.props.fetchCheck.successMessage : 'Workpass completed successfully.', 'success', NOTIFICATION_TIMEOUT)
        let complaince_response_data = {
          complaince_response: 'No Status',
          notes: 'Check completed',
          check_id: checkId,
          check_type: type,
          user_id: candidateId,
          requestId: requestId
        }
        this.props.annotationSubmit(complaince_response_data,
          () => notify.show('Response saved successfully.', 'success', NOTIFICATION_TIMEOUT),
          () => notify.show('Failed to save response.', 'error', NOTIFICATION_TIMEOUT))
        const pathname = this.props.location.pathname
        const res = pathname.replace('pending', 'complete');
        this.props.history.push(res)
      },
      () => notify.show(this.props.fetchCheck.successMessage ? this.props.fetchCheck.successMessage : 'Failed to complete workpass.', 'error', NOTIFICATION_TIMEOUT))
  }

  dbsCheckSubmit = (id) => {
    this.props.dbsCheckSubmit({ id },
      () => {
        notify.show(
          this.props.successMessage ? this.props.successMessage : 'DBS check initiated sucessfully!!',
          'success',
          NOTIFICATION_TIMEOUT
        );
      } ,
      () => notify.show('Failed to initiate DBS check!!', 'error', NOTIFICATION_TIMEOUT))
  }

  updateDbsType = (dbstype) => {
    const { requestId, checkId, type: check_type, orgId, status, optiontype } = this.getUrlParams()
    const user_id = this.props.candidate.userId
    let type = dbstype
    if (dbstype === 'dbscotland') {
      type = 'basicscotland'
    }
    const complaince_data = {
      complaince_response: 'RESET',
      notes: '',
      orgId,
      check_id: checkId,
      check_type,
      user_id,
      requestId
    }
    this.props.updateDbsType({ checkid: checkId, dbstype },
      () => {
        notify.show('DBS check type updated sucessfully!!', 'success', NOTIFICATION_TIMEOUT)
        const pathname = this.props.location.pathname
        let res = pathname
        if (status === 'complete') {
          this.props.annotationReset(complaince_data,
            () => {},
            () => {}
          )
          res = res.replace('complete', 'pending');
        }
		    
        res = res.replace(optiontype, type);
        this.props.history.push(res)
      },
      () => notify.show('Failed to update DBS check type!!', 'error', NOTIFICATION_TIMEOUT))
  }

  componentWillMount() {
    const { requestId, checkId } = this.getUrlParams()
    let isManullyCompleted
    const url = getApiUrl("workPassCandidateCheck").replace(":request_id", requestId);
    httpFetch(url, { method: "GET" }).then(json => {
      if(json.data){
        isManullyCompleted = json.data.request.checks.find(data => data.id === checkId)
        this.setState({isManullyCompleted: isManullyCompleted.options.manual})
      }
    });
  }
 
  render() {
    const { requestId, orgId, vOrgId, candidateId, checkId, type, side, status, refOption, optiontype } = this.getUrlParams()
    const {candidate, pendingData, annotationSubmit, annotationFetch, viewUploadedDocuments, deleteDocuments, organisations, saveEmploymentReference, fetchOrganisations } = this.props  
    const checksDetails = this.props.fetchCheck.checksDetails
    const annotationData = this.props.fetchCheck.annotationData
    const uploaded_documents = this.props.fetchCheck.uploaded_documents
    const resetSuccess = this.props.fetchCheck.resetSuccess
    const dbsButtonStatus = this.props.fetchCheck.dbsButtonStatus
    const dbs_status = this.props.fetchCheck.dbs_status
    const officerData = this.props.fetchCheck.officerData
    const loading = this.props.fetchCheck.loading
    let display_typename_dbs
    var abc, bc
    var checkData = ''
    var doc_images = []
    let isEditable = true
    if (vOrgId && vOrgId != orgId) {
      isEditable = false
    }
    
    if (type === 'dbs') {
      if (optiontype === 'basic') {
        display_typename_dbs = "Criminal Records Check - Basic"
      } else if (optiontype === 'enhanced') {
        display_typename_dbs = "Criminal Records Check - Enhanced"
      } else if (optiontype === "basicscotland") {
        display_typename_dbs = "Criminal Records Check - Scotland Basic"
      } else if (optiontype === "standard") {
        display_typename_dbs = "Criminal Records Check - Standard"
      } else {
        display_typename_dbs = "DBS"
      }
    }

    if (!pendingData && checksDetails.length !== 0) {
      if (type === 'dbs') {
        var DBSstatus = ''
        if (checksDetails.gbg_response && checksDetails.gbg_response.length > 0) {
          const statusdb = JSON.parse(checksDetails.gbg_response[0].gbg_response)
          if (statusdb.hasOwnProperty('DBS_response')) {
            DBSstatus = statusdb.DBS_response.outcome.overall
          } else if (statusdb.hasOwnProperty('response')) {
            DBSstatus = statusdb.response
          }
        }
      }
      if (type === 'sanction_peps') {
        var sanctionData = checksDetails;
      }
      if (type === 'cifas_check') {
        abc = JSON.stringify(checksDetails);
        bc = JSON.parse(abc).map(check =>{ return check.gbg_response})
        bc = JSON.parse(bc);
        var statuscifas = bc.Cifas_check_response.cifas_check_response.decision.current;
      }
      if(type === 'tuberculosis_questionnaire'){
        var tuberData = checksDetails;
      }
      if (type === 'gpdr_declaration' || type === 'immigration_details') {
        var data1 = checksDetails;
      }
      if (type === 'bank_details') {
        var bankDetails = checksDetails;
      }
      if (type === 'adverse_finance_check') {
        var advData = checksDetails
      }
      if (type === 'address_history') {
        var add_history = checksDetails
      }
      if (type === 'driver_license_check') {
        var driver_license = checksDetails
      }
      if (type === 'national_insurance_check') {
        var national_insurance = checksDetails
      }
      if (type === 'work_gaps') {
        var work_gaps = checksDetails
      }
      if (type === 'employment_reference') {
        var employment_reference = checksDetails
      }
      if (type === 'employment_verification') {
        var employement_verification = checksDetails[0]
      }
      if (type === 'education_verification') {
        var education_verification = checksDetails
      }
      if (type === 'adverse_media_checks') {
        var adverse_media_data = checksDetails
      }
      if (type === 'employment_eligibility_verification') {
        checkData = checksDetails
      }
    }

    if (checksDetails.length !== 0 && type === 'right_to_work') {
      if (Array.isArray(checksDetails)) {
        var right_to_work = checksDetails[0].snapshot
      }
    }
    if (checksDetails.length !== 0 && type === 'dbs_identity') {
      var dbsIdentityData = checksDetails.map(m=> m.snapshot)
      var dbs_identity = [].concat.apply([],dbsIdentityData);
    }

    if (checksDetails.length !== 0 && type === 'biometric_identity') {
      var biometricDetails = checksDetails
    }
    if (checksDetails.length !==0 && type === 'company') {
      var companyVAT = checksDetails
    }
    if ((type === 'directorship_checks' || type === 'administrator_uploads' || type === 'candidate_uploads') && uploaded_documents.length !== 0 && uploaded_documents !== undefined) {
      if (uploaded_documents.length > 0) {
        if (Array.isArray(uploaded_documents[0].snapshot)) {
          if (uploaded_documents[0].snapshot[0].data && uploaded_documents[0].snapshot[0].data.Imageurl) {
            doc_images = uploaded_documents[0].snapshot[0].data.Imageurl
          }
        } else {
          doc_images = []
        }
      }
    }

    if ((type === 'dbs_identity' || type === 'right_to_work') && side === "organisation") {
      if (uploaded_documents.length > 0) {
        doc_images = uploaded_documents
      }
    }

    if (checksDetails.length !== 0 && (type === 'umbrella_workers_declaration' || type === 'umbrella_preferred_suppliers')) {
      var umbrella_details = checksDetails
    }
    if (checksDetails.length !== 0 && (type === 'criminal_record_declaration')) {
      var criminal_record_details = checksDetails
    }
    let name
    if (candidate !== null) {
      name = isNull(candidate.userId)
        ? candidate.email
        : `${candidate.firstName} ${candidate.lastName}`
    }
    let options = []
    if (organisations !== undefined) {
      options = organisations.data.map((org)=>{
        return {
          id: org.id,
          value: org.name
        }
      })
    }
    return (
      <Layout showFooter={false} responsive={false}>
        <Notifications></Notifications>
        <WorkPassSideMenu organisationId={orgId} />

        <WorkPassMain>
          {(candidate == null || pendingData || (type === 'employment_eligibility_verification' && checksDetails.length === 0)) ?
            <div className="Candidates__loader">
              <Loader size={65} color="#72d371" />
            </div>
            :
            <main>
              <WorkPassCheckDetailsHeader candidateName={name} requestId={requestId} candidate={candidate} candidateId={candidateId} organisationId={orgId} vOrgId={vOrgId}></WorkPassCheckDetailsHeader>
              <WorkPassCheckDetailsView checkId={checkId} pendingData={pendingData} addReferee={this.addReferee}
                bankDetails={bankDetails} addDocuments={this.addDocuments} annotationReset={this.annotationReset} workpassSubmit={this.workpassSubmit}
                type={type} status={status} statuscifas={statuscifas} sanctionData={sanctionData} data1={data1} candidateName={name} userID={candidate.userId}
                openModal={this.openModal} modalIsOpen={this.state.modalIsOpen} documentModalIsOpen={this.state.documentModalIsOpen} 
                openDocumentUploadModal={this.openDocumentUploadModal} openDocumentViewModal={this.openDocumentViewModal} viewDocumentModalIsOpen = {this.state.viewDocumentModalIsOpen}
                viewModalIndex ={this.state.viewModalIndex} docModalIndex={this.state.docModalIndex} openLetterModal={this.openLetterModal} letterModalIsOpen={this.state.letterModalIsOpen} letterModalIndex={this.state.letterModalIndex} 
                add_history={add_history} driver_license={driver_license}
                national_insurance={national_insurance} work_gaps={work_gaps} advData={advData} biometricDetails={biometricDetails}
                employment_reference={employment_reference} employement_verification={employement_verification}
                education_verification={education_verification} right_to_work={right_to_work} dbs_identity={dbs_identity}
                DBSstatus = {DBSstatus} annotationSubmit={annotationSubmit} annotationFetch={annotationFetch}
                annotationData={annotationData} orgId={orgId} candidateId={candidateId} requestId={requestId} companyVAT={companyVAT}
                umbrella_details={umbrella_details} criminal_record_details={criminal_record_details} EmpdocumentModalIsOpen={this.state.EmpdocumentModalIsOpen} EdudocumentModalIsOpen={this.state.EdudocumentModalIsOpen}
                AgencydocumentModalIsOpen={this.state.AgencydocumentModalIsOpen} SelfdocumentModalIsOpen={this.state.SelfdocumentModalIsOpen}
                UnempdocumentModalIsOpen={this.state.UnempdocumentModalIsOpen} PersonaldocumentModalIsOpen={this.state.PersonaldocumentModalIsOpen}
                viewUploadedDocuments={viewUploadedDocuments} uploaded_documents={uploaded_documents} deleteDocuments={deleteDocuments}
                doc_images={doc_images} side={side} optiontype={optiontype} display_typename_dbs={display_typename_dbs} dbsButtonStatus = {dbsButtonStatus} dbs_status={dbs_status} closeCheck={this.closeCheck} softDeleteCheck={this.softDeleteCheck} editCheck={this.editCheck}
                saveCheck={this.saveCheck} cancelEditCheck={this.cancelEditCheck} editRefIds={this.state.editRefIds} cancelRefIds={this.state.cancelRefIds} check_status={status} resetSuccess={resetSuccess} dbsCheckSubmit={this.dbsCheckSubmit} updateDbsType={this.updateDbsType} loading={loading}
                adverse_media_data={adverse_media_data} checkData={checkData} officerData={officerData} organisations={options} filterOrganisation={fetchOrganisations} 
                saveEmploymentReference={saveEmploymentReference} saveEmpEliData={this.props.saveEmpEliData} editEmpEliData={this.props.editEmpEliData} certifyEmpEliData={this.props.certifyEmpEliData} refOption={refOption} tuberData={tuberData} isEditable={isEditable} isManullyCompleted={this.state.isManullyCompleted}>
              </WorkPassCheckDetailsView>
            </main>
          }
        </WorkPassMain>
      </Layout>
    )
  }
}

export default WorkPassCheckDetails
