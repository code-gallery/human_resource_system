import React, { Component } from 'react'
import PropTypes from 'prop-types'
import prettyPrice from 'utils/prettyPrice'
import Button from 'components/Button'
import LabeledTextInput from 'components/LabeledTextInput'
import LabeledSelectInput from 'components/LabeledSelectInput'
import CheckCard from '../CheckCard'
import CandidateInfo from 'containers/OrganisationCandidate/CandidateInfo/CandidateInfo.js'
import LinkedButton from 'components/LinkedButton'
import './style.css'

const dbsOptionsText = {
  workingWithChildren: 'Does this position involve working with children?',
  workingWithAdults: 'Does this position involve working with vulnerable adults?',
  workingAtHome: 'Does this position involve working with children or adults at the applicant\'s home address?',
  volunteering: 'Does this position involve volunteering?',
  userPaysDBS:'userPays'
}
const criminalRecordCheckText = {
withcriminalRecordDbsBasics:'DBS Basics',
withcriminalRecordDbsStandard : 'DBS Standard',
withcriminalRecordDbsEnhanced :'DBS Enhanced',
withcriminalRecordDisclosureScotland : 'Disclosure Scotland'
}
const ukHealthcareProfessionalRegistersText ={
  withinHealthcarenmc : 'NMC',
  withinHealthcarehcpc :'hcpc',
  withinHealthcaregmc :'GMC',
  withinHealthcaredentalcoucil:'General Dental Council',
  withinHealthcaregphc:'GPhC',
  withinHealthcaregosc:'GOsC',
  withinHealthcaregcc:'GCC',
  withinHealthcareopticalcouncil:'General Optical Council'
}


const sanctionsOptionsText = {
  workingWithEnhancedSanctions: 'Enhanced Sanctions and Improvements',
  workingWithEnhancedPeps: 'Enhanced Peps Intelligence',
  workingAtMonitoring: 'Monitoring'
}

const biometricidentityText ={
  userPays : 'userPays'
}
const employmentVerificationText ={
  withemploymentVerification1year : '1 year',
  withemploymentVerification2year : '2 years',
  withemploymentVerification3year : '3 years',
  withemploymentVerification4year : '4 years',
  withemploymentVerification5year : '5 years',
  withemploymentVerification6year : '6 years',
  withemploymentVerification7year : '7 years',


}


const workGapsText ={
  withworkGaps1year : '1 year',
  withworkGaps2year : '2 years',
  withworkGaps3year : '3 years',
  withworkGaps4year : '4 years',
  withworkGaps5year : '5 years',

}
const addressHistoryText ={
  withaddress1year : '1 year',
  withaddress2year : '2 years',
  withaddress3year : '3 years',
  withaddress4year : '4 years',
  withaddress5year : '5 years',
}

const clientSpecificDocumentationText ={
withorganisationdocumentation : 'Organisation Documentation',
withclientdocumentation :'Client Documentation'
}
const clientSpecificDocumentationTextOrg ={
  withorganisationdocumentation : 'Organisation Documentation',

  }

const cvcaptureText ={
  withCVCapture :'With CV Capture'
}

const nationalInsurnceText ={
  withnationalInsurncecaptureevidence :'Capture Evidence'
}


const dbsCheckTypes = {
  basic: 'Basic',
  standard: 'Standard',
  enhanced: 'Enhanced',
  basicscotland :'Basic Scotland Disclosure'
}

const employmentReferenceText ={
  employeewith1ref :'1 year',
  employeewith2ref :'2 years',
  employeewith3ref :'3 years',
  employeewith4ref :'4 years',
  employeewith5ref :'5 years',
  employeewith6ref :'6 years',
  employeewith7ref :'7 years',

}

const umbreallasupplierlistText ={
  umbreallasupplierlist  :'Preferred Umbrella Supplier List',
}

const educationVerificationText ={
  witheducationinsecondary :'Secondary',
  witheducationinfurther :'Further',
  witheducationinhigher :'Higher',
  witheducationinprofessional :'Profesisonal Certificates',
  witheducationinprofessionaldevelopment:'Professional Development'
}

const adverseFinanceCheckText ={
  withadverseFinanceCheckinuk :'U.k',
  withadverseFinanceCheckininternationl :'International'
}

const adverseMediaCheckText ={
  withadverseMediaCheckinuk :'U.k',
  withadverseMediaCheckininternationl :'International'
}

const driverLicenseCheckText ={
  withdriverlicenseinuk :'U.k',
  withindriverlicenseininternationl :'International'
}

const taxDetailText ={
  withtaxdetailinuk :'U.k',
  withtaxdetailininternationl :'International'
}

const studentLoanDetailText ={
  withstudentloandetailinuk :'U.k',
  withstudentloandetailininternationl :'International'
}

const bankDetailsText ={
  withbankDetailsinuk :'U.k',
  withbankDetailsinireland :'Ireland',
  withbankDetailsininternationl :'International'
}

const companyAndVat ={
  withselfbilling :'Self-Billing'
}

class CandidateNewRequest extends Component {

  arraydata;

  newarray =[];
  state = {
    role: null,
    region: 'England',
    rightToWork: false,
    employmentEligibilityVerification: false,
    sanctionPeps: false,
    healthPassCheck: false,
    biometricIdentity:false,
    cvCapture:false,
    employmentStatus:false,
    employmentVerification:false,
    workGaps:false,
    employmentReference:false,
    educationVerification:false,
    ukHealthcareProfessionalRegisters:false,
    nationalInsuranceCheck:false,
    adverseFinanceCheck:false,
    bankDetails:false,
    taxDetails: false,
    studentLoansDetails :false,
    criminalRecordCheck:false,
    cifasCheck:false,
    criminalRecordDeclaration:false,
    addressHistory:false,
    proofOfAddressCapture:false,
    adverseMediaChecks:false,
    driverLicenseCheck:false,
    candidateUploads:false,
    healthChecker:false,
    agencyWorkerRegulation:false,
    documentRequest:false,
    umbrellaWorkersDeclaration:false,
    umbrellaPreferredSupplier: false,
    dbs: false,
    dbsType: 'basic',
    workingAtHome: false,
    workingWithChildren: false,
    workingWithAdults: false,
    volunteering: false,
    workforce: 'adult',
    workingWithEnhancedSanctions: false,
    workingWithEnhancedPeps: false,
    workingAtMonitoring: false,
    withLivenessCheck:false,
    withCVCapture:false,
    withemploymentVerification1year : false,
    withemploymentVerification2year : false,
    withemploymentVerification3year : false,
    withemploymentVerification4year : false,
    withemploymentVerification5year : false,
    withemploymentVerification6year : false,
    withemploymentVerification7year : false,
    withworkGaps1year : false,
    withworkGaps2year : false,
    withworkGaps3year : false,
    withworkGaps4year : false,
    withworkGaps5year : false,
    umbreallasupplierlist :false,
    employeewith1ref :true,
    employeewith2ref :false,
    employeewith3ref :false,
    employeewith4ref :false,
    employeewith5ref:false,
    employeewith6ref:false,
    employeewith7ref:false,
    witheducationinsecondary :false,
    witheducationinfurther :false,
    witheducationinhigher :false,
    witheducationinprofessional :false,
    witheducationinprofessionaldevelopment:false,
    withinHealthcarenmc : false,
    withinHealthcarehcpc :false,
    withinHealthcaregmc :false,
    withinHealthcaredentalcoucil:false,
    withinHealthcaregphc:false,
    withinHealthcaregosc:false,
    withinHealthcaregcc:false,
    withinHealthcareopticalcouncil:false,
    withnationalInsurncecaptureevidence :false,
    withadverseFinanceCheckinuk :false,
    withadverseFinanceCheckininternationl :false,
    withbankDetailsinuk :false,
    withbankDetailsinireland :false,
    withbankDetailsininternationl :false,
    withtaxdetailinuk :false,
    withtaxdetailininternationl: false,
    withstudentloandetailinuk :false,
    withstudentloandetailininternationl :false,
    withcriminalRecordDbsBasics:false,
    withcriminalRecordDbsStandard : false,
    withcriminalRecordDbsEnhanced :false,
    withcriminalRecordDisclosureScotland :false,
    withaddress1year: false,
    withaddress2year: false,
    withaddress3year: false,
    withaddress4year: false,
    withaddress5year: true,
    withdriverlicenseinuk :false,
    withindriverlicenseininternationl :false,
    withadverseMediaCheckinuk :false,
    withadverseMediaCheckininternationl :false,
    barredListCheck: false,
    dfeTeachingRegulationsAgencyCheck: false,
    gpdrDeclaration: false,
    immigrationDetails:false,
    umbrellaDetails:false,
    generalTeachingCouncilCheck: false,
    passportVerification: false,
    professionalVerification: false,
    proofOfReading: false,
    ukCivilPension: false,
    company :false,
    employer: "",
    persona: "",
    searchCheck: "",
    persona_fetched: false,
    client_persona: [],
    client_checks: [],
    client_org: this.props.client_org,
    organisationPersona : {},
    checksID : [],
    employerName: "",
    showPersona: false,
    client_org_name: [],
    orgId : this.props.organisationId ,
    resetRole: false,
    withselfbilling :false,
    professionalindemnity: "0",
    publicliability :"0",
    employeeliability :"0",
    clientSpecificDocumentation: false,
    withorganisationdocumentation :true,
    withclientdocumentation:false,
    directorshipChecks:false,
    userPays: false,
    userPaysDBS:false,
    tuberculosisQuestionnaire: false,
    employerWithholdingCertificate: false
}

