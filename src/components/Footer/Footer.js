import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import Assets from './assets'
import './style.css'

const Footer = () => (
  <footer className="Footer">
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-4">
          APPII Ltd &copy; {new Date().getFullYear()}
        </div>
        <div className="col-xs-12 col-md-8">
          <ul className="Footer-nav">
            <li>
              <a href={ROUTE_URL.privacy}>Privacy Policy</a>
            </li>
            <li>
              <a href={ROUTE_URL.terms}>Terms &amp; Conditions of Use</a>
            </li>
            <li>
              <Link to={ROUTE_URL.cookies}>Cookies</Link>
            </li>
            <li className="social-link">
              <a href="https://www.linkedin.com/company/10535440/"><img src={Assets.linkedinLogo} alt="linkedin" /></a>
            </li>
            <li className="social-link">
              <a href="https://www.facebook.com/appii.io"><img src={Assets.facebookLogo} alt="facebook" /></a>
            </li>
            <li className="social-link">
              <a href="https://twitter.com/appii_io"><img src={Assets.twitterLogo} alt="twitter" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
