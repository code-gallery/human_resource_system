import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Avatar from 'components/$Avatar'
import './style.css'
import isNull from "lodash/isNull";
import { getApiUrl, NOTIFICATION_TIMEOUT } from 'containers/constants'
import httpFetch from "utils/httpFetch";
import Notifications, { notify } from 'react-notify-toast'

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
    userId,
    user,
    confirm_status,
    userid_confirm
  },
  showConfirmBtn
}) => {
  const [showConfirm, setShowConfirm] = useState(true)

  const confirmMailId = async user_id => {
    const url = getApiUrl('postConfirmMailId').replace(':userId',user_id )
    let res = await httpFetch(url, { method: 'POST' })
    setShowConfirm(false)
    notify.show(res.message, 'success', NOTIFICATION_TIMEOUT)
  }

 // const name = `${firstName} ${lastName}`
  const email_ = exists(userEmail) ? userEmail : email
  const name = isNull(firstName)
  ? email
  : `${firstName} ${lastName}`
  return (
    <section className="CandidateInfo">
      <Notifications />
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
        {
          showConfirmBtn && showConfirm && confirm_status && 
          <div style={{marginTop: "10px"}}>
            <Button
              color="green"
              className="CandidateHeader__button confirm_status_btn"
              onClick={() => {confirmMailId(userid_confirm)}}
            > Confirm
            </Button>
          </div>
          
        }
      </div>
    </section>
  )
}

/** @TODO: Use shape to describe the info prop */
UserInfo.propTypes = {
  info: PropTypes.object.isRequired
}

const PendingInfo = ({ className, info, hasRequests, assignWorkpass, assignButtonStatus, showConfirmBtn }) =>{
  const [showConfirm, setShowConfirm] = useState(true)

  const confirmMailId = async user_id => {
    const url = getApiUrl('postConfirmMailId').replace(':userId',user_id )
    let res = await httpFetch(url, { method: 'POST' })
    setShowConfirm(false)
    notify.show(res.message, 'success', NOTIFICATION_TIMEOUT)
  }

  return <section className={`CandidateInfo ${className}`}>
  <Avatar
    shadow
    className="CandidateInfo__avatar"
  />

  <div className="CandidateInfo__info-wrap">
    <h1 className="CandidateInfo__name">{info.email}</h1>
    <p className="CandidateInfo__role">{ hasRequests ? 'Invitation Pending' : 'No Requests' }</p>
    <div className="confirm_status_btn">
    <Button
      color="green"
      className="CandidateHeader__button"
      onClick={assignWorkpass}
      disabled={!assignButtonStatus}
    >Assign
    </Button>
    {
      showConfirmBtn && showConfirm && info.confirm_status && 
      <Button
        color="green"
        className="CandidateHeader__button"
        onClick={() => {confirmMailId(info.userid_confirm)}}
      > Confirm
      </Button>
    }
    </div>
  </div>
</section>
} 

/** @TODO: Use shape to describe the info prop */
PendingInfo.propTypes = {
  info: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  hasRequests: PropTypes.bool.isRequired,
  assignButtonStatus: PropTypes.bool
}

/** `pending` is true when a Candidate is not a APPII user */
const CandidateInfo = ({ invitationPending, hasRequests, info, className, assignWorkpass, assignButtonStatus, showConfirmBtn }) =>
  { 
    return invitationPending
    ? <PendingInfo
      info={info}
      hasRequests={hasRequests}
      className={className}
      assignWorkpass={assignWorkpass}
      assignButtonStatus={assignButtonStatus}
      showConfirmBtn={showConfirmBtn}
    />
    : <UserInfo info={info} className={className} showConfirmBtn={showConfirmBtn}/>
  }

/** @TODO: Use shape to describe the info prop */
CandidateInfo.propTypes = {
  invitationPending: PropTypes.bool.isRequired,
  hasRequests: PropTypes.bool.isRequired,
  info: PropTypes.object.isRequired,
  className: PropTypes.string,
  assignButtonStatus: PropTypes.bool
}

CandidateInfo.defaultProps = {
  className: ''
}

export default CandidateInfo
