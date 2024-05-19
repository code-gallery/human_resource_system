import React, { Component } from 'react'
import PropTypes, { array } from 'prop-types'
import capitalize from 'lodash/capitalize'
import isNull from 'lodash/isNull'
import classNames from 'classnames'
import moment from 'moment'
import countryISO from 'iso-3166-1-alpha-2'
import './style.css'
import significantControlDescriptions from './significantControlDescriptions'

const documentNames = {
  passport: 'Passport',
  biometric_residence_permit: 'Biometric Residence Permit',
  driver_licence: 'Driver\'s Licence (Photocard, EU)',
  birth_certificate: 'Birth Certificate',
  adoption_certificate: 'Adoption Certificate',
  driver_licence_non_eu: 'Driver\'s Licence (Photocard, Non-EU)',
  paper_driver_licence: 'Driver\'s Licence (Paper)',
  birth_certificate_reissue: 'Birth Certificate (12+ months after birth)',
  marriage_certificate: 'Marriage / Civil Partnership Certificate',
  hm_forces_id: 'HM Forces ID Card',
  firearms_licence: 'Firearms Licence',
  mortgage_statement: 'Mortgage Statement',
  bank_statement: 'Bank / Building Society Statement',
  bank_account_open_letter: 'Bank / Building Society Account Opening',
  credit_card_statement: 'Credit Card Statement',
  financial_statement: 'Financial Statement',
  p45_p60_statement: 'P45 or P60 Statement',
  council_tax_statement: 'Council Tax Statement',
  work_permit: 'Work Permit / Visa',
  letter_of_sponsorship: 'Letter of Sponsorship',
  utility_bill: 'Utility Bill',
  benefit_statement: 'Benefit Statement',
  government_agency_document: 'Government Agency Document',
  eu_id_card: 'EU National ID Card',
  pass_card: 'Cards Carrying PASS Accreditation',
  national_insurance_check: 'Proof of National Insurance',
  addresses: 'Proof of Current Address'
}

const attributeNames = {
  personal: 'Personal Details',
  birth: 'Place of Birth',
  driver_licences: 'Driver\'s Licence',
  passports: 'Passport',
  companies: 'Company',
  driver_license_check: 'Driver\'s Licence',
  gpdr_declaration_fcc: 'Future Contact Consent',
  gpdr_declaration_spd: 'Sensitive Personal Data Collection Consent',
  cifas_check: 'CIFAS Check',
  adverse_finance_check: 'Adverse Finance Check',
  national_insurance_check: 'Nationa Insurance',
  addresses: 'Addresses',
  sanction_peps: 'Sanctions & PEPs',
  tax_details_information: 'Tax Information',
  tax_details_loan: 'U.K. Student Loans',
  personal_info: 'Personal Information',
  client_specific_documentation: 'Client Documentation',
  biometric_identity: 'Biometric Identity',
  criminal_record_declaration: 'Criminal Record Declaration'
}

/** string -> string */
const getDisplayName = (name, defaultName, type) => {
  if (documentNames[name] && type === 'documents') {
    return documentNames[name]
  }
  if (attributeNames[name] && type === 'attribute') {
    return attributeNames[name]
  }
  if (defaultName) {
    return defaultName
  }
  if (name.includes('unemployment_reference')) {
    var name = "Unemployment_Reference"
  }
  if (name.includes('employment_reference')) {
    var name = "Employment_Reference"
  }
  if (name.includes('personal_reference')) {
    var name = "Personal_Reference"
  }
  if (name.includes('employment_agency_reference')) {
    var name = "Employment_Agency_Reference"
  }
  if (name.includes('education_reference')) {
    var name = "Education_Reference"
  }
  if (type === "personal_info") {
    var name = "personal_info"
  }
  if (type === "tuberculosis_questionnaire") {
    var name = "tuberculosis_questionnaire"
  }
  if (type === "biometric_identity") {
    var name = "biometric_identity"
  }
  return name.split('_').map(capitalize).join(' ')
}

const DocumentView = ({ images, name, isLast, ...rest }) => {

  const style = classNames('UserData__article', { isLast: isLast })
  return (
    <article className={style} {...rest}>
      <h3 className="UserData__article-header">
        {name}
      </h3>
      {images.map((url, idx) => (
        <a key={idx} href={url} target="_blank" title={name}>
          <img
            className="UserData__article-img"
            src={url}
            alt={name}
          />
        </a>
      ))}
    </article>
  )
}

DocumentView.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired
}

