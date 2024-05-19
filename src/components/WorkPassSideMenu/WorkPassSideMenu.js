import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import isNumber from 'lodash/isNumber'
import classNames from 'classnames'
import LinkedButton from 'components/LinkedButton'
import prettyPrice from 'utils/prettyPrice'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

class WorkPassSideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      submenudisplay : false,
      isPrimaryAdmin : false,
      admin_details : {},
      admin_list : [],
      loggedInUser: "",
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.admin_details !== prevState.admin_list && nextProps.admin_details.length){
      return { admin_list: nextProps.admin_details };
   }
   else return null;
 }

 componentDidUpdate(prevProps, prevState) {
  const { fetchBalance, organisationId, peopleFetch } = this.props
   if(this.props.organisationId !== prevProps.organisationId && this.props.admin_details !== undefined){
    peopleFetch(organisationId)
    this.setState({
       admin_list: this.props.admin_details,
    })
   }
}

  componentDidMount() {
    const { fetchBalance, organisationId, peopleFetch } = this.props
    fetchBalance(organisationId) 
    peopleFetch(organisationId)  
    let loggedInUser = localStorage.getItem("userId")
    this.setState({
      //admin_details : this.props.admin_details,
      loggedInUser: loggedInUser,
    })
  }

  render() {
    const { balance, organisationId, hasNotification } = this.props
    const addCandidatePath = ROUTE_URL.organisationAddCandidate.replace(':orgId', organisationId)
    const dashboardPath = ROUTE_URL.dashboard
      .replace(':orgId', organisationId)
    const candidatesPath = ROUTE_URL.organisationCandidates
      .replace(':orgId', organisationId)
    const externalcandidatesPath = ROUTE_URL.externalCandidates
      .replace(':orgId', organisationId)
    const workpassAdminPath = ROUTE_URL.persona.replace(':orgId', organisationId)
    const workpassOrganisationPath = ROUTE_URL.workpassAdmin.replace(':orgId', organisationId)
    const organisationDocumentsPath= ROUTE_URL.organisationDocuments.replace(':orgId', organisationId)
    const personaPermissionPathAccounts = ROUTE_URL.personaPermission.replace(':orgId', organisationId).replace(':type', "Accounts")
    const personaPermissionPathPeople = ROUTE_URL.personaPermission.replace(':orgId', organisationId).replace(':type', "People")
    const displayBalance = isNumber(balance) ? prettyPrice(balance) : ''
    const rootStyle = classNames('SideMenu', { hasNotification })
    let adminIsPrimary = 0
    let adminDetails = this.state.admin_list.filter((admin) => admin.user_id === parseInt(this.state.loggedInUser))
    if (adminDetails.length) {
      adminIsPrimary = adminDetails[0].primary
    }
    let adminLinkActiveLocation = this.props.location
    if(adminLinkActiveLocation !== undefined){adminLinkActiveLocation = this.props.location.type}
    else{adminLinkActiveLocation = ""}
    return (
      <aside className={rootStyle}>
        <div className="SideMenu__button">
          <LinkedButton
            icon="search"
            color="green"
            to={addCandidatePath}
          >
            Add Candidate
          </LinkedButton>
        </div>

        <ul className="SideMenu__link-list-wrap">
          <li>
            <NavLink
              className="SideMenu__link"
              activeClassName="is-active"
              to={dashboardPath}
              exact>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className="SideMenu__link"
              activeClassName="is-active"
              to={candidatesPath}
              exact>
              Candidates
            </NavLink>
          </li>
          <li>
            <NavLink
              className="SideMenu__link"
              activeClassName="is-active"
              to={externalcandidatesPath}
              exact>
              External Candidates
            </NavLink>
          </li>
          <li>
            <NavLink
              className="SideMenu__link"
              activeClassName="is-active"
              to={organisationDocumentsPath}
              exact>
              Organisations
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nestedMenu"
              activeClassName="is-active"
              to={organisationDocumentsPath} exact
              >Documents
            </NavLink>
            </li>
          <li>
            <NavLink
              className="SideMenu__link"
              activeClassName="is-active"
              to={workpassAdminPath} 
                        
            >Work Pass Administration
            </NavLink>
            </li>
            <li>
            <NavLink
              className="nestedMenu"
              to={workpassOrganisationPath}
              activeClassName="is-active"
              exact
              >Organisations
            </NavLink>
              </li>
              <li>
            <NavLink
              className="nestedMenu"
              activeClassName="is-active"
              to={workpassAdminPath} exact
              >Persona
            </NavLink>
            </li>
    {adminIsPrimary ? 
    <React.Fragment>
          <li>
            <NavLink
              className="SideMenu__link"
              activeClassName="is-active"
              to={personaPermissionPathAccounts} 
              exact
              isActive={()=> (adminLinkActiveLocation === "Accounts" || adminLinkActiveLocation === "People")}
            >Permission Admin
            </NavLink>
            </li>
            <li>
            <NavLink
              className="nestedMenu"
              to={personaPermissionPathAccounts}
              activeClassName="is-active"
              exact
              isActive={()=> adminLinkActiveLocation === "Accounts"}
              >Accounts
            </NavLink>
              </li>
              <li>
            <NavLink
              className="nestedMenu"
              to={personaPermissionPathPeople} 
              activeClassName="is-active"
              exact
              isActive={()=>adminLinkActiveLocation === "People"}
              >People
            </NavLink>
            </li>
            </React.Fragment>
           :""}
            </ul>

            { /*<div className="SideMenu__balance">
          <span>Balance</span>
          <span className="SideMenu__balance-amount">{displayBalance}</span>
            </div> */ }
      </aside>
    )
  }
}

WorkPassSideMenu.propTypes = {
  balance: PropTypes.number,
  organisationId: PropTypes.number.isRequired,
  fetchBalance: PropTypes.func.isRequired,
  hasNotification: PropTypes.bool.isRequired
}

export default WorkPassSideMenu
