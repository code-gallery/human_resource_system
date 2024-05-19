import React from 'react';
import LinkedButton from 'components/LinkedButton';
import AnnotationComponent from './AnnotationComponent/AnnotationComponent.js';
import NotesHistory from './NotesHistory/NotesHistory.js';

function AdverseMedia(props) {
  const advData = props.adverse_media_data
  var results = []
  if (advData && advData.length) {
    if (advData[0] && typeof advData[0].GBG_response !== 'undefined') {
      var data = advData[0].GBG_response.AuthenticateSPResult.ResultCodes.GlobalItemCheckResultCodes.SanctionsMatches
      if (data.hasOwnProperty('GlobalSanctionsMatch')) {
        const output = data.GlobalSanctionsMatch
        if (Array.isArray(output)) {
          results = output
        } else {
          results[0] = output
        }
      }
    }
  }
  var classname = results.length ? 'card-header-red' : 'card-header-green'
  var status = results.length ? 'Match' : 'Clear'
  var btnColor = results.length ? 'red' : 'green'
  var title = results.length ? 'MATCHES' : ''
  return (
    <div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-12 col-sm-12 card-row">
            <div className="card mb-3">
              <div className={classname}>
                <div className="col-md-6 checkTitle">Adverse Media</div>
                <div className="col-md-6 noPadding">
                  <LinkedButton
                    className="border-btn checkButton"
                    to="#"
                    color={btnColor}
                  >
                    {status}
                  </LinkedButton>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">{title}</div>
                </div>
                {
                  results.length ?
                    results.map((data, idx) => {
                      return (
                        <div className="row margin20" key={idx}>
                          <div className="col-md-3">URL</div>
                          <div className="col-md-9">
                            <a href={data.Url._text} target="_blank" rel="noopener noreferrer">{data.Url._text}</a>
                          </div>
                          <hr className="refseparator"></hr>
                        </div>
                      )
                    })
                    :
                    <div className="row margin20">
                      <div className="col-md-3">NO RECORDS FOUND</div>
                      <hr className="refseparator"></hr>
                    </div>
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
    </div>
  )
}

export default AdverseMedia;