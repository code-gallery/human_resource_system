import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import isNull from 'lodash/isNull'
import Candidate from './Candidate'
import CandidateRequests from './CandidateRequests'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Layout from 'containers/Layout'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'

class OrganisationCandidate extends Component {
  state = {
    activeSection: 'workpass',
    isNoteFormOpen: false,
    edit_note: {}
  }

  componentDidMount() {
    const { orgId, candidateId } = this.getUrlParams()
    this.props.requestCandidate(orgId, candidateId)
    this.props.getNotes(orgId, candidateId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.workpassStatus) {
      const { orgId, candidateId } = this.getUrlParams()
      this.props.requestCandidate(orgId, candidateId)
    }
    /* let flag = true;
    if (Array.isArray(this.props.deletedData)) {
      if (this.props.deletedData.length > 0) {
        //this.props.deleteCandidate(candidateId, null, orgId, flag)
      }
    }*/
  }

  getUrlParams() {
    const { orgId, candidateId } = this.props.match.params

    return {
      orgId: parseInt(orgId, 10),
      candidateId: parseInt(candidateId, 10)
    }
  }

  isLoading() {
    const { loading, candidate, organisationBalance } = this.props

    return loading ||
      organisationBalance.loading ||
      (organisationBalance.balance === null) ||
      (candidate === null)
  }

  assignWorkpass = () => {
    const { orgId, candidateId } = this.props.match.params
    const email = this.props.candidate.email
    this.props.assignWorkpass({ candidateId, orgId, email },
      () => {
        notify.show(
          this.props.resultMessage ? this.props.resultMessage : 'Request assigned successfully!!',
          'success',
          NOTIFICATION_TIMEOUT
        )
        window.location.reload()
      }
      ,
      () => notify.show(
        this.props.resultMessage ? this.props.resultMessage : 'Failed to assign work pass request!!',
        'error',
        NOTIFICATION_TIMEOUT
      ))
  }

  setSection = (activeSection) => {
    this.setState({
      activeSection
    })
  }

  openNoteForm = () => {
    this.setState({
      isNoteFormOpen: true,
      edit_note: {}
    })
  }

  closeNoteForm = () => {
    this.setState({
      isNoteFormOpen: false
    })
  }

  editNote = (edit_note) => {
    this.setState({
      isNoteFormOpen: true,
      edit_note
    })
  }

  render() {
    const {
      candidate,
      error,
      organisationBalance,
      deleteCandidate,
      deletedData,
      deleteRequest,
      deleteReqStatus,
      refreshRequest,
      refreshReqStatus,
      saveEmploymentReference,
      fetchOrganisations,
      organisations,
      fetchCandidatePersonalInfo,
      addresses,
      savePersonalInfo,
      saveAddress,
      deleteAddress,
      editAddress,
      loader,
      notes,
      saveNote,
      deleteNote,
      pendingNote
    } = this.props
    if (!isNull(error)) {
      return <Redirect to="/profile" />
    }
    const { orgId, candidateId } = this.getUrlParams()
    const isLoading = this.isLoading()
    var isCandidateDelete = true
    var assignButtonStatus = false
    if (!isLoading && candidate.userId == null) {
      var reqData = [...candidate.requests]
      for (var i = 0; i < reqData.length; i++) {
        if (!reqData[i].deletestatus) {
          isCandidateDelete = false
          break
        }
      }
      assignButtonStatus = candidate.requests.length ? candidate.assignButtonStatus : false
    }
    let options = []
    if (organisations !== undefined) {
      options = organisations.data.map((org)=>{
        return {
          id: org.id,
          value: org.name
        }
      })
    }
    let personalinfo = {}
    let addressList = []
    if (candidate && candidate.userId) {
      personalinfo = this.props.personalinfo ? this.props.personalinfo : {}
      addressList = addresses
    } else {
      personalinfo = this.props.personalinfo
      addressList = this.props.personalinfo.addresses ? this.props.personalinfo.addresses : []
    }
    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <Notifications></Notifications>
        <Candidate
          orgId={orgId}
          organisationBalance={organisationBalance.balance || 0}
          candidate={candidate}
          loading={isLoading}
          deleteCandidate={deleteCandidate}
          deletedData={deletedData}
          deleteRequest={deleteRequest}
          isCandidateDelete={isCandidateDelete}
          assignWorkpass={this.assignWorkpass}
          assignButtonStatus={assignButtonStatus}
          activeSection={this.state.activeSection}
          openNoteForm={this.openNoteForm}
        >
          {(!isLoading && this.props.user) &&
            <CandidateRequests
              orgId={orgId}
              candidate={candidate}
              candidateId={candidateId}
              requests={candidate.requests}
              location={this.props.location}
              deleteRequest={deleteRequest}
              deleteReqStatus={deleteReqStatus}
              refreshRequest={refreshRequest}
              refreshReqStatus={refreshReqStatus}
              saveEmploymentReference={saveEmploymentReference}
              filterOrganisation={fetchOrganisations}
              organisations={options}
              loading={loader}
              saveEmpLoader={this.props.saveEmpLoader}
              getRequest={this.props.getRequest}
              fetchCandidatePersonalInfo={fetchCandidatePersonalInfo}
              personalinfo={personalinfo}
              addresses={addressList}
              savePersonalInfo={savePersonalInfo}
              saveAddress={saveAddress}
              deleteAddress={deleteAddress}
              editAddress={editAddress}
              userId={candidate.userId}
              loggedInUser={this.props.user.id}
              activeSection={this.state.activeSection}
              setSection={this.setSection}
              closeNoteForm={this.closeNoteForm}
              notes={notes}
              saveNote={saveNote}
              deleteNote={deleteNote}
              editNote={this.editNote}
              pendingNote={pendingNote}
              edit_note={this.state.edit_note}
              isNoteFormOpen={this.state.isNoteFormOpen}
            />
          }
        </Candidate>
      </Layout>
    )
  }
}

OrganisationCandidate.propTypes = {
  match: PropTypes.object.isRequired,
  requestCandidate: PropTypes.func.isRequired,
  candidate: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  organisationBalance: PropTypes.object.isRequired
}

export default OrganisationCandidate