/** @NOTE: List of possible attributes of documents */
const attributeConfig = {
  //user_id: { type: Number, hide: true, name: 'User ID' },
  //created_at: { type: Date, hide: true, name: 'Created At' },
  //updated_at: { type: Date, hide: true, name: 'Updated At' },

  /** Address */
  line1: { type: String, name: 'Line 1' },
  line2: { type: String, name: 'Line 2' },
  town: { type: String, name: 'Town' },
  county: { type: String, name: 'County' },
  postcode: { type: String, maxLength: 8, name: 'Postcode' },
  country: { type: String, isCountry: true, maxLength: 2, name: 'Country' },
  from: { type: Date, name: 'Resident From', name: 'From', formatter: 'date' },
  to: { type: Date, name: 'Resident To', name: 'To', formatter: 'date' },

  /** Passport */
  number: { type: String },
  dob: { type: Date, name: 'Date of Birth' },
  nationality: { type: String },
  issue_date: { type: Date, formatter: 'date' },

  /** Driver Licence */
  type: { type: String, formatter: 'caps' },
  valid_from: { type: Date, formatter: 'date' },
  issue_country: { type: String, isCountry: true, maxLength: 2 },
  check_code: { type: String },
  endorsements: { type: String, name: 'Endorsements', formatter: 'object' },
  doo: { type: String, name: 'Date of Birth' },
  offence: { type: String, name: 'Offence' },
  type: { type: String, name: 'Type', formatter: 'caps' },
  typeCode: { type: String, name: 'Type Code' },
  valid_to: { type: String, name: 'Valid To' },

  /** Personal */
  title: { type: String },
  title_text: { type: String, name: 'Title' },
  forename: { type: String, name: 'Forename' },
  firstename: { type: String, name: 'Fisrt Name' },
  middle_names: { type: Array, formatter: 'join' },
  middle_name: { type: Array, formatter: 'join' },
  surname: { type: String, name: 'Surname' },
  birth_surname: { type: String },
  gender: { type: String, formatter: 'caps' },
  national_insurance_number: { type: String },
  phone: { type: String },
  ssn_ni: { type: String, name: 'NI' },
  email: { type: String, name: 'Email' },
  phone_number: { type: String, name: 'Phone No.' },
  account_address: { type: String, name: 'Addresses', formatter: 'object' },
  other_names: { type: Array, formatter: 'names' },

  /** Tuberculosis Questionnaire */
  chest_xray: {type: Boolean, name: 'Have you had a chest x-ray'},
  employment_outside_country: {type: Boolean, name: 'Worked outside of your current country of employment for a period > 3 months'},
  skin_and_blood_test: {type: Boolean, name: 'Have you recently had a skin (Mantoux / PPD) or blood (IGRA) test to identify whether you may have latent tuberculosis'},
  symptoms_cough_morethan_2_weeks: {type: Boolean, name: 'Cough (> 2 Weeks)'},
  symptoms_enorexia_loss_of_appetite: {type: Boolean, name: 'Anorexia (loss of appetite)'},
  symptoms_fatigue_tiredness: {type: Boolean, name: 'Fatigue/Tiredness'},
  symptoms_fever_typically_at_night: {type: Boolean, name: 'Fever (typically at night)'},
  symptoms_hemptysis_splitting_up_blood: {type: Boolean, name: 'Hemoptysis (spitting up blood)'},
  symptoms_night_sweats_drenching: {type: Boolean, name: 'Night Sweats (drenching)'},
  symptoms_production_of_sputum: {type: Boolean, name: 'Production of Sputum'},
  symptoms_sortness_of_breath: {type: Boolean, name: 'Sortness of Breath'},
  symptoms_unexplained_weight_loss: {type: Boolean, name: 'Unexplained Weight Loss'},
  tuberculosis_treatment: {type: Boolean, name: 'Have you ever taken isoniazid (INH), rifampin (RIF), ethambutol (EMB) or pyrazinamide (PZA) in treating tuberculosis'},
  date_of_xray_test: {type: String, name: 'Date of x-ray'},
  result_xray_test: {type: String, name: 'Result'},
  date_of_skin_and_blood_test: {type: String, name: 'Date of test'},
  result_skin_and_blood_test: {type: String, name: 'Result'},
  employment_outside_country_description: {type: String, name: 'Please provide further details'},
  length_tuberculosis_treatment: {type: String, name: 'Length of treatment'},
  date_tuberculosis_treatment: {type: String, name: 'Date Taken'},
  symptoms_description: {type: String, name: 'If yes to any of the symptoms, please specify the symptom and a brief explanation'},

  /** Company */
  // name: { type: String },
  vat_number: { type: String, name: 'VAT Number' },
  registered_name: { type: String, name: 'Companies House Registered Name' },
  vat_name: { type: String, name: 'VAT Registered Name' },
  vat_address: { type: String, name: 'VAT Address' },
  status: { type: String },
  registration_date: { type: Date, formatter: 'date' },
  officers: { type: Array, formatter: 'officers' },
  significant_control: { type: Array, formatter: 'significantControl', name: 'Persons with Significant Control' },

  /** NI */
  'type-NI': { type: String, formatter: 'caps', name: 'Type' },
  'number-NI': { type: String, formatter: 'caps', name: 'Type' },
  nationalInsuranceNo: { type: String, formatter: 'caps', name: 'National Insurance Number' },

  /**GDPR */
  'All of the below; or': { type: String, formatter: 'caps', name: 'All of the below' },
  'By Email': { type: String, formatter: 'caps', name: 'By Email' },
  'By SMS': { type: String, formatter: 'caps', name: 'By SMS' },
  'Phone': { type: String, formatter: 'caps', name: 'Phone' },
  'Post': { type: String, formatter: 'caps', name: 'Post' },

  'Any other relevant health related-data': { type: String, formatter: 'caps', name: 'Any other relevant health related-data' },
  'Data relating to DBS check results or criminal convictions': { type: String, formatter: 'caps', name: 'Data relating to DBS check results or criminal convictions' },
  'Data relating to equal opportunities': { type: String, formatter: 'caps', name: 'Data relating to equal opportunities' },
  'Medical history as requested ': { type: String, formatter: 'caps', name: 'Medical history as requested' },

  /**Bank Details */
  'bank_code': { type: String, formatter: 'caps', name: 'Sort Code' },
  'account_no': { type: String, formatter: 'caps', name: 'Account Number' },
  'account_name': { type: String, formatter: 'caps', name: 'Account Name' },
  'bank_reference_no': { type: String, formatter: 'caps', name: 'Bank Reference Number' },
  'organisation_name': { type: String, formatter: 'caps', name: 'Organisation Name' },

  /**Emp Gap */
  'reason': { type: String, formatter: 'caps', name: 'Reason' },
  'detail': { type: String, formatter: 'caps', name: 'Detail' },
  'personal_reference1': { type: Object, name: 'Personal Reference 1',formatter: 'multipleObject' },
  'personal_reference2': { type: Object, name: 'Personal Reference 2',formatter: 'multipleObject' },

  /**Adv Finance */
  addressArray:{type:Array, name:'Addresses ', formatter:'multipleAddresses'},
  adversFinanceMultiLineInputBox2: { type: String, name: 'Have you, or have you been, the subject of any voluntary arrangements, Country Court Judgements, Bankruptcy or any other formal credit relation proceedings which have been satisfied.' },
  adversFinanceMultiLineInputBox1: { type: String, name: 'Have you, or have you been, the subject of any voluntary arrangements, Country Court Judgements, Bankruptcy or any other formal credit relation proceedings which are NOT satisfied.' },
  // formattAdaddress: { type: Object, name: 'Address', formatter: 'object' },
  // line_1: { type: String, name: 'Line1', formatter: 'caps' },
  // line_2: { type: String, name: 'Line2', formatter: 'caps' },
  // town_or_city: { type: String, name: 'Town/City', formatter: 'caps' },
  // district: { type: String, name: 'District', formatter: 'caps' },
  // postCode: { type: String, name: 'Postcode', formatter: 'caps' },

  /**Emp Ref */
  datefrom: { type: Date, name: 'Date From' },
  dateto: { type: Date, name: 'Date To' },
  refree_email: { type: String, name: 'Referee Email' },
  refreeemail: { type: String, name: 'Referee Email' },
  contact_phone: { type: String, name: 'Contact Number' },
  position_applicant: { type: String, name: 'Applicant Position' },
  position_refree: { type: String, name: 'Referee Position' },
  refree_firstname: { type: String, name: 'First Name' },
  refree_lastname: { type: String, name: 'Last Name', formatter: 'join' },
  document_images: {type:String, name:'Evidences', formatter:'multiImage'},
  refree_address: { type: String, name: 'Referee Address', formatter: 'object' },
  company_accountantName: { type: String, name: 'Account Address', formatter: 'join' },
  company_accountantAddress: { type: String, name: 'Account Name', formatter: 'join' },
  award: { type: String, name: 'Award', formatter: 'caps' },
  course: { type: String, name: 'Course', formatter: 'caps' },
  location_refree: { type: String, name: 'Referee Location', formatter: 'caps' },
  reason_for_leaving : { type: String, name: 'Reason for Leaving' },
  nature_of_acquintance: { type: String, name: 'Nature of Acquaintance', formatter: 'caps' },

  /**Emp Verification */
  start_date: { type: String, name: 'Reference From', formatter: 'date' },
  end_date: { type: String, name: 'Reference To', formatter: 'date' },
  company: { type: String, name: 'Organisation Name' },
  position: { type: String, name: 'Position Held By Applicant' },
  description: {type:String, name:'Evidences', formatter:'multiImage'},

  /**Edu Verification */
  institution: { type: String, name: 'Institution' },
  studied: { type: String, name: 'Studied' },
  degree: { type: String, name: 'Degree' },
  grade: { type: String, name: 'Award' },
  student_number: { type: String, name: 'Student Number' },
  visibility: { type: String, name: 'Visibility', formatter: 'caps' },
  transcript: { type: String, name: 'Transcript', formatter: 'multiImage' },
  results: { type: String, name: 'Course', formatter: 'object' },
  subject: { type: String, name: 'Subject', formatter: 'caps' },
  grade: { type: String, name: 'Grade', formatter: 'caps' },
  qualification: { type: String, name: 'Qualification', formatter: 'caps' },

  /**Tax Details */
  // data : {type: String, name: 'Data'},
  // statement : {type: String, name: 'Institution'},
  // data_loan: {type: String, name: 'Data Loan'},
  // statement_loan: {type: String, name: 'Statement Loan'},
  // switchValue_loan: {type: String, name: 'Switched Value Loan'},
  // title_loan: {type: String, name: 'Title Loan'},
  // value_loan: {type: String, name: 'Value Loan'},
  data : {type: String, name: 'Statement Description'},
  data_loan : {type: String, name: 'Loan Description'},
  title_loan: {type: String, name: 'Do you have a Student Loan which is not fully repaid?'},

  /**Onboarding Declaration */
  onboarding_declaration : {type: Boolean, name: 'No further documents' , formatter: 'caps'},
  onboarding_declaration_1 : {type: Boolean, name: 'Documents uploaded', formatter: 'caps'},
  onboarding_declaration_2 : {type: String, name: 'Documents',formatter: 'multiImage'},

  /**Immigration Check */
  birth_nationality : { type: String, name: 'Birth Nationality'},
  other_nationality : { type: String, name: 'Other Nationality'},
  port_ref_number : {type:String, name:'Home Office or port reference number, and your ARC reference', formatter: 'caps'},
  immigration_control_description : { type: String, name: 'Immigration Control Description', formatter: 'caps'},
  immigration_control_switcher : { type: String, name: 'Are you subject to immigration control?', formatter: 'caps'},
  lawful_resident_description : { type: String, name: 'Lawful Resident Description', formatter: 'caps'},
  lawful_resident_switcher : { type: String, name: 'Your Residence in the U.K. is unlawful?', formatter: 'caps'},
  restrictions_resident_description : { type: String, name: 'Restrictions Resident Description', formatter: 'caps'},
  restrictions_resident_switcher : { type: String, name: 'Are there any restrictions on your continued residence in the U.K.?', formatter: 'caps'},
  restrictions_employment_description : { type: String, name: 'Restrictions Employment Description', formatter: 'caps'},
  restrictions_employment_switcher : { type: String, name: 'Are there any restrictions on your continued freedom to take employment in the U.K.?', formatter: 'caps'},
  
  /**Company and VAT */
  multiImageArrayResponse : {type: String, name: 'Certificate Proof',formatter: 'multiImage'},
  isConfirm: {type: String, name: 'Self Biller Declaration', formatter: 'caps'},

  /**Personal Data */
  forename: {type: String, name: 'First Name (Given Name)', formatter: 'caps'},
  surname: {type: String, name: 'Last Name (Family Name)', formatter: 'object'},
  middle_names: {type: String, name: 'Middle Initial'},
  social_security_number: {type: String, name: 'U.S Social Security Number', formatter: 'caps'},
  account_address: { type: String, name: 'Addresses', formatter: 'object' },
  single_or_married: {type: String, name: 'Single or Married filling seperately', formatter: 'caps'},
  married_filling_jointly: {type: String, name: 'Married filling jointly or Qualifying widow(er)', formatter: 'caps'},
  head_of_household : {type: String, name: 'Head of Household (Check only if you\'re unmarried and pay more than half the cost of keeping up a home for yourself and a qualifying  individual.)', formatter: 'caps'},
  hold_more_than_one_job : {type: String, name: 'I hold more than one job at a time', formatter: 'caps'},
  no_of_jobs : {type: String, name: 'How many jobs do you hold'},
  my_total_income : {type: String, name: 'My total income will be $200,000 or less ($400,000 or less if married filling jointly)'},
  does_your_spouce_work: {type: String, name: 'Does your spouse work ?', formatter: 'caps'},
  gender: {type: String, name: 'Gender', formatter: 'caps'},
  title: {type: String, name: 'Title', formatter: 'caps'},
  dob : {type: String, name: 'Date Of Birth', formatter: 'date'},
  national_insurance_number : {type: String, name: 'National Insurance Number', formatter: 'caps'},
  email : {type: String, name: 'Email'},
  phone : {type: String, name: 'Phone'},
  emergency_contact_name: {type: String, name: 'Emergency Contact Name 1', formatter: 'caps'},
  emergency_contact_number: {type: String, name: 'Emergency Contact Number 1', formatter: 'caps'},
  emergency_contact_name2: {type: String, name: 'Emergency Contact Name 2', formatter: 'caps'},
  emergency_contact_number2: {type: String, name: 'Emergency Contact Number 2', formatter: 'caps'},
  is_disable: {type: String, name: 'Do you have any health issues or a disability relevant to the position or role?', formatter: 'caps'},
  criminal_record_check_ref: {type: String, name: 'Criminal Record Check Reference', formatter: 'caps'},
  mothermaidenname : {type: String, name: 'Mother’s maiden name', formatter: 'caps'},
  place_of_birth: {type: String, name: 'Place of Birth', formatter: 'object'},
  nationality: {type: String, name: 'Nationality'},
  //other_names: {type: String, name: 'Other Names'},


  /**Multiple Jobs or Spouse Works */
  use_the_estimator_irs_app: {type: String, name: 'Use the estimator at www.irs.gov/W4App for most accurate withholding and then complete "Other | adjustments" tile', formatter: 'caps'},
  two_jobs_higher_paying_job: {type: String, name: 'Two Jobs (Higher Paying Job Amount)', formatter: 'caps'},
  two_jobs_lower_paying_job: {type: String, name: 'Two Jobs (Lower Paying Job Amount)', formatter: 'caps'},
  three_highest_paying_job: {type: String, name: 'Three Jobs (Higher Paying Job Amount)', formatter: 'caps'},
  three_2nd_highest_paying_job: {type: String, name: 'Three Jobs (2nd Highest Paying Job Amount)', formatter: 'caps'},
  three_lower_paying_job: {type: String, name: 'Three Jobs (Lower Paying Job Amount)', formatter: 'caps'},
  no_of_pay_periods_per_year: {type: String, name: 'Enter the number of pay periods per year for the highest paying job', formatter: 'caps'},

  /**Claim Dependents */
  children: {type: String, name: 'How many children', formatter: 'caps'},
  other_dependents: {type: String, name: 'How many other dependents do you have', formatter: 'caps'},
  tax_credits: {type: String, name: "Please provide there and other tax credits that you'd like to, such as education tax credits or the foreign tax credit", formatter: 'caps'},
  finalTax: {type: String, name: 'The total amounts you are claiming are', formatter: 'caps'},

  /**Other Adjustment */
  other_income: {type: String, name: "If you want tax withheld for other income you expect this year that won't have withholding, enter the amount of ither income here. This may include interest, dividents and retirement income", formatter: 'caps'},
  deductions: {type: String, name: 'If you expect to claim deductions other than the standard deduction and want to reduce your withholding', formatter: 'caps'},
  extra_withholding: {type: String, name: 'Enter any additional tax you want withheld each pay period', formatter: 'caps'},


  /**Umbrella Company */
  companyName: {type: String, name: 'Organisation Name'},
  pc_fst_name: {type: String, name: 'Primary Contact First Name', formatter: 'caps'},
  pc_last_name: {type: String, name: 'Primary Contact Last Name', formatter: 'caps'},
  pc_email: {type: String, name: 'Primary Contact Email'},
  pc_tel_no: {type: String, name: 'Primary Contact Phone Number'},

  /**Onboarding documentation */
  //logoUrl: {type: String, name: 'Uploaded Document', formatter: 'link'},

  //doc_name: {type: String, name: 'Document Name', formatter: 'caps'},
  document_name : {type: String, name: 'Document Name', formatter: 'link'},
  action: {type: String, name: 'Action Performed', formatter: 'caps'},
  date_submitted: {type: String, name: 'Date Submitted', formatter: 'caps'},
  time_submitted: {type: String, name: 'Time Submitted', formatter: 'caps'},
  /**Biometric */
  biometricstatus : {type: String, name: 'Biometric Identity', formatter: 'caps'},

  /**Directorship check */
  directorship_docs : {type: String, name: 'Uploaded Documents', formatter: 'directorship_docs'},

  /**Criminal Record Declaration */
  criminalDeclarationMultiLineInputBox1:{type:String,name:"Have you been found guilty by court for any offence in any country(exclunding parking but including all motoring offences even where a spot fine has been administered by the police) or have you ever been put on probation(probation order are now called community rehabilitation order) or absolutely/conditionally discharged or bound over after being charged with any offence or is there any action pending against you? You need not declare convictions which are 'spent' under the rehabilitation of Offenders Act(1974)?",formatter:'multiobject'},
  criminalDeclarationMultiLineInputBox2:{type:String, name:"Have you ever been convicted by a Court Martial or sentenced to detention whilst server in the armed Forces of the UK or any Commonwealth or foriegn country? You need not declare convictions which are 'spent' under the Rehabilitation of Offenders act(1974)?", formatter:'multiobject'},
  criminalDeclarationMultiLineInputBox3:{type:String, name:"Do you know of any other matters in your background which might cause your reliability or suitability to have access to Government assets to be called into question?", formatter:'multiobject'},

  /** Employment Eligibility verification */
  employment_eligibility_immigration: {
    united_state_citizen_switcher: { type: String, name: 'A citizen of the United States', formatter: 'caps' },
    united_state_non_citizen_switcher: { type: String, name: 'A non citizen national of the United States', formatter: 'caps' },
    lawful_resident_switcher: { type: String, name: 'A Lawful permanent Resident', formatter: 'caps' },
    lawful_alien_reg_no: { type: String, name: 'Alien Reg Number' },
    lawful_uscis_msc_no: { type: String, name: 'USCIS Number', value: 'MSC-' },
    lawful_uscis_eac_no: { type: String, name: 'USCIS Number', value: 'EAC-' },
    authorized_worker_switcher: { type: String, name: 'An alien authorized to work', formatter: 'caps' },
    auth_work_untill: { type: Date, name: 'Authorized to work untill', formatter: 'date' },
    authorized_alien_reg_no: { type: String, name: 'Alien Reg Number' },
    authorized_uscis_msc_no: { type: String, name: 'USCIS Number', value: 'MSC-' },
    authorized_uscis_eac_no: { type: String, name: 'USCIS Number', value: 'EAC-' },
    form_i_94_addmission_no: { type: String, name: 'Form I-94 Addmission Number' },
    foreign_passport_no: { type: String, name: 'Foreign Passport Number' },
    country_of_issuance: { type: String, name: 'Country of Issuance' }
  },
  /** Adverse media */
  address: { type: String, name: 'Address', formatter: 'object' }
}

