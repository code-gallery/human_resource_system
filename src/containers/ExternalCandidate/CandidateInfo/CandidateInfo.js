import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/$Avatar'
import './style.css'

const exists = info => typeof info === 'string' && info.length > 1

const UserInfo = ({
  info: {
    firstName,
    lastName,
    profileImage,
    email,
    userEmail,
    role,
    company,
    phoneNumber,
    userId
  }
}) => {
  const name = `${firstName} ${lastName}`
  const email_ = exists(userEmail) ? userEmail : email

  return (
    <section className="CandidateInfo">
      <Avatar
        shadow
        className="CandidateInfo__avatar"
        imgUrl={profileImage}
        alt={name}
      />

      <div className="CandidateInfo__info-wrap">
        <h1 className="CandidateInfo__name">{name}</h1>

        { /** @EXAMPLE: Software Engineer @ Google */
          (exists(role) && exists(company))
            ? <p className="CandidateInfo__role">{role} @ {company}</p>
            : null
        }

        <div>
          <a href={`/profile/${userId}`} className="CandidateInfo__link">View Profile</a>
          <span className="CandidateInfo__link-separator">|</span>
          <a href={`mailto:${email_}`} className="CandidateInfo__link">{email_}</a>

          { /** @NOTE: Phone number is not always present */
            exists(phoneNumber)
              ? <span className="CandidateInfo__link-separator">|</span>
              : null
          }
          {
            exists(phoneNumber)
              ? (
                <a href={`tel:${phoneNumber}`} className="CandidateInfo__link">
                  {phoneNumber}
                </a>
              )
              : null
          }
        </div>
      </div>
    </section>
  )
}

/** @TODO: Use shape to describe the info prop */
UserInfo.propTypes = {
  info: PropTypes.object.isRequired
}

const PendingInfo = ({ className, info, hasRequests }) => (
  <section className={`CandidateInfo ${className}`}>
    <Avatar
      shadow
      className="CandidateInfo__avatar"
    />

    <div className="CandidateInfo__info-wrap">
      <h1 className="CandidateInfo__name">{info.email}</h1>
      <p className="CandidateInfo__role">{ hasRequests ? 'Invitation Pending' : 'No Requests' }</p>
    </div>
  </section>
)

/** @TODO: Use shape to describe the info prop */
PendingInfo.propTypes = {
  info: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  hasRequests: PropTypes.bool.isRequired
}

/** `pending` is true when a Candidate is not a APPII user */
const CandidateInfo = ({ invitationPending, hasRequests, info, className }) =>
  invitationPending
    ? <PendingInfo info={info} hasRequests={hasRequests} className={className} />
    : <UserInfo info={info} className={className} />

/** @TODO: Use shape to describe the info prop */
CandidateInfo.propTypes = {
  invitationPending: PropTypes.bool.isRequired,
  hasRequests: PropTypes.bool.isRequired,
  info: PropTypes.object.isRequired,
  className: PropTypes.string
}

CandidateInfo.defaultProps = {
  className: ''
}

export default CandidateInfo
