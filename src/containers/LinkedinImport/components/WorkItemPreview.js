import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import CustomDatePicker from 'components/FormElements/DatePicker'
import { organizationsAutocomplete } from 'utils/networkRequests'
import OptionRenderer from './OptionRenderer'

class WorkItemPreview extends Component {

  componentWillMount() {
    this.searchOrgOnLoad()
  }

  searchOrgOnLoad() {
    if (this.props.company) {
      organizationsAutocomplete(this.props.company).then(res => {
        if (
          res.length === 1 &&
          this.props.company.toLowerCase().trim() === res[0].name.toLowerCase().trim()
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
    onUpdate(idx, 'company', e.name)
    onUpdate(idx, 'organisation_id', e.id)
  }

  selectAsyncBlur = (event, idx, onUpdate) => {
    if (event.target.value && event.target.value.length) {
      onUpdate(idx, 'company', event.target.value)
      onUpdate(idx, 'organisation_id', null)
    }
  }

  render() {
    const {
      organisation_id,
      company,
      position,
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
            <label>Company {organisation_id ? '✔' : null}</label>
            <Select.Async
              className="workitemOrganisation"
              loadOptions={this.getOptions}
              autosize={false}
              labelKey="name"
              valueKey="name"
              value={{ name: company }}
              onChange={e => this.selectAsyncChange(e, idx, onUpdate)}
              onBlur={e => this.selectAsyncBlur(e, idx, onUpdate)}
              onBlurResetsInput={false}
              autoBlur={true}
              optionRenderer={OptionRenderer}
              noResultsText="Can't find your organisation? Add it manually and we’ll investigate."
            />
          </div>
          <div className="form-group active">
            <label>Position</label>
            <input type="text" className="workitemPosition" value={position} onChange={e => onUpdate(idx, 'position', e.target.value)} />
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

WorkItemPreview.propTypes = {
  organisation_id: PropTypes.number,
  idx: PropTypes.number,
  company: PropTypes.string,
  position: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  onUpdate: PropTypes.func,
  deleteItem: PropTypes.func
}

WorkItemPreview.defaultProps = {
  company: '',
  position: '',
  start_date: '',
  end_date: '',
  onUpdate: () => {},
  deleteItem: () => {}
}

export default WorkItemPreview
