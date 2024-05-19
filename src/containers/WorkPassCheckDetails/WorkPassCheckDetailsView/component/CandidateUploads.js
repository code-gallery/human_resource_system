import React from 'react';
import UploadDocumentModal from './UploadDocumentModal/UploadDocumentModal.js';
import ViewDocumentModal from './ViewDocumentModal/ViewDocumentModal.js';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';
import LinkedButton from 'components/LinkedButton';
import Button from "components/Button";

function CandidateUploads(props) {
  const docnum = props.doc_images ? props.doc_images.length : 0
  const idx = 1;
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-12 col-sm-12 card-row">
          <div className="card mb-3">
            <div className="card-header-gray">
              <div className="col-md-6 checkTitle">Candidate Uploads</div>
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
              <div className="row ">
                <div className="col-md-3">
                  <Button
                    color="white"
                    className="doc-button"
                    onClick={() => props.openDocumentUploadModal(idx) }
                    disabled={!props.isEditable}
                  >
                    Upload Documents
                  </Button>
                  <br />
                  <Button
                    color="white"
                    className="doc-button relative-box"
                    onClick={() => props.openDocumentViewModal(idx) }
                  >
                    View Documents
                    <span className="button__badge">{docnum}</span>
                  </Button>
                </div>
                <div className="col-md-9"></div>
                {props.documentModalIsOpen &&
                  <UploadDocumentModal
                    type={props.type}
                    checkId={props.checkId}
                    handleCloseModal={props.openDocumentUploadModal}
                    addDocuments={props.addDocuments}
                    isOpen={props.documentModalIsOpen}
                  />
                }
                {props.viewDocumentModalIsOpen &&
                  <ViewDocumentModal
                    handleCloseModal={props.openDocumentViewModal}
                    isOpen={props.viewDocumentModalIsOpen}
                    viewUploadedDocuments={props.viewUploadedDocuments}
                    type={props.type}
                    checkId={props.checkId}
                    uploaded_documents={props.uploaded_documents}
                    idx={idx}
                    deleteDocuments={props.deleteDocuments}
                    isEditable={props.isEditable}
                  />
                }
              </div>
              <AnnotationComponent
                annotationSubmit={props.annotationSubmit}
                checkId={props.checkId}
                type={props.type}
                annotationFetch={props.annotationFetch}
                annotationData={props.annotationData}
                complaince_response={props.complaince_response}
                notes={props.notes}
                side={props.side}
                isEditable={props.isEditable}
              />
              <NotesHistory
                notesHistory={props.annotationData.check_data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateUploads
