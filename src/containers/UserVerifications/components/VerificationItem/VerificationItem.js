import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _isNil from 'lodash/isNil'
import Avatar from 'components/Avatar'
import StatusInfo from '../StatusInfo'
import './style.css'

export const getDetails = (payload) => {
  const arr = []
  const labelMap = {
    award: 'Awards',
    cpd: 'Professional Development (CPD)',
    certificate: 'Certificates',
    achievement: 'Achievements',
    project: 'Projects',
    language: 'Languages',
    skill: 'Skills',
    permanent: 'Permanent Employee',
    contractor: 'Contractor'
  }

  for (const key in payload) {
    // early exit for non-displayed properties
    if (
      _isNil(payload[key]) || // not interested in nil values
      key === 'achievements' || key === 'visibility' || key === 'results' || // we don't display achievements, visibility or results properties
      typeof payload[key] === 'object' // we don't display object (or array) properties at the moment
    ) {
      continue
    }

    // format date keys
    if (key === 'date' || key === 'end_date' || key === 'start_date' || key === 'date_to' || key === 'date_from') {
      const formattedDate = moment(payload[key]).format('MMMM YYYY')
      if (formattedDate !== 'Invalid date') {
        arr.push(formattedDate)
      }
      continue
    }

    if (labelMap[payload[key]]) {
      arr.push(labelMap[payload[key]])
      continue
    }

    arr.push(payload[key])
  }

  return arr
}

class VerificationItem extends Component {
  getLabel(payload) {
    const { item, showOrganisation } = this.props
    let label = `${item.user.first_name} ${item.user.last_name}`
    if (showOrganisation) {
      label = payload.organisation || payload.institution ||
        payload.company || payload.name || 'Unknown'
    }
    return label
  }

  render() {
    const { item, showOrganisation } = this.props
    const payload = JSON.parse(item.payload)
    const label = this.getLabel(payload)
    const { type, decline_reason } = item
    const reasons = (typeof item.reasons === 'string') ?
      JSON.parse(item.reasons) : item.reasons
    const details = getDetails(payload, type)
    const imageUrl = (showOrganisation) ?
      item.organisation.logo_image :
      item.user.profile_image
    const showReasons = (reasons !== null && reasons.length > 0)

    return (
      <tr className="VerificationItem">
        <td className="col-xs-12 col-md-2">
          <Avatar
            size="45"
            theme="blue"
            label={label}
            imageUrl={imageUrl}
          />
        </td>
        <td className="col-xs-12 col-md-2 text-center">
          <p className="VerificationItem-type">
            {type}
          </p>
        </td>
        <td className="col-xs-12 col-md-3">
          <ul className="table-list">
            {
              details.map((text, index) => {
                return (
                  <li key={index}>{text}</li>
                )
              })
            }
          </ul>
        </td>
        <StatusInfo item={this.props.item} />
        <td className="col-xs-12 col-md-2">
          {decline_reason &&
            <p className="red-text">{decline_reason}</p>
          }
          {showReasons && reasons &&
            <div>
              <p><strong>Suggested changes</strong></p>
              <ul>
                {
                  reasons.map((obj, index) => {
                    return (
                      <li key={index}>{obj.reason}</li>
                    )
                  })
                }
              </ul>
            </div>
          }
        </td>
      </tr>
    )
  }
}

VerificationItem.propTypes = {
  item: PropTypes.shape({
    payload: PropTypes.string,
    type: PropTypes.string,
    decline_reason: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    reasons: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ])
  }),
  showOrganisation: PropTypes.bool.isRequired
}

export default VerificationItem
