import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { renderValidation } from 'containers/Profile/utils/validation'
import CustomDatePicker from 'components/FormElements/DatePicker'
// import PDFReader from 'components/FormElements/PDFReader'

class UniForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      degreeSelected: ''
    }
  }

  componentWillMount() {
    this.reader = new FileReader()
    this.reader.addEventListener('load', this.onFileLoad)
  }

  componentWillUnmount() {
    this.reader.removeEventListener('load', this.onFileLoad)
  }

  handleChange = (value, title) => {
    this.props.onFieldChange(title, value)
  }

  onTextChange = (title, event) => {
    this.props.onFieldChange(title, event.target.value)
  }

  filterAwards = (type) => {
    if (type) {
      return this.props.awards.filter((item) => {
        return item.value1 === type
      })
    }
    return this.props.awards
  }

  onFileLoad = () => {
    this.props.onFieldChange('transcript', this.reader.result)
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      this.reader.readAsDataURL(file)
    }
  }

  render() {
    const {
      start_date,
      end_date,
      student_number,
      studied,
      degree,
      grade,
      qualifications,
      invalidFields,
      invalidDates,
      invalidMessage,
      // transcript
    } = this.props
    return (
      <div>
        <div className="form-group">
          <label className={renderValidation(invalidFields, 'studied')}>Studied</label>
          <input
            name="studied"
            type="text"
            value={studied}
            onChange={v => this.onTextChange('studied', v)}
          />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label className={renderValidation(invalidFields, 'degree')}>Degree/Qualifications</label>
              <Select
                name="select-degree"
                options={qualifications}
                labelKey="value2"
                valueKey="value2"
                value={{ value2: degree || '' }}
                onChange={v => {
                  this.handleChange(v ? v.value2 : '', 'degree')
                  this.setState({ degreeSelected: v.value1 }, () => {
                    this.handleChange('', 'grade')
                  })
                }}
              />
            </div>
          </div>
          {this.state.degreeSelected && (
            <div className="col-xs-12 col-md-6">
              <div className="form-group">
                <label>Award</label>
                <Select
                  name="select-content"
                  options={this.filterAwards(this.state.degreeSelected)}
                  labelKey="value2"
                  valueKey="value2"
                  value={{ value2: grade || '' }}
                  onChange={v => this.handleChange(v ? v.value2 : '', 'grade')}
                />
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <CustomDatePicker
              handleDate={this.handleChange}
              date={start_date}
              invalid={invalidFields.indexOf('start_date') !== -1}
              title="start_date"
              label="Start Date" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                handleDate={this.handleChange}
                date={end_date}
                invalid={invalidFields.indexOf('end_date') !== -1}
                title="end_date"
                label="End Date"
                endDate />
            </div>
          </div>
        </div>
        {invalidDates && (<div className="required-error">{invalidMessage}</div>)}
        <div className="form-group">
          <p className="help-text">Adding your student number may speed up verification.</p>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label>Student Number (Optional)</label>
              <input
                name="student-number"
                type="text"
                value={student_number}
                onChange={(data) => this.handleChange(data.target.value, 'student_number')}
              />
            </div>
          </div>
          { /* <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <label>&nbsp;</label>
              <div className="btn-custom-file-upload">
                <label>
                  <input
                    type="file"
                    onChange={this.handleFileChange}
                    accept="application/pdf"
                  />
                  <span>Upload Transcript (Optional)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
          transcript && (
            <PDFReader transcript={ /* transcript} />
          )
          </div>*/ }
        </div>
      </div>
    )
  }
}

UniForm.propTypes = {
  onFieldChange: PropTypes.func,
  student_number: PropTypes.string,
  studied: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  degree: PropTypes.string,
  grade: PropTypes.string,
  invalidFields: PropTypes.array,
  awards: PropTypes.array,
  qualifications: PropTypes.array,
  invalidDates: PropTypes.bool,
  invalidMessage: PropTypes.string,
  transcript: PropTypes.string
}

export default UniForm
