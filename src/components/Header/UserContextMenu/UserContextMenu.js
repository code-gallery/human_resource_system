import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ROUTE_URL } from 'containers/constants.js'
import Avatar from 'components/Avatar'
import Assets from 'components/Profile/ProfileInfo/assets'
import './style.css'

const UserContextMenu = (props) => {
  const { user, organisations, toggleDropDown, showDropdown } = props
  const css = classNames('profile-header active', { 'dropdown-active': showDropdown })

  const avatarIcon = (user.biometrics_status !== 'complete') ? 'danger' : ''
  const showBiometricLink = user.biometrics_status !== 'complete'

  //added for My workPasses
  let userId = user.id
  let workpassurl = ROUTE_URL.workPassCandidateChecks.replace(':userId', userId)

  return (
    <div className={css} onClick={toggleDropDown}>
      <span>Hi, <b>{user.first_name}</b></span>
      <span className="UserContextMenu-avatar">
        <Avatar imageUrl={user.profile_image} icon={avatarIcon} />
      </span>
      {
        showDropdown &&
        <div className="nav-dropdown nav-dropdown-wrapper">
          <ul className="profile-nav">
            <div className="h-group">
              <li>
                <Link className="h-profile" to={ROUTE_URL.profile}>Profile</Link>
              </li>
              {showBiometricLink &&
                <li className="profile-nav-bioID">
                  <Link className="h-bioID" to={ROUTE_URL.helpBiometric}>Identity Not Verified</Link>
                  <img src={Assets.iconDanger} alt="icon warning" />
                </li>
              }
              <li>
                <Link className="h-verifications" to={ROUTE_URL.userVerifications}>My Verifications</Link>
              </li>
              <li>
                <Link className="h-workpass" to={workpassurl}>My Work Passes</Link>
              </li>
            </div>
            {
              organisations.map((item, index) => {
                const adminLink = ROUTE_URL.orgProfile.replace(':orgId', item.id)
                // does this organisation have any check configurations enabled for work pass?
                const workPassEnabled = (item.checkConfig || []).some(cnf => cnf.enabled)
                return (
                  <div key={index} className="h-group">
                    <li>
                      <Link className="h-org-head" to={adminLink}>
                        <img src={item.logo_image} alt={`${item.name} logo`} />
                        {item.name}
                      </Link>
                    </li>
                    <li>
                      <Link className="h-verifications h-in" to={ROUTE_URL.orgVerifications.replace(':orgId', item.id)}>Verifications</Link>
                    </li>
                    <li>
                      <Link className="h-accreditations h-in" to={ROUTE_URL.orgAccreditations.replace(':orgId', item.id)}>Accreditations</Link>
                    </li>
                    { workPassEnabled &&
                      <li>
                        <Link className="h-workpass h-in" to={ROUTE_URL.orgWorkPass.replace(':orgId', item.id)} onClick={(e)=> {return(localStorage.setItem('companyName',JSON.stringify(item.name)) , localStorage.setItem('userId',parseInt(userId)))}}>Work Pass</Link>
                      </li>
                    }
                  </div>
                )
              })
            }

            <div className="h-group">
              <li>
                <Link className="h-settings" to={ROUTE_URL.settingsAccount}>Settings</Link>
              </li>
              <li>
                <a className="h-help" href={ROUTE_URL.publicSiteHelp}>Help</a>
              </li>
              <li><Link className="h-logout" to={ROUTE_URL.logout}>Log Out</Link></li>
            </div>
          </ul>
        </div>
      }
    </div>
  )
}

UserContextMenu.propTypes = {
  user: PropTypes.object.isRequired,
  organisations: PropTypes.array.isRequired,
  toggleDropDown: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired
}

export default UserContextMenu
