import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import CustomDatePicker from 'components/FormElements/DatePicker'

export function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item
    }
    return {
      ...item,
      ...action.item
    }
  })
}

class SchoolForm extends React.Component {
  handleChange = (value, title) => {
    this.props.onFieldChange(title, value)
  }

  removeRow = (index) => {
    this.props.onFieldChange('results', this.props.results.filter((_, i) => i !== index))
  }

  addRow = () => {
    const emptyRow = { subject: '', qualification: '', grade: '' }
    if (this.props.results && this.props.results.length) {
      this.props.onFieldChange('results', [ ...this.props.results, emptyRow ])
    } else {
      this.props.onFieldChange('results', [ emptyRow ])
    }
  }

  filterAwards = (type) => {
    if (type) {
      return this.props.awards.filter((item) => {
        return item.value1 === type
      })
    }
    return this.props.awards
  }

  updateRow = (object, index) => {
    this.props.onFieldChange('results',
      updateObjectInArray(
        this.props.results,
        { item: object, index }
      )
    )
  }

  renderStudiedRow = () => {
    const {
      results,
      highSchoolDegrees
    } = this.props
    if (results && results.length) {
      return (results.map((item, index) => (
        <div className="row" key={index}>
          <div className="col-xs-12 col-md-4">
            <div className="form-group">
              <label>Studied</label>
              <input
                name={`subject-${index}`}
                type="text"
                value={item.subject}
                onChange={v => this.updateRow({ subject: v.target.value }, index)}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="form-group">
              <label>Qualification</label>
              <Select
                name={`select-qualification-${index}`}
                options={highSchoolDegrees}
                labelKey="value2"
                valueKey="value2"
                value={{ value2: item.qualification ? item.qualification : '' }}
                onChange={v => {
                  this.updateRow({ qualification: v.value2, grade: null }, index)
                }}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <div className="form-group">
              <label>Award</label>
              <Select
                name={`select-grade-${index}`}
                options={this.filterAwards(item.qualification)}
                labelKey="value2"
                valueKey="value2"
                value={{ value2: item.grade ? item.grade : '' }}
                onChange={v => this.updateRow({ grade: v.value2 }, index)}
              />
            </div>
          </div>
          <div className="col-xs-12 col-md-1">
            <div className="form-group">
              <button className="remove-row-btn" onClick={() => {
                this.removeRow(index)
              }}>&nbsp;</button>
            </div>
          </div>
        </div>
      )))
    }
  }

  render() {
    const {
      start_date,
      end_date,
      student_number,
      invalidDates,
      invalidFields,
      invalidMessage
    } = this.props
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                invalid={invalidFields.indexOf('start_date') !== -1}
                handleDate={this.handleChange}
                date={start_date}
                title="start_date"
                label="Start Date" />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <CustomDatePicker
                invalid={invalidFields.indexOf('end_date') !== -1}
                handleDate={this.handleChange}
                date={end_date}
                title="end_date"
                label="End Date"
                endDate />
            </div>
          </div>
        </div>
        {invalidDates && (<div className="required-error">{invalidMessage}</div>)}
        <div className="form-group">
          <p className="help-text">Add all the courses you studied while at this insitution.</p>
        </div>

        {this.renderStudiedRow()}
        <div className="form-group">
          <button className="add-row-btn" onClick={this.addRow}>Add Item</button>
        </div>
        <div className="form-group">
          <p className="help-text">Adding a transcript and/or your student number may speed up verification.</p>
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
        </div>
      </div>
    )
  }
}

SchoolForm.defaultProps = {
  invalidMessage: 'End Date can not be earlier than Start Date'
}

SchoolForm.propTypes = {
  onFieldChange: PropTypes.func,
  results: PropTypes.array,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  student_number: PropTypes.string,
  highSchoolDegrees: PropTypes.array,
  invalidFields: PropTypes.array,
  invalidDates: PropTypes.bool,
  awards: PropTypes.array,
  invalidMessage: PropTypes.string
}

export default SchoolForm
