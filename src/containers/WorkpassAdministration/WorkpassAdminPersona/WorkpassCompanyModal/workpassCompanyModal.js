import React, { Component } from 'react'
import { Table, TableData } from 'components/Table'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'

class WorkpassCompanyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: this.props.modalIsOpen,
      optionsChecked: "",
      optionsCheckedName: "",
      loopover: [],
      loopoverinloop: [],
      loopoverinloopID: [],
      existingOrganisations: [],
      orgId:this.props.orgId,
    }
    this.onChangeInput.bind(this);
    this.addCompanies.bind(this);
  }

  componentDidMount() {
    this.getcompanynamesarray()
  }

  onChangeInput = (event) => {
    let selectedValue = event.target.id;
    let selectedValueName = event.target.value;
    this.setState({
      optionsChecked: selectedValue,
      optionsCheckedName: selectedValueName
    });
  }

  notifyFn(message, type) {
    notify.show(message, type)
  }

  addCompanies = (client_id,orgName) => {
    let organisations = this.props.client_org
    let user_id = this.props.user.id
    let organisation_id = this.state.orgId
    if (this.state.optionsChecked != '') {
      this.props.verifyCompany({client_id:client_id, organisation_id:organisation_id, orgName:orgName, organisations:organisations,user_id:user_id},
        () =>{notify.show("Company Added Successfully", 'success', NOTIFICATION_TIMEOUT)} ,
        () => notify.show('Failed to add Company. Please try again', 'error', NOTIFICATION_TIMEOUT)
      )
      this.props.openAddModal()
    } else{
      this.notifyFn("Please select a Company","error")
    }
  }

  onSubmit = () => {
    return null;
  }

  filterList = e => {
    if (e.target.value.length >= 2) {
      const updatedList = this.state.loopover.filter((item) => {
        return item.name ? item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1 : false
      });
      this.setState({
        loopoverinloopID: updatedList
      });
    }
  };

  getcompanynamesarray = () => {
    this.setState({
      loopover: this.props.organisationsModal,
    });
    this.props.organisationsModal.map((company) => {
      this.state.loopoverinloop.push(company)
    })
    // if(this.props.client_org!='undefined')
    this.props.client_org.map(company => {
      this.state.existingOrganisations.push(company)
    })
    let companyData = this.state.loopoverinloop.filter(o => !this.state.existingOrganisations.find(o2 => o.name === o2.name))
    this.setState({
      loopover: companyData
    })
  }

  render() {
    return (
      <div>
        <Notifications />
        <Modal isOpen={this.state.modalIsOpen} className="fixed_header">
          <Table>
            <thead className="style">
              <tr >
                <TableData className="Modal_table_data t1">
                  <span className="Modal_heading">New Company</span>
                </TableData>
                <TableData className="Modal_table_data t2">
                  <span className="pull_right">
                    <Button
                      className="Modal_button button_green"
                      icon=""
                      color="green"
                      onClick={() => this.addCompanies(this.state.optionsChecked,this.state.optionsCheckedName)}>
                      Add
                    </Button>
                    <Button
                      className="Modal_button button_red"
                      icon=""
                      color="green"
                      onClick={() => this.props.openAddModal()}>
                      Cancel
                    </Button>
                  </span>
                </TableData>
              </tr>
              <tr className="style3">
                <TableData className="Modal_table_data t11">
                  <span className="box_align">Name </span>
                </TableData>
                <TableData className="Modal_table_data t22">
                  <input type="text" className="Modal_SearchBox__input" onKeyUp={this.filterList} />
                </TableData>
              </tr>
            </thead>
            <tbody className="style2">
              {this.state.loopoverinloopID.map((company,idx) => {
                return (
                  <tr key={idx}>
                    <TableData className="Modal_table_data t11">
                      <div className="Modal_inline_checkbox pull_right">
                        <input
                          type="radio"
                          id={company.id}
                          name="company"
                          checked={this.state.ischecked}
                          onChange={this.onChangeInput.bind(this)}
                          value={company.name}
                        />
                        <label htmlFor={company.id}>&nbsp;</label>
                      </div>
                    </TableData >
                    <TableData className="Modal_table_data t22"><span>{company.name}</span></TableData>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Modal >
      </div>
    )
  }
}

export default WorkpassCompanyModal