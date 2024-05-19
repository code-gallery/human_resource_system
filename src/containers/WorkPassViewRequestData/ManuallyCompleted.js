import React from 'react';

function ManuallyCompleted(props) {
    const { type } = props

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

    return (
        <div className="container-fluid UserData">
            <div className="row ">
                <div className="col-md-12 col-sm-12 card-row">
                    <div className="card mb-3">
                        <div className="card-header-gray">
                            <div className="col-md-6 ">{typeNames[type]}</div>
                        </div>
                        <div className="card-body">
                            <h4 className="mt-2">No Data Submitted</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManuallyCompleted;