  handleSubmit = (evt) => {
    evt.preventDefault()

    if (!this.canSubmit()) {
      return null
    }

    const { candidateId, organisationId } = this.props
    const request = this.getRequestInfo()

    this.props.postNewRequest(organisationId, candidateId, request)
  }

  //adding employer and persona for OFFSHORE-208 - work pass checks screen
  getRequestInfo() {
    const {
      role,
      region,
      employer,
      employerName,
      persona
    } = this.state

    const country = 'GB'
    const checks = []
    const { rightToWork, employmentEligibilityVerification, dbs, company, sanctionPeps, healthPassCheck, biometricIdentity, cvCapture, criminalRecordDeclaration, tuberculosisQuestionnaire, employerWithholdingCertificate, employmentStatus,employmentVerification, workGaps ,employmentReference,educationVerification, ukHealthcareProfessionalRegisters , nationalInsuranceCheck , adverseFinanceCheck ,bankDetails , taxDetails, studentLoansDetails , criminalRecordCheck , cifasCheck , addressHistory , proofOfAddressCapture , driverLicenseCheck,adverseMediaChecks , candidateUploads,healthChecker,agencyWorkerRegulation,documentRequest,umbrellaWorkersDeclaration,barredListCheck,dfeTeachingRegulationsAgencyCheck,gpdrDeclaration,immigrationDetails,umbrellaDetails,generalTeachingCouncilCheck,passportVerification,professionalVerification,proofOfReading,ukCivilPension, clientSpecificDocumentation,directorshipChecks} = this.props.checks

    if (this.state.driverLicenseCheck) {
      const{
        withdriverlicenseinuk,
        withindriverlicenseininternationl
      } = this.state
      checks.push({
        type: driverLicenseCheck.type,
        options:{
          type: driverLicenseCheck.type,
          with_driverlicense_in_uk:withdriverlicenseinuk,
          with_driverlicense_in_internationl:withindriverlicenseininternationl
        }
      })
    }

    if (this.state.candidateUploads) {
      checks.push({
        type: candidateUploads.type
      })
    }
    if (this.state.healthChecker) {
      checks.push({
        type: healthChecker.type
      })
    }
    if (this.state.directorshipChecks) {
      checks.push({
        type: directorshipChecks.type,
        options:{
          checkForMobile:false
        }
      })
    }

  if (this.state.barredListCheck) {
    checks.push({
      type: barredListCheck.type
    })
  }
if (this.state.dfeTeachingRegulationsAgencyCheck) {
  checks.push({
    type: dfeTeachingRegulationsAgencyCheck.type
  })
}
if (this.state.gpdrDeclaration) {
  checks.push({
    type: gpdrDeclaration.type
  })
}
if (this.state.immigrationDetails) {
  checks.push({
    type: immigrationDetails.type
  })
}
if (this.state.umbrellaDetails) {
  checks.push({
    type: umbrellaDetails.type
  })
}

if (this.state.generalTeachingCouncilCheck) {
  checks.push({
    type: generalTeachingCouncilCheck.type
  })
}
if (this.state.passportVerification) {
  checks.push({
    type: passportVerification.type
  })
}
if (this.state.professionalVerification) {
  checks.push({
    type: professionalVerification.type
  })
}  if (this.state.proofOfReading) {
  checks.push({
    type: proofOfReading.type
  })
}
if (this.state.ukCivilPension) {
  checks.push({
    type: ukCivilPension.type
  })
}

if (this.state.agencyWorkerRegulation) {
  checks.push({
    type: agencyWorkerRegulation.type
  })
}
if (this.state.documentRequest) {
  checks.push({
    type: documentRequest.type
  })
}
if (this.state.umbrellaWorkersDeclaration) {
  const {
    umbreallasupplierlist
  } = this.state
  checks.push({
    type: umbrellaWorkersDeclaration.type,
    options:{
      type: umbrellaWorkersDeclaration.type,
      umbrella_supplier_list :umbreallasupplierlist,
    }
  })
}


  if (this.state.adverseMediaChecks) {
    const {
      withadverseMediaCheckinuk,
      withadverseMediaCheckininternationl

    } = this.state
    checks.push({
      type: adverseMediaChecks.type,
      options:{
        type: adverseMediaChecks.type,
        with_adverseMediaCheck_in_uk:withadverseMediaCheckinuk,
        with_adverseMediaCheck_in_internationl:withadverseMediaCheckininternationl
      }
    })
}

    if (this.state.employmentReference) {
      const  {
        employeewith1ref,
        employeewith2ref,
        employeewith3ref,
        employeewith4ref,
        employeewith5ref,
        employeewith6ref,
        employeewith7ref
      } = this.state

      checks.push({
        type: employmentReference.type,
        options:{
          type: employmentReference.type,
          Employee_1_ref :employeewith1ref,
          Employee_2_ref:employeewith2ref,
          Employee_3_ref:employeewith3ref,
          Employee_4_ref:employeewith4ref,
          Employee_5_ref:employeewith5ref,
          Employee_6_ref:employeewith6ref,
          Employee_7_ref:employeewith7ref,

        }
      })
  }
  if (this.state.cifasCheck) {
    checks.push({
      type: cifasCheck.type
    })
}
 if (this.state.criminalRecordCheck) {
   const {
    withcriminalRecordDbsBasics,
    withcriminalRecordDbsStandard,
    withcriminalRecordDbsEnhanced,
    withcriminalRecordDisclosureScotland,
      } = this.state
    checks.push({
      type: criminalRecordCheck.type,
      options:{
        type: criminalRecordCheck.type,
        with_criminalRecordDbs_Basics:withcriminalRecordDbsBasics,
        with_criminalRecordDbs_Standard:withcriminalRecordDbsStandard,
        with_criminalRecordDbs_Enhanced:withcriminalRecordDbsEnhanced,
        with_criminalRecordDisclosure_Scotland:withcriminalRecordDisclosureScotland,
      }
    })
}


  if (this.state.adverseFinanceCheck) {
    const {
      withadverseFinanceCheckinuk,
      withadverseFinanceCheckininternationl
    } = this.state
    checks.push({
      type: adverseFinanceCheck.type,
      options:{
        type: adverseFinanceCheck.type,
        with_adverseFinanceCheck_in_uk:withadverseFinanceCheckinuk,
        with_adverseFinanceCheck_in_international:withadverseFinanceCheckininternationl
      }
    })
}

if (this.state.taxDetails) {
  const {
    withtaxdetailinuk,
    withtaxdetailininternationl
  }= this.state
  checks.push({
    type: taxDetails.type,
    options:{
      type: taxDetails.type,
      with_taxdetail_in_uk:withtaxdetailinuk,
      with_taxdetail_in_internationl:withtaxdetailininternationl
    }
  })
}
if (this.state.studentLoansDetails) {
  const {
    withstudentloandetailinuk,
    withstudentloandetailininternationl
  } = this.state
  checks.push({
    type: studentLoansDetails.type,
    options:{
      type: studentLoansDetails.type,
      with_studentloandetail_in_uk:withstudentloandetailinuk,
      with_studentloandetail_in_internationl:withstudentloandetailininternationl
    }
  })
}

if (this.state.bankDetails) {
  const {
    withbankDetailsinuk,
    withbankDetailsinireland,
    withbankDetailsininternationl,
  } = this.state
  checks.push({
    type: bankDetails.type,
    options:{
      type: bankDetails.type,
      with_bankDetails_in_UK:withbankDetailsinuk,
      with_bankDetails_in_Ireland:withbankDetailsinireland,
      with_bankDetails_in_internationl:withbankDetailsininternationl
    }
  })
}

    if (this.state.nationalInsuranceCheck) {
      const {
        withnationalInsurncecaptureevidence
      } = this.state
      checks.push({
        type: nationalInsuranceCheck.type,
        options:{
          type: nationalInsuranceCheck.type,
          with_nationalInsurnce_capture_evidence :withnationalInsurncecaptureevidence
        }
      })
    }


    if (this.state.educationVerification) {
     const  {
      witheducationinsecondary,
      witheducationinfurther,
      witheducationinhigher,
      witheducationinprofessional,
      witheducationinprofessionaldevelopment
     } = this.state

      checks.push({
        type: educationVerification.type,
        options:{
          type: educationVerification.type,
          Education_in_Secondary: witheducationinsecondary,
          Education_in_Further:witheducationinfurther,
          Education_in_Higher:witheducationinhigher,
          Education_in_ProfesisonalCertificates:witheducationinprofessional,
          Education_in_ProfessionalDevelopment:witheducationinprofessionaldevelopment
        }
      })
    }
    if (this.state.ukHealthcareProfessionalRegisters) {
      const {
        withinHealthcarenmc,
        withinHealthcarehcpc,
        withinHealthcaregmc,
        withinHealthcaredentalcoucil,
        withinHealthcaregphc,
        withinHealthcaregosc,
        withinHealthcaregcc,
        withinHealthcareopticalcouncil,
      } = this.state
      checks.push({
        type: ukHealthcareProfessionalRegisters.type,
        options:{
          type: ukHealthcareProfessionalRegisters.type,
          within_Healthcare_nmc :withinHealthcarenmc,
          within_Healthcare_hcpc:withinHealthcarehcpc,
          within_Healthcare_gmc:withinHealthcaregmc,
          within_Healthcare_dentalcoucil:withinHealthcaredentalcoucil,
          within_Healthcare_gphc:withinHealthcaregphc,
          within_Healthcare_gosc:withinHealthcaregosc,
          within_Healthcare_gcc:withinHealthcaregcc,
          within_Healthcare_opticalcouncil:withinHealthcareopticalcouncil,
        }
      })
    }


    if (this.state.workGaps) {
      const {
        withworkGaps1year,
        withworkGaps2year,
        withworkGaps3year,
        withworkGaps4year,
        withworkGaps5year,
      } = this.state
      checks.push({
        type: workGaps.type,
        options:{
          type: workGaps.type,
          Workgap_One_year: withworkGaps1year,
          Workgap_two_year: withworkGaps2year,
          Workgap_three_year:withworkGaps3year,
          Workgap_four_year:withworkGaps4year,
          Workgap_five_year:withworkGaps5year
        }
      })
    }

    if (this.state.employmentVerification) {

      const {
         withemploymentVerification1year,
          withemploymentVerification2year,
          withemploymentVerification3year,
          withemploymentVerification4year,
          withemploymentVerification5year,
          withemploymentVerification6year,
          withemploymentVerification7year
      } = this.state
      checks.push({
        type: employmentVerification.type,
        options:{
          type: employmentVerification.type,
          One_year: withemploymentVerification1year ,
          two_year:withemploymentVerification2year ,
          three_year:withemploymentVerification3year,
          four_year:withemploymentVerification4year,
          five_year:withemploymentVerification5year,
          six_year:withemploymentVerification6year,
          seven_year:withemploymentVerification7year,
        }
      })
    }

      if (this.state.healthPassCheck) {
      checks.push({
        type: healthPassCheck.type
      })
    }
    if (this.state.employmentStatus) {
      checks.push({
        type: employmentStatus.type
      })
    }
    if (this.state.criminalRecordDeclaration) {
      checks.push({
        type: criminalRecordDeclaration.type
      })
    }
    if (this.state.tuberculosisQuestionnaire) {
      checks.push({
        type: tuberculosisQuestionnaire.type
      })
    }
    if (this.state.employerWithholdingCertificate) {
      checks.push({
        type: employerWithholdingCertificate.type
      })
    }
    if (this.state.addressHistory) {
      const{
        withaddress1year,
        withaddress2year,
        withaddress3year,
        withaddress4year,
        withaddress5year
      } = this.state
      checks.push({
        type: addressHistory.type,
        options:{
          type: addressHistory.type,
          with_address_1year:withaddress1year,
          with_address_2year:withaddress2year,
          with_address_3year:withaddress3year,
          with_address_4year:withaddress4year,
          with_address_5year:withaddress5year
        }
      })
    }

    if (this.state.cvCapture) {
      const {
        withCVCapture
      } = this.state
      checks.push({
        type: cvCapture.type,
        options: {
          type: cvCapture.type,
          CV_Capture: withCVCapture
      }})
    }
    if (this.state.biometricIdentity) {

      const {
        userPays
      } = this.state
      checks.push({
        type: biometricIdentity.type,
        options: {
          type: biometricIdentity.type,
          user_Pays:userPays
      }})
    }

    if (this.state.clientSpecificDocumentation) {
      const {
        withorganisationdocumentation,
        withclientdocumentation
      } = this.state
      checks.push({
        type: clientSpecificDocumentation.type,
        options: {
          type: clientSpecificDocumentation.type,
          with_organisation_documentation: withorganisationdocumentation,
          with_clientdocumentation: withclientdocumentation
        }})
    }

    if (this.state.proofOfAddressCapture) {
      checks.push({
        type: proofOfAddressCapture.type
      })
    }

    if (this.state.rightToWork) {
      checks.push({
        type: rightToWork.type
      })
    }

    if (this.state.employmentEligibilityVerification) {
      checks.push({
        type: employmentEligibilityVerification.type
      })
    }

    if (this.state.company) {
      const {
        withselfbilling,
        professionalindemnity,
        publicliability,
        employeeliability
      } = this.state
      checks.push({
        type: company.type,
        options:{
          type: company.type,
          with_self_billing:withselfbilling,
          "professionalindemnity":professionalindemnity,
          "publicliability" : publicliability,
          "employeeliability": employeeliability
         }
      })
    }

    if (this.state.dbs) {
      const {
        dbsType,
        workingWithAdults,
        workingWithChildren,
        workingAtHome,
        volunteering,
        workforce,
        userPaysDBS
      } = this.state

      checks.push({
        type: dbs.type,
        options: {
          type: dbsType,
          user_Pays :userPaysDBS,
          enhanced: dbsType === 'enhanced',
          basic: dbsType === 'basic',
          basicscotland: dbsType === 'basicscotland',
          working_with_adults: dbsType === 'enhanced' ? workingWithAdults : false,
          working_with_children: dbsType === 'enhanced' ? workingWithChildren : false,
          working_at_home: dbsType !== 'basic' ? workingAtHome : false,
          volunteering: dbsType !== 'basic' ? volunteering : false,
          workforce: dbsType !== 'basic' ? workforce : null,
          working_at_home: dbsType !== 'basicscotland' ? workingAtHome : false,
          volunteering: dbsType !== 'basicscotland' ? volunteering : false,
          workforce: dbsType !== 'basicscotland' ? workforce : null
        }})
    }


    if (this.state.sanctionPeps) {
       const {
        workingWithEnhancedSanctions,
        workingWithEnhancedPeps,
        workingAtMonitoring
      } = this.state

     checks.push({
       type: sanctionPeps.type,
       options: {
        type: sanctionPeps.type,
        working_With_Enhanced_Sanctions: workingWithEnhancedSanctions,
        working_with_Enhanced_Peps: workingWithEnhancedPeps,
        working_At_Monitoring : workingAtMonitoring
      }
     })

   }

    return {
      role,
      country,
      region,
      checks,
      employer,
      employerName,
      persona
    }
  }

