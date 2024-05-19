import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _trim from 'lodash/trim'
import { getVerificationProps } from 'utils/verification'

const ContentProfile = (props) => {
  const { ...rest } = props
  const {
    totalVerified,
    totalClaims,
    totalPercentage
  } = getVerificationProps(rest)
  const { first_name, last_name,
    biometrics_status,
    biometrics_first_name, biometrics_last_name,
    tagline, town, country
  } = props.user

  const name = _trim(`${first_name} ${last_name}`).toLowerCase()
  let biometricName = ''
  if (biometrics_first_name) {
    biometricName = biometrics_first_name
  }
  if (biometrics_last_name) {
    biometricName = `${biometricName} ${biometrics_last_name}`
  }
  biometricName = _trim(biometricName).toLowerCase()
  const showRealName = (name !== biometricName && biometricName !== '')

  const cssTooltip = classNames('tooltip-position-bottom tooltip-movable', {
    'user-not-verified tooltip-error': biometrics_status !== 'complete',
    'user-verified tooltip-success': biometrics_status === 'complete'
  })
  const tooltipText = (biometrics_status !== 'complete') ? 'Identity not verified' : 'Identity verified'

  return (
    <div>
      <p className="user-info">
        {first_name &&
          <em className={cssTooltip} data-tooltip={tooltipText}>
            &nbsp;
          </em>
        }
        {first_name} {last_name}
        {showRealName &&
          <span className="real-name">
            <span className="real-name-label">Biometric name:&nbsp;</span>
            <span>{biometricName}</span>
          </span>
        }
        {town && country &&
          <i className="hidden-xs hidden-sm">{town}, {country}</i>
        }
        <span>{tagline}</span>
        {town && country &&
          <i className="hidden-md hidden-lg">{town}, {country}</i>
        }
      </p>
      <div className="profile-verified-block hidden-lg hidden-md">
        <p><span>{`${totalPercentage}% verified`}</span> {`${totalVerified}/${totalClaims}`}</p>
        <div className="profile-verified-holder">
          <div className="profile-verified-bar" style={{ width: `${totalPercentage}%` }}>&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

ContentProfile.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    biometrics_status: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    biometrics_first_name: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    biometrics_last_name: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    tagline: PropTypes.string,
    country: PropTypes.string,
    town: PropTypes.string
  })
}

export default ContentProfile
