import { connect } from 'react-redux'
import OrganisationCandidate from './OrganisationCandidate'
import { requestCandidate, deleteCandidate, getRequest, deleteRequest, refreshRequest, assignWorkpass, getNotes, saveNote, deleteNote } from './reducer'
// import { fetchClientOrganisations } from 'store/auth'
import { saveEmploymentReferenceData } from './../WorkPassCheckDetails/reducer'
import { fetch } from '../Organisations/reducer'
import {
  fetchCandidatePersonalInfo,
  savePersonalInfo,
  fetchCandidateAddresses,
  saveAddress,
  editAddress,
  deleteAddress
} from '../WorkPassCandidateCheck/reducer/reducer'

const mapStateToProps = ({ auth, candidate, organisationBalance, organisations, data, fetchCheck }) => ({
  user: auth.user,
  organisationBalance,
  candidate: candidate.entity,
  loading: candidate.isFetching,
  loader: candidate.loading,
  error: candidate.error,
  deletedData: candidate.deletedData,
  deleteReqStatus: candidate.deleteReqStatus,
  refreshReqStatus: candidate.refreshReqStatus,
  resultMessage: candidate.resultMessage,
  workpassStatus: candidate.workpassStatus,
  notes: candidate.notes,
  pendingNote: candidate.pendingNote,
  organisations,
  personalinfo: data.personalinfo,
  addresses: data.addresses,
  saveEmpLoader: fetchCheck.loading
})

const mapDispatchToProps = {
  requestCandidate,
  deleteCandidate,
  deleteRequest,
  refreshRequest,
  assignWorkpass,
  saveEmploymentReference: saveEmploymentReferenceData,
  fetchOrganisations: fetch,
  getRequest,
  fetchCandidatePersonalInfo,
  fetchCandidateAddresses,
  savePersonalInfo,
  saveAddress,
  editAddress,
  deleteAddress,
  getNotes,
  saveNote,
  deleteNote
}

const OrganisationCandidateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationCandidate)

export default OrganisationCandidateContainer
