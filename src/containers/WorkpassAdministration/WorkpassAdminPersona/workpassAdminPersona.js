import React, { Component } from 'react'
import BreadCrumb from 'components/BreadCrumb'
import WorkPassMain from 'components/WorkPassMain'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Notifications, { notify } from 'react-notify-toast'
import Layout from 'containers/Layout'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import 'containers/WorkpassAdministration/style.css'
import WorkpassAdminPersonaHeader from './WorkpassPersonaHeader/workpassPersonaHeader'
import WorkpassCompanyTable from './WorkpassCompanyTable/workpassCompanyTable'
import WorkpassPersonaTable from './WorkpassPersonaTable/workpassPersonaTable'
import WorkpassCheckTable from './WorkpassCheckTable/workpassCheckTable'

class WorkpassAdminPersona extends Component {
  
  constructor(props){
    super(props);
    this.state= {
      organisation_id : "",
      persona_id : "",
      checks_id : "",
      fetch_organisation_id:"",
      fetch_persona_id:"",
      name: JSON.parse(localStorage.getItem('companyName')),
      breadCrumbs: [
        {
          name: 'Work Pass Administration',
          url: `/organisations/${this.props.match.params.orgId}/workpassAdmin`,
          active: false
        },
        {
            name:'Company',
            url: `/organisations/${this.props.match.params.orgId}/workpassAdmin/persona`,
            active: true
          }
      ]
    }
  }
  
  componentDidMount() {
    const orgId = this.getOrganisationId();
    this.props.fetchClientOrganisations(orgId);
    this.props.fetchOrganisations();
    this.props.fetchOrganisationsModal()
    this.props.fetchChecksModal(orgId);
    let breadCopy = JSON.parse(JSON.stringify(this.state.breadCrumbs))
    breadCopy[1].name = this.state.name;
    this.setState({
      breadCrumbs:breadCopy 
    }) 
  }
 
  getOrganisationId(props = this.props) {
    return parseInt(props.match.params.orgId, 10)
  }

  formChild1(params) {
    this.setState({
      organisation_id : params,
      persona_id:'',
      checks_id:''
    })
  }
  formChild2(params) {
    this.setState({
      persona_id : params,
      checks_id:''
    })
  }

  formChild3(params) {
    this.setState({
      checks_id : params
    })
  }
  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, NOTIFICATION_TIMEOUT)
  }
  deleteCompany = (organisation_id) => {
   // const user_id = this.props.user.id;
   const orgId = this.getOrganisationId();
    this.props.deleteCompany({ orgId, organisation_id },
      () =>{notify.show('Company deleted successfully', 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to delete. Please try again', 'error', NOTIFICATION_TIMEOUT)
    )
    this.setState({
      fetch_persona_id : "",
      persona_id : "",
      checks_id:'',
      organisation_id:'',
      fetch_organisation_id:''
    })
  }

  deletePersona = (organisation_id,persona_id) => {
    
    this.props.deletePersona({ organisation_id, persona_id },
      () =>{notify.show('Persona deleted successfully', 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to delete. Please try again', 'error', NOTIFICATION_TIMEOUT)
    )
    this.setState({
      fetch_persona_id : "",
      persona_id : "",
      checks_id:''
    })
  }
  deleteChecks = (persona_id, checks_id) => {
    this.props.deleteChecks({ persona_id, checks_id},
      () =>{notify.show('Checks deleted successfully', 'success', NOTIFICATION_TIMEOUT)} ,
      () => notify.show('Failed to delete. Please try again', 'error', NOTIFICATION_TIMEOUT)
    )
  }

  getPersona = (organisation_id) => {
    const orgId = this.getOrganisationId();
    this.props.fetchUserPersona(orgId,organisation_id)
    this.setState({
      fetch_organisation_id : organisation_id,
      fetch_persona_id : ""
    })
  }
  getCheck = (persona_id) => {
    this.props.fetchUserChecks(persona_id)
    this.setState({
      fetch_persona_id : persona_id
    })
  }
 
 


render(){
  const {organisations,client_org,workPassPersonas,workPassChecks,user,
    pending_org,
    pending_persona,
    pending_checks,
    verifyCompany,
    verifyChecks,
    verifyPersona,
    organisationsModal,
    checksModal,
    fetchUserPersona,
    fetchUserChecks
  } = this.props
  
  const orgId = this.getOrganisationId();
  
  return (
    <Layout showFooter={false} responsive={false}>
        <Notifications />
         <WorkPassSideMenu  organisationId={orgId}/>
         <WorkPassMain>
         <BreadCrumb  links={this.state.breadCrumbs} className='workpass__breadcrumb'/>
         
       
          <main>
          <div className='container-fluid'>
           <WorkpassAdminPersonaHeader 
            deleteCompany={this.deleteCompany} 
            deletePersona={this.deletePersona} 
            deleteChecks={this.deleteChecks} 
            data={this.state.organisation_id} 
            data2={this.state.persona_id} 
            data3={this.state.checks_id}
            organisationsModal ={organisationsModal}
            organisations={organisations}
            workPassPersonas={workPassPersonas}
            fetch_organisation_id={this.state.fetch_organisation_id}
            fetch_persona_id={this.state.fetch_persona_id}
            checksModal={checksModal}
            user={user}
            verifyCompany={verifyCompany}
            verifyChecks={verifyChecks}
            verifyPersona={verifyPersona}
            workPassChecks={workPassChecks}
            fetchUserPersona={fetchUserPersona}
            fetchUserChecks={fetchUserChecks}
            orgId={orgId}
            pending_persona={pending_persona}
            pending_checks={pending_checks}
            client_org={client_org}>
           </WorkpassAdminPersonaHeader>
           <div className='row tables_wrapper'>
             <div className='col-sm-12 col-md-4 col-lg-4 child_wrap'>
             <WorkpassCompanyTable pending_org={pending_org} getPersona={this.getPersona}  organisations={organisations} client_org={client_org} callback={this.formChild1.bind(this)}></WorkpassCompanyTable>
             </div>
             <div className='col-sm-12 col-md-4 col-lg-4 child_wrap'>
               <WorkpassPersonaTable pending_persona={pending_persona} workPassPersonas={workPassPersonas} getCheck={this.getCheck} callback2={this.formChild2.bind(this)}></WorkpassPersonaTable>
             </div>
             <div className='col-sm-12 col-md-4 col-lg-4 child_wrap'>
               <WorkpassCheckTable pending_checks={pending_checks} fetchUserChecks={fetchUserChecks} workPassChecks={workPassChecks} workPassPersonas={workPassPersonas} callback3={this.formChild3.bind(this)}></WorkpassCheckTable>
             </div>
           </div>
          </div>
        </main>
       
      </WorkPassMain>
     </Layout>
   )
 }
}
 

export default WorkpassAdminPersona