  getRequestPrice() {
    const { checks } = this.props
    const { dbs, rightToWork, employmentEligibilityVerification, dbsType, directorshipChecks,company ,sanctionPeps,healthPassCheck,biometricIdentity ,cvCapture,criminalRecordDeclaration, tuberculosisQuestionnaire, employerWithholdingCertificate, employmentStatus,employmentVerification , workGaps ,employmentReference ,educationVerification ,ukHealthcareProfessionalRegisters , nationalInsuranceCheck ,adverseFinanceCheck , bankDetails , taxDetails, studentLoansDetails , criminalRecordCheck ,cifasCheck , addressHistory , proofOfAddressCapture , driverLicenseCheck,adverseMediaChecks , candidateUploads,healthChecker,agencyWorkerRegulation,documentRequest,umbrellaWorkersDeclaration,barredListCheck,dfeTeachingRegulationsAgencyCheck,gpdrDeclaration,immigrationDetails,umbrellaDetails,generalTeachingCouncilCheck,passportVerification,professionalVerification,proofOfReading,ukCivilPension,clientSpecificDocumentation} = this.state
    let price = 0
    if (dbs) {
      const dbsCheck = {
        basic: checks.dbsBasic,
        basicscotland: checks.dbsScotland,
        standard: checks.dbs,
        enhanced: checks.dbsEnhanced
      }[dbsType]

      price += dbsCheck.price
    }

    if (rightToWork) {
      price += checks.rightToWork.price
    }

    if (employmentEligibilityVerification) {
      price += checks.employmentEligibilityVerification.price
    }

    if (cifasCheck) {
      price += checks.cifasCheck.price
    }

    if(healthPassCheck){
      price += checks.healthPassCheck.price
    }
    if(directorshipChecks){
      price += checks.directorshipChecks.price
    }
    if (barredListCheck) {
      price += checks.barredListCheck.price
    }
    if (dfeTeachingRegulationsAgencyCheck) {
      price += checks.dfeTeachingRegulationsAgencyCheck.price
    }
    if (gpdrDeclaration) {
      price += checks.gpdrDeclaration.price
    }
    if (immigrationDetails) {
      price += checks.immigrationDetails.price
    }
    if (umbrellaDetails) {
      price += checks.umbrellaDetails.price
    }
    if (generalTeachingCouncilCheck) {
      price += checks.generalTeachingCouncilCheck.price
    }
    if (passportVerification) {
      price += checks.passportVerification.price
    }
    if (professionalVerification) {
      price += checks.professionalVerification.price
    }
    if (proofOfReading) {
      price += checks.proofOfReading.price
    }
    if (ukCivilPension) {
      price += checks.ukCivilPension.price
    }





    if (candidateUploads) {
      price += checks.candidateUploads.price
    }
    if (healthChecker) {
      price += checks.healthChecker.price
    }

    if (agencyWorkerRegulation) {
      price += checks.agencyWorkerRegulation.price
    }

    if (documentRequest) {
      price += checks.documentRequest.price
    }

    if (umbrellaWorkersDeclaration) {
      price += checks.umbrellaWorkersDeclaration.price
    }

    if (bankDetails) {
      price += checks.bankDetails.price
    }

    if (criminalRecordCheck) {
      price += checks.criminalRecordCheck.price
    }

    if (adverseFinanceCheck) {
      price += checks.adverseFinanceCheck.price
    }

    if (nationalInsuranceCheck) {
      price += checks.nationalInsuranceCheck.price
    }


    if (ukHealthcareProfessionalRegisters) {
      price += checks.ukHealthcareProfessionalRegisters.price
    }


    if (educationVerification) {
      price += checks.educationVerification.price
    }



    if (biometricIdentity) {
      price += checks.biometricIdentity.price
    }

    if (employmentReference) {
      price += checks.employmentReference.price
    }


    if (cvCapture) {
      price += checks.cvCapture.price
    }

    if (employmentStatus) {
      price += checks.employmentStatus.price
    }
    if (criminalRecordDeclaration) {
      price += checks.criminalRecordDeclaration.price
    }
    if (tuberculosisQuestionnaire) {
      price += checks.tuberculosisQuestionnaire.price
    }
    if (employerWithholdingCertificate) {
      price += checks.employerWithholdingCertificate.price
    }
    if (company) {
      price += checks.company.price
    }

    if (sanctionPeps) {
      price += checks.sanctionPeps.price
    }
    if (employmentVerification) {
      price += checks.employmentVerification.price
    }

    if (workGaps) {
      price += checks.workGaps.price
    }


    if (taxDetails) {
      price += checks.taxDetails.price
    }

    if (driverLicenseCheck) {
      price += checks.driverLicenseCheck.price
    }
    if (adverseMediaChecks) {
      price += checks.adverseMediaChecks.price
    }




    if (studentLoansDetails) {
      price += checks.studentLoansDetails.price
    }
    if (proofOfAddressCapture) {
      price += checks.proofOfAddressCapture.price
    }





    if (addressHistory) {
      price += checks.addressHistory.price
    }
    if (clientSpecificDocumentation) {
      price += checks.clientSpecificDocumentation.price
    }





    return price
  }

