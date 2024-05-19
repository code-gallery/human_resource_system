import { connect } from 'react-redux'
import Component from './WorkPassCheckDetails'

import { fetchChecksDetails, resetCheckDetails, annotationSubmit, annotationFetch,annotationReset,refreeMail,uploadDocuments,
  viewUploadedDocuments,deleteDocuments, closeCheck, softDeleteCheck, dbsCheckSubmit, updateDbsType, saveOfficerCheckData, saveEmploymentReferenceData, workpassSubmit, saveEmpEliData, editEmpEliData, certifyEmpEliData } from './reducer'
// import { fetchClientOrganisations } from 'store/auth'
import { fetch } from '../Organisations/reducer'
import { getRequest, requestCandidate } from '../OrganisationCandidate/reducer'

export const mapStateToProps = ({ candidate, organisationBalance, fetchCheck, organisations}, { match }) => {
  
  return ({
    organisationBalance,
    candidate: candidate.entity,
    fetchingCandidate: candidate.isFetching,
    error: candidate.error,
    request: candidate.getRequest[match.params.requestId],
    //checksDetails: checksDetails.checksDetails,
    //pendingData : checksDetails.pendingData,
    //annotationData : annotationData,
    fetchCheck:fetchCheck,
    organisations: organisations
  })
}

export const mapDispatchToProps = (dispatch) => ({
  resetCheckDetails: () => dispatch(resetCheckDetails()),
  fetchChecksDetails: (requestId,orgId,candidateId,checkId,checkType) => dispatch(fetchChecksDetails(requestId,orgId,candidateId,checkId,checkType)),
  annotationSubmit: (...args) => dispatch(annotationSubmit(...args)),
  annotationReset: (...args) => dispatch(annotationReset(...args)),
  uploadDocuments: (...args) => dispatch(uploadDocuments(...args)),
  refreeMail:(...args)=> dispatch(refreeMail(...args)),
  annotationFetch: (...args) => dispatch(annotationFetch(...args)),
  viewUploadedDocuments: (...args) => dispatch(viewUploadedDocuments(...args)),
  deleteDocuments: (...args) => dispatch(deleteDocuments(...args)),
  closeCheck: (...args) => dispatch(closeCheck(...args)),
  softDeleteCheck: (...args) => dispatch(softDeleteCheck(...args)),
  requestCandidate: (...args) => dispatch(requestCandidate(...args)),
  dbsCheckSubmit: (...args) => dispatch(dbsCheckSubmit(...args)),
  updateDbsType: (...args) => dispatch(updateDbsType(...args)),
  saveOfficerCheckData: (...args) => dispatch(saveOfficerCheckData(...args)),
  fetchOrganisations: (...args) => dispatch(fetch(...args)),
  saveEmploymentReference: (...args) => dispatch(saveEmploymentReferenceData(...args)),
  workpassSubmit: (...args) => dispatch(workpassSubmit(...args)),
  saveEmpEliData: (...args) => dispatch(saveEmpEliData(...args)),
  editEmpEliData: (...args) => dispatch(editEmpEliData(...args)),
  certifyEmpEliData: (...args) => dispatch(certifyEmpEliData(...args)),
  getRequest: (requestId) => dispatch(getRequest(requestId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
