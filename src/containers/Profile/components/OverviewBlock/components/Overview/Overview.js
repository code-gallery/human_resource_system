import React from 'react'
import PropTypes from 'prop-types'
import { getVerificationProps } from 'utils/verification'

const Overview = (props) => {
  const { editMode, ...rest } = props
  const {
    educations,
    award,
    certificate,
    cpd,
    project,
    jobs,
    totalVerified,
    totalClaims,
    totalPercentage
  } = getVerificationProps(rest)
  return (
    <div className={`profile-overview ${editMode ? 'edit-mode' : ''}`}>
      <p className="profile-block-title">Overview</p>
      <ul className="overview-info">
        <li>
          <div className={`progress-item progress-${educations.verifiedPercentage}`}>
            <div className="radial-inner-bg">
              {`${educations.verified}/${educations.total}`}
            </div>
          </div>
          <span>Education</span>
        </li>
        <li>
          <div className={`progress-item progress-${jobs.verifiedPercentage}`}>
            <div className="radial-inner-bg">
              {`${jobs.verified}/${jobs.total}`}
            </div>
          </div>
          <span>Work Experience</span>
        </li>
        <li>
          <div className={`progress-item progress-${award.verifiedPercentage}`}>
            <div className="radial-inner-bg">
              {`${award.verified}/${award.total}`}
            </div>
          </div>
          <span>Awards</span>
        </li>
        <li>
          <div className={`progress-item progress-${cpd.verifiedPercentage}`}>
            <div className="radial-inner-bg">
              {`${cpd.verified}/${cpd.total}`}
            </div>
          </div>
          <span>CPD</span>
        </li>
        <li>
          <div className={`progress-item progress-${project.verifiedPercentage}`}>
            <div className="radial-inner-bg">
              {`${project.verified}/${project.total}`}
            </div>
          </div>
          <span>Project</span>
        </li>
        <li>
          <div className={`progress-item progress-${certificate.verifiedPercentage}`}>
            <div className="radial-inner-bg">
              {`${certificate.verified}/${certificate.total}`}
            </div>
          </div>
          <span>Certificate</span>
        </li>
      </ul>
      <div className="profile-verified-block">
        <p>
          <span>{`${totalPercentage}% verified`}</span>
          <i
            className="tooltip-position-top tooltip-movable tooltip-dark"
            data-tooltip={`${totalVerified}/${totalClaims} claims verified`}
          />
        </p>
        <div className="profile-verified-holder">
          <div className="profile-verified-bar" style={{ width: `${totalPercentage}%` }}>&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

Overview.propTypes = {
  editMode: PropTypes.bool
}

export default Overview
