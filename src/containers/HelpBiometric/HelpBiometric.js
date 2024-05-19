import React from 'react'
import { IOS_APP_URL, ANDROID_APP_URL } from 'containers/constants'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import Assets from './assets'
import './style.css'

const HelpBiometric = () => {
  window.scrollTo(0, 0)

  return (
    <Layout>
      <div className="HelpBiometric container-fluid">
        <PageTitle title="Verifying your identity" type="background" />

        <div className="row HelpBiometric-box1">
          <h2 className="col-xs-12 col-md-8 col-md-offset-2">Why verify my identify through biometric scanning?</h2>
          <div className="col-xs-12 text-center visible-xs visible-sm">
            <img src={Assets.mobileBiometric} alt="mobile screen" />
          </div>
          <div className="col-xs-12 col-md-4 col-md-offset-2">
            <p>
              APPII needs to protect you from individuals
              looking to act falsely on your behalf by hijacking
              your identity and profile.
            </p>
            <p>
              APPII has incorporated simple identity verification
              steps on the mobile app that uses your mobile
              camera to take a selfie, and then compares that
              selfie with a photo found on your photographic
              ID.
            </p>
            <p>
              This secure process protects your profile from
              being hijacked and enables APPII features.
            </p>
          </div>
          <div className="hidden-xs hidden-sm col-md-4">
            <img src={Assets.mobileBiometric} alt="mobile screen" />
          </div>
        </div>

        <div className="row HelpBiometric-box2">
          <div className="img-container hidden-xs hidden-sm col-md-4 col-md-offset-2">
            <img src={Assets.mobileScreens} alt="mobile screens" />
          </div>
          <div className="col-xs-12 col-md-4">
            <h2>Biometric scanning takes less than two minutes and enables APPII features</h2>
            <p>By verifying your identity you will be able to</p>
            <ol className="lower-alpha">
              <li>Seek verification of career assertions,</li>
              <li>Your profile will be visible to others,</li>
              <li>You will be able to use QR Code scanning, and</li>
              <li>Future features will be automatically available</li>
            </ol>

            <div className="visible-xs visible-sm text-center">
              <img src={Assets.mobileScreens} alt="mobile screens" />
            </div>

            <h2>How do I biometrically identify myself?</h2>
            <h3>iOS and Android Mobile App</h3>
            <ol className="decimal">
              <li>Tap the “Settings” icon near the top right of the home screen.</li>
              <li>Select ‘Biometrics’.</li>
              <li>Tap ‘Take ID photo’.</li>
              <li>Take a clear photo of the identity document</li>
            </ol>

            <p>
              Ensure that the edges of the identity document are as close to the
              screen as possible (without cutting out edges) and that there is
              minimal glare on the identity document.
            </p>

            <ol start="5" className="decimal">
              <li>Tap ‘Take Selfie’.</li>
              <li>Take a clear photo of yourself.</li>
            </ol>

            <p>
              Your face should be in the middle of the screen and not be touching the edges.
            </p>

            <p className="HelpBiometric-download">
              <a href={IOS_APP_URL}>
                <img className="apple" src={Assets.downloadApple} alt="Download APPII from Apple Store" />
              </a>

              <a href={ANDROID_APP_URL}>
                <img className="play" src={Assets.downloadGoogle} alt="Download APPII from Play Store" />
              </a>
            </p>

          </div>
        </div>

      </div>
    </Layout>
  )
}

export default HelpBiometric
