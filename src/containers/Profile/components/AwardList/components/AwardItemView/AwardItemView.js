import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _find from 'lodash/find'
import Avatar from 'components/Avatar'
import { getIconDisplayProps, renderPendingIcon } from 'utils/verification'
import proficiencyOptions from 'utils/languagesProficiency'
import ProgressBar from 'containers/Profile/components/ProgressBar'
import { ROUTE_URL } from 'containers/constants'
import { Link } from 'react-router-dom'

function renderDate(data) {
  if (data.award_id && data.created_at) {
    return moment(data.created_at, 'YYYY/MM/DD').format('MM/YYYY')
  } else if (data.date_from && data.date_to === null) {
    return `${moment(data.date_from, 'YYYY/MM/DD').format('MM/YYYY')} – Present`
  } else if (data.date_to && data.date_from) {
    return `${moment(data.date_from, 'YYYY/MM/DD').format('MM/YYYY')} – ${moment(data.date_to, 'YYYY/MM/DD').format('MM/YYYY')}`
  } else if (data.date) {
    return moment(data.date, 'YYYY/MM/DD').format('MM/YYYY')
  }

  return ''
}

function renderHeader(header_props, tooltip, tooltipClass) {
  const logo_image = (header_props && header_props.verified_organisation) ?
    header_props.verified_organisation.logo_image :
    (header_props.org && header_props.org.logo_image) ? header_props.org.logo_image : ''
  let proficiency = parseInt(header_props.proficiency, 10)
  let progressBarRange = 5
  let proficiencyLabel = proficiency
  if (header_props.awardType === 'language') {
    progressBarRange = 11
    proficiency = (proficiency > progressBarRange) ? progressBarRange : proficiency
    proficiencyLabel = _find(proficiencyOptions, { value: proficiency }).label
  }
  const orgName = header_props.org ? header_props.org.name : header_props.organisation

  switch (header_props.awardType) {
    case 'skill':
    case 'language':
      return (
        <div className="profile-experience-info">
          <p>{header_props.name}</p>
          <span>{proficiencyLabel}</span>
          <ProgressBar
            proficiency={header_props.proficiency}
            range={progressBarRange}
          />
        </div>
      )
    default:
      return (
        <div>
          {header_props.awardType !== 'achievement' && (
            <div className="relative">
              <Avatar size="109" imageUrl={logo_image} />
              <p className="visible-xs visible-sm">
                { renderPendingIcon(tooltip, tooltipClass) }
              </p>
            </div>
          )}
          <div className="profile-experience-info">
            { renderPendingIcon(tooltip, `${tooltipClass} hidden-xs hidden-sm`) }
            <p>{header_props.name}</p>
            {
              header_props.organisation_id ?
                <span>
                  <Link
                    to={`${ROUTE_URL.organisations}/${header_props.organisation_id}`}
                    title={orgName}
                  >
                    {orgName}
                  </Link>
                </span>
                :
                <span>{orgName}</span>
            }
            <em>
              { renderDate(header_props) }
            </em>
          </div>
        </div>
      )
  }
}

const AwardItemView = (props) => {
  const {
    tooltip,
    blockClass,
    tooltipClass
  } = getIconDisplayProps(props.verified_status)
  return (
    <div className={`profile-experience-block ${blockClass}`}>
      {
        props.editMode &&
        <div className="profile-experience-btns">
          <button
            className="edit-btn"
            onClick={props.toggleEdit}
          >
            &nbsp;
          </button>
        </div>
      }
      {renderHeader(props, tooltip, tooltipClass)}
    </div>
  )
}

AwardItemView.propTypes = {
  verified_status: PropTypes.string,
  editMode: PropTypes.bool,
  toggleEdit: PropTypes.func
}

export default AwardItemView
