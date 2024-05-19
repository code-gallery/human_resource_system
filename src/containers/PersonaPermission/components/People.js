import React, { Component } from "react";
import Loader from "components/Loader";
import Notifications, { notify } from "react-notify-toast";
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import { Table, TableData } from "components/Table";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: "",
      selecttedAdminId: "",
      search_acc: "",
      search_people: "",
      enabledOrgsIds: [],
      selecttedAdminUserid: ""
    };
  }

  updateEnableDisable = (e) => {
    let isEnabled = 'Enabled'
    if(this.state.enabledOrgsIds.includes(parseInt(e.target.id))){
      isEnabled  =  "Enabled"
    }
    else{
      isEnabled  =  "Disabled"
    }
    if(this.state.selecttedAdminId === null || this.state.selecttedAdminId === ""){
      notify.show("Please select People first.","error")
    }
    let payload = {
      client_id: e.target.id,
      adminId: this.state.selecttedAdminId,
      status: isEnabled,
      org_id: this.props.orgId
    };
    let myColor = { background: '#f0909d', text: "#141414" };
    this.props.enableDisable({ payload },
      () =>{notify.show("Record Updated!", 'custom', NOTIFICATION_TIMEOUT, myColor)} ,
      () => notify.show('Failed to update record!', 'error', NOTIFICATION_TIMEOUT));
  };

  onChange_people = (userId, recordId) => {
    let selectedAdmin = this.props.accounts_details.admin_details.filter((itm) => parseInt(itm.user_id) === parseInt(userId))
    let enabledOrgs = selectedAdmin[0].userpermission
    let enabledOrgsIds = enabledOrgs.map((item) => {
      if(item.Status === "Disabled"){
        return item.client_id
      }
    })      
    this.setState({
      selecttedAdminId: recordId,
      enabledOrgsIds: enabledOrgsIds,
      selecttedAdminUserid:  userId
    });
  };

  componentWillReceiveProps(nextProps) {
    let selectedAdmin = nextProps.accounts_details.admin_details.filter((itm) => parseInt(itm.user_id) === parseInt(this.state.selecttedAdminUserid))
    if(selectedAdmin.length){
      let enabledOrgs = selectedAdmin[0].userpermission
    let enabledOrgsIds = enabledOrgs.map((item) => {
      if(item.Status === "Disabled"){
        return item.client_id
      }
    }) 
    this.setState({
      enabledOrgsIds: enabledOrgsIds
    });
    }  
}

  onchange_account = (e) => {
    let selectedAdmin = this.props.accounts_details.accounts_details.filter((itm) => parseInt(itm.id) === parseInt(e.target.name))
    let enabledOrgs = selectedAdmin[0].userpermission
    let enabledOrgsIds = enabledOrgs.map((item) => item.client_id) 
    this.setState({
      selectedOrg: e.target.id,
      enabledPeopleIds: enabledOrgsIds
    });
  };

  searchAccount = (event) => {
    this.setState({ search_acc: event.target.value.substr(0, 20) })
  }

  searchPeople = (event) => {
    this.setState({ search_people: event.target.value.substr(0, 20) })
  }

  render() {
    let { accounts_details } = this.props;
    let accounts_detail = accounts_details.accounts_details;
    let admin_details = accounts_details.admin_details;
    let fetchingAccounts = accounts_details.fetchingAccounts;
    let fetchingPeople = accounts_details.fetchingPeople;
    var adminList = [];
    if (!fetchingPeople) {
      adminList = admin_details.filter((itm) => {
        return itm.user !== null;
      });
    }
    accounts_detail = accounts_detail.filter(
        (itm) => {
          return itm.name.toLowerCase().indexOf(this.state.search_acc.toLowerCase()) !== -1;
        }
      );
  
      adminList= adminList.filter(
        (itm) => {
          return (itm.user.first_name.toLowerCase().indexOf(this.state.search_people.toLowerCase()) !== -1 || 
          itm.user.last_name.toLowerCase().indexOf(this.state.search_people.toLowerCase()) !== -1)
        }
      );
    return (
      <React.Fragment>
        <Notifications></Notifications>
        {fetchingAccounts && fetchingPeople ? (
          <span className="Candidates__loader">
            <Loader size={65} color="#72d371" />
          </span>
        ) : (
          <div className="row tables_wrapper">
            <div className="col-md-4 child_wrap p-table-padding">
              <Table>
                <thead className="permission-table-header">
                  <tr>
                    <th className="permission-table-heading">People</th>
                  </tr>
                </thead>
                <tbody className="permission-table-body">
                  <tr className="CandidatesTable__table-row p-table-row-padding">
                    <TableData className="CandidatesTable__table-data defaltCurser">
                      <input
                        className="SearchBox__input"
                        type="text"
                        value={this.state.search_people}
                        onChange={this.searchPeople}
                        placeholder="Search"
                      />
                    </TableData>
                  </tr>

                  {adminList.map((admin, idx) => {
                    return (
                      <tr className="CandidatesTable__table-row p-table-row-padding">
                        <TableData className="CandidatesTable__table-data table-label defaltCurser">
                          <div className="form-checkbox no-label">
                            <input
                              name="people"
                              type="radio"
                              id={admin.id}
                              onChange={(e) => this.onChange_people(admin.user_id, admin.id)}
                              className="permissions-checkbox"
                            />
                            {admin.user.first_name} {admin.user.last_name}
                          </div>
                        </TableData>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="col-md-8 child_wrap p-table-padding">
              <Table>
                <thead className="permission-table-header">
                  <tr>
                    <th className="permission-table-heading">Accounts</th>
                  </tr>
                </thead>
                <tbody className="permission-table-body">
                  <tr className="CandidatesTable__table-row p-table-row-padding">
                    <TableData className="CandidatesTable__table-data defaltCurser">
                      <input
                        className="SearchBox__input"
                        type="text"
                        value={this.state.search_acc}
                        onChange={this.searchAccount}
                        placeholder="Search"
                      />
                    </TableData>
                  </tr>
                  {this.state.selecttedAdminId !== ""? 
                  <React.Fragment>
                  {accounts_detail.map((organisation, idx) => {
                    return (
                      <tr className="CandidatesTable__table-row p-table-row-padding">
                        <TableData className="CandidatesTable__table-data table-label p-flex defaltCurser">
                          <div className="p-flex-child">
                            {/* <input
                              name={organisation.active}
                              type="radio"
                              id={organisation.id}
                              onChange={this.onchange_account}
                              className="permissions-checkbox"
                            /> */}

                            {organisation.name}
                          </div>
                          <div className="p-flex-child p-flex-child-2">
                            <button
                              className={
                                this.state.enabledOrgsIds.includes(organisation.id)
                                  ? "permissions-button-inactive"
                                  : "permissions-button"
                              }
                              icon=""
                              id={organisation.id}
                              name={organisation.active}
                              color="green"
                              onClick={this.updateEnableDisable}
                              disabled={null}
                            >
                              {this.state.enabledOrgsIds.includes(organisation.id) ? "Enable" : "Enabled"}
                            </button>
                          </div>
                        </TableData>
                      </tr>
                    );
                  })}
                  </React.Fragment>:""}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default People;
