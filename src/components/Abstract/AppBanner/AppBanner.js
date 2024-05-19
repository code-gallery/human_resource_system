import React, { Component } from 'react'
import { IOS_APP_URL, ANDROID_APP_URL, STORAGE_KEY } from 'containers/constants'
import InstallAppBanner from 'components/InstallAppBanner'
import './style.css'

class AppBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 1
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ opacity: 0 })
      window.localStorage.setItem(STORAGE_KEY.appBanner, null)
    }, 6000)
  }

  isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  isAndroid() {
    return /Android/i.test(navigator.userAgent)
  }

  render() {
    const { opacity } = this.state
    const appBanner = window.localStorage.getItem(STORAGE_KEY.appBanner) === 'true'

    if (appBanner && this.isIOS() && IOS_APP_URL) {
      return (
        <div className="AppBanner" style={{ opacity }}>
          <InstallAppBanner url={IOS_APP_URL} />
        </div>
      )
    }

    if (appBanner && this.isAndroid() && ANDROID_APP_URL) {
      return (
        <div className="AppBanner" style={{ opacity }}>
          <InstallAppBanner url={ANDROID_APP_URL} />
        </div>
      )
    }

    return null
  }
}

export default AppBanner
