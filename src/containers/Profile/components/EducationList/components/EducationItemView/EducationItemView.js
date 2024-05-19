import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/Avatar'
import { getIconDisplayProps, renderPendingIcon } from 'utils/verification'
import { ROUTE_URL } from 'containers/constants'
import { Link } from 'react-router-dom'

const EducationItemView = (props) => {
  const {
    tooltip,
    blockClass,
    tooltipClass
  } = getIconDisplayProps(props.verified_status)
  const { end_date } = props
  const logo_image = (props.verified_organisation) ?
    props.verified_organisation.logo_image : (props.org && props.org.logo_image) ? props.org.logo_image : ''
  const isPresent = end_date === '0000-00-00' || end_date === null
  const orgName = props.org ? props.org.name : props.institution

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
      <div className="relative">
        <Avatar size="109" imageUrl={logo_image} />
        <p className="visible-xs visible-sm">
          { renderPendingIcon(tooltip, tooltipClass) }
        </p>
      </div>
      <div className="profile-experience-info">
        { renderPendingIcon(tooltip, `${tooltipClass} hidden-xs hidden-sm`) }
        {
          props.organisation_id ?
            <p>
              <Link
                to={`${ROUTE_URL.organisations}/${props.organisation_id}`}
                title={orgName}
              >
                {orgName}
              </Link>
            </p>
            :
            <p>{orgName}</p>
        }

        <span>{props.degree}{props.studied ? `, ${props.studied}` : ''}</span>
        <em>
          {new Date(props.start_date).getFullYear()}
          &nbsp;-&nbsp;
          {isPresent ? 'Present' : new Date(end_date).getFullYear()}
        </em>
      </div>
    </div>
  )
}

EducationItemView.propTypes = {
  verified_status: PropTypes.string,
  toggleEdit: PropTypes.func,
  institution: PropTypes.string,
  organisation_id: PropTypes.number,
  org: PropTypes.object,
  degree: PropTypes.string,
  studied: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  editMode: PropTypes.bool,
  verified_organisation: PropTypes.shape({
    logo_image: PropTypes.string
  })
}

export default EducationItemView
