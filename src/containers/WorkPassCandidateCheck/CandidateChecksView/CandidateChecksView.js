import React, { Component } from "react";
import WorkPassCandidateSideMenu from "../WorkPassCandidateSideMenu/WorkPassCandidateSideMenu";
import WorkPassMain from "components/WorkPassMain";
import Layout from "containers/Layout";
import WorkPassCandidatechecksHeader from "../WorkPassCandidateChecksHeader/WorkPassCandidatesChecksHeader";
import Loader from "components/Loader";
import PersonalInformation from 'containers/WorkPassCandidateCheck/CandidateChecksView/components/PersonalInformation/PersonalInformation'

class CandidateChecksView extends Component {
  state = {
    showReqNum: true,
  };

  getUrlParams() {
    const { userId, requestId, type } = this.props.match.params;
    return {
      userId: parseInt(userId, 10),
      requestId: parseInt(requestId, 10),
      type: type,
    };
  }
  componentDidMount(){
    const requestId = this.getUrlParams();
    // this.props.fetchCandidateCheckDetails(requestId.requestId)
    // this.props.fetchCandidatePersonalInfo()
  }
  saveEntity = (data) => {
    this.props.editPersonalInfo(data)
  }

  render() {
    let urlparams = this.getUrlParams()
    const userId = urlparams.userId;
    const requestId = urlparams.requestId;
    const type = urlparams.type; 
    const { user, fetchCandidateCheckDetails, checkdata } = this.props;
    const showReqNum = this.state.showReqNum;
    const user_fname = user.first_name;
    const user_lname = user.last_name;
    const personalInfo  = checkdata.personalinfo
    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassCandidateSideMenu userId={userId}/>
        <WorkPassMain>
          {user_fname === undefined || user_fname === "" || (!('request' in checkdata.data))  ? (
            <div className="Candidates__loader">
              <Loader size={65} color="#72d371" />
            </div>
          ) : (
            <main>
              <WorkPassCandidatechecksHeader
                userId={userId}
                user_fname={user_fname}
                user_lname={user_lname}
                showReqNum={showReqNum}
                requestId={requestId}
              ></WorkPassCandidatechecksHeader>
              {type == 'personal_info' ?
              <PersonalInformation personalInfo={personalInfo}
              saveEntity={this.saveEntity}
              ></PersonalInformation>
              :
              "No Check Form"
              }
              
            </main>
          )}
        </WorkPassMain>
      </Layout>
    );
  }
}

export default CandidateChecksView;
