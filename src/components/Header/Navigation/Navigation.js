import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import './style.css'

const Navigation = ({ toggleMenu, intelligentLink }) => (
  <div className="Navigation">
    <div className="Navigation__logo-wrap">
      <span className="Navigation__logo" />
      <i
        className="Navigation__close"
        onClick={toggleMenu}
      >
        &nbsp;
      </i>
    </div>

    <ul>
      {/* <li><Link to={ROUTE_URL.people}>People</Link></li> */}
      <li><Link to={ROUTE_URL.organisations}>Organisations</Link></li>
      {intelligentLink &&
        <li><a href={intelligentLink}>CV Builder</a></li>
      }
      {/* <li><Link to={ROUTE_URL.linkedinImport}>Import from LinkedIn</Link></li> */}
      <li><a href={ROUTE_URL.publicSiteContact}>Contact</a></li>
      <li>APPII Ltd &copy; {new Date().getFullYear()}</li>
    </ul>
  </div>
)

Navigation.propTypes = {
  intelligentLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  toggleMenu: PropTypes.func.isRequired
}

export default Navigation
