import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants'
import AboutEdit from '../AboutEdit'
import SpecialitiesEdit from '../SpecialitiesEdit'
import DetailsEdit from '../DetailsEdit'
import About from '../About'
import Employees from '../Employees'
import Students from '../Students'
import TagList from '../TagList'

class PageContent extends Component {
  renderEditMode() {
    const { organisation, reference, onChangeInput, errors } = this.props
    let accrediationLink = ROUTE_URL.orgAccreditations
    accrediationLink = accrediationLink.replace(':orgId', organisation.id)
    let verificationsLink = ROUTE_URL.orgVerifications
    verificationsLink = verificationsLink.replace(':orgId', organisation.id)
    let adminsLink = ROUTE_URL.orgAdmins
    adminsLink = adminsLink.replace(':orgId', organisation.id)

    return (
      <div className="container ProfileOrganisation-Edit">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <AboutEdit
              organisation={organisation}
              onChangeInput={onChangeInput}
              errors={errors}
            />
            <div className="hidden-md hidden-lg">
              <DetailsEdit
                organisation={organisation}
                reference={reference}
                onChangeInput={onChangeInput}
                errors={errors}
              />
              <SpecialitiesEdit
                organisation={organisation}
                onChangeInput={onChangeInput}
                errors={errors}
              />
            </div>
            <Employees
              editMode={true}
              organisation={organisation}
            />
            <Students
              editMode={true}
              organisation={organisation}
            />
          </div>
          <div className="aside col-md-4 hidden-sm hidden-xs">
            <Link to={verificationsLink} className="btn blue-btn">View Verifications</Link>
            <Link to={accrediationLink} className="btn blue-btn">Accreditations Admin</Link>
            <Link to={adminsLink} className="btn blue-btn">Manage Contacts</Link>
            <DetailsEdit
              organisation={organisation}
              reference={reference}
              onChangeInput={onChangeInput}
              errors={errors}
            />
            <SpecialitiesEdit
              organisation={organisation}
              onChangeInput={onChangeInput}
              errors={errors}
            />
          </div>
        </div>
      </div>
    )
  }

  renderReadOnly() {
    const { organisation } = this.props
    const { specialities } = organisation
    const tags = (specialities) ? specialities.split(',') : []

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <About organisation={organisation} />
            <Employees organisation={organisation} />
            <Students organisation={organisation} />
          </div>
          <div className="col-md-4 hidden-sm hidden-xs">
            <TagList tags={tags} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { editMode } = this.props

    if (editMode) {
      return this.renderEditMode()
    }

    return this.renderReadOnly()
  }
}

PageContent.propTypes = {
  editMode: PropTypes.bool.isRequired,
  organisation: PropTypes.object,
  reference: PropTypes.shape({
    awards: PropTypes.array,
    degrees: PropTypes.array,
    industries: PropTypes.array,
    gapsReasons: PropTypes.array
  }),
  onChangeInput: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
}

export default PageContent