  canSubmit() {
    const { role, dbs, rightToWork, employmentEligibilityVerification, company,sanctionPeps,healthPassCheck,biometricIdentity,cvCapture,criminalRecordDeclaration, tuberculosisQuestionnaire, employerWithholdingCertificate, employmentStatus ,employmentVerification ,workGaps ,employmentReference ,educationVerification ,ukHealthcareProfessionalRegisters, nationalInsuranceCheck ,adverseFinanceCheck , bankDetails, taxDetails, studentLoansDetails , criminalRecordCheck ,cifasCheck , addressHistory , proofOfAddressCapture , driverLicenseCheck,adverseMediaChecks, candidateUploads,healthChecker,agencyWorkerRegulation,documentRequest,umbrellaWorkersDeclaration, barredListCheck,dfeTeachingRegulationsAgencyCheck,gpdrDeclaration,immigrationDetails,umbrellaDetails,generalTeachingCouncilCheck,passportVerification,professionalVerification,proofOfReading,ukCivilPension, persona, employerName,clientSpecificDocumentation,directorshipChecks} = this.state


    const atLeastOneCheck = (dbs || rightToWork || employmentEligibilityVerification || company ||sanctionPeps|| healthPassCheck ||biometricIdentity||cvCapture||employmentStatus|| criminalRecordDeclaration || tuberculosisQuestionnaire || employerWithholdingCertificate || employmentVerification ||workGaps || employmentReference || educationVerification || ukHealthcareProfessionalRegisters || nationalInsuranceCheck || adverseFinanceCheck || bankDetails || taxDetails || studentLoansDetails  || criminalRecordCheck|| cifasCheck || addressHistory || proofOfAddressCapture || driverLicenseCheck || adverseMediaChecks || candidateUploads || healthChecker|| agencyWorkerRegulation || documentRequest || umbrellaWorkersDeclaration|| barredListCheck || dfeTeachingRegulationsAgencyCheck || gpdrDeclaration|| immigrationDetails ||umbrellaDetails || generalTeachingCouncilCheck || passportVerification || professionalVerification || proofOfReading || ukCivilPension || clientSpecificDocumentation || directorshipChecks) && employerName.length > 0
    return atLeastOneCheck && typeof role === 'string' && role.length > 0
  }

  renderSubmit() {

    var canSubmit = this.canSubmit()

    /** @EXAMPLE: `£10.00 | Send Request` */
    const requestPrice = prettyPrice(this.getRequestPrice())
    //this.props.parentCallback(requestPrice)
    //this.props.parentcallbaackfunction(this.renderSubmit())
    return (
      <Button
        color="green"
        className="CandidateNewRequests__btn"
        disabled={!canSubmit}
        onClick={canSubmit ? this.handleSubmit : () => {}}
      >
        {requestPrice} | Send Request
      </Button>
    )
  }

  //changes on 1303

  componentWillReceiveProps(nextProps) {
    if (nextProps.workPassPersonas !== this.state.organisationPersona && nextProps.workPassPersonas !== "undefined") {
      this.setState({
        client_persona : nextProps.workPassPersonas,
        organisationPersona : {"No Persona":"No Persona - All Checks"}
      }, () => {
        if(this.state.client_persona !== undefined){
           this.state.client_persona.map((persona) => {
            this.state.organisationPersona[persona.id] = persona.persona_name
          })

          this.setState({
            persona_fetched: true
          })
        }
      })
    }

    if (nextProps.workPassChecks !== this.state.organisationPersona && nextProps.workPassChecks !== "undefined") {
      this.setState({
        client_checks : nextProps.workPassChecks,
        checksID : []
      }, () => {
        if(this.state.client_checks !== undefined){
           this.state.client_checks.map((checks) => {
            this.state.checksID.push(checks.id)
          })
        }
      })
    }
  }

