import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ROUTE_URL } from 'containers/constants.js'
import Avatar from 'components/Avatar'
import Assets from 'components/Profile/ProfileInfo/assets'
import './style.css'

const NavigationMobile = ({
  intelligentLink,
  user,
  active,
  organisations,
  setMobileNavActive,
  hasNotification
}) => {
  const cssNav = classNames('mobile-nav', { active }, { hasNotification })
  const avatarIcon = (user.biometrics_status !== 'complete') ? 'danger' : ''
  const showBiometricLink = user.biometrics_status !== 'complete'

  return (
    <div className={cssNav}>
      <div className="mobile-user-info">
        <Avatar imageUrl={user.profile_image} size="45" icon={avatarIcon} />
        <p>
          <strong>{user.first_name} {user.last_name}</strong>
          {window.location.pathname === ROUTE_URL.profile ? (
            <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">View Profile</a>
          ) : (
            <Link to={ROUTE_URL.profile}>View Profile</Link>
          )}
        </p>
      </div>
      <ul className="first">
        {showBiometricLink &&
          <li className="profile-nav-bioID">
            {window.location.pathname === ROUTE_URL.helpBiometric ? (
              <span>
                <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">Identity Not Verified</a>
                <img src={Assets.iconDanger} alt="icon warning" />
              </span>
            ) : (
              <span>
                <Link to={ROUTE_URL.helpBiometric}>Identity Not Verified</Link>
                <img src={Assets.iconDanger} alt="icon warning" />
              </span>
            )}
          </li>
        }
        <li>
          {window.location.pathname === ROUTE_URL.userVerifications ? (
            <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">Verifications</a>
          ) : (
            <Link to={ROUTE_URL.userVerifications}>My Verifications</Link>
          )}
        </li>
        {
          /* Verifications for Org */
          organisations.map((item, index) => {
            let link = ROUTE_URL.orgVerifications
            link = link.replace(':orgId', item.id)
            return (
              <li key={index}>
                {window.location.pathname === link ? (
                  <a onClick={() => setMobileNavActive(false)} className="h-verifications">{item.name}</a>
                ) : (
                  <Link className="h-verifications" to={link}>{item.name}</Link>
                )}
              </li>
            )
          })
        }
        <li>
          {window.location.pathname === ROUTE_URL.settingsAccount ? (
            <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">Settings</a>
          ) : (
            <Link to={ROUTE_URL.settingsAccount}>Settings</Link>
          )}
        </li>
        <li><a href={ROUTE_URL.publicSiteHelp}>Help</a></li>
      </ul>
      { organisations && organisations.length > 0 &&
        <ul>
          <li>Organisation Profile</li>
          {
            /* Profile for Org */
            organisations.map((item, index) => {
              let link = ROUTE_URL.orgProfile
              link = link.replace(':orgId', item.id)
              return (
                <li key={index}>
                  {window.location.pathname === link ? (
                    <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">{item.name}</a>
                  ) : (
                    <Link to={link}>{item.name}</Link>
                  )}
                </li>
              )
            })
          }
        </ul>
      }
      <ul>
        {/* <li>
          {window.location.pathname === ROUTE_URL.people ? (
            <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">People</a>
          ) : (
            <Link to={ROUTE_URL.people}>People</Link>
          )}
        </li>*/}
        <li> 
          {window.location.pathname === ROUTE_URL.organisations ? (
            <a onClick={() => setMobileNavActive(false)} className="mobile-profile-link">Organisations</a>
          ) : (
            <Link to={ROUTE_URL.organisations}>Organisations</Link>
          )}
        </li>
        {intelligentLink &&
          <li className="hidden-xs"><a href={intelligentLink}>CV Builder</a></li>
        }
      </ul>
      <ul>
        <li><Link to={ROUTE_URL.logout}>Log Out</Link></li>
      </ul>
    </div>
  )
}

NavigationMobile.propTypes = {
  user: PropTypes.object,
  intelligentLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  organisations: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
  setMobileNavActive: PropTypes.func.isRequired,
  hasNotification: PropTypes.bool.isRequired
}

export default NavigationMobile
