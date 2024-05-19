import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/Avatar'
import { getIconDisplayProps, renderPendingIcon } from 'utils/verification'
import { ROUTE_URL } from 'containers/constants'
import { Link } from 'react-router-dom'

export default class WorkItemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDesc: false
    }
  }

  toggleDescription = (e) => {
    e.preventDefault()
    this.setState({
      showDesc: !this.state.showDesc
    })
  }

  render() {
    const {
      tooltip,
      blockClass,
      tooltipClass
    } = getIconDisplayProps(this.props.verified_status)
    const {
      editMode,
      toggleEdit,
      position,
      company,
      org,
      organisation_id,
      start_date,
      end_date,
      description
    } = this.props
    const { showDesc } = this.state
    const logo_image = (this.props.verified_organisation) ?
      this.props.verified_organisation.logo_image : (org && org.logo_image) ? org.logo_image : ''
    const isPresent = end_date === '0000-00-00' || end_date === null
    const orgName = org ? org.name : company

    return (
      <div className={`profile-experience-block ${blockClass}`}>
        {
          editMode &&
          <div className="profile-experience-btns">
            <button
              className="edit-btn"
              onClick={toggleEdit}
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
            organisation_id ?
              <p>
                <Link
                  to={`${ROUTE_URL.organisations}/${organisation_id}`}
                  title={orgName}
                >
                  {orgName}
                </Link>
              </p>
              :
              <p>{orgName}</p>
          }
          <span>{position}</span>
          <em>
            {new Date(start_date).getFullYear()}
            &nbsp;-&nbsp;
            {isPresent ? 'Present' : new Date(end_date).getFullYear()}
          </em>
          {
            description &&
            <div className="read-more-block">
              {
                showDesc ?
                  <a
                    className="read-more-hide"
                    onClick={this.toggleDescription}
                  >
                    Less
                  </a> :
                  <a
                    className="read-more-show"
                    onClick={this.toggleDescription}
                  >
                    More
                  </a>
              }
              {
                showDesc &&
                <div className="read-more-content">
                  <p>{description}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

WorkItemView.propTypes = {
  editMode: PropTypes.bool,
  position: PropTypes.string,
  toggleEdit: PropTypes.func,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  company: PropTypes.string,
  organisation_id: PropTypes.number,
  org: PropTypes.object,
  verified_status: PropTypes.string,
  description: PropTypes.string,
  verified_organisation: PropTypes.shape({
    logo_image: PropTypes.string
  })
}
