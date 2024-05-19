import { connect } from "react-redux";
import CandidateChecksView from "./CandidateChecksView";
import { fetchUserProfile } from "../../Profile/saga/index";
// import { fetchCandidateCheckDetails, fetchCandidatePersonalInfo, savePersonalInfo } from "../reducer/reducer";

const mapStateToProps = ({ auth, userProfile, data, personalinfo }, { match }) => ({
  user: !match.params.uid ? auth.user || {} : userProfile.user || {},
  checkdata: data,
  personalinfo: personalinfo
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
  // fetchCandidateCheckDetails: (requestId) => dispatch(fetchCandidateCheckDetails(requestId)),
  // fetchCandidatePersonalInfo: () => dispatch(fetchCandidatePersonalInfo()),
  // editPersonalInfo: (...args) => dispatch(savePersonalInfo(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateChecksView);
