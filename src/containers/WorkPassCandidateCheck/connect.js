import { connect } from "react-redux";
import WorkPassCandidateCheck from "./WorkPassCandidateCheck";
import { fetchUserProfile } from "../Profile/saga/index";
import { getRequest } from '../OrganisationCandidate/reducer'
import { saveEmploymentReferenceData, workpassSubmit } from './../WorkPassCheckDetails/reducer'
import { fetch } from '../Organisations/reducer'
import {
  fetchCandidateChecks,
  fetchCandidateCheckDetails,
  fetchCandidatePersonalInfo,
  savePersonalInfo,
  fetchCandidateAddresses,
  saveAddress,
  editAddress,
  deleteAddress,
  submitAddressHistory,
  submitWorkPass,
  saveBankDetails,
  fetchBankAddresses,
  deleteBankAddress,
  submitBankDetails,
  submitRightToWork,
  submitCriminalRecord,
  submitImmigrationDetails
} from "./reducer/reducer";

const mapStateToProps = ({ auth, userProfile, data, organisations, fetchCheck }, { match }) => ({
  user: !match.params.uid ? auth.user || {} : userProfile.user || {},
  personalinfo: data.personalinfo,
  addresses: data.addresses,
  loading: data.loading,
  data: data.data,
  organisations,
  loader: fetchCheck.loading,
  bankAddresses: data.bankAddresses,
  requestList: data.requestList
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
  fetchCandidateChecks: () => dispatch(fetchCandidateChecks()),
  fetchCandidateCheckDetails: (requestId) => dispatch(fetchCandidateCheckDetails(requestId)),
  fetchCandidatePersonalInfo: (...args) => dispatch(fetchCandidatePersonalInfo(...args)),
  submitWorkPass: (...args) => dispatch(submitWorkPass(...args)),
  editPersonalInfo: (...args) => dispatch(savePersonalInfo(...args)),
  fetchCandidateAddresses: (...args) => dispatch(fetchCandidateAddresses(...args)),
  saveAddress: (...args) => dispatch(saveAddress(...args)),
  submitAddressHistory: (...args) => dispatch(submitAddressHistory(...args)),
  editAddress: (...args) => dispatch(editAddress(...args)),
  deleteAddress: (...args) => dispatch(deleteAddress(...args)),
  fetchOrganisations: (...args) => dispatch(fetch(...args)),
  saveEmploymentReferenceData: (...args) => dispatch(saveEmploymentReferenceData(...args)),
  workpassSubmit: (...args) => dispatch(workpassSubmit(...args)),
  saveBankDetails: (...args) => dispatch(saveBankDetails(...args)),
  fetchBankAddresses: (...args) => dispatch(fetchBankAddresses(...args)),
  deleteBankAddress: (...args) => dispatch(deleteBankAddress(...args)),
  submitBankDetails: (...args) => dispatch(submitBankDetails(...args)),
  submitRightToWork: (...args) => dispatch(submitRightToWork(...args)),
  getRequest: (...args) => dispatch(getRequest(...args)),
  submitCriminalRecord: (...args) => dispatch(submitCriminalRecord(...args)),
  submitImmigrationDetails: (...args) => dispatch(submitImmigrationDetails(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkPassCandidateCheck);
