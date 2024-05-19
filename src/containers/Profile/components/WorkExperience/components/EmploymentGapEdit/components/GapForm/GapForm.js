import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import _isNil from 'lodash/isNil'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
import BaseForm from 'containers/Profile/components/AwardList/components/AwardItemEdit/components/Forms/BaseForm'
import { Document, Page, pdfjs } from 'react-pdf';
import "../style.css"
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class GapForm extends BaseForm {
  constructor(props) {
    super(props);
    this.state = {type: "", 
    numPages: 0,
    pageNumber: 1
  }
  }

  
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  componentWillMount() {
    this.reader = new FileReader()
    this.reader.addEventListener('load', this.onFileLoad)
  }

  componentWillUnmount() {
    this.reader.removeEventListener('load', this.onFileLoad)
  }


  onFileLoad = () => {
    this.props.onFieldChange('description', this.reader.result)
  
  }
  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  changePage = offset => this.setState(prevState => ({
    pageNumber: (prevState.pageNumber || 1) + offset,
  }));

  handleFileChange = (event) => {
    const file = event.target.files[0]
    this.setState({type: file.type })
    if (file) {
      this.reader.readAsDataURL(file)
    }
  }

  render() {
    const {
      position,
      start_date,
      end_date,
      industry,
      reason,
      gapsReasons,
      invalidFields,
      invalidDates,
      invalidMessage,
      description,
      employment_type
    } = this.props
   
   const checkExt = (description && description.indexOf('https://') !== -1) ?
   description.split('.').pop() : null
   const { pageNumber, numPages, type } = this.state;
    return (
      <div>
         <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label className={renderValidation(invalidFields, 'employment_type')}>Employment Type</label>
              
              <Select
                name="select-content"
                options={[
                  {
                    value: 'employment_gap',
                    label: 'Employment Gap'
                  }
                ]}
                value={employment_type}
                onChange={v => this.handleChange(v ? v.value : '', 'employment_type')}
              />
            </div>
          </div>
        </div>
        <div className="row">
          
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label className={renderValidation(invalidFields, 'industry')}>Reason</label>
              <Select
                name="select-content"
                options={gapsReasons}
                labelKey="text"
                valueKey="text"
                value={{ text: industry || '' }}
                onChange={v => this.handleChange(v ? v.text : '', 'industry')}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                handleDate={this.handleChange}
                invalid={invalidFields.indexOf('start_date') !== -1}
                date={start_date}
                title="start_date"
                label="Start Date"
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                handleDate={this.handleChange}
                invalid={invalidFields.indexOf('end_date') !== -1}
                date={end_date}
                title="end_date"
                label="End Date"
                endDate
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label>&nbsp;</label>
              <div className="btn-custom-file-upload">
                <label>
                  <input
                    type="file"
                    onChange={this.handleFileChange}
                    accept="application/pdf, image/jpeg"
                  />
                  <span>Upload supporting evidence (Optional)</span>
                </label>
              </div>
            </div>
          </div>
          </div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            
          {(description && type==='application/pdf' || checkExt==='pdf') ?(
            <div className='Test__container__content'>
              
              <Document file={description} 
              onLoadSuccess={this.onDocumentLoadSuccess} 
              className="custom-document-view"
              >
                <div className="Test__container__content__document"><Page pageNumber={pageNumber} /></div>
                <div className="Test__container__content__controls">
                  <button
                    disabled={pageNumber <= 1}
                    className={`prev-btn pull-left tooltip-position-top tooltip-movable tooltip-danger`}
                    onClick={this.previousPage}
                    data-tooltip="Previous Page"
                    type="button"
                  >
                     &nbsp;
                  </button>
                  <span>
                    {`Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`}
                  </span>
                  <button
                    disabled={pageNumber >= numPages}
                    className={`next-btn pull-right tooltip-position-top tooltip-movable tooltip-danger`}
                    onClick={this.nextPage}
                    data-tooltip="Next Page"
                    type="button"
                  >
                      &nbsp;
                  </button>
                </div>
              </Document>
          
            
          </div>
          ):""}
           {(description && type==='image/jpeg' || checkExt==='jpg') ? (
              
            <div className="Test__container__content"><img src={description} alt="Evidence" /></div>
          ): ""}
        </div>
        </div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'position')}>Details</label>
          <textarea rows="4" cols="50" name="position" value={position || ''} onChange={v => this.onTextChange('position', v)} />
        </div>
        {invalidDates && (<div className="required-error">{invalidMessage}</div>)}
      </div>
    )
  }
}

GapForm.propTypes = {
  
  position: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  industry: PropTypes.string,
  gapsReasons: PropTypes.array,
  invalidFields: PropTypes.array,
  invalidDates: PropTypes.bool,
  invalidMessage: PropTypes.string,
  employment_type: PropTypes.string
}
