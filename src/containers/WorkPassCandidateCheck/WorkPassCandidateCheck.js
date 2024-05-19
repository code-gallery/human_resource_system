import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "components/Loader";
import WorkPassCandidateSideMenu from "./WorkPassCandidateSideMenu/WorkPassCandidateSideMenu";
import WorkPassMain from "components/WorkPassMain";
import Layout from "containers/Layout";
import WorkPassCandidateChecks from "./WorkPassCandidateChecks/WorkPassCandidateChecks";
import WorkPassCandidatechecksHeader from "./WorkPassCandidateChecksHeader/WorkPassCandidatesChecksHeader";

class WorkPassCandidateCheck extends Component {
  state = {
    showReqNum: false,
    requestId: '',
  };

  componentDidMount() {
    this.props.fetchCandidateChecks();
  }

  getUrlParams() {
    const { userId } = this.props.match.params;
    return {
      userId: parseInt(userId, 10)
    };
  }

  updateBreadcrumb = (id) => {
    if (id && id !== this.state.requestId) {
      this.setState({
        requestId: id,
        showReqNum: true,
      });
    } else {
      this.setState({
        showReqNum: !this.state.showReqNum
      });
    }
  };

  render() {
    const urlParams = this.getUrlParams();
    const userId = urlParams.userId;
    const {
      user,
      data,
      requestList,
      loading,
      personalinfo,
      addresses,
      organisations,
      fetchCandidateCheckDetails,
      fetchCandidatePersonalInfo,
      fetchCandidateAddresses,
      editPersonalInfo,
      saveAddress,
      saveBankDetails,
      deleteAddress,
      editAddress,
      submitAddressHistory,
      submitWorkPass,
      fetchOrganisations,
      saveEmploymentReferenceData,
      bankAddresses,
      fetchBankAddresses,
      deleteBankAddress,
      submitBankDetails,
      submitRightToWork,
      submitCriminalRecord,
      submitImmigrationDetails
    } = this.props
    const { showReqNum, requestId } = this.state
    const { first_name, last_name } = user
    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassCandidateSideMenu userId={userId} />
        <WorkPassMain>
          { (first_name === undefined || first_name === '' || requestList.requests === undefined) ? (
            <div className="Candidates__loader">
              <Loader size={65} color="#72d371" />
            </div>
          ) : (
            <main>
              <WorkPassCandidatechecksHeader
                userId={userId}
                user_fname={first_name}
                user_lname={last_name}
                showReqNum={showReqNum}
                requestId={requestId}
              ></WorkPassCandidatechecksHeader>
              <WorkPassCandidateChecks
                userId={userId}
                data={data}
                loading={loading}
                loader={this.props.loader}
                workpassSubmit={this.props.workpassSubmit}
                updateBreadcrumb={this.updateBreadcrumb}
                candidateRequests={requestList.requests}
                //candidateRequests={user.requests}
                personalinfo={personalinfo}
                addresses={addresses}
                organisations={organisations}
                fetchCandidateCheckDetails={fetchCandidateCheckDetails}
                fetchCandidatePersonalInfo={fetchCandidatePersonalInfo}
                fetchCandidateAddresses={fetchCandidateAddresses}
                saveEmploymentReferenceData={saveEmploymentReferenceData}
                editPersonalInfo={editPersonalInfo}
                saveAddress={saveAddress}
                deleteAddress={deleteAddress}
                editAddress={editAddress}
                submitAddressHistory={submitAddressHistory}
                submitWorkPass={submitWorkPass}
                fetchOrganisations={fetchOrganisations}
                location={this.props.location}
                saveBankDetails={saveBankDetails}
                bankAddresses={bankAddresses}
                fetchBankAddresses={fetchBankAddresses}
                deleteBankAddress={deleteBankAddress}
                submitBankDetails={submitBankDetails}
                submitRightToWork={submitRightToWork}
                getRequest={this.props.getRequest}
                submitCriminalRecord={submitCriminalRecord}
                submitImmigrationDetails={submitImmigrationDetails}
              ></WorkPassCandidateChecks>
            </main>
          )}
        </WorkPassMain>
      </Layout>
    );
  }
}

WorkPassCandidateCheck.propTypes = {
  fetchCandidateCheckDetails: PropTypes.func.isRequired,
  fetchCandidateChecks: PropTypes.func.isRequired,
  fetchCandidatePersonalInfo: PropTypes.func.isRequired,
  editPersonalInfo: PropTypes.func.isRequired,
  saveAddress: PropTypes.func.isRequired,
  saveBankDetails: PropTypes.func.isRequired,
  submitWorkPass: PropTypes.func.isRequired,
  fetchCandidateAddresses: PropTypes.func.isRequired,
  saveEmploymentReferenceData: PropTypes.func.isRequired,
  fetchOrganisations: PropTypes.func.isRequired,
  requestList: PropTypes.object.isRequired,
  personalinfo: PropTypes.object,
  addresses: PropTypes.array,
  match: PropTypes.object.isRequired,
  data: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool,
  bankAddresses: PropTypes.array,
};

export default WorkPassCandidateCheck;
