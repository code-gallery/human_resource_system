import React, { Component } from 'react'
import { Table, TableData } from 'components/Table'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'

class WorkpassPersonaModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personamodalIsOpen: this.props.personamodalIsOpen,
            personalists : [],
            loopover: [],
            optionsChecked: "",
            optionsCheckedName: "",
            optionsCheckedType:"",
            loopoverinloop: [],
            loopoverinloopID: [],
            existingOrganisations: [],
            newPersonaName: "",
            orgId: this.props.orgId
        }
    }

    componentDidMount() {
        this.getcompanynamesarray()
    }

    onChangeInput = (event) => {
        let selectedValue = event.target.id;
        let selectedValueName = event.target.value;
        this.setState({
            optionsChecked: selectedValue,
            optionsCheckedName: selectedValueName,
        });
    }

    componentWillMount(){
        this.props.workPassPersonas.map((item) => {
            this.state.personalists.push(item)
        })
    }

    addRow = () => {
        alert("addowclicked")
        var rows = this.state.personalists
        rows.push({persona_name:this.state.optionsCheckedName,id:this.state.optionsChecked})
        this.setState({personalists: rows})
    }

    onSubmit = () => {
        return null;
    }

    filterList = e => {
        const updatedList = this.state.loopover.filter((item) => {
            return (
                item.persona_name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({
            loopoverinloop: updatedList
        });
    };

    getInputValue = e => {
        let newPersona = e.target.value;
        this.setState({
            newPersonaName : newPersona
        })
    }
    notifyFn(message, type) {
        // this is a wrapper function to make the unit test happy
        notify.show(message, type, NOTIFICATION_TIMEOUT)
      }
      
    addPersona = () => {
        let fetch_persona_name = this.state.newPersonaName
        let fetch_organisation_id = parseInt(this.props.fetch_organisation_id)
        let orgId = this.state.orgId
        if(this.props.fetch_organisation_id == ""){
            this.notifyFn("Please select an Organisation first","error")
        }
        else if(this.state.newPersonaName == ""){
            this.notifyFn("Please enter a persona name","error")
        }
        else{
            
            this.props.verifyPersona({persona_name:fetch_persona_name,  orgId:orgId, organisation_id:fetch_organisation_id},
                () =>{notify.show("Persona Added Successfully", 'success', NOTIFICATION_TIMEOUT)} ,
                () => notify.show('Failed to add persona. Please try again', 'error', NOTIFICATION_TIMEOUT)
              )
           
            this.props.openAddPersonaModal()    
        }
    }

    getcompanynamesarray = () => {
        this.props.workPassPersonas.map((item, idx) => {
            this.state.loopover.push(item.persona_name)
        })
        this.props.workPassPersonas.map((company) => {
        this.state.loopoverinloop.push(company)
        })
        let companyData = this.state.loopoverinloop.filter(o => !this.state.existingOrganisations.find(o2 => o.name === o2.name))
        this.setState({
            loopover : companyData
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.state.personamodalIsOpen}
                className="fixed_header">
                    <Notifications />
                <Table>
                    <thead className="style">
                        <tr className="style">
                            <TableData className="Modal_table_data t1">
                                <span className="Modal_heading">New Persona</span>
                                </TableData>
                                <TableData className="Modal_table_data t2">
                                <span className="pull_right">
                                    <Button
                                        className="Modal_button button_green"
                                        icon=""
                                        color="green"
                                        onClick={() => this.addPersona()}>
                                        Add
                                    </Button>
                                    <Button
                                        className="Modal_button button_red"
                                        icon=""
                                        color="green"
                                        onClick={() => this.props.openAddPersonaModal()}>
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
                                        //onKeyUp={this.filterList}
                                        onKeyUp={this.getInputValue} 
                                        value={this.state.newPersona}/>
                            </TableData>
                        </tr>
                        </thead>
                        <tbody className="style2">
                        {this.state.loopoverinloopID.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <TableData className="Modal_table_data t11">
                                        <div className="Modal_inline_checkbox pull_right">
                                            <input
                                                type="radio"
                                                id={item.id}
                                                name="persona"
                                                checked={null}
                                                onChange={this.onChangeInput.bind(this)}
                                                value={item.persona_name}
                                            />
                                            <label htmlFor={item.id}>&nbsp;</label>
                                        </div>
                                    </TableData>
                                    <TableData className="Modal_table_data t22">
                                        <span contenteditable="true">{item.persona_name}</span>
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

export default WorkpassPersonaModal