import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import CandidateNewRequestView from './CandidateNewRequestView'
import RequestConfirmation from './RequestConfirmation'
import WorkPassMain from 'components/WorkPassMain'
import Icon from 'components/Icon'
import SideMenu from 'components/WorkPassSideMenu'
import Modal from 'components/Modal'
import Layout from 'containers/Layout'

class OrganisationCandidateNewRequest extends Component {
   
  componentDidMount() {
    this.makeRequests()
  }

  makeRequests() {
    const candidateId = this.getCandidateId()
    const orgId = this.getOrgId()

    this.props.requestCandidate(orgId, candidateId)
    this.props.requestOrganisationConfig(orgId)
  }

  getOrgId() {
    return parseInt(this.props.match.params.orgId, 10)
  }

  getCandidateId() {
    return parseInt(this.props.match.params.candidateId, 10)
  }

  renderConfirmationModal() {
    const orgId = this.getOrgId()
    const candidateId = this.getCandidateId()

    const handleClose = () => {
      this.props.history.push(`/organisations/${orgId}/candidates/${candidateId}`)
      this.props.resetNewRequest()
    }

    /** @TODO: move to stylesheet */
    const closeStyles = {
      position: 'absolute',
      right: '30px',
      top: '30px',
      zIndex: 100,
      display: 'block',
      width: '17px',
      height: '17px',
      overflow: 'hidden',
      cursor: 'pointer'
    }
    const modalStyles = {
      height: '500px',
      overflow_y: 'hidden'
    }

    const { postedInfo } = this.props.workPassRequest
    const candidate = this.props.candidate.entity
    const profileImage = candidate.profileImage

    const confirmationProps = {
      organisationImage: postedInfo.organisationLogo,
      profileImage,
      role: postedInfo.role,
      date: postedInfo.createdAt,
      country: postedInfo.country === 'GB' ? 'United Kingdom' : postedInfo.country,
      region: postedInfo.region,
      id: postedInfo.id,
      checks: postedInfo.checks
    }

    return (
      <Layout showFooter={false} responsive={false}>
        <SideMenu organisationId={orgId} />
        <WorkPassMain />

        <Modal
          isOpen={true}
          contentLabel="Request Confirmation" 
        >
          <div style={closeStyles} onClick={handleClose}>
            <Icon color="#7F8DAA" type="close" />
          </div>

          <div style={modalStyles}><RequestConfirmation {...confirmationProps} /></div>
        </Modal>
      </Layout>
    )
  }

  render() {
    const {
      workPassRequest,
      candidate,
      client_org,
      fetchUserPersona,
      workPassPersonas,
      fetchUserChecks,
      workPassChecks,
      fetchClientOrganisations,
      clientOrganisationsfilter,
      postNewRequest
    } = this.props

    const candidateId = this.getCandidateId()
    const organisationId = this.getOrgId()

    /** Handle Errors from endpoint */
    if (candidate.error || workPassRequest.error) {
      return <Redirect to={`/organisations/${organisationId}/candidates/${candidateId}`} />
    }

    const isLoading = (
      workPassRequest.loading ||
      candidate.isFetching ||
      candidate.entity === null
    )

    if (workPassRequest.posted) {
      return this.renderConfirmationModal()
    }

    return (
      <Layout showFooter={false} responsive={false}>
        <SideMenu organisationId={organisationId} />

        <CandidateNewRequestView
          checks={workPassRequest.organisationChecks}
          loading={isLoading}
          candidate={candidate.entity}
          candidateId={candidateId}
          organisationId={organisationId}
          postNewRequest={postNewRequest}
          client_org={client_org}
          fetchUserPersona={fetchUserPersona}
          workPassPersonas={workPassPersonas}
          fetchUserChecks={fetchUserChecks}
          workPassChecks={workPassChecks}
          fetchClientOrganisations={fetchClientOrganisations}
          clientOrganisationsfilter={clientOrganisationsfilter}
        />
      </Layout>
    )
  }
}

OrganisationCandidateNewRequest.propTypes = {
  workPassRequest: PropTypes.shape({
    organisationChecks: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    posted: PropTypes.bool.isRequired,
    postedInfo: PropTypes.object
  }).isRequired,
  match: PropTypes.object.isRequired,
  requestOrganisationConfig: PropTypes.func.isRequired,
  candidate: PropTypes.object.isRequired,
  requestCandidate: PropTypes.func.isRequired,
  postNewRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  resetNewRequest: PropTypes.func.isRequired
}

export default OrganisationCandidateNewRequest
