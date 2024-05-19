import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BreadCrumb from 'components/BreadCrumb'
import WorkPassMain from 'components/WorkPassMain'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Layout from 'containers/Layout'
import './style.css'
class WorkpassAdmin extends Component {
  getOrganisationId(props = this.props) {
    return parseInt(props.match.params.orgId, 10)
  }
  render() {
    const orgId = this.getOrganisationId()
    const breadCrumbs = [
      {
        name: 'Work Pass Administration',
        url: `/organisations/${orgId}/workpassAdmin`,
        active: true
      }
    ]

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <WorkPassMain>
          <BreadCrumb links={breadCrumbs} className="workpass__breadcrumb"/>
        </WorkPassMain>
      </Layout>
    )
  }
}


WorkpassAdmin.propTypes = {
 
}

export default WorkpassAdmin
