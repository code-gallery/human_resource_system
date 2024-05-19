import React from 'react'
import PropTypes from 'prop-types'
import { getIconDisplayProps, renderPendingIcon } from 'utils/verification'
import Gap from 'assets/images/employment_gap.png'
import { ROUTE_URL } from 'containers/constants'
import { BrowserRouter,Link } from 'react-router-dom'
export default class EmploymentGapView extends React.Component {
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
      description,
    } = this.props

    const { showDesc } = this.state
    
    // const logo_image = (this.props.verified_organisation) ?
    // this.props.verified_organisation.logo_image : (org && org.logo_image) ? org.logo_image : ''
    const isPresent = end_date === '0000-00-00' || end_date === null
    
    const orgName = org ? org.name : company
    const month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
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
          
          <div className="Avatar Avatar-white Avatar-size-109"><img src={Gap} alt="employment gap"/></div>
          <p className="visible-xs visible-sm">
            { renderPendingIcon(tooltip, tooltipClass) }
          </p>
        </div>
        <div className="profile-experience-info">
          { renderPendingIcon(tooltip, `${tooltipClass} hidden-xs hidden-sm`) }
          {
            organisation_id ?
              <p>
                 <BrowserRouter><Link
                  to={`${ROUTE_URL.organisations}/${organisation_id}`}
                  title={orgName}
                >
                  {orgName}
                </Link></BrowserRouter>
              </p>
              :
              <p>{orgName}</p>
          }
          { position ? <h3><span>{position}</span></h3> : <h3><span style={{color: "red"}}>
            Please provide a reason for this employment gap </span></h3>
           }
          <em>
          {month[new Date(start_date).getMonth()]} {new Date(start_date).getFullYear()}
            &nbsp;-&nbsp;
          {isPresent ? 'Present' : `${month[new Date(end_date).getMonth()]} ${new Date(end_date).getFullYear()}`}
          </em>
          <span>Please note: This will not be visible to other users of APPII.</span>
        </div>
      </div>
    )
  }
}

EmploymentGapView.propTypes = {
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
