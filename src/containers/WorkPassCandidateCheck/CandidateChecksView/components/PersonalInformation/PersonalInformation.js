import React, { Component } from 'react'
import './style.css'

import PersonalForm from 'containers/WorkPassCandidateCheck/CandidateChecksView/components/PersonalInformation/components/PersonalForm'
import AddressForm from 'containers/WorkPassCandidateCheck/CandidateChecksView/components/PersonalInformation/components/AddressForm'
const initialState = {
  gender:null,
  dob:new Date(),
  title: null,
  forename:null,
  middle_names:null,
  surname:null,
  national_insurance_number:null,
  phone:null,
  mothermaidenname:null,
  criminal_record_check_ref:null,
  place_of_birth:null,
  email:null,
  is_disable:null,
  emergency_contact_name:null,
  emergencyName2:null,
  emergency_contact_number:null,
  account_address:{
    id:null,
    user_id:null,
    address_type:null,
    line1:null,
    line2:null,
    town:null,
    county:null,
    country:null,
    from:new Date(),
    to:new Date(),
    created_at:null,
    updated_at:null,
    documents: null
  }
 
 }


 const requiredFields = ['dob','gender','national_insurance_number','phone','title','forename','surname']

class PersonalInformation extends Component {
constructor(props){
 super(props);
 this.state={
  data: props.personalInfo.personalInformation ? props.personalInfo.personalInformation : initialState,
  invalidFields: [],
  invalidDates: false,
  invalidMessage: '',
 }
}

onFieldChange = (field, value) => {
  
  this.setState({
    data: {
      ...this.state.data,
      [field]: value
    }
  })
}

onAddressFieldChange = (field,value)=>{
  this.setState({
    data: {
      ...this.state.data,
    account_address:{
      ...this.state.data.account_address,
      [field]:value
    }
    }
  })
}


saveCheck= () => {

  const invalidFields = requiredFields.filter((field) => !this.state.data[field])
  // if(this.state.data.account_address.line1!== ''|| this.state.data.account_address.line1!==null){
  //  var index = invalidFields.indexOf('line1')
  //  invalidFields.splice(index, 1)
  //  console.log(invalidFields)
  // }
  // if(this.state.data.account_address.line2!== ''|| this.state.data.account_address.line2!==null){
  //   var index = invalidFields.indexOf('line2')
  //   invalidFields.splice(index, 1)
  //   console.log(invalidFields)
  //  }
  //  if(this.state.data.account_address.country!== ''|| this.state.data.account_address.country!==null){
  //   var index = invalidFields.indexOf('country')
  //   invalidFields.splice(index, 1)
  //   console.log(invalidFields)
  //  }
  //  if(this.state.data.account_address.county!== ''|| this.state.data.account_address.county!==null){
  //   var index = invalidFields.indexOf('county')
  //   invalidFields.splice(index, 1)
  //   console.log(invalidFields)
  //  }

  if (!invalidFields.length) {
    const {
      gender,
      dob,
      title,
      forename,
      middle_names,
      surname,
      national_insurance_number,
      phone,
      place_of_birth,
      mothermaidenname,
      criminal_record_check_ref,
      email,
      is_disable,
      emergency_contact_name,
      emergencyName2,
      emergency_contact_number,
      account_address:{
        from,
        to,
        line1,
        line2,
        town,
        county,
        country,
      }
    } = this.state.data
 
    this.props.saveEntity({
      heading:"Personal Information",
      gender,
      dob,
      title,
      forename,
      middle_names,
      surname,
      national_insurance_number,
      phone,
      mothermaidenname,
      place_of_birth,
      criminal_record_check_ref,
      email,
      is_disable,
      emergency_contact_name,
      emergencyName2,
      emergency_contact_number,
      account_address:{
        from,
        to,
        line1,
        line2,
        town,
        county,
        country,
      }
    })
  
  }
  else {
    this.setState({
      invalidFields,
      invalidMessage: 'Please fill all the Required Fields'
    })
  }
}
  render() {
    const {
      data,
      invalidFields,
      invalidMessage
    } = this.state
    const {saveEntity} = this.props
    const personalInfo = this.props.personalInfo
    return (
      <React.Fragment>
      
      <div className="container-fluid">
      <button className="btn blue-btn pull-right buttonHeader" onClick={() => this.saveCheck()}>Save</button>
     
       <div className="row ">
            <div className="col-md-12 col-sm-12 card-row">
              <PersonalForm 
                  {...data}
                  invalidFields={this.state.invalidFields}
                  onFieldChange={this.onFieldChange}
                  invalidDates={this.state.invalidDates}
                  invalidMessage={invalidMessage}
                  personalInfo={personalInfo}
              ></PersonalForm>
                <AddressForm 
                  {...data}
                  invalidFields={this.state.invalidFields}
                  onFieldChange={this.onFieldChange}
                  onAddressFieldChange={this.onAddressFieldChange}
                  invalidDates={this.state.invalidDates}
                  invalidMessage={invalidMessage}
              ></AddressForm>
                
             </div>
          </div>
        
      </div>
      </React.Fragment>
    )
  }
}


PersonalInformation.propTypes = {

}

export default PersonalInformation