const AttributeView = ({ checkName, data, isLast, ...rest }) => {
  const style = classNames('UserData__article', { isLast: isLast })
  const checkType = rest.type
  const getAttributes = item => {
    let tuberAttributeName = []
    return Object.entries(item)
      .filter(([ attrName, value ]) => {
        tuberAttributeName.push(attrName)
        var config = (checkType === 'employment_eligibility_immigration') ? attributeConfig[checkType] : attributeConfig
        if (!config.hasOwnProperty(attrName)
          || ((checkName.includes('Employment Reference') || checkName.includes('Education Reference')) && !value)
          || (checkType === 'employment_eligibility_immigration' && value === '')
          || (checkType === 'candidate_uploads' && value === '[]')
        ) {
          return false
        }
        return !config[attrName].hide
      })
      .map(([ name, value ], index) => {
        var configName = (checkType === 'employment_eligibility_immigration') ? attributeConfig[checkType][name] : attributeConfig[name]
        var displayName = getDisplayName(name, configName.name, null)
        let displayValue = configName.value ? configName.value + value : value
        if (configName.isCountry) {
          displayValue = countryISO.getCountry(value)
        }

        /* if (attributeConfig[name].type === Date) {
            displayValue = value ? moment(value).format('DD/MM/YYYY') ? 'Present'
        } */
        switch (configName.formatter) {
          case 'names':
            displayValue = (value || []).map(({ forename, surname, from, to }, index) => {
              const range = `from ${moment(from).format('MMMM Do YYYY')} to ${to ? moment(to).format('MMMM Do YYYY') : 'Present'}`
              return (
                <span key={index}>
                  <strong>
                    {forename} {surname}
                  </strong> {range}
                </span>
              )
            })
            break

          case 'officers':
            displayValue = (value || []).map(({ name, forenames, surname, dob, appointed_on, resigned_on }, index) => {
              const displayDob = dob ? ` (born ${moment(dob, 'YYYY-MM').format('MMMM YYYY')})` : ''
              const range = `from ${moment(appointed_on).format('MMM Do YYYY')}${resigned_on ? ` to ${moment(resigned_on).format('MMM Do YYYY')}` : ''}`
              return (
                <span key={index}>
                  <strong className={classNames({ 'UserData__officer-resigned': !!resigned_on })}>
                    {forenames ? `${forenames} ${surname}` : name}
                  </strong>{displayDob} {range}
                </span>
              )
            })
            break
          case 'significantControl':
            displayValue = (value || []).map(({ forename, surname, dob, natures_of_control }, index) => {
              const displayDob = dob ? `(born ${moment(dob, 'YYYY-MM').format('MMMM YYYY')})` : ''
              const controls = natures_of_control.map((n, i) => (
                <li key={i}>{significantControlDescriptions[n]}</li>
              ))

              return (
                <span key={index}>
                  <strong>
                    {forename} {surname}
                  </strong> {displayDob} <ul>{controls}</ul>
                </span>
              )
            })
            break
          case 'join':
            displayValue = ([value] || []).join(' ')
            break
          case 'caps':
            displayValue = capitalize(value)
            break
          case 'date':
            displayValue = value ? moment(value).format('DD/MM/YYYY') : 'Present'
            /* let dateFormat = (x) => {
              var fromdate = new Date(x)
              var dd = String(fromdate.getDate()).padStart(2, '0');
              var mm = String(fromdate.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = fromdate.getFullYear();
              displayValue = dd + '/' + mm + '/' + yyyy;
              return (displayValue)
            }
            dateFormat(value) */
            break

          case 'link':
            displayValue = (value || []).map((val, index) => {
              if (index === 0) {
                return (
                  <div>
                    <a href={value[1]} target="_blank">{value[0]}</a>
                  </div>
                )
              }
              else {
                return null
              }
            })
            break

          case 'directorship_docs':
            if (value.length === 0) {
              displayValue = 
              (<span className="padding">
                    None
              </span>)
            }
            else {
              displayValue = (value || []).map((val, index) => {
                return (
                  <div className="padding" key={index}>
                    <a href={val.url} target="_blank">Document {index + 1}</a>
                  </div>
                )
              })
            }
            break

          case 'multiobject':
            displayValue = (<div className='criminalResponse'><span className="booleanValue">{value ? 'Yes' : 'No'}</span> <span className="response">{value}</span></div>)
            break

          case 'multipleAddress':
            if (Array.isArray(value)) {
              console.log(value)
            }
            break

          case 'multipleObject':
            if (typeof(value) === "object") {
              displayValue = Object.keys(value).map((key) => {

                if (attributeConfig.hasOwnProperty(key)) {
                  var keyValue = value[key]
                  if (attributeConfig[key].type === Date) {
                    keyValue = keyValue ? moment(keyValue).format('DD/MM/YYYY') : 'Present'
                  }
                  if (keyValue && typeof keyValue === 'string') {
                    return (
                      <span className="UserData__article-txt-obj">
                        <span className="UserData__attr-personalName-obj">{attributeConfig[key].name} : </span>
                        <span className="UserData__attr-personalValue-obj"> {keyValue}</span>
                      </span>
                    )
                  }
                  if (keyValue && typeof keyValue === "object" && key === 'refree_address') {
                    return (
                      <div>
                        <p className="UserData__attr-name-obj">Referee Address :</p><br/>
                        { Object.keys(keyValue).map((key) => {
                          if (attributeConfig.hasOwnProperty(key)) {
                            var newKey = keyValue[key]
                            if (attributeConfig[key].type === Date) {
                              newKey = newKey ? moment(newKey).format('DD/MM/YYYY') : 'Present'
                            }
                            return (
                              <span className="UserData__article-txt-obj" style={{marginLeft:"15px"}}>
                                <span className="UserData__attr-name-obj">{attributeConfig[key].name} :</span>
                                <span className="UserData__attr-value-obj"> {newKey}</span>
                              </span>
                            )
                          }
                        })
                        }
                      </div>
                    )
                  }
                }
              })
              displayValue = displayValue.filter(function (element) {
                return element !== undefined;
              });
            }
            else {
              displayValue = value
            }
            break
          case 'multiImage':
            if (typeof(value) === "string") {
              if (value.includes("{")) {
                value = JSON.parse(value)
                displayValue = value.map((key,idx) => {
                  return (
                    <a key={idx} href={key.url} target="_blank" title={key.url}>
                      <img src={key.url} alt='Image' className="multiImage" /></a>
                  )
                })
                displayValue = displayValue.filter(function (element) {
                  return element !== undefined;
                });
              }
              else if (value === '') {
                displayValue = ''
              }
              else {
                value = JSON.parse(value)
                if (value.length > 0) {
                  value = [value]
                  displayValue = value.map((key,idx) => {
                    return (
                      <a key={idx} href={key} target="_blank" title={key}>
                        <img src={key} alt='Image' className="multiImage"/>
                      </a>
                    )
                  })
                }
                else {
                  displayValue = ''
                }
              }
            }
            else if (Array.isArray(value)) {
              displayName = value.map((item, idx) => {
                if (item.type !== 'dbs_personal_detail') {
                  if (idx === 0) {
                    return (item.type)
                  }
                }
                else {
                  if (idx === 0) {
                    return ( "Evidences (Other Names)" )
                  }
                }
              })

              displayValue = value.map((key,idx) => {
                return (
                  <a key={idx} href={key.url} target="_blank" title={key.url}>
                    <img src={key.url} alt='Image' className="multiImage"/></a>
                )
              })
              displayValue = displayValue.filter(function (element) {
                return element !== undefined;
              });
            }
            break
          case 'multipleAddresses':
            if (Array.isArray(value)) {
              displayValue = value.map((itm, idx) => {
                displayValue = Object.keys(value[idx]).map((key) => {
                  if (attributeConfig.hasOwnProperty(key)) {
                    var keyValue = value[idx][key]
                    if (attributeConfig[key].formatter === 'date') {
                      const todate = new Date().setHours(0, 0, 0, 0)
                      keyValue = keyValue ?
                        new Date(moment(keyValue).format('MM/DD/YYYY')).getTime() === todate ? 'Present' : moment(keyValue).format('DD/MM/YYYY')
                        : 'Present'
                    }
                    return (
                      <span className="UserData__article-txt-obj">
                        <span className="UserData__attr-name-obj">{attributeConfig[key].name} : </span>
                        <span className="UserData__attr-value-obj"> {keyValue === " " ? "--" : keyValue}</span>
                      </span>
                    )
                  }
                })
                return (
                  <span> {displayValue} <br /><br /></span>
                )
              })
            }
            break
          case 'object':
            if (typeof (value) === "string" && value.includes(":")) {
              value = JSON.parse(value)
              displayValue = Object.keys(value).map((key) => {
                if (attributeConfig.hasOwnProperty(key)) {
                  var keyValue = value[key]
                  if (attributeConfig[key].formatter === 'date') {
                    keyValue = keyValue ? moment(keyValue).format('DD/MM/YYYY') : 'Present'
                  }
                  return (
                    <span className="UserData__article-txt-obj">
                      <span className="UserData__attr-name-obj">{attributeConfig[key].name} :</span>
                      <span className="UserData__attr-value-obj">{keyValue}</span>
                    </span>
                  )
                }
              })
              displayValue = displayValue.filter(function (element) {
                return element !== undefined;
              });
            }

            else if (Array.isArray(value) && checkName !== 'Adverse Finance Check') {
              displayValue = value.map((itm, idx) => {
                displayValue = Object.keys(value[idx]).map((key) => {
                  var keyValue = value[idx][key]
                  return (
                    <span key={key} className="UserData__article-txt-obj">
                      <span className="UserData__attr-name-obj">{attributeConfig[key].name} :</span>
                      <span className="UserData__attr-value-obj">{keyValue}</span>
                    </span>
                  )
                })
                return (
                  <span> {displayValue} <br /><br /></span>
                )
              })
            }

            else if (value && typeof(value) === "object") {

              displayValue = Object.keys(value).map((key) => {
                if (attributeConfig.hasOwnProperty(key)) {
                  var keyValue = value[key]
                  if (attributeConfig[key].formatter === 'date') {
                    keyValue = keyValue ? moment(keyValue).format('DD/MM/YYYY') : 'Present'
                  }
                  return (
                    <span className="UserData__article-txt-obj">
                      <span className="UserData__attr-name-obj">{attributeConfig[key].name} : </span>
                      <span className="UserData__attr-value-obj"> {keyValue}</span>
                    </span>
                  )
                }
              })
              displayValue = displayValue.filter(function (element) {
                return element !== undefined;
              });
            }
            else {
              displayValue = value
            }

            break

          default:
            break
        }
        if(checkName === 'tuberculosis_questionnaire' || checkName === 'Claim Dependents' || checkName === 'Other Adjustment'){
          if(tuberAttributeName[index])
          return [
            displayName,
            displayValue,
            tuberAttributeName[index]
          ]
        }
        return [
          displayName,
          displayValue
        ]
      })
  }

  let list = Array.isArray(data) ? data : [data]
  const attributeList = list.map(getAttributes)
  const displayAttributes = attributeList.map(attributes => {
    var ishighlight = false;
    if (checkName == 'Address History') {
      var country, d1, d2, months
      for (let j = 0; j < attributes.length; j++) {
        var name = attributes[j][0]
        var value = attributes[j][1]
        if (name == 'Country')
          country = value
        if (name == 'From') {
          //change date format
          let fromdate = moment(value,"DD/MM/YYYY").format("MM/DD/YYYY")
          d1 = (value !== null) ? new Date(fromdate) : new Date();
        }
        if (name == 'To') {
          let todate = moment(value,"DD/MM/YYYY").format("MM/DD/YYYY")
          d2 = (value !== null && value !== 'Present') ? new Date(todate) : new Date();
        }
      }
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth()
      months += d2.getMonth()
      ishighlight = (country !== 'United Kingdom' && months > 6) ? true : false;
    }
    return attributes.map(([name, value, attr], index) => {
      // force to be array to keep it clean
      if (!Array.isArray(value)) {
        value = [value]
      }
      if (checkName === 'Adverse Finance Check' && name === 'Addresses') {
        return (null)
      }
      else if (checkName.includes('Client Specific Documentation')) {
        return (
          <p key={name} className="UserData__article-txt">
            <span className="UserData__attr-name">
              <span className="wrapContent">{name}</span>
            </span>
            {value.map((v, i) => { return(<span>{i===0 ? <span key={i} className="UserData__attr-value">{v} </span>: null}</span>)     } )}
          </p>
        )
      }
      else {
        if (checkName.includes('Employment Reference') && name == 'Reason for Leaving' && value == 'Dismissal') {
          ishighlight = true
        }
        if ((checkName.includes('Employment Reference') || checkName.includes('Education Reference') || checkName.includes('Personal Reference')  || checkName.includes('Unemployment Reference') || checkName.includes('Employment Agency Reference') ) && name == 'Date To') {
          let today = new Date()
          today.setHours(0,0,0,0)
          let todate = moment(value,"DD/MM/YYYY").format("MM/DD/YYYY") 
          name = new Date(todate).getTime() ==  today.getTime() ? 'Present date' : 'Date To'
        }
        const tuberHeading = attr => {
          if(attr === 'skin_and_blood_test'){
            return <h4 className="check-attr">Tuberculosis skin and blood tests</h4>
          } else if(attr === 'chest_xray'){
            return <h4 className="check-attr">Chest X-Ray</h4>
          } else if(attr === 'employment_outside_country'){
            return <h4 className="check-attr">Employment outside of current country</h4>
          } else if(attr === 'tuberculosis_treatment'){
            return <h4 className="check-attr">Tuberculosis treatment</h4>
          } else if(attr === 'symptoms_unexplained_weight_loss'){
            return <h4 className="check-attr">Have you been experiencing any of the following symptoms:</h4>
          } else if(attr === 'other_income'){
            return <>
              <h4 className="check-attr">Other income</h4>
              <h4 >(not from jobs).</h4>
            </>
          } else if(attr === 'deductions'){
            return <h4 className="check-attr">Deductions</h4>
          } else if(attr === 'extra_withholding'){
            return <h4 className="check-attr">Extra Withholding</h4>
          } else if(attr === 'other_dependents'){
            return <span className="such_older">(such as an older child or a qualifying relative)</span>
          } else if(attr === 'children'){
            return <div>
              <p className="check-children">a) live with you for more than half the year</p>
              <p className="check-children">b) are under age 17 as of December 31</p>
              <p className="check-children">c) are your dependent</p>
              <p className="check-children">d) have the required social security number</p>
            </div>
          } else if(attr === 'Two Jobs (Higher Paying Job Amount)'){
            return <div className="check-attr">Use the multiple jobs calculator for roughly accurate withholding and then complete "Other | adjusments" tile</div>
          } 
        }
        return (
          <>
            <p key={name} className="UserData__article-txt">
              {checkName === 'tuberculosis_questionnaire' && tuberHeading(attr)}
              {checkName === 'Other Adjustment' && tuberHeading(attr)} 
              {checkName === 'Multiple Jobs or Spouse Works' && tuberHeading(name)}

              <span className="UserData__attr-name wpmt-10">
                <span className="wrapContent tuber-name">{name}</span>
              </span>
              {value.map((v, i) => {
                if(typeof(v) === 'boolean'){v = v.toString()}
                return <span key={i} className={classNames({'highlight':ishighlight, 'UserData__attr-value':true}) + ' wpmt-10'}>{v} </span>})}
            </p>
            {checkName === 'Claim Dependents' && tuberHeading(attr)}
          </>
        )
      }
    })
  })
  return (
    <article className={style} {...rest}>
      <h3 className="UserData__article-header">
        {checkName === 'Proof of National Insurance' ? 'National Insurance' :
          checkName === 'Zdeclaration Fairprocessing' ? <p>Statement of Fair Processing<span className="float-right">Accepted</span></p> :
            checkName === 'personal_info' || checkName.includes('Client Specific Documentation') || checkName === 'biometric_identity'
         || checkName === 'Directorship Checks' || checkName === "Administrator Uploads" || checkName === 'tuberculosis_questionnaire'  ? " " :
              checkName
        }
      </h3>

      {displayAttributes.map((attr, idx) => (
        <div key={idx}>
          {Array.isArray(data) && data.length > 1 &&
            <h4 className="UserData__attribute-item-id">
              {checkName === 'Addresses' || checkName === 'Address History' ? 'Address'
                : checkName === 'Insurance Details' ? attr.key
                  : checkName + ' ' + (idx + 1)}
            </h4>
          }
          {attr}
        </div>
      ))}
    </article>
  )
}

AttributeView.propTypes = {
  checkName: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

const typeNames = {
  right_to_work: 'Right To Work',
  dbs_identity: 'Identity',
  dbs: 'DBS',
  company: 'Company',
  driver_license_check: 'Driver License',
  adverse_finance_check: 'Adverse Finance',
  national_insurance_check: 'National Insurance',
  work_gaps: 'Employment Gaps',
  gpdr_declaration: 'GDPR Declaration',
  immigration_details: 'Immigration Details',
  umbrella_workers_declaration: 'Umbrella Company Details',
  umbrella_preferred_suppliers: 'Umbrella Company Details',
  umbrella_company: 'Umbrella Company Details',
  cifas_check: 'CIFAS',
  sanction_peps: 'Sanctions & PEPs',
  address_history: 'Address History',
  bank_details: 'Bank Details',
  health_pass_check: 'Health Pass Check',
  health_checker: 'Health Checker',
  employment_reference: 'Employment References',
  employment_verification: 'Employment Verification',
  education_verification: 'Education Verification',
  onboarding_declaration: 'Onboarding Declaration',
  tax_details: 'Tax Details',
  personal_info: 'Personal Information',
  client_specific_documentation: 'Client Documentation',
  biometric_identity: 'Biometric Identity',
  directorship_checks: 'Directorship checks',
  administrator_uploads: 'Officer/ Administrator Uploads',
  criminal_record_declaration: 'Criminal Record Declaration',
  candidate_uploads: 'Candidate Uploads',
  tuberculosis_questionnaire: 'Tuberculosis Questionnaire',
  employer_withholding_certificate: "Employee's Withholding Certificate (W-4)"
}

const withSide = [ 'right_to_work', 'dbs_identity' ]

class UserData extends Component {
  state = {}

  componentWillMount() {
    const { data, status } = this.props
    // dropdowns with data are open by default
    this.setState(() => ({ open: !!data.length || status === 'complete' }))
  }

  toggleDropdown = () => {
    this.setState(({ open }) => {
      return {
        open: !open
      }
    })
  }

  renderData() {
    const { data, status, type } = this.props
    
    if (!data.length) {
      if (status === 'complete' && type === 'work_gaps') {
        return <p className="UserData__article-txt-obj mt-3">
          No employment Gaps.
        </p>
      }
      if (status === 'complete' && type === 'driver_license_check') {
        return <p className="UserData__article-txt-obj mt-3">
          Do not have driver licence.
        </p>
      }
    }

    if (!data.length) {
      return <p className="UserData__noDataMsg">No data has been submitted yet.</p>
    }

    if (type === 'personal_info' && data !== [null] ) {
      let validationType = data[0].validation
      return data.map(({snapshot}, idx) => {
        if (snapshot === null) {
          return null
        } else {
          snapshot = [JSON.parse(snapshot)]
          if(validationType === 'NI'){
            delete snapshot[0].social_security_number
          } else {
            delete snapshot[0].national_insurance_number
          }
          return (<AttributeView
            key={"atr"}
            checkName="personal_info"
            data={snapshot}
            name = "personal_info"
            isLast={false}
          />)
        }
      })
    }
    else if(type == 'tuberculosis_questionnaire'){
      return data.map(({snapshot}, idx) => {
        snapshot = snapshot[0]
        if (snapshot === null) {
          return null
        } else {
          return (<AttributeView
            key={"atr"}
            checkName="tuberculosis_questionnaire"
            data={snapshot}
            name = "tuberculosis_questionnaire"
            isLast={false}
          />)
        }
      })
    }
    else if (type === 'biometric_identity') {
      return data.map((itm , idx) => {
        let status = ''
        if (itm.biometricstatus === 'declined') {
          status = 'Rejected'
        } else if (itm.biometricstatus === 'needs_review') {
          status = 'Awaiting'
        } else if(itm.biometricstatus === 'complete') {
          status = 'Verified'
        }
        itm['biometricstatus'] = status
        return (<AttributeView
          key={"atr1"}
          checkName="biometric_identity"
          data={itm}
          name = "biometric_identity"
          isLast={false}
        />)
      })
    } else if (type === 'criminal_record_declaration') {
      return(
        <AttributeView
          key={"atr"}
          checkName="Criminal Record Declaration"
          data={data[0].snapshot}
          isLast={false}
        />
      )
    } else if(type === 'dbs_identity') {
      let dataToDisplay = data.filter((item) => {return item.name.includes('_old') ? false : true})
      return dataToDisplay.map((itm , idx) => {
        if (itm.name !== "identity_uploads" && Array.isArray(itm.snapshot)) {
          return ( 
            <DocumentView
              key={idx}
              name={"dbs_identity"}
              images={itm.snapshot.map(s => s.url)}
              isLast={false}
            />)
        } else{
          return null
        }
      })
    }
    else if (type === 'right_to_work') {
      return data.map((itm , idx) => {
        if (itm.name !== "right_to_work_uploads" && Array.isArray(itm.snapshot)) {
          return (
            <DocumentView
              key={idx}
              name={"right_to_work"}
              images={itm.snapshot.map(s => s.url)}
              isLast={false}
            />)
        } else {
          return null
        }
      })
    } else if (type === 'candidate_uploads') {
      return data.map(({ id, snapshot, name } , idx) => {
        if (name !== 'candidate_data_uploads' && Array.isArray(snapshot)) {
          let displayName =getDisplayName(name, false, type).split(/(?=[0-9])/).join(" ")
          if(displayName === 'Ssn Card'){
            displayName = 'SSN Card'
          } else if(displayName === 'Us Birth Certificate'){
            displayName = 'U.S. Birth Certificate'
          } else if(displayName === 'Id Card'){
            displayName = 'ID Card'
          } else if(displayName === 'School Id Card'){
            displayName = 'School ID Card'
          }
          return (
            <AttributeView
              key={id + 'frmarr'}
              checkName={displayName}
              data={snapshot}
              type={name}
            />
          )
        } else {
          return null
        }
      })
    } else if (type === 'address_history') {
      let inputdata = data.filter((itm) => {return itm.name.includes('_old') ? false : true})

      return inputdata.map(({ id, snapshot, name }, idx) => {
        const isLast = idx === (data.length - 1)
        let displayName =getDisplayName(name, false, type).split(/(?=[0-9])/).join(" ")
        if(displayName === 'Ssn Card'){
          displayName = 'SSN Card'
        } else if(displayName === 'Us Birth Certificate'){
          displayName = 'U.S. Birth Certificate'
        } else if(displayName === 'Id Card'){
          displayName = 'ID Card'
        } else if(displayName === 'School Id Card'){
          displayName = 'School ID Card'
        }
        return(
          <AttributeView
            key={id + "atr"}
            checkName={displayName}
            data={snapshot.formArray}
            isLast={isLast}
          />
        )
      })
    } else if(type === 'employer_withholding_certificate'){
      let claim_dependents_id, multiple_jobs_id, other_adjustment_id, personal_information_id
      data.map((d, id) => {
        if(d.name === "personal_information_w4"){
          personal_information_id = id
        } else if(d.name === "multiple_jobs_w4"){
          multiple_jobs_id = id
          if(!d.snapshot[0].use_the_estimator_irs_app){
            d.snapshot[0] = {...d.snapshot[0], ...d.snapshot[0].multiple_jobs_calculator}
          }
        }else if(d.name === "other_adjustment_w4"){
          other_adjustment_id = id
        }else if(d.name === "claim_dependents_w4"){
          claim_dependents_id = id
        }
      })
      function reorder(arr, index, n) {
        const sortedArray=[]
        index.map(id => {
          sortedArray.push(arr[id])
        })
        return sortedArray
      }
      const idArray = [personal_information_id, multiple_jobs_id, claim_dependents_id, other_adjustment_id]
      let sortedArray = reorder(data, idArray)
      sortedArray = sortedArray.filter(Boolean)

      return sortedArray.map(({ id, name, type, snapshot }, idx) => {
        let displayName = getDisplayName(name, false, type).split(/(?=[0-9])/).join(" ")
        if(displayName === 'Claim Dependents W 4'){
          displayName = 'Claim Dependents'
        } else if(displayName === 'Multiple Jobs W 4'){
          displayName = 'Multiple Jobs or Spouse Works'
        } else if(displayName === 'Other Adjustment W 4'){
          displayName = 'Other Adjustment'
         }else if(displayName === 'Personal Information W 4'){
          displayName = 'Personal Information'
        }
        const isLast = idx === (data.length - 1)
        return (
          displayName === 'Multiple Jobs or Spouse Works' && !(data[personal_information_id].snapshot.hold_more_than_one_job || (data[personal_information_id].snapshot.married_filling_jointly && data[personal_information_id].snapshot.does_your_spouce_work)) ? null : 
          displayName === 'Claim Dependents' && !(data[personal_information_id].snapshot.my_total_income) ? null :
          <AttributeView
            key={id + 'frmarr'}
            checkName={displayName}
            data={snapshot}
            isLast={isLast}
            type={name}
          />
        )
      })
    } else {
      var empGapCount = 0
      return data.map(({ id, name, type, snapshot, updated_at }, idx) => {
        if (Array.isArray(snapshot) && snapshot.length > 0) {
          if (snapshot[0] === null) {
            return null
          }
        }
        if (isNull(snapshot)) {
          return null
        }
        if (name === 'bank_details' && Object.keys(snapshot).length === 0) {
          return <p className="UserData__article-txt-obj mt-3">
            Do not have a bank account.
          </p>
        }
        if (name === 'driver_license_check' && Object.keys(snapshot).length === 0) {
          return <p className="UserData__article-txt-obj mt-3">
            Do not have driver licence.
          </p>
        }
        if (name === 'employment_eligibility_identity' && Object.keys(snapshot).length === 0) {
          return null
        }
        if (name === 'employment_eligibility_documents') {
          return null
        }
        let displayName = getDisplayName(name, false, type).split(/(?=[0-9])/).join(" ")
        if(displayName === 'Ssn Card'){
          displayName = 'SSN Card'
        } else if(displayName === 'Us Birth Certificate'){
          displayName = 'U.S. Birth Certificate'
        } else if(displayName === 'Id Card'){
          displayName = 'ID Card'
        } else if(displayName === 'School Id Card'){
          displayName = 'School ID Card'
        }
        const isLast = idx === (data.length - 1)
        if (type === 'documents') {
          if (Object.keys(snapshot).includes('formArray')) {
            let x = []
            x.push(snapshot.formArray.url)
            if (name === 'national_insurance_check') {
              snapshot.formArray['nationalInsuranceNo'] = snapshot.nationalInsuranceNo
            }
            return (
              <div key={id + "div1"}>
                {(snapshot.formArray.url !== "" && snapshot.formArray.url !== undefined) ?
                  <DocumentView
                    key={id}
                    name={displayName}
                    images={x}
                    isLast={isLast}
                  />
                  : ''
                }
                <AttributeView
                  key={id + "atr"}
                  checkName={displayName}
                  data={snapshot.formArray}
                  isLast={isLast}
                />
              </div>
            )
          } else {
            if (Object.keys(snapshot).length > 0) {
              if (name.includes("work_gap") && snapshot[0].from) empGapCount++
              return (
                <div key={id + "div"}>
                  {(name.includes("work_gap") && snapshot[0].from) ?
                    <div>
                      {snapshot[0].uploadEvidence && snapshot[0].uploadEvidence !== "" ?
                        <div>
                          <AttributeView
                            key={id + "attr"}
                            checkName={`Work Gaps ${empGapCount}`}
                            name="Work Gaps Submit"
                            data={snapshot}
                            isLast={true}
                          />
                          <DocumentView
                            key={id + "doc"}
                            checkName="Work Gaps Submit - Evidence"
                            name="Evidence"
                            images={[snapshot[0].uploadEvidence.document.url]}
                            isLast={isLast}
                          />
                        </div>
                        : 
                        <AttributeView
                          key={id + "attr"}
                          checkName={`Work Gaps ${empGapCount}`}
                          name="Work Gaps Submit"
                          data={snapshot}
                          isLast={isLast}
                        />
                      }
                </div>
                : "" }
                  { !name.includes("work_gap") ?
                    <DocumentView
                      key={id}
                      name={displayName}
                      images={snapshot.map(s => s.url)}
                      isLast={isLast}
                    />
                  : "" }
                </div>
              )
            }
        else{
          return(
            <p className="UserData__article-txt-obj mt-3">
              No employment Gaps.
            </p>
          )
        }
      }
      }

      if (Object.keys(snapshot).includes('formArray')) {
        return (
          <AttributeView
            key={id}
            checkName={displayName}
            data={snapshot.formArray}
            isLast={isLast}
          />
        )
      }
      else {
        
        if(name === 'immigration_details'){
          return (
            <AttributeView
              key={id + 'immig'}
              checkName={displayName}
              data={snapshot.data[0].attribute_ids}
              isLast={isLast}
            />
          )
        }
        if(name === 'insurance_details'){
          return (
            <AttributeView
              key={id + 'comp'}
              checkName={displayName}
              data={snapshot}
              isLast={isLast}
            />
          )
        }
        
      if(name.includes('client_specific_documentation')){
        
         let date_submitted= moment(updated_at).format('DD/MM/YYYY')
         let time_submitted= moment(updated_at).format('hh:mm')
        let data1 = snapshot.data[0].attribute_ids
        let urlkey = snapshot.data[0].attribute_ids.doc_name
        let urlvalue = snapshot.data[0].attribute_ids.logoUrl
        let urlData = []
        urlData.push(urlkey)
        urlData.push(urlvalue)
        let data = {"document_name": urlData}
        data.date_submitted= date_submitted;
        data.time_submitted= time_submitted;
        Object.assign(data, data1)
          return (
            <AttributeView
              key={id + 'doc'}
              checkName={displayName}
              data={data}
              isLast={isLast}
            />
          )
        }
        
      if(name === 'health_pass_check'){
         return null
      }
      if(name === 'health_checker') {
        return null
      }
      if(name === 'directorship_checks' || (name === 'administrator_uploads' && data[0].snapshot.length > 0)){
        let imgUrl = data[0].snapshot[0].data.Imageurl
        if (imgUrl) {
          let imgdata ={"directorship_docs" : imgUrl}
          return (
            <AttributeView
              key={id + 'doc'}
              checkName={displayName}
              data={imgdata}
              isLast={isLast}
            />
          )
        } else {
          return null
        }
     }

    if(name === 'personal'){
      let imgdata = {}
      let document_image = []
      if(Array.isArray(snapshot.other_names)){
        snapshot.other_names.map((itm,idx)=>{
          if(itm.document_images !== undefined && itm.document_images !== null){
            if(itm.document_images.length > 0){
              itm.document_images.map((img,i) => {
                document_image.push(itm.document_images[i])
              })
            }
            else{
              return null
            }
          }
        })
      }
        imgdata['document_images'] = document_image
      Object.assign(snapshot, imgdata)
      return(
        <AttributeView
                key={id + 'doc'}
                checkName={displayName}
                data={snapshot}
                isLast={isLast}
              />
            )
          }
		if(name === 'umbrella_workers_declaration'){
          let data1  = snapshot.data[0].attribute_ids.umbrellaOrganisationDetails
          let data = {'companyName': snapshot.data[0].attribute_ids.name}
          Object.assign(data, data1)
          return (
            <AttributeView
              key={id + 'immig'}
              checkName={displayName}
              data={data}
              isLast={isLast}
            />
          )
        }
        if(name === 'umbrella_preferred_suppliers'){
          let data1  = snapshot.data[0].attribute_ids
          let data = {'companyName': snapshot.data[0].attribute_ids.umbrellaOrganisationDetails.name}
          Object.assign(data, data1)
          return (
            <AttributeView
              key={id + 'immig'}
              checkName={displayName}
              data={data}
              isLast={isLast}
            />
          )
        }
        if(name.includes('employment_reference') || name.includes('personal_reference') || name.includes('employment_agency_reference')
        || name.includes('education_reference') || name.includes('unemployment_reference')){
            return (
              <AttributeView
                key={id + 'Refmarr'}
                checkName={displayName}
                data={snapshot}
                isLast={isLast}
              />
            )        
        }
        return (
          <AttributeView
            key={id + 'frmarr'}
            checkName={displayName}
            data={snapshot}
            isLast={isLast}
            type={name}
          />
        )
      }

    })
  }
  }

  render() {
    const { type, side, className, data, status } = this.props

    return (
      <section className={`UserData ${className}`}>
        <h2 className="UserData__main-header">
          {typeNames[type]}
          {withSide.includes(type) && ` – ${capitalize(side)}`}

          <button className={classNames('UserData__expand', { noData: !data.length && status !== 'complete' })} onClick={this.toggleDropdown}>

            {
              data.length || status === 'complete' ?
                this.state.open
                  ? 'Close'
                  : 'View'
                :
                'No Data Submitted'
            }
          </button>
        </h2>

        {this.state.open && this.renderData()}
      </section>
    )
  }
}

UserData.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  side: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

UserData.defaultProps = {
  className: ''
}

export default UserData
