import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import countryISO from 'iso-3166-1-alpha-2'
import classNames from 'classnames'
import Loader from 'components/Loader'
import RequestModalHeader from 'components/RequestModalHeader'
import './style.css'

class WorkPassInviteDetails extends Component {
  componentDidMount() {
    const { requestInfo, token } = this.props
    requestInfo(token)
  }

  getRequestProps() {
    const { user, info } = this.props

    if (!info.instance) {
      return null
    }

    const userAvatar = user && user.profile_image
    const {
      id,
      role: position,
      candidate,
      created_at,
      country,
      region
    } = info.instance

    const organisationAvatar = candidate.organisation.logo_image
    const title = `Work Pass Request from ${candidate.organisation.name}`
    const date = moment(created_at).format('DD/MM/YY')
    const location = `${countryISO.getCountry(country)} – ${region}`

    return {
      organisationAvatar,
      userAvatar,
      title,
      position,
      date,
      location,
      id: `#${id}`
    }
  }

  render() {
    const { loading, info } = this.props

    if (loading || !info) {
      return (
        <div className="WorkPassInviteDetails__wrap" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Loader size={65} color="#72d371" />
        </div>
      )
    }

    const requestProps = this.getRequestProps()
    if (!requestProps) {
      return null
    }

    return (
      <div className="WorkPassInviteDetails__wrap">
        <RequestModalHeader
          className={classNames('WorkPassInviteDetails', {
            'WorkPassInviteDetails-light': this.props.light
          })}
          {...requestProps}
        />
      </div>
    )
  }
}

WorkPassInviteDetails.propTypes = {
  token: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  requestInfo: PropTypes.func.isRequired,
  user: PropTypes.object,
  info: PropTypes.object,
  light: PropTypes.bool
}

export default WorkPassInviteDetails
