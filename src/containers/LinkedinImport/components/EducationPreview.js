import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import CustomDatePicker from 'components/FormElements/DatePicker'
import { organizationsAutocomplete } from 'utils/networkRequests'
import OptionRenderer from './OptionRenderer'

class EducationPreview extends Component {

  componentWillMount() {
    this.searchOrgOnLoad()
  }

  searchOrgOnLoad() {
    if (this.props.institution) {
      organizationsAutocomplete(this.props.institution).then(res => {
        if (
          res.length === 1 &&
          this.props.institution.toLowerCase().trim() === res[0].name.toLowerCase().trim()
        ) {
          this.selectAsyncChange(res[0], this.props.idx, this.props.onUpdate)
        }
      })
    }
  }

  getOptions = (q) => {
    return organizationsAutocomplete(q).then(res => {
      return { options: res }
    })
  }

  selectAsyncChange = (e, idx, onUpdate) => {
    onUpdate(idx, 'institution', e.name)
    onUpdate(idx, 'organisation_id', e.id)
  }

  selectAsyncBlur = (event, idx, onUpdate) => {
    if (event.target.value && event.target.value.length) {
      onUpdate(idx, 'institution', event.target.value)
      onUpdate(idx, 'organisation_id', null)
    }
  }

  render() {
    const {
      organisation_id,
      institution,
      degree,
      studied,
      start_date,
      end_date,
      onUpdate,
      deleteItem,
      idx
    } = this.props

    return (
      <div className="row assertion-preview">
        <div className="col-xs-12">
          <div className="form-group active">
            <label>Institution {organisation_id ? '✔' : null}</label>
            <Select.Async
              loadOptions={this.getOptions}
              autosize={false}
              labelKey="name"
              valueKey="name"
              value={{ name: institution }}
              onChange={e => this.selectAsyncChange(e, idx, onUpdate)}
              onBlurResetsInput={false}
              onBlur={e => this.selectAsyncBlur(e, idx, onUpdate)}
              autoBlur={true}
              optionRenderer={OptionRenderer}
              noResultsText="Can't find your organisation? Add it manually and we’ll investigate."
            />
          </div>
          <div className="form-group active">
            <label>Degree</label>
            <input type="text" className="educationitemDegree" value={degree} onChange={e => onUpdate(idx, 'degree', e.target.value)} />
          </div>
          <div className="form-group active">
            <label>Studied</label>
            <input type="text" value={studied} onChange={e => onUpdate(idx, 'studied', e.target.value)} />
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="form-group active">
                <CustomDatePicker
                  handleDate={(value, fieldName) => {
                    onUpdate(idx, fieldName, value)
                  }}
                  date={start_date}
                  title="start_date"
                  label="Start Date"
                />
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="form-group active">
                <CustomDatePicker
                  handleDate={(value, fieldName) => {
                    onUpdate(idx, fieldName, value)
                  }}
                  date={end_date}
                  title="end_date"
                  label="End Date"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn red-btn"
              onClick={() => {
                deleteItem(idx)
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}

EducationPreview.propTypes = {
  idx: PropTypes.number,
  organisation_id: PropTypes.number,
  institution: PropTypes.string,
  studied: PropTypes.string,
  degree: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  onUpdate: PropTypes.func,
  deleteItem: PropTypes.func
}

EducationPreview.defaultProps = {
  institution: '',
  degree: '',
  studied: '',
  start_date: '',
  end_date: '',
  onUpdate: () => {},
  deleteItem: () => {}
}

export default EducationPreview
