import React, { Component } from "react";
import PropTypes from "prop-types";
import BreadCrumb from "components/BreadCrumb";
import WorkPassMain from "components/WorkPassMain";
import WorkPassSideMenu from "components/WorkPassSideMenu";
import Layout from "containers/Layout";
import Accounts from "./components/Accounts";
import People from "./components/People";
import { Redirect } from 'react-router-dom'
import './style.css';

class PersonaPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadCrumbs: [],
      type: "Accounts",
    };
  }

  componentDidMount() {

    let type = this.props.match.params.type;
    const orgId = this.props.match.params.orgId;
    this.setState({
      type: type,
    });
    this.props.accountsFetch(orgId)
    this.props.peopleFetch(orgId)
  }

  componentDidUpdate(prevProps) {
    if (this.state.type !== this.props.match.params.type) {
      this.setState({ type: this.props.match.params.type });
    }
  }

  getOrganisationId(props = this.props) {
    return parseInt(props.match.params.orgId, 10);
  }

  render() {
    let adminIsPrimary = 0
    let loggedInUser = localStorage.getItem("userId")
    console.log(this.props.accounts_details)
    if(!this.props.accounts_details.fetchingPeople){
      let adminDetails = this.props.accounts_details.admin_details.filter((admin) => admin.user_id === parseInt(loggedInUser))
      if(adminDetails.length) { adminIsPrimary = adminDetails[0].primary}
      if (!adminIsPrimary) {
        return <Redirect to="/profile" />
      }
    }
    
    const orgId = this.getOrganisationId();
    let { accounts_details, peopleFetch, enableDisable } = this.props
    let breadCrumbs = [
      {
        name: "Permissions",
        active: false,
      },
      {
        name: this.state.type,
        url: `/organisations/${orgId}/personaPermission/${this.state.type}`,
        active: true,
      },
    ];
    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} location={this.props.match.params}/>
        <WorkPassMain>
          <BreadCrumb links={breadCrumbs} className="workpass__breadcrumb" />
            {this.state.type === 'Accounts' ? 
                <Accounts accounts_details={accounts_details} orgId={orgId} peopleFetch={peopleFetch} enableDisable={enableDisable} 
                getPeoplesIds={this.getPeoplesIds}/>
            :
                <People accounts_details={accounts_details} orgId={orgId} peopleFetch={peopleFetch} enableDisable={enableDisable}/>
            }
        </WorkPassMain>
      </Layout>
    );
  }
}

PersonaPermission.propTypes = {
  balance: PropTypes.number,
  organisationId: PropTypes.number.isRequired,
  fetchBalance: PropTypes.func.isRequired,
  hasNotification: PropTypes.bool.isRequired,
};

export default PersonaPermission;
