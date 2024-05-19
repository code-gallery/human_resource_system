import React from 'react'
import PropTypes from 'prop-types'
import Assets from './assets'
import './style.css'

const InstallAppBanner = (props) => {
  const { url } = props

  return (
    <div className="InstallAppBanner clearfix visible-xs visible-sm">
      <div className="pull-left InstallAppBanner-img-container">
        <img src={Assets.appIcon} alt="Install APPII" />
      </div>
      <div className="pull-left InstallAppBanner-content">
        To biometrically identify yourself, and complete CV verification, please install APPII
      </div>
      <div className="pull-right">
        <a className="btn green-btn" href={url}>
          Install
        </a>
      </div>
    </div>
  )
}

InstallAppBanner.propTypes = {
  url: PropTypes.string.isRequired
}

export default InstallAppBanner
