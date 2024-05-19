import React, { Component } from "react";

class DisplayPeople extends Component {

  enableDisableToggle = (e) => {
    this.props.updateEnableDisable()
  }

  onChange = (e) => {
    let orgId = this.props.orgId
    let adminId = e.target.id
    let payload = {
      orgId: orgId,
      adminId: adminId,
      isActive: !e.target.name
    }
    this.props.getPeopleDetails(payload)
  }

  render() {
    let { admin_details, fetchingPeople } = this.props;
    var adminList = [];
    if (!fetchingPeople) {
      adminList = admin_details.admins.filter((itm) => {return (itm.user !== null)});
    }
    console.log("adminList", adminList.length === 0 && this.props.fetchingPeople);
    return (
      <div></div>
    );
  }
}

export default DisplayPeople;
