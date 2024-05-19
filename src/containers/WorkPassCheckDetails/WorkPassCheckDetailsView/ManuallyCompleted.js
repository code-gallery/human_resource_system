import React from 'react';
import AnnotationComponent from './component/AnnotationComponent/AnnotationComponent';
import NotesHistory from './component/NotesHistory/NotesHistory';

function ManuallyCompleted(props) {
    const { type,isEditable } = props
    const typeNames = {
        right_to_work: "Right To Work",
        dbs_identity: "Identity",
        dbs: "Disclosure Scotland - Basic",
        company: "Company & VAT",
        sanction_peps: "Sanctions & PEPs",
        health_pass_check: "Health Pass Check",
        gpdr_declaration: "GDPR Consent",
        immigration_details: "Immigration Details",
        umbrella_workers_declaration: "Umbrella Company Details",
        umbrella_preferred_suppliers: "Umbrella Company Details",
        client_specific_documentation: "Client Specific Documentation",
        cifas_check: "CIFAS Checks",
        national_insurance_check: "National Insurance Number",
        uk_healthcare_professional_registers: "UK Healthcare Professional Registers",
        adverse_finance_check: "Adverse Finance Check",
        adverse_media_checks: "Adverse Media",
        driver_license_check: "Driving Licence",
        bank_details: "Bank Details",
        address_history: "Address History",
        proof_of_address_capture: "Proof Of Address Capture",
        work_gaps: "Employment Gaps",
        employment_reference: "Employment References",
        education_verification: "Education Verification",
        employment_verification: "Employment Verification",
        tax_details: "Tax Details",
        candidate_uploads: "Candidate Uploads",
        health_checker: "Health Checker",
        biometric_identity: "Biometric Identity",
        directorship_checks: 'Directorship checks',
        criminal_record_declaration: 'Criminal Record Declaration',
        administrator_uploads: 'Officer/ Admin Uploads',
        employment_eligibility_verification: 'Employment Eligibility Verification',
        tuberculosis_questionnaire: 'Tuberculosis Questionnaire',
        employer_withholding_certificate: 'Employer\'s Withholding Certificate (W-4)'
    };

    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-12 col-sm-12 card-row">
                    <div className="card mb-3">
                        <div className="card-header-gray">
                            <div className="col-md-6 checkTitle">
                                {typeNames[type]}
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-md-12 noPadding">
                                    <div className="col-md-12 col-sm-12">
                                        <h4>No Data Submitted</h4>
                                    </div>
                                </div>
                            </div>
                            <AnnotationComponent
                                annotationSubmit={props.annotationSubmit}
                                checkId={props.checkId}
                                type={props.type}
                                annotationFetch={props.annotationFetch}
                                annotationData={props.annotationData}
                                complaince_response={props.complaince_response}
                                notes={props.notes}
                                userID={props.userID}
                                annotationReset={props.annotationReset}
                                check_status={props.check_status}
                                side={props.side}
                                requestId={props.requestId}
                                resetSuccess={props.resetSuccess}
                                orgId={props.orgId}
                                isEditable={isEditable}
                            />
                            <NotesHistory
                                notesHistory={props.annotationData.check_data}
                            ></NotesHistory>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManuallyCompleted;
