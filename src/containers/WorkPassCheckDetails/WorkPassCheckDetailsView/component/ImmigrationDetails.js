import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';

function ImmigrationDetails(props) {
    
    return (
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12 col-sm-12 card-row">
            <div className="card mb-3">
              <div className="card-header-gray">
                <div className="col-md-6 checkTitle">Immigration Details</div>
                <div className="col-md-6 noPadding">
                  <LinkedButton
                    className="border-btn checkButton"
                    to="#"
                    color="blue"
                  >
                    Complete
                  </LinkedButton>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-6"><strong>DETAILS</strong></div>
                    <div className="col-md-6">
                    <strong>CANDIDATE RESPONSE</strong>
                    </div>
                </div>

                {(props.data1?.data[0].attribute_ids[0].birth_nationality !== null && props.data1?.data[0].attribute_ids[0].birth_nationality !== "" && props.data1?.data[0].attribute_ids[0].birth_nationality !== undefined) ?
                <div className="row mb-3">
                    <div className="col-md-6">Birth Nationality</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].birth_nationality + ''}
                        </strong>
                    </div>
                </div>
                : ''
                }

                {(props.data1?.data[0].attribute_ids[0].other_nationality !== null && props.data1?.data[0].attribute_ids[0].other_nationality !== "" && props.data1?.data[0].attribute_ids[0].other_nationality !== undefined) ?
                <div className="row mb-3">
                    <div className="col-md-6">Other Nationality</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].other_nationality + ''}
                        </strong>
                    </div>
                </div>
                : ''
                 }

               {(props.data1?.data[0].attribute_ids[0].immigration_control_switcher !== null && props.data1?.data[0].attribute_ids[0].immigration_control_switcher !== "" && props.data1?.data[0].attribute_ids[0].immigration_control_switcher !== undefined) ?
                <div className="row mb-3">
                    <div className="col-md-6">Are you subject to immigration control?</div>
                    <div className="col-md-6 first-caps">
                        <strong> 
                            {props.data1?.data[0].attribute_ids[0].immigration_control_switcher + ''}
                        </strong>
                    </div>
                </div>
                 : ''
                }

                {(props.data1?.data[0].attribute_ids[0].immigration_control_description !== null && props.data1?.data[0].attribute_ids[0].immigration_control_description !== "" && props.data1?.data[0].attribute_ids[0].immigration_control_description !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Immigration Control Description</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].immigration_control_description + ''}
                        </strong>
                    </div>
                </div>
                    : ''
                }

                {(props.data1?.data[0].attribute_ids[0].lawful_resident_switcher !== null && props.data1?.data[0].attribute_ids[0].lawful_resident_switcher !== "" && props.data1?.data[0].attribute_ids[0].lawful_resident_switcher !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Your Residence in the U.K. is unlawful?</div>
                    <div className="col-md-6  first-caps">
                        <strong>        
                            {props.data1?.data[0].attribute_ids[0].lawful_resident_switcher + ''}
                        </strong>
                    </div>
                </div>
                    : ''
                }

                {(props.data1?.data[0].attribute_ids[0].lawful_resident_description !== null && props.data1?.data[0].attribute_ids[0].lawful_resident_description !== "" && props.data1?.data[0].attribute_ids[0].lawful_resident_description !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Lawful Resident Description</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].lawful_resident_description + ''}
                        </strong>
                    </div>
                </div>
                : ''
                }

                {(props.data1?.data[0].attribute_ids[0].restrictions_employment_switcher !== null && props.data1?.data[0].attribute_ids[0].restrictions_employment_switcher !== "" && props.data1?.data[0].attribute_ids[0].restrictions_employment_switcher !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Are there any restrictions on your continued residence in the U.K.?</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].restrictions_resident_switcher + ''}
                        </strong>
                    </div>
                </div>
                    : ''
                }

                {(props.data1?.data[0].attribute_ids[0].restrictions_resident_description !== null && props.data1?.data[0].attribute_ids[0].restrictions_resident_description !== "" && props.data1?.data[0].attribute_ids[0].restrictions_resident_description !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Restrictions Resident Description</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].restrictions_resident_description + ''}
                        </strong>
                    </div>
                </div>
                : ''
                }

                {(props.data1?.data[0].attribute_ids[0].restrictions_resident_switcher !== null && props.data1?.data[0].attribute_ids[0].restrictions_resident_switcher !== "" && props.data1?.data[0].attribute_ids[0].restrictions_resident_switcher !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Are there any restrictions on your continued freedom to take employment in the U.K.?</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].restrictions_employment_switcher + ''}
                        </strong>
                    </div>
                </div>
                : ''
                }

                {(props.data1?.data[0].attribute_ids[0].restrictions_employment_description !== null && props.data1?.data[0].attribute_ids[0].restrictions_employment_description !== "" && props.data1?.data[0].attribute_ids[0].restrictions_employment_description !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Restrictions Employment Description</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].restrictions_employment_description + ''}
                        </strong>
                    </div>
                </div>
                : ''
                }

                {(props.data1?.data[0].attribute_ids[0].port_ref_number !== null && props.data1?.data[0].attribute_ids[0].port_ref_number !== "" && props.data1?.data[0].attribute_ids[0].port_ref_number !== undefined) ? 
                <div className="row mb-3">
                    <div className="col-md-6">Home Office or port reference number, and your ARC reference</div>
                    <div className="col-md-6  first-caps">
                        <strong>
                            {props.data1?.data[0].attribute_ids[0].port_ref_number + ''}
                        </strong>
                    </div>
                </div>
                : ''
                }
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

export default ImmigrationDetails;