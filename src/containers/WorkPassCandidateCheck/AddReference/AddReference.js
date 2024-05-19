import React, { Component } from "react";
import PropTypes from "prop-types"
import AddPersonalInformation from "./../../AddReference/AddPersonalInformation";
import AddressHistory from "../../AddReference/AddressHistory";
import AddEmployementReference from './../../AddReference/AddEmployementReference'

const AddReference = (props) => {
  // console.log('props', props)
  if (props.reference_type === 'personal_information') {
    return (
      <AddPersonalInformation
        isModalOpen={props.isModalOpen}
        closeReferenceModal={props.closeReferenceModal}
        personalinfo={props.personalinfo}
        editPersonalInfo={props.editPersonalInfo}
        saveAddress={props.saveAddress}
        addressList={props.addressList}
        userId={props.userId}
        loading={props.loading}
        region={props.region}
        reference_type={props.reference_type}
        deleteAddress={props.deleteAddress}
        editAddress={props.editAddress}
        fetchCandidateCheckDetails={props.fetchCandidateCheckDetails}
      />
    )
  }
  if (props.reference_type === 'address_history') {
    return (
      <AddressHistory
        isModalOpen={props.isModalOpen}
        closeReferenceModal={props.closeReferenceModal}
        personalinfo={props.personalinfo}
        editPersonalInfo={props.editPersonalInfo}
        saveAddress={props.saveAddress}
        addressList={props.addressList}
        userId={props.userId}
        check_id={props.check_id}
        loading={props.loading}
        region={props.region}
        refOption={props.refOption}
        reference_type={props.reference_type}
        deleteAddress={props.deleteAddress}
        editAddress={props.editAddress}
        submitAddressHistory={props.submitAddressHistory}
        requestId={props.requestId}
        fetchCandidateCheckDetails={props.fetchCandidateCheckDetails}
      />
    )
  }
  if (props.reference_type === 'employment_reference') {
    return (
      <AddEmployementReference
        isModalOpen={props.isModalOpen}
        organisations={props.organisations}
        closeReferenceModal={props.closeReferenceModal}
        candidateId={props.userId}
        checkId={props.check_id}
        requestId={props.requestId}
        loading={props.loading}
        reference_type={props.reference_type}
        fetchOrganisations={props.fetchOrganisations}
        saveEmploymentReferenceData={props.saveEmploymentReferenceData}
      />
    )
  }
  return null
}

AddReference.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeReferenceModal: PropTypes.func.isRequired,
  editPersonalInfo: PropTypes.func.isRequired,
  personalinfo: PropTypes.object,
  addressList: PropTypes.array
}
export default AddReference;
