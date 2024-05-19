import React from "react";
import PropTypes from "prop-types";
import BreadCrumb from "components/BreadCrumb";

const WorkPassCandidatechecksHeader = ({
  userId,
  user_fname,
  user_lname,
  showReqNum,
  requestId,
}) => {
  let isActive = true;
  const candidateId = userId;
  const requestNum = requestId;

  const links = [
    {
      name: `${user_fname} ${user_lname}`,
      url: `/workPassCandidateChecks/${candidateId}`,
      active: !showReqNum
    }
  ];
  if (showReqNum) {
    links.push({
      name: `Work Pass ${requestNum}`,
      url: `/workPassCandidateChecks/${userId}`,
      active: true
    });
    isActive = !isActive;
  }

  return (
    <div>
      <BreadCrumb
        links={links}
        className="Candidate__breadcrumb"
        key={isActive}
      />
      <header className="CandidateHeader Candidate__header"></header>
    </div>
  );
};

WorkPassCandidatechecksHeader.propTypes = {
  userId: PropTypes.number.isRequired,
  user_fname: PropTypes.string.isRequired,
  user_lname: PropTypes.string.isRequired,
  showReqNum: PropTypes.bool.isRequired,
  // requestId: PropTypes.isRequired
};

export default WorkPassCandidatechecksHeader;
