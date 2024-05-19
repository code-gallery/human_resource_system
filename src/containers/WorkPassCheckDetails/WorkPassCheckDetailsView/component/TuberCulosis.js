import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';

function TuberCulosis(props) {
    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-12 col-sm-12 card-row">
                    <div className="card mb-3">
                        <div className="card-header-gray">
                            <div className="col-md-6 ">Tuberculosis Questionnaire</div>
                        </div>
                        
                        <div className="card-body">
                            <div className="mt-2">DETAILS</div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h4 className="tuber">Tuberculosis skin and blood tests</h4>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-md-12">Have you recently had a skin (Mantoux / PPD) or blood (IGRA) test to identify whether you may have latent tuberculosis?   <span className="first-caps dib"><strong>{props.data1 ? props.data1[0].snapshot[0].skin_and_blood_test+'' : ''}</strong></span>
                                </div>
                            </div>
                            <div className="row mt-3 mb-10">
                                <div className="col-md-4 pl-3"><span className="ml-25">Date of test:</span></div>
                                <div className="col-md-8 pl-3  first-caps">
                                        {props.data1[0]?.snapshot[0].date_of_skin_and_blood_test ? props.data1[0].snapshot[0].date_of_skin_and_blood_test+'' : ''}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4"><span className="ml-25">Result:</span></div>
                                <div className="col-md-8  first-caps">
                                        {props.data1[0]?.snapshot[0].result_skin_and_blood_test ? props.data1[0].snapshot[0].result_skin_and_blood_test+'' : ''}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="tuber">Chest X-Ray</h4>
                                </div>
                            </div>
                            <div className="row mb-10">
                                <div className="col-md-6">Have you had a chest x-ray? 
                                    <span className="pl-8 first-caps dib">
                                        <strong>
                                            {props.data1[0] ? props.data1[0].snapshot[0].chest_xray+'' : ''}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-10">
                                <div className="col-md-4"><span className="ml-25">Date of x-ray:</span></div>
                                <div className="col-md-8 first-caps">
                                        {props.data1[0]?.snapshot[0].date_of_xray_test ? props.data1[0].snapshot[0].date_of_xray_test+'' : ''}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4"><span className="ml-25">Result:</span></div>
                                <div className="col-md-8 first-caps">
                                        {props.data1[0]?.snapshot[0].result_xray_test ? props.data1[0].snapshot[0].result_xray_test+'' : ''}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="tuber">Employment outside of current country</h4>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">Worked outside of your current country of employment for a period {'>'} 3 months?
                                    <span className="pl-8 first-caps dib">
                                        <strong>
                                            {props.data1[0] ? props.data1[0].snapshot[0].employment_outside_country+'' : ''}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">Please provide further details</div>
                                <div className="col-md-8 first-caps">
                                        {props.data1[0]?.snapshot[0].employment_outside_country_description ? props.data1[0].snapshot[0].employment_outside_country_description+'' : ''}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="tuber">Tuberculosis treatment</h4>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">Have you ever taken isoniazid (INH), rifampin (RIF), ethambutol (EMB) or pyrazinamide (PZA) in treating tuberculosis?
                                    <span className="pl-8 first-caps dib">
                                        <strong>
                                            {props.data1[0] ? props.data1[0].snapshot[0].tuberculosis_treatment+'' : ''}
                                        </strong>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-10"><span class="ml-25">Date Taken:</span></div>
                                <div className="col-md-8  first-caps">
                                        {props.data1[0]?.snapshot[0].date_tuberculosis_treatment ? props.data1[0].snapshot[0].date_tuberculosis_treatment+'' : ''}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4"><span class="ml-25">Length of treatment:</span></div>
                                <div className="col-md-8  first-caps">
                                        {props.data1[0]?.snapshot[0].length_tuberculosis_treatment ? props.data1[0].snapshot[0].length_tuberculosis_treatment+'' : ''}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="tuber">Have you been experiencing any of the following symptoms?</h4>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">Unexplained Weight Loss</div>
                                <div className="col-md-8  first-caps">
                                        {props.data1[0] ? props.data1[0].snapshot[0].symptoms_unexplained_weight_loss+'' : ''}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">Anorexia (loss of appetite)</div>
                                <div className="col-md-8  first-caps">
                                     {props.data1[0] ? props.data1[0].snapshot[0].symptoms_enorexia_loss_of_appetite+'' : ''}
                                </div>
                            </div><div className="row mb-3">
                                <div className="col-md-4">Fever (typically at night)</div>
                                <div className="col-md-8  first-caps">
                                         {props.data1[0] ? props.data1[0].snapshot[0].symptoms_fever_typically_at_night+'' : ''}
                                </div>
                            </div><div className="row mb-3">
                                <div className="col-md-4">Night Sweats (drenching)</div>
                                <div className="col-md-8  first-caps">
                                     {props.data1[0] ? props.data1[0].snapshot[0].symptoms_night_sweats_drenching+'' : ''}
                                </div>
                            </div><div className="row mb-3">
                                <div className="col-md-4">Cough ({'>'} 2 Weeks)</div>
                                <div className="col-md-8  first-caps">
                                    {props.data1[0] ? props.data1[0].snapshot[0].symptoms_cough_morethan_2_weeks+'' : ''}
                                </div>
                            </div><div className="row mb-3">
                                <div className="col-md-4">Production of Sputum</div>
                                <div className="col-md-8  first-caps">
                                    {props.data1[0] ? props.data1[0].snapshot[0].symptoms_production_of_sputum+'' : ''}
                                </div>
                            </div><div className="row mb-3">
                                <div className="col-md-4">Fatigue/Tiredness</div>
                                <div className="col-md-8  first-caps">
                                    {props.data1[0] ? props.data1[0].snapshot[0].symptoms_fatigue_tiredness+'' : ''}
                                </div>
                            </div><div className="row mb-3">
                                <div className="col-md-4">Sortness of Breath</div>
                                <div className="col-md-8  first-caps">
                                     {props.data1[0] ? props.data1[0].snapshot[0].symptoms_sortness_of_breath+'' : ''}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">If yes to any of the symptoms, please specify the symptom and a brief explanation</div>
                                <div className="col-md-8  first-caps">
                                     {props.data1[0] ? props.data1[0].snapshot[0].symptoms_description+'' : ''}
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
                                isEditable={props.isEditable}
                            ></AnnotationComponent>
                            <NotesHistory
                                notesHistory={props.annotationData.check_data}
                            ></NotesHistory>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TuberCulosis;