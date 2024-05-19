import React, { Component } from 'react'
import 'containers/WorkpassAdministration/style.css'
import Button from 'components/Button'
import WorkpassCompanyModal from 'containers/WorkpassAdministration/WorkpassAdminPersona/WorkpassCompanyModal'
import WorkpassPersonaModal from 'containers/WorkpassAdministration/WorkpassAdminPersona/WorkpassPersonaModal'
import WorkpassChecksModal from 'containers/WorkpassAdministration/WorkpassAdminPersona/WorkpassChecksModal'

class WorkpassAdminPersonaHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen : false,
      personamodalIsOpen : false
    }
  }

  deleteCompany = () => {
    this.props.deleteCompany(this.props.data)
  }
  deletePersona = () => {
    this.props.deletePersona(this.props.data, this.props.data2)
  }
  deleteChecks = () => {
    this.props.deleteChecks(this.props.data2, this.props.data3)
  }
  openAddModal = () => {
    this.setState({
        modalIsOpen: !this.state.modalIsOpen
    })
  }

  openAddChecksModal = () => {
    this.setState({
      checksmodalIsOpen: !this.state.checksmodalIsOpen
    })
  }

  openAddPersonaModal = () => {
  if(this.props.workPassPersonas !== "undefined" && this.props.workPassPersonas !== []){ 
    this.setState({
      personamodalIsOpen: !this.state.personamodalIsOpen
  })
    }
  }

  render(){
    const {orgId, workPassChecks, fetchUserPersona,fetchUserChecks, workPassPersonas,organisationsModal,checksModal, organisations, user,verifyCompany,verifyChecks,verifyPersona,fetch_organisation_id,fetch_persona_id,client_org } = this.props
    return (
    
      <div className="row personaHeader">
        <div className="col-sm-12 col-lg-4 col-md-4 ">
          <div className='row tableContainer'>
            <span>Company</span>
            <div className='linkedButton'>
              <Button
                className="CandidateHeader__button"
                icon=""
                color="green" 
                onClick={() => this.openAddModal()}>
                    New
                </Button>
            
              <Button
                className="CandidateHeader__button"
                color="red" onClick={this.deleteCompany}>Remove
            </Button></div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4 col-md-4">
          <div className='row tableContainer'>
            <span>Persona</span>
            <div className='linkedButton'>
            <Button
                className="CandidateHeader__button"
                icon=""
                color="green"
                onClick={() => this.openAddPersonaModal()}
                disabled={this.props.pending_persona}>
                    Add
                </Button>
                <Button
                className="CandidateHeader__button"
                color="red" onClick={this.deletePersona}>Remove
            </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-4 col-md-4">
          <div className='row tableContainer'>
            <span>Checks</span>
            <div className='linkedButton'>
              <Button
                className="CandidateHeader__button"
                icon=""
                color="green"
                onClick={() => this.openAddChecksModal()}
                disabled={this.props.pending_checks}>
                    Add
              </Button>
              <Button
                className="CandidateHeader__button"
                color="red" onClick={this.deleteChecks}>Remove
            </Button>
            </div>
            </div>
          </div>
        {this.state.modalIsOpen ? <WorkpassCompanyModal user={user} client_org={client_org} orgId={orgId} modalIsOpen={this.state.modalIsOpen} organisations={organisations} openAddModal={this.openAddModal} organisationsModal={organisationsModal} verifyCompany={verifyCompany}></WorkpassCompanyModal> : ""}
        {this.state.personamodalIsOpen ? <WorkpassPersonaModal workPassPersonas={workPassPersonas} orgId={orgId} fetchUserPersona={fetchUserPersona} personamodalIsOpen={this.state.personamodalIsOpen} fetch_organisation_id={fetch_organisation_id} fetch_persona_id={fetch_persona_id} openAddPersonaModal={this.openAddPersonaModal} verifyPersona={verifyPersona}></WorkpassPersonaModal> : ""}
        {this.state.checksmodalIsOpen ? <WorkpassChecksModal workPassChecks={workPassChecks} fetch_organisation_id={fetch_organisation_id} fetchUserChecks={fetchUserChecks} fetch_persona_id={fetch_persona_id} checksmodalIsOpen={this.state.checksmodalIsOpen} checksModal={checksModal} openAddChecksModal={this.openAddChecksModal} verifyChecks={verifyChecks}></WorkpassChecksModal> : ""}
      
      </div>
    )}
  }

WorkpassAdminPersonaHeader.propTypes = {

}

export default WorkpassAdminPersonaHeader
