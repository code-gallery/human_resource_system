import React, { Component } from "react";
import Select from 'react-select';
import {organizationsAutocomplete} from 'utils/refereeOrgRequests.js'

const initialState = {
  organisation_name:"",
  refree_firstname:"",
  refree_lastname:"",
  refreeemail:"",
  contact_phone:"",
  refree_permission:false,
  comingfrom:'web',
  position_applicant:"",
  referenceVersion:""
}

const requiredFields = ["refreeemail","organisation_name"]
class AddReferenceComponent extends Component {
  constructor(props) {
    super();
    this.state={
      data:initialState,
      name:props.name,
      checkId:props.checkId,
      requestId:props.requestId,
      candidateId:props.candidateId,
      orgId:props.orgId,
      invalidFields: [],
      invalidFieldsMessage:'',
      disabled: false
    }
 //   this.getOptions = _.debounce(this.getOptions.bind(this), 500);
    this.getOptions =this.getOptions.bind(this)
  }

  componentDidUpdate(){
    if(this.props.name !== this.state.name){
      this.setState({
        name:this.props.name
      })
    }
  }
  
  onFieldChange = (field, value) => {
    
    this.setState({
      data: {
        ...this.state.data,
        position_applicant:this.props.position,
        referenceVersion:this.props.referenceVersion,
        [field]: value
      }
    })
  }
   async getOptions(q){
    if (!q) {
      return []
    }
    const response= await organizationsAutocomplete(q,this.props.orgId);
    const data = await response.data;
    let options=data.map((item)=>{
    let properties = {
        value:item.umbrellaOrganisationDetails.id,
        text:item.umbrellaOrganisationDetails.name,
        first_name: item.pc_fst_name,
        last_name: item.pc_last_name,
        email: item.pc_email
     };
          return properties
      })
   
    return {options: options}
  }
 
  optionRenderer(option) {
    return (
      <div className="institution-select">
        <p style={{fontSize:"14px"}}>{option.text}
        <span style={{fontSize:"12px", float:'left', display:'block'}}>{option.email}</span></p>
      </div>
    )
  }
  selectAsyncChange = (v) => {
    this.setState({
      data: {
        ...this.state.data,
        organisation_name: v ? v.text : '',
        refree_firstname: v ? v.first_name : '',
        refree_lastname:v ? v.last_name : '',
        refreeemail:v? v.email : '',
      },
      disabled: true
    })
  }

  selectAsyncBlur = (event) => {
    if (event.target.value && event.target.value.length) {
      this.setState({ 
        data: {
          ...this.state.data,
          organisation_name: event.target.value,
          refree_firstname: '',
          refree_lastname:'',
          refreeemail:'',
        },
        disabled:false
      })
    } else {
      this.onFieldChange('organisation_name', this.state.data.organisation_name)
    }
  }

  sendMail=()=>{
    const invalidFields = requiredFields.filter((field) => !this.state.data[field])
    if (!invalidFields.length) {
    const {name, checkId, data, requestId, candidateId, orgId}=this.state
    this.props.addReferee({
      data,
      name,
      checkId,
      requestId,
      candidateId,
      orgId
    })
    this.setState({
      data:initialState
    })
  } else {
    this.setState({
      invalidFields,
      invalidFieldsMessage:'Please fill all required fields!!'
    })
  }

}


  render() {
    const {data, invalidFields, invalidFieldsMessage}=this.state

    return (
      <div className="mt-30">
        <div className="form-group row">
          {/* <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'organisation_name')}`}>Organisation</label> */}
          <div className="col-md-12">
            {/* <input type="text" className={`form-control inputBox`} name="organisation_name"
          value={data.organisation_name} autoComplete="off"
          onChange={(e)=>{e.preventDefault(); this.onFieldChange('organisation_name',e.target.value)}}
           /> */}
            <Select.Async
              loadOptions={this.getOptions}
              autosize={false}
              labelKey="text"
              valueKey="text"
              value={{ text: data.organisation_name ? data.organisation_name : 'Select Organisation...'}}
              onChange={this.selectAsyncChange}
              onBlur={this.selectAsyncBlur}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              autoBlur={true}
              optionRenderer={this.optionRenderer}
              noResultsText="Can't find your organisation? Add it manually and we’ll investigate."
            />
          </div>
        </div>
        <div className="form-group row">
          {/* <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'refree_firstname')}`}>First Name</label> */ }
          <div className="col-md-12">
            <input
              type="text"
              className={`form-control inputBox`}
              name="refree_firstname"
              value={data.refree_firstname}
              autoComplete="off"
              disabled={this.state.disabled}
              placeholder="First Name"
              onChange={(e)=>{e.preventDefault(); this.onFieldChange('refree_firstname', e.target.value)}}
            />
          </div>
        </div>
        <div className="form-group row">
          {/* <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'refree_lastname')}`}>Last Name</label> */ }
          <div className="col-md-12">
            <input
              type="text"
              className={`form-control inputBox`}
              name="refree_lastname"
              value={data.refree_lastname}
              autoComplete="off"
              disabled={this.state.disabled}
              placeholder="Last Name"
              onChange={(e)=>{e.preventDefault(); this.onFieldChange('refree_lastname',e.target.value)}}/>
          </div>
        </div>
        <div className="form-group row">
          {/* <label className={`col-md-4 col-form-label ${renderValidation(invalidFields, 'refreeemail')}`}>Email Address</label> */ }
          <div className="col-md-12">
            <input
              type="email"
              className={`form-control inputBox`}
              name="refreeemail"
              value={data.refreeemail}
              autoComplete="off"
              disabled={this.state.disabled}
              placeholder="Email Address"
              onChange={(e)=>{e.preventDefault(); this.onFieldChange('refreeemail',e.target.value)}}/>
          </div>
        </div>
        <div className="form-group row">
          {/* <label className="col-md-4 col-form-label">Contact No.</label> */ }
          <div className="col-md-12">
            <input
              type="tel"
              className={`form-control inputBox`}
              name="contact_phone"
              value={data.contact_phone}
              autoComplete="off"
              placeholder="Contact No."
              onChange={(e)=>{e.preventDefault(); this.onFieldChange('contact_phone',e.target.value)}}/>
          </div>
        </div>
        <span className="required-error">{invalidFieldsMessage}</span>
        <div className="form-group row">
          {(this.props.isReset && this.props.check_status !== "pending") || this.props.ref_soft_deleted ?
            <p className="resetLabel">Officer Initiated references are not allowed after RESET/ SOFT DELETE.</p>
            : ''
          }
          <button
            className="btn blue-btn pull-right Button Button--blue border-btn checkButton"
            disabled={(this.props.isReset && this.props.check_status !== "pending") || this.props.ref_soft_deleted} onClick={() => this.sendMail()}
          >
            Send</button>
        </div>
      </div>
    );
  }
}

export default AddReferenceComponent;