  filterList = e => {
    Object.keys(this.state).map((item) => {
    if(this.state[item] === true) {
       if(item === 'employeewith1ref' || item === 'withorganisationdocumentation' || item === 'withaddress5year'){

       }
       else{
      this.setState({
        [item] : !this.state[item]
      })
     }}

    })

    let updatedList = this.props.client_org.filter((item) => {
        return (
            item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
    });
    this.setState({
      employerName: e.target.value.trim(),
      employer: ""
    })

    this.props.client_org.forEach((item) => {
      if(item.name.toLowerCase() === e.target.value.toLowerCase()){

       let employer = item.id
          this.setState({
            employer: employer,
          })
      }
  })
    this.props.client_org.map((item) => {
      this.state.client_org_name.push(item.name.toLowerCase().trim())
  })

  if(this.state.client_org_name.includes(e.target.value.toLowerCase().trim())){
    this.setState({
      showPersona: true,
    })
  }
  else{
    this.setState({
      showPersona: false,
    })
  }

    this.setState({
      client_org : updatedList,
      role: null,
      resetRole : !this.state.resetRole
    },
      () => {
        let client_id= parseInt(this.state.employer)
        let organisationId = parseInt(this.props.organisationId)
        this.props.fetchUserPersona(organisationId,client_id)
        this.setState({
          persona : ""
        })
      }
    )};

    getChecks(){
       Object.keys(this.state).map((item) => {
         if(this.state[item] === true && (item === 'employeewith1ref' || item === 'withaddress5year')) {
         }
         else if(this.state[item] === true && item === 'withorganisationdocumentation') {
        }
         else if(this.state[item] === true && item !== "showPersona") {

          this.setState({
            [item] : !this.state[item]
          })
         }

        })
       let persona_id= parseInt(this.state.persona)
       {console.log(this.props.fetchUserChecks(persona_id))}
     }


    getChecks1(){
      let persona_id= parseInt(this.state.persona)
      var chckslength =  (this.props.workPassChecks)?.length
var obj ={
  'right_to_work': 'rightToWork',
  'employment_eligibility_verification': 'employmentEligibilityVerification',
  'sanction_peps': 'sanctionPeps',
  'employment_status':'employmentStatus',
  'address_history':'addressHistory',
  'employment_reference':'employmentReference',
  'dbs' :'dbs',
  'dbs_enhanced' : 'withcriminalRecordDbsEnhanced',
  'dbs_basic' : 'withcriminalRecordDbsBasics',
  'dbs_scotland' : 'withcriminalRecordDisclosureScotland',
  'employment_status': 'employmentStatus',
  'employment_verification': 'employmentVerification',
  'work_gaps':'workGaps',
  'education_verification':'educationVerification',
  'national_insurance_check' :'nationalInsuranceCheck',
  'adverse_finance_check':'adverseFinanceCheck',
  'bank_details' :'bankDetails',
  'cifas_check' : 'cifasCheck',
  'address_history': 'addressHistory',
  'proof_of_address_capture' : 'proofOfAddressCapture',
  'gpdr_declaration' : 'gpdrDeclaration',
  'driver_license_check' :'driverLicenseCheck',
  'health_pass_check' :'healthPassCheck',
  'candidate_uploads' :'candidateUploads',
  'health_checker':'healthChecker',
  'immigration_details': 'immigrationDetails',
  'criminal_record_check':'criminalRecordCheck',
  'dfe_teaching_regulations_agency_check':'dfeTeachingRegulationsAgencyCheck',
  'student_loans_details':'studentLoansDetails',
  'tax_details':'taxDetails',
  'uk_healthcare_professional_registers':'ukHealthcareProfessionalRegisters',
  'cv_capture':'cvCapture',
  'biometric_identity':'biometricIdentity',
  'company':'company',
  'umbrella_workers_declaration':'umbrellaWorkersDeclaration',
  'umbrella_preferred_suppliers':'umbrellaWorkersDeclaration',
  'adverse_media_checks':'adverseMediaChecks',
  'client_specific_documentation':'clientSpecificDocumentation',
  'directorship_checks':'directorshipChecks',
  'criminal_record_declaration' :'criminalRecordDeclaration',
  'tuberculosis_questionnaire': 'tuberculosisQuestionnaire',
  'employer_withholding_certificate': 'employerWithholdingCertificate'
}



      // })
var index
var checkname
{
for (index = 0; index < chckslength; index++) {
   checkname = obj[(this.props.workPassChecks[index]).type]
   this.setState({
    [checkname] : true
  })
  }
    }}

  renderInputs() {

    const { region, employer, persona, showPersona } = this.state
     return (


      <div className="row"><div className="CandidateNewRequests__input-area col-md-12" >
      <div className="col-md-4">
      <label htmlFor="Employer">Employer</label>
      <input list="employer-list" id="Employer" type="text" onChange={this.filterList}
        className="CandidateNewRequests__input NewRequests__input-area_margin"
        autoComplete="off" placeholder="What is the employers name?"/>
        {this.props.client_org !== undefined ?
        (<datalist id="employer-list" onClick={(e) => {
          this.setState({
            showPersona : true
          })
        }}>{this.props.client_org.map((emp, idx) => {
              return (
                <option key={emp.name} value={emp.name} >{emp.name}</option>
              )
            })}</datalist>) : ""}
      </div>

      {showPersona ?
        <div className="col-md-4">
        <LabeledSelectInput
          className="CandidateNewRequests__input"
          label="Persona (if applicable)"
          onValueChange={val => this.setState({ persona: val }, () => {this.getChecks()})}
          value={persona}
          options={this.state.organisationPersona}
          placeholder="Is there an associated persona?"
        />
        </div>
        : ""}


        <div className="col-md-4">

        <LabeledTextInput
          className="CandidateNewRequests__input"
          label="Job Role"
          placeholder="What role are you hiring for?"
          onValueChange={val =>  this.setState({ role: val }, () => {this.getChecks1()})}
          key = {this.state.resetRole}
          initialValue = {this.state.organisationPersona[persona]}
        />
        </div>
        <div className="col-md-4">
        <LabeledSelectInput
          className="CandidateNewRequests__input"
          label="Country/State/Region"
          onValueChange={val => this.setState({ region: val })}
          value={region}
          options={{
            'England': 'UK – England',
            'Northern Ireland': 'UK – Northern Ireland',
            'Scotland': 'UK – Scotland',
            'Wales': 'UK – Wales',
            'United States' : 'US - United States'
          }}
        />
        </div>
      </div>
      </div>
    )
  }

  handleCheckChange = checkType => () => {
    this.setState((prevState) => {
      return {
        [checkType]: !prevState[checkType]
      }
    })
  }

  handleCheckChange1 = checkType =>() =>{
  this.arraydata.push(checkType)
 }

  getAvailableDbsOptions() {
    const { dbsType } = this.state

    if (dbsType === 'basic') {
      return ['userPaysDBS']
    }
    if (dbsType === 'basicscotland') {
      return ['userPaysDBS']
    }

    if (dbsType === 'standard') {
      return [ 'workingAtHome', 'volunteering', 'userPaysDBS' ]
    }

    if (dbsType === 'enhanced') {
      return Object.keys(dbsOptionsText)
    }
  }

  getAvailableSanctionsOptions(){
    return Object.keys(sanctionsOptionsText)
  }



  getAvailablecriminalRecordCheck(){
    return Object.keys(criminalRecordCheckText)
  }
  getAvailablebiometricidentity(){
    return Object.keys(biometricidentityText)
  }
  getAvailableCvCapture(){
    return Object.keys(cvcaptureText)
  }


  getAvailablebankDetails(){
    return Object.keys(bankDetailsText)
  }


  getAvailableemploymentVerification(){
    return Object.keys(employmentVerificationText)
  }

  getAvailableWorkGaps(){
    return Object.keys(workGapsText)
  }
  getAvailableCompanyVat(){
    return Object.keys(companyAndVat)
  }
  getAvailableemploymentReference(){
    return Object.keys(employmentReferenceText)
  }

  getAvailablesupplierlist(){
    return Object.keys(umbreallasupplierlistText)
  }

  getAvailableeducationVerification(){
    return Object.keys(educationVerificationText)
  }


  getAvailableukHealthcareProfessionalRegisters(){
    return Object.keys(ukHealthcareProfessionalRegistersText)
  }


  getAvailablenationalInsuranceCheck(){
    return Object.keys(nationalInsurnceText)
  }

  getAvailableadverseFinanceCheck(){
    return Object.keys(adverseFinanceCheckText)
  }

  getAvailabledriverLicenseCheck(){
    return Object.keys(driverLicenseCheckText)
  }

  getAvailableadverseMediaChecks(){
    return Object.keys(adverseMediaCheckText)
  }

  getAvailabletaxDetails(){
    return Object.keys(taxDetailText)
  }
  getAvailablestudentLoansDetails(){
    return Object.keys(studentLoanDetailText)
  }
  getAvailableaddressHistory(){
    return Object.keys(addressHistoryText)
  }


  getAvailableClientDocumentation(){
    if(this.state.persona){
      return Object.keys(clientSpecificDocumentationText)
    }
    else{
    return Object.keys(clientSpecificDocumentationTextOrg)
  }
  }


  getAvailableDBSCheckTypes() {
    const {
      dbs = {},
      dbsEnhanced = {},
      dbsBasic = {},
      dbsScotland ={}
    } = this.props.checks

    const checkTypes = {}
    if (dbsBasic.enabled) {
      checkTypes.basic = 'Basic'
    }
    if (dbsScotland.enabled) {
      checkTypes.basicscotland  = 'Basic Scotland Disclosure'
    }
    if (dbs.enabled) {
      checkTypes.standard = 'Standard'
    }
    if (dbsEnhanced.enabled) {
      checkTypes.enhanced = 'Enhanced'
    }
    return checkTypes
  }

  getDbsOptions() {
    const availableOptions = this.getAvailableDbsOptions()

    return availableOptions.map(opt => {
      const text = dbsOptionsText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getsectionpeps(){
    const availableOptions = this.getAvailableSanctionsOptions()

    return availableOptions.map(opt => {
      const text = sanctionsOptionsText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getbiometricidentity(){
    const availableOptions = this.getAvailablebiometricidentity()

    return availableOptions.map(opt => {
      const text = biometricidentityText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

    getclientDocumentation(){
      const availableOptions = this.getAvailableClientDocumentation()
     var objclient  = {
      'withorganisationdocumentation': this.state['withorganisationdocumentation'],
      'withclientdocumentation': this.state['withclientdocumentation']
     }
      return availableOptions.map(opt => {
        const text = clientSpecificDocumentationText[opt]
        return {
          text,
          checked: this.state[opt],
          onValueChange: () => {
            if(opt == 'withorganisationdocumentation'){

              if(objclient.withclientdocumentation){
                this.setState({
                  withorganisationdocumentation:!this.state['withorganisationdocumentation'],
                  withclientdocumentation:true,

              })

            }
            else
            {
              this.setState({
                withorganisationdocumentation:true,
                withclientdocumentation:false,

            })
            }
            }

            if(opt == 'withclientdocumentation'){

              if(objclient.withorganisationdocumentation){
                this.setState({
                  withorganisationdocumentation:true,
                  withclientdocumentation:!this.state['withclientdocumentation'],

              })

            }
            else
            {
              this.setState({
                withorganisationdocumentation:false,
                withclientdocumentation:true,

            })
            }
            }
        }
      }
      })
    }

  getcvcapture(){
    const availableOptions = this.getAvailableCvCapture()

    return availableOptions.map(opt => {
      const text = cvcaptureText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getemploymentVerification(){
    const availableOptions = this.getAvailableemploymentVerification()

    return availableOptions.map(opt => {
      const text = employmentVerificationText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getworkGaps(){
    const availableOptions = this.getAvailableWorkGaps()

    return availableOptions.map(opt => {
      const text = workGapsText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getCompanyoptions(){
    const availableOptions = this.getAvailableCompanyVat()
    return availableOptions.map(opt => {
      const text = companyAndVat[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }


  getemploymentReference(){
    const availableOptions = this.getAvailableemploymentReference()

    var objempref  = {
      'employeewith1ref' : this.state['employeewith1ref'],
      'employeewith2ref' : this.state['employeewith2ref'],
      'employeewith3ref' : this.state['employeewith3ref'],
      'employeewith4ref' : this.state['employeewith4ref'],
      'employeewith5ref' : this.state['employeewith5ref'],
      'employeewith6ref' : this.state['employeewith6ref'],
      'employeewith7ref' : this.state['employeewith7ref']

    }

   return availableOptions.map(opt => {
      const text = employmentReferenceText[opt]
      return {
        text,
        checked: this.state[opt],

        onValueChange: () => {
          if(opt === 'employeewith1ref'){
            this.setState({
              employeewith1ref:true,
              employeewith2ref:false,
              employeewith3ref:false,
              employeewith4ref:false,
              employeewith5ref:false,
              employeewith6ref:false,
              employeewith7ref:false
             })
          }

          if(opt === 'employeewith2ref'){
            this.setState({
              employeewith1ref:false,
              employeewith2ref:true,
              employeewith3ref:false,
              employeewith4ref:false,
              employeewith5ref:false,
              employeewith6ref:false,
              employeewith7ref:false
             })
          }

          if(opt === 'employeewith3ref'){
            this.setState({
              employeewith1ref:false,
              employeewith2ref:false,
              employeewith3ref:true,
              employeewith4ref:false,
              employeewith5ref:false,
              employeewith6ref:false,
              employeewith7ref:false
             })
          }
          if(opt === 'employeewith4ref'){
            this.setState({
              employeewith1ref:false,
              employeewith2ref:false,
              employeewith3ref:false,
              employeewith4ref:true,
              employeewith5ref:false,
              employeewith6ref:false,
              employeewith7ref:false
             })
          }
          if(opt === 'employeewith5ref'){
            this.setState({
              employeewith1ref:false,
              employeewith2ref:false,
              employeewith3ref:false,
              employeewith4ref:false,
              employeewith5ref:true,
              employeewith6ref:false,
              employeewith7ref:false
             })
          }
          if(opt === 'employeewith6ref'){
            this.setState({
              employeewith1ref:false,
              employeewith2ref:false,
              employeewith3ref:false,
              employeewith4ref:false,
              employeewith5ref:false,
              employeewith6ref:true,
              employeewith7ref:false
             })
          }
          if(opt === 'employeewith7ref'){
            this.setState({
              employeewith1ref:false,
              employeewith2ref:false,
              employeewith3ref:false,
              employeewith4ref:false,
              employeewith5ref:false,
              employeewith6ref:false,
              employeewith7ref:true
             })
          }

        }
      }
    })
  }

  getsupplierlist(){
    const availableOptions = this.getAvailablesupplierlist()

    return availableOptions.map(opt => {
      const text = umbreallasupplierlistText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  geteducationVerification(){
    const availableOptions = this.getAvailableeducationVerification()

    return availableOptions.map(opt => {
      const text = educationVerificationText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }


  getukHealthcareProfessionalRegisters(){
    const availableOptions = this.getAvailableukHealthcareProfessionalRegisters()

    return availableOptions.map(opt => {
      const text = ukHealthcareProfessionalRegistersText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }


  getnationalInsuranceCheck(){
    const availableOptions = this.getAvailablenationalInsuranceCheck()

    return availableOptions.map(opt => {
      const text = nationalInsurnceText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }


  getadverseFinanceCheck(){
    const availableOptions = this.getAvailableadverseFinanceCheck()

    return availableOptions.map(opt => {
      const text = adverseFinanceCheckText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  gettaxDetails(){
    const availableOptions = this.getAvailabletaxDetails()

    return availableOptions.map(opt => {
      const text = taxDetailText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getstudentLoansDetails (){
    const availableOptions = this.getAvailablestudentLoansDetails()

    return availableOptions.map(opt => {
      const text = studentLoanDetailText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }


  getcriminalRecordCheck (){
    const availableOptions = this.getAvailablecriminalRecordCheck()

    return availableOptions.map(opt => {
      const text = criminalRecordCheckText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }
  getaddressHistory (){
    const availableOptions = this.getAvailableaddressHistory()

    return availableOptions.map(opt => {
      const text = addressHistoryText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          if(opt === 'withaddress1year'){
            this.setState({
              withaddress1year: true,
              withaddress2year: false,
              withaddress3year: false,
              withaddress4year: false,
              withaddress5year: false
             })
          }
          if(opt === 'withaddress2year'){
            this.setState({
              withaddress1year: false,
              withaddress2year: true,
              withaddress3year: false,
              withaddress4year: false,
              withaddress5year: false
             })
          }
          if(opt === 'withaddress3year'){
            this.setState({
              withaddress1year: false,
              withaddress2year: false,
              withaddress3year: true,
              withaddress4year: false,
              withaddress5year: false
             })
          }
          if(opt === 'withaddress4year'){
            this.setState({
              withaddress1year: false,
              withaddress2year: false,
              withaddress3year: false,
              withaddress4year: true,
              withaddress5year: false
             })
          }
          if(opt === 'withaddress5year'){
            this.setState({
              withaddress1year: false,
              withaddress2year: false,
              withaddress3year: false,
              withaddress4year: false,
              withaddress5year: true
             })
          }
          /*this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))*/
        }
      }
    })
  }





  getbankDetails(){
    const availableOptions = this.getAvailablebankDetails();

    return availableOptions.map(opt => {
      const text = bankDetailsText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }


  getdriverLicenseCheck(){
    const availableOptions = this.getAvailabledriverLicenseCheck();

    return availableOptions.map(opt => {
      const text = driverLicenseCheckText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getadverseMediaChecks(){
    const availableOptions = this.getAvailableadverseMediaChecks();

    return availableOptions.map(opt => {
      const text = adverseMediaCheckText[opt]
      return {
        text,
        checked: this.state[opt],
        onValueChange: () => {
          this.setState((prevState) => ({
            [opt]: !prevState[opt]
          }))
        }
      }
    })
  }

  getCompanySelects(){
    const selects = [
      {
        label: 'Professional Indemnity',
        labelCurr: '£m',
        onValueChange: val => this.setState({ professionalindemnity: val }),
        value: this.state.professionalindemnity,

      },
      {
        label: 'Public Liability',
        labelCurr: '£m',
        onValueChange: val => this.setState({ publicliability: val }),
        value: this.state.publicliability,

      },
      {
        label: 'Employee Liability',
        labelCurr: '£m',
        onValueChange: val => this.setState({employeeliability: val }),
        value: this.state.employeeliability

      }

    ]
    return selects
  }
  getDbsSelects() {
    const { dbsType } = this.state

    const selects = [
      {
        label: 'DBS Check Type',
        onValueChange: val => this.setState({ dbsType: val }),
        value: dbsType,
        options: this.getAvailableDBSCheckTypes()
      }
    ]

    if ((dbsType !== 'basic') && (dbsType !== 'basicscotland') ) {
      selects.push({
        label: 'Workforce Type',
        onValueChange: val => this.setState({ workforce: val }),
        value: this.state.workforce,
        options: {
          adult: 'Adult Workforce',
          child: 'Child Workforce',
          child_adult: 'Child and Adult Workforce',
          other: 'Other Workforce'
        }
      })
    }

    return selects
  }

  componentDidMount(){
    //this.props.fetchClientOrganisations(this.state.orgId)
    this.props.clientOrganisationsfilter(this.state.orgId)

    this.setState({
      client_org : this.props.client_org
    })
  }

  render() {

  this.arraydata =[]
    const {
      className,
      organisationId,
      candidateId,
      checks: {
        rightToWork = {},
        employmentEligibilityVerification = {},
        dbs = {},
        dbsBasic = {},
        dbsScotland ={},
        dbsEnhanced = {},
        company = {},
         sanctionPeps ={},
        healthPassCheck={},
         biometricIdentity ={},
         cvCapture ={},
         employmentStatus ={},
         employmentVerification={},
         workGaps={},
         employmentReference ={},
         educationVerification ={},
         ukHealthcareProfessionalRegisters ={},
         nationalInsuranceCheck ={},
         adverseFinanceCheck ={},
         bankDetails ={},
         taxDetails ={},
         studentLoansDetails ={},
         criminalRecordCheck ={},
         cifasCheck ={},
         addressHistory ={},
         directorshipChecks ={},
         proofOfAddressCapture ={},
         driverLicenseCheck  ={},
         adverseMediaChecks={},
         candidateUploads ={},
         healthChecker={},
         clientSpecificDocumentation ={},
         agencyWorkerRegulation ={},
         documentRequest ={},
         umbrellaWorkersDeclaration ={},
         barredListCheck={},
          dfeTeachingRegulationsAgencyCheck={},
          gpdrDeclaration={},
          immigrationDetails ={},
          umbrellaDetails ={},
          generalTeachingCouncilCheck={},
          passportVerification={},
          professionalVerification={},
          proofOfReading={},
          ukCivilPension={},
          criminalRecordDeclaration={},
          tuberculosisQuestionnaire={},
          employerWithholdingCertificate={}
         }
    } = this.props

     var canSubmit=this.canSubmit()
    return (
     <>
     <header className='CandidateHeader Candidate__header'>
     <CandidateInfo
        info={this.props.candidate}
       
      />
      <div style={{width:'28%',display: "flex", justifyContent: "space-between"}}>
      <Button
        color="green"
        className="sendRequest_btn"
        disabled={!canSubmit}
        onClick={canSubmit ? this.handleSubmit : () => {}}
      >
        Send Request
      </Button>
      <LinkedButton
        className="NewRequestsHeader__btn "
        color="red"
        to={`/organisations/${organisationId}/candidates/${candidateId}`}
      >Cancel</LinkedButton>
        </div>
    </header>
      <form onSubmit={this.handleSubmit}>
        <section className={`CandidateNewRequests ${className}`}>
       
          <h1 className="CandidateNewRequests__header">New Request</h1>
          <p className="CandidateNewRequests__sub-heading">
            Tell us basic job details and add the checks you want the candidate to complete.
          </p>

          {this.renderInputs()}

          <ul className="CandidateNewRequests__request-list">

          { !!addressHistory.enabled && (this.state.checksID.indexOf(addressHistory.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
            <li className="CandidateNewRequests__request-item">
              <CheckCard
                requestName="Address History"
                verifier="APPII"
                price={addressHistory.price}
                added={this.state.addressHistory}
                personaid = {this.state.persona}
                options={this.getaddressHistory()}
                onChange={this.handleCheckChange('addressHistory')}
                onPersonaChange = {this.handleCheckChange1('addressHistory')}
              />
            </li>
          }
          { !!adverseMediaChecks.enabled && (this.state.checksID.indexOf(adverseMediaChecks.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
            <li className="CandidateNewRequests__request-item">
              <CheckCard
                requestName="Adverse Media Checks"
                price={adverseMediaChecks.price}
                verifier="GBG plc "
                added={this.state.adverseMediaChecks}
                // options={this.getadverseMediaChecks()}
                personaid = {this.state.persona}
                onChange={this.handleCheckChange('adverseMediaChecks')}
                onPersonaChange = {this.handleCheckChange1('adverseMediaChecks')}
              />
            </li>
          }
          { !!adverseFinanceCheck.enabled && (this.state.checksID.indexOf(adverseFinanceCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Adverse Finance Check"
                  verifier="GBG Plc "
                  price={adverseFinanceCheck.price}
                  added={this.state.adverseFinanceCheck}
                  personaid = {this.state.persona}
                 // options={this.getadverseFinanceCheck()}
                  onChange={this.handleCheckChange('adverseFinanceCheck')}
                  onPersonaChange = {this.handleCheckChange1('adverseFinanceCheck')}
                />
              </li>
            }
            { !!agencyWorkerRegulation.enabled && (this.state.checksID.indexOf(agencyWorkerRegulation.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Agency Worker Regulation"
                  price={agencyWorkerRegulation.price}
                  verifier="Self Declaration"
                  added={this.state.agencyWorkerRegulation}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('agencyWorkerRegulation')}
                  onPersonaChange = {this.handleCheckChange1('agencyWorkerRegulation')}
                />
              </li>
            }
            { !!bankDetails.enabled && (this.state.checksID.indexOf(bankDetails.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Bank Details"
                  verifier="GBG Plc"
                  price={bankDetails.price}
                  added={this.state.bankDetails}
                  personaid = {this.state.persona}
                  //options={this.getbankDetails()}
                  onChange={this.handleCheckChange('bankDetails')}
                  onPersonaChange = {this.handleCheckChange1('bankDetails')}
                />
              </li>
            }
            { !!barredListCheck.enabled && (this.state.checksID.indexOf(barredListCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Barred List Check (List 99)"
                  price={barredListCheck.price}
                  verifier="GBG "
                  added={this.state.barredListCheck}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('barredListCheck')}
                  onPersonaChange = {this.handleCheckChange1('barredListCheck')}
                />
              </li>
            }
            { !!dbs.enabled && (this.state.checksID.indexOf(dbs.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName={(this.state.dbsType == 'basicscotland')?dbsCheckTypes[this.state.dbsType]:dbsCheckTypes[this.state.dbsType] + ' DBS Check'}
                  verifier={(this.state.dbsType == 'basicscotland')?"GBG Plc":"UK Gov"}
                  price={{ enhanced: dbsEnhanced, standard: dbs, basic: dbsBasic, basicscotland: dbsScotland }[this.state.dbsType].price}
                  added={this.state.dbs}
                  onChange={this.handleCheckChange('dbs')}
                  personaid = {this.state.persona}
                  selects={this.getDbsSelects()}
                  options={this.getDbsOptions()}
                  onPersonaChange = {this.handleCheckChange1('dbs')}
                />
              </li>
            }
            { !!biometricIdentity.enabled && (this.state.checksID.indexOf(biometricIdentity.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Biometric Identity Checks"
                  verifier="GBG"
                  price={biometricIdentity.price}
                  added={this.state.biometricIdentity}
                  personaid = {this.state.persona}
                  options={this.getbiometricidentity()}
                  onChange={this.handleCheckChange('biometricIdentity')}
                  onPersonaChange = {this.handleCheckChange1('biometricIdentity')}
                />
              </li>
            }
            { !!candidateUploads.enabled && (this.state.checksID.indexOf(candidateUploads.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Candidate Uploads"
                  price={candidateUploads.price}
                  verifier="Self Declaration"
                  added={this.state.candidateUploads}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('candidateUploads')}
                  onPersonaChange = {this.handleCheckChange1('candidateUploads')}
                />
              </li>
            }
            { !!cifasCheck.enabled && (this.state.checksID.indexOf(cifasCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="CIFAS  Check"
                  verifier="CIFAS Verification Company"
                  price={cifasCheck.price}
                  added={this.state.cifasCheck}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('cifasCheck')}
                  onPersonaChange = {this.handleCheckChange1('cifasCheck')}
                />
              </li>
            }
            { !!clientSpecificDocumentation.enabled && (this.state.checksID.indexOf(clientSpecificDocumentation.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Client Specific Documentation"
                  verifier="Self Declaration "
                  price={clientSpecificDocumentation.price}
                  added={this.state.clientSpecificDocumentation}
                  personaid = {this.state.persona}
                  options={this.getclientDocumentation()}
                  onChange={this.handleCheckChange('clientSpecificDocumentation')}
                  onPersonaChange = {this.handleCheckChange1('clientSpecificDocumentation')}
                />
              </li>
            }
            { !!company.enabled && (this.state.checksID.indexOf(company.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Company & VAT Checks"
                  verifier="HMRC & Companies House"
                  price={company.price}
                  added={this.state.company}
                  personaid = {this.state.persona}
                  selects={this.getCompanySelects()}
                  options={this.getCompanyoptions()}
                  onChange={this.handleCheckChange('company')}
                  onPersonaChange = {this.handleCheckChange1('company')}
                />
              </li>
            }
            { !!criminalRecordCheck .enabled && (this.state.checksID.indexOf(criminalRecordCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Criminal Record Check"
                  verifier="Criminal Record Checking Organisation "
                  price={criminalRecordCheck.price}
                  added={this.state.criminalRecordCheck}
                  options={this.getcriminalRecordCheck()}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('criminalRecordCheck')}
                  onPersonaChange = {this.handleCheckChange1('criminalRecordCheck')}
                />
              </li>
            }
            { !!criminalRecordDeclaration.enabled && (this.state.checksID.indexOf(criminalRecordDeclaration.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Criminal Record Declaration"
                  verifier="Self Declaration"
                  price={criminalRecordDeclaration.price}
                  added={this.state.criminalRecordDeclaration}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('criminalRecordDeclaration')}
                  onPersonaChange = {this.handleCheckChange1('criminalRecordDeclaration')}
                />
              </li>
            }
            { !!cvCapture.enabled && (this.state.checksID.indexOf(cvCapture.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="CV Capture"
                  verifier="APPII"
                  price={cvCapture.price}
                  added={this.state.cvCapture}
                  personaid = {this.state.persona}
                  options={this.getcvcapture()}
                  onChange={this.handleCheckChange('cvCapture')}
                  onPersonaChange = {this.handleCheckChange1('cvCapture')}
                />
              </li>
            }
            { !!dfeTeachingRegulationsAgencyCheck.enabled && (this.state.checksID.indexOf(dfeTeachingRegulationsAgencyCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="DfE / Teaching Regulations Agency Check"
                  price={dfeTeachingRegulationsAgencyCheck.price}
                  verifier="APPII"
                  added={this.state.dfeTeachingRegulationsAgencyCheck}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('dfeTeachingRegulationsAgencyCheck')}
                  onPersonaChange = {this.handleCheckChange1('dfeTeachingRegulationsAgencyCheck')}
                />
              </li>
            }
            { !!directorshipChecks.enabled && (this.state.checksID.indexOf(directorshipChecks.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Directorship Checks"
                  verifier="Companies House"
                  price={directorshipChecks.price}
                  added={this.state.directorshipChecks}
                  personaid = {this.state.persona}
                  //options={this.getbiometricidentity()}
                  onChange={this.handleCheckChange('directorshipChecks')}
                  onPersonaChange = {this.handleCheckChange1('directorshipChecks')}
                />
              </li>
            }
            { !!documentRequest.enabled && (this.state.checksID.indexOf(documentRequest.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Document Request"
                  price={documentRequest.price}
                  verifier="Self Declaration "
                  added={this.state.documentRequest}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('documentRequest')}
                  onPersonaChange = {this.handleCheckChange1('documentRequest')}
                />
              </li>
            }
            { !!driverLicenseCheck.enabled && (this.state.checksID.indexOf(driverLicenseCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Driver License Check"
                  verifier="APPII "
                  price={driverLicenseCheck.price}
                  personaid = {this.state.persona}
                  added={this.state.driverLicenseCheck}
                 // options={this.getdriverLicenseCheck()}
                  onChange={this.handleCheckChange('driverLicenseCheck')}
                  onPersonaChange = {this.handleCheckChange1('driverLicenseCheck')}
                />
              </li>
            }
            { !!educationVerification.enabled && (this.state.checksID.indexOf(educationVerification.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Education Verification"
                  verifier="APPII "
                  added={this.state.educationVerification}
                  options={this.geteducationVerification()}
                  personaid = {this.state.persona}
                  price={educationVerification.price}
                  onChange={this.handleCheckChange('educationVerification')}
                  onPersonaChange = {this.handleCheckChange1('educationVerification')}
                />
              </li>
            }
            { !!employerWithholdingCertificate.enabled && (this.state.checksID.indexOf(employerWithholdingCertificate.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Employer's Withholding Certificate (W-4)"
                  verifier="Self Declaration"
                  price={employerWithholdingCertificate.price}
                  added={this.state.employerWithholdingCertificate}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('employerWithholdingCertificate')}
                  onPersonaChange = {this.handleCheckChange1('employerWithholdingCertificate')}
                />
              </li>
            }
            { !!employmentEligibilityVerification.enabled && ((this.state.checksID.indexOf(employmentEligibilityVerification.id) > -1) || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Employment Eligibility Verification"
                  verifier="APPII"
                  price={employmentEligibilityVerification.price}
                  added={this.state.employmentEligibilityVerification}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('employmentEligibilityVerification')}
                  onPersonaChange = { this.handleCheckChange1('employmentEligibilityVerification')}
                />
              </li>
              }
              { !!employmentReference.enabled && (this.state.checksID.indexOf(employmentReference.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Employment References"
                    verifier="APPII"
                    added={this.state.employmentReference}
                    options={this.getemploymentReference()}
                    personaid = {this.state.persona}
                    price={employmentReference.price}
                    onChange={this.handleCheckChange('employmentReference')}
                    onPersonaChange = {this.handleCheckChange1('employmentReference')}
                  />
                </li>
              }
              { !!employmentStatus.enabled && (this.state.checksID.indexOf(employmentStatus.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Employment Status"
                    verifier="Self Declaration"
                    price={employmentStatus.price}
                    added={this.state.employmentStatus}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('employmentStatus')}
                    onPersonaChange = {this.handleCheckChange1('employmentStatus')}
                  />
                </li>
              }
              { !!employmentVerification.enabled && (this.state.checksID.indexOf(employmentVerification.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Employment Verification"
                    verifier="APPII "
                    price={employmentVerification.price}
                    added={this.state.employmentVerification}
                    personaid = {this.state.persona}
                    options={this.getemploymentVerification()}
                    onChange={this.handleCheckChange('employmentVerification')}
                    onPersonaChange = {this.handleCheckChange1('employmentVerification')}
                  />
                </li>
              }
              { !!generalTeachingCouncilCheck.enabled && (this.state.checksID.indexOf(generalTeachingCouncilCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="General Teaching Council Check"
                    price={generalTeachingCouncilCheck.price}
                    verifier="APPII"
                    added={this.state.generalTeachingCouncilCheck}
                    onChange={this.handleCheckChange('generalTeachingCouncilCheck')}
                    onPersonaChange = {this.handleCheckChange1('generalTeachingCouncilCheck')}
                  />
                </li>
              }
              { !!healthChecker.enabled && (this.state.checksID.indexOf(healthChecker.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Health Checker"
                    price={healthChecker.price}
                    verifier="Self Declaration"
                    added={this.state.healthChecker}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('healthChecker')}
                    onPersonaChange = {this.handleCheckChange1('healthChecker')}
                  />
                </li>
              }
              { !!healthPassCheck.enabled && (this.state.checksID.indexOf(healthPassCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Health Pass Check | SARS-CoV-2"
                    verifier=" Government"
                    price={healthPassCheck.price}
                    added={this.state.healthPassCheck}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('healthPassCheck')}
                    onPersonaChange = {this.handleCheckChange1('healthPassCheck')}
                  />
                </li>
              }
              { !!immigrationDetails.enabled && (this.state.checksID.indexOf(immigrationDetails.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Immigration Details"
                    price={immigrationDetails.price}
                    verifier="Self Declaration"
                    added={this.state.immigrationDetails}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('immigrationDetails')}
                    onPersonaChange = {this.handleCheckChange1('immigrationDetails')}
                  />
                </li>
              }
              { !!gpdrDeclaration.enabled && (this.state.checksID.indexOf(gpdrDeclaration.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Impellam GDPR Declaration"
                    price={gpdrDeclaration.price}
                    verifier="Self Declaration"
                    added={this.state.gpdrDeclaration}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('gpdrDeclaration')}
                    onPersonaChange = {this.handleCheckChange1('gpdrDeclaration')}
                  />
                </li>
              }
              { !!nationalInsuranceCheck.enabled && (this.state.checksID.indexOf(nationalInsuranceCheck.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="National Insurance Check"
                    verifier="APPII "
                    price={nationalInsuranceCheck.price}
                    added={this.state.nationalInsuranceCheck}
                    personaid = {this.state.persona}
                  //  options={this.getnationalInsuranceCheck()}
                    onChange={this.handleCheckChange('nationalInsuranceCheck')}
                    onPersonaChange = {this.handleCheckChange1('nationalInsuranceCheck')}
                  />
                </li>
              }
              { !!passportVerification.enabled && (this.state.checksID.indexOf(passportVerification.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Passport Verification"
                    price={passportVerification.price}
                    verifier="GBG"
                    added={this.state.passportVerification}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('passportVerification')}
                    onPersonaChange = {this.handleCheckChange1('passportVerification')}
                  />
                </li>
              }
              { !!professionalVerification.enabled && (this.state.checksID.indexOf(professionalVerification.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Professional Qualifications"
                    price={professionalVerification.price}
                    verifier="APPII"
                    added={this.state.professionalVerification}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('professionalVerification')}
                    onPersonaChange = {this.handleCheckChange1('professionalVerification')}
                  />
                </li>
              }
              { !!proofOfReading.enabled && (this.state.checksID.indexOf(proofOfReading.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
                <li className="CandidateNewRequests__request-item">
                  <CheckCard
                    requestName="Proof of Reading"
                    price={proofOfReading.price}
                    verifier="Self Declaration"
                    added={this.state.proofOfReading}
                    personaid = {this.state.persona}
                    onChange={this.handleCheckChange('proofOfReading')}
                    onPersonaChange = {this.handleCheckChange1('proofOfReading')}
                  />
                </li>
              }
            { !!rightToWork.enabled && ((this.state.checksID.indexOf(rightToWork.id) > -1) || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&

             <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Right To Work Check"
                  verifier="APPII"
                  price={rightToWork.price}
                  added={this.state.rightToWork}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('rightToWork')}
                  onPersonaChange = { this.handleCheckChange1('rightToWork')}
                />
              </li>
            }
            { !!sanctionPeps.enabled && (this.state.checksID.indexOf(sanctionPeps.id) > -1 || (this.state.employer == "" && this.state.employerName !== "") || (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Sanctions & PEPs"
                  verifier="GBG Plc"
                  price={sanctionPeps.price}
                  added={this.state.sanctionPeps}
                  personaid = {this.state.persona}
                  //options={this.getsectionpeps()}
                  onChange={this.handleCheckChange('sanctionPeps')}
                  onPersonaChange = {this.handleCheckChange1('sanctionPeps')}
                />
              </li>
            }
            { !!tuberculosisQuestionnaire.enabled && (this.state.checksID.indexOf(tuberculosisQuestionnaire.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Tuberculosis Questionnaire"
                  verifier="Self Declaration"
                  price={tuberculosisQuestionnaire.price}
                  added={this.state.tuberculosisQuestionnaire}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('tuberculosisQuestionnaire')}
                  onPersonaChange = {this.handleCheckChange1('tuberculosisQuestionnaire')}
                />
              </li>
            }
            { !!ukCivilPension.enabled && (this.state.checksID.indexOf(ukCivilPension.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="U.K. Civil Pension"
                  price={ukCivilPension.price}
                  verifier="Self Declaration"
                  added={this.state.ukCivilPension}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('ukCivilPension')}
                  onPersonaChange = {this.handleCheckChange1('ukCivilPension')}
                />
              </li>
            }
            { !!ukHealthcareProfessionalRegisters.enabled && (this.state.checksID.indexOf(ukHealthcareProfessionalRegisters.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="U.K. Healthcare Professional Registers"
                  verifier="APPII "
                  added={this.state.ukHealthcareProfessionalRegisters}
                  options={this.getukHealthcareProfessionalRegisters()}
                  personaid = {this.state.persona}
                  price={ukHealthcareProfessionalRegisters.price}
                  onChange={this.handleCheckChange('ukHealthcareProfessionalRegisters')}
                  onPersonaChange = {this.handleCheckChange1('ukHealthcareProfessionalRegisters')}
                />
              </li>
            }
            { !!studentLoansDetails .enabled && (this.state.checksID.indexOf(studentLoansDetails.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="U.K. Student Loan Details Details"
                  verifier="Student Loan  Verification Company "
                  price={studentLoansDetails.price}
                  added={this.state.studentLoansDetails}
                  personaid = {this.state.persona}
                  options={this.getstudentLoansDetails()}
                  onChange={this.handleCheckChange('studentLoansDetails')}
                  onPersonaChange = {this.handleCheckChange1('studentLoansDetails')}
                />
              </li>
            }
            { !!taxDetails.enabled && (this.state.checksID.indexOf(taxDetails.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="U.K. Tax Details"
                  verifier="APPII"
                  price={taxDetails.price}
                  added={this.state.taxDetails}
                  personaid = {this.state.persona}
                //  options={this.gettaxDetails()}
                  onChange={this.handleCheckChange('taxDetails')}
                  onPersonaChange = {this.handleCheckChange1('taxDetails')}
                />
              </li>
            }
            { !!umbrellaWorkersDeclaration.enabled && (this.state.checksID.indexOf(umbrellaWorkersDeclaration.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Umbrella Company Details"
                  price={umbrellaWorkersDeclaration.price}
                  verifier="Self Declaration "
                  added={this.state.umbrellaWorkersDeclaration}
                  options={this.getsupplierlist()}
                  personaid = {this.state.persona}
                  onChange={this.handleCheckChange('umbrellaWorkersDeclaration')}
                  onPersonaChange = {this.handleCheckChange1('umbrellaWorkersDeclaration')}
                />
              </li>
            }
            { !!workGaps.enabled && (this.state.checksID.indexOf(workGaps.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")|| (this.state.employer!=='' && this.state.persona==="No Persona")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Work Gaps"
                  verifier="APPII "
                  price={workGaps.price}
                  added={this.state.workGaps}
                  personaid = {this.state.persona}
                  //options={this.getworkGaps()}
                  onChange={this.handleCheckChange('workGaps')}
                  onPersonaChange = {this.handleCheckChange1('workGaps')}
                />
              </li>
            }
            {/* { !!proofOfAddressCapture.enabled && (this.state.checksID.indexOf(proofOfAddressCapture.id) > -1 || (this.state.employer == "" && this.state.employerName !== "")) &&
              <li className="CandidateNewRequests__request-item">
                <CheckCard
                  requestName="Proof Of Address Capture"
                  verifier="APPII"
                  price={proofOfAddressCapture.price}
                  added={this.state.proofOfAddressCapture}

                  onChange={this.handleCheckChange('proofOfAddressCapture')}
                />
              </li>
            } */}
          </ul>
          {/** Submit the requests :) */}
          <div className="CandidateNewRequests__btn-wrap">
            {this.renderSubmit()}
          </div>
        </section>
      </form>
      </> 
    )
  }
}

CandidateNewRequest.propTypes = {
  candidateId: PropTypes.number.isRequired,
  organisationId: PropTypes.number.isRequired,
  checks: PropTypes.object.isRequired,
  postNewRequest: PropTypes.func.isRequired,
  className: PropTypes.string
}

CandidateNewRequest.defaultProps = {
  className: ''
}

export default CandidateNewRequest
