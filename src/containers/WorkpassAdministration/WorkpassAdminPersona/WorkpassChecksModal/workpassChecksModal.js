import React, { Component } from 'react'
import { Table, TableData } from 'components/Table'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
class WorkpassChecksModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checksmodalIsOpen: this.props.checksmodalIsOpen,
            checklists : [],
            optionsChecked: "",
            optionsCheckedName: "",
            optionsCheckedType:"",
            loopover: [],
            loopoverinloop: [],
            loopoverinloopID: [],
            existingOrganisations: [],
        }
    }

    componentDidMount() {
        this.getchecksnamesarray()
    }

    onChangeInput = (event) => {
        let selectedValue = event.target.id;
        let selectedValueName = "";
        let selectedValueType = event.target.value;
        //changes for defect 164
        this.state.loopover.forEach((item) => {
            if(item.id == selectedValue){
                selectedValueName = item.name
                this.setState({
                    optionsCheckedName: selectedValueName,
                })
            }
        })
        
        this.setState({
            optionsChecked: selectedValue,
            optionsCheckedType: selectedValueType
        });
    }

    addRow = () => {
        var rows = this.state.personalists
        rows.push("")
        this.setState({personalists: rows})
    }

    filterList = e => {
        console.log("preseed")
        const updatedList = this.state.loopoverinloopID.filter((item) => {
            return (
                item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({
            loopover: updatedList,
        });
    };
    notifyFn(message, type) {
        notify.show(message, type)
    }
    
    addChecks = () => {
        let fetch_persona_id = this.props.fetch_persona_id
        let fetch_organisation_id = this.props.fetch_organisation_id
        let checktype = this.state.optionsCheckedType
        let checkId = parseInt(this.state.optionsChecked)
        let checkName = this.state.optionsCheckedName  

        if(this.state.optionsChecked == ""){
            this.notifyFn("Please select a Check","error")
        }
        else if(this.props.fetch_persona_id == ""){
            this.notifyFn("Please select a Persona first","error")
        }
        else{
           
            this.props.verifyChecks({persona_id:fetch_persona_id, organisation_id:fetch_organisation_id, type:checktype,checkId:checkId, checkName:checkName},
                () =>{notify.show("Check Added Successfully", 'success', NOTIFICATION_TIMEOUT)} ,
                () => notify.show('Failed to add Check. Please try again', 'error', NOTIFICATION_TIMEOUT)
              )
            
            this.props.openAddChecksModal()    
        }
    }

    getchecksnamesarray = () => {
        this.props.checksModal.map((item, idx) => {
            this.state.loopover.push(item.persona_name)
        })
        this.props.checksModal.map((company) => {
            this.state.loopoverinloop.push(company)
        })
        this.props.workPassChecks.map((company) => {
            this.state.existingOrganisations.push(company)
        })
        let companyData = this.state.loopoverinloop.filter(o => !this.state.existingOrganisations.find(o2 => o.name === o2.name))
        this.setState({
            loopover : companyData,
            loopoverinloopID : companyData
        })
    }

    render() {
         return (
            <Modal
                isOpen={this.state.checksmodalIsOpen}
                className="fixed_header">
                <Table>
                    <thead className="style">
                        <tr className="style">
                            <TableData className="Modal_table_data t1">
                                <span className="Modal_heading">New Checks</span>
                                </TableData>
                                <TableData className="Modal_table_data t2">
                                <span className="pull_right">
                                    <Button
                                        className="Modal_button button_green"
                                        icon=""
                                        color="green"
                                        onClick={() => this.addChecks()}>
                                        Add
                                    </Button>
                                    <Button
                                        className="Modal_button button_red"
                                        icon=""
                                        color="green"
                                        onClick={() => this.props.openAddChecksModal()}>
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
                                    <input type="text" 
                                        className="Modal_SearchBox__input"
                                        onKeyUp={this.filterList} />
                            </TableData>
                        </tr>
                        </thead>
                        <tbody className="style2">
                        {this.state.loopover.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <TableData className="Modal_table_data t11">
                                        <div className="Modal_inline_checkbox pull_right">
                                            <input
                                                type="radio"
                                                id={item.id}
                                                name="checksModal"
                                                checked={null}
                                                onChange={this.onChangeInput.bind(this)}
                                                value={item.type}
                                            />
                                            <label htmlFor={item.id}>&nbsp;</label>
                                        </div>
                                    </TableData>
                                    <TableData className="Modal_table_data t22">
                                        {/* <span>{item.name}</span> */}
                                        <span>{item.name == 'DBS'?'DBS Standard': item.name}</span>
                                    </TableData>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Modal >
        )
    }
}

export default WorkpassChecksModal