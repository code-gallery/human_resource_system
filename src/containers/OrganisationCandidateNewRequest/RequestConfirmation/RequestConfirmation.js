import React from 'react'
import PropTypes from 'prop-types'
import prettyPrice from 'utils/prettyPrice'
import RequestModalHeader from 'components/RequestModalHeader'
import { Table, TableHeading, TableData } from 'components/Table'
import './style.css'

/** :: Object -> string */
const getCheckName = ({ type, options }) => {
  if (type === 'right_to_work') {
    return 'Right To Work Check'
  }

  if (type === 'dbs') {
    if (options.enhanced) {
      return 'Enhanced DBS Check'
    }

    if (options.basic) {
      return 'Basic DBS Check'
    }

    return 'DBS Check'
  }

   if (type === 'health_pass_check') {
    return 'Health Pass Check'
  }

  if (type === 'company') {
    return 'Company & VAT Check'
  }
   if (type === 'sanction_peps') {
    return 'Sanction and PEPs'
  }
    if (type === 'gpdr_declaration') {
    return 'Impellam GDPR Declaration'
  }
  if (type === 'directorship_checks') {
    return 'Directorship checks'
  }
  if (type === 'immigration_details') {
    return 'Immigration Details'
  }

  if (type === 'umbrella_workers_declaration') {
    return 'Umbrella Company Details'
  }

  if (type === 'umbrella_preferred_suppliers') {
    return 'Umbrella Company Details'
  }

  if (type === 'cifas_check') {
    return 'CIFAS Check'
  }
  if (type === 'criminal_record_declaration') {
    return 'Criminal Record Declaration'
  }

  if (type === 'adverse_finance_check') {
    return 'Adverse Finance Check'
  }
  if (type === 'driver_license_check') {
    return 'Driver License Check'
  }

  if (type === 'bank_details') {
    return 'Bank Details'
  }

  if (type === 'address_history') {
    return 'Address History'
  }

  if (type === 'proof_of_address_capture') {
    return 'Proof Of Address Capture'
  }
  if (type === 'national_insurance_check') {
    return 'National Insurance Check'
  }
  if (type === 'work_gaps') {
    return 'Employment Gaps'
  }
  if (type === 'employment_reference') {
    return 'Employment References'
  }
  if (type === 'education_verification') {
    return 'Education Verification'
  }
  if (type === 'employment_verification') {
    return 'Employment Verification'
  }
  if (type === 'tax_details') {
    return 'Tax Details'
  }
  if (type === 'candidate_uploads') {
    return 'Candidate Uploads'
  }
  if (type === 'health_checker') {
    return 'Health Checker'
  }
  if (type === 'biometric_identity') {
    return 'Biometric Identity'
  }

  if (type === 'client_specific_documentation') {
    return 'Client Specific Documentation'
  }
  if (type === 'employment_status') {
    return 'Employment Status'
  }
  if (type === 'cv_capture') {
    return 'CV capture'
  }
  if (type === 'uk_healthcare_professional_registers') {
    return 'UK Healthcare Professional Registers'
  }
  if (type === 'student_loans_details') {
    return 'Student Loan'
  }
  if (type === 'criminal_record_check') {
    return 'Criminal record check'
  }
  if (type === 'dfe_teaching_regulations_agency_check') {
    return 'DFE Teaching Regulations Agency'
  }

  if (type === 'adverse_media_checks') {
    return 'Adverse Media Checks'
  }
  if (type === 'biometric_identity') {
    return 'Biometric Identity'
  }
  if (type === 'employment_eligibility_verification') {
    return 'Employment Eligibility Verification'
  }
  if (type === 'tuberculosis_questionnaire') {
    return 'Tuberculosis Questionnaire'
  }
  if (type === 'employer_withholding_certificate') {
    return 'Employer\'s Withholding Certificate (W-4)'
  }
}


const RequestConfirmation = ({
  organisationImage,
  profileImage,
  role,
  date,
  country,
  region,
  id,
  checks
}) => {
  const totalPrice = checks.reduce((acc, check) => acc + check.price, 0)
  const prettyTotalPrice = prettyPrice(totalPrice)

  return (
    <section className="RequestConfirmation">
      <RequestModalHeader
        className="RequestConfirmation__header"
        organisationAvatar={organisationImage}
        userAvatar={profileImage}
        title="Request Sent"
        position={role}
        date={date.format('DD/MM/YY')}
        location={`${country} – ${region}`}
        id={`#${id}`}
      />

      <Table>
        <thead>
          <tr>
            <TableHeading>Name</TableHeading>
            <TableHeading>ID</TableHeading>
            <TableHeading>Cost</TableHeading>
          </tr>
        </thead>

        <tbody>
          {
            checks.map((check) => (
              <tr key={check.id}>
                <TableData>
                  {getCheckName(check)}
                </TableData>
                <TableData className="RequestConfirmation__table">
                  {check.id}
                </TableData>
                <TableData className="RequestConfirmation__table">
                  {prettyPrice(check.price)}
                </TableData>
              </tr>
            ))
          }

          <tr>
            <TableData className="Button__header">

              {/* <Button
               className="CandidateNewRequestsHeader__btn table__btn"
               color="red"
               to='#'>Close
                </Button>
              <Button
                className="CandidateNewRequestsHeader__btn table__btn"
                color="green"
                to='#' >Send Request
              </Button> */}
              </TableData>
            <TableData className="RequestConfirmation__total">Total</TableData>
            <TableData>{prettyTotalPrice}</TableData>
          </tr>
        </tbody>
      </Table>
    </section>
  )
}

RequestConfirmation.propTypes = {
  organisationImage: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  checks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
  })).isRequired
}

export default RequestConfirmation
