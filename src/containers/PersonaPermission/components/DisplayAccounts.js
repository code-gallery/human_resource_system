import React, { Component } from "react";

class DisplayAccounts extends Component {

  onchange = (e) => {
    this.props.getAccountsDetails(e.target.id)
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default DisplayAccounts;
