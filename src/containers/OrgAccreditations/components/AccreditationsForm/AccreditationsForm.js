import React from 'react'
import PropTypes from 'prop-types'
import _keys from 'lodash/keys'
import _assign from 'lodash/assign'
import Form from 'components/Abstract/Form'
import ContentCard from 'components/ContentCard'
import SelectField from 'components/FormElements/SelectField'
import Awards from '../Forms/Awards'
import Achievements from '../Forms/Achievements'
import Certificates from '../Forms/Certificates'
import Cpd from '../Forms/Cpd'
import './style.css'

const splitDate = function(value) {
  const dateValue = value.split('T')
  let date = ''
  let time = ''
  if (dateValue.length === 2) {
    date = dateValue[0]
    time = dateValue[1].split(':00.000Z')[0]
  }

  return {
    date,
    time
  }
}

class AccreditationsForm extends Form {
  constructor(props) {
    super(props)
    const lat = 51.504
    const lng = -0.0195
    const location = '1 Canada Square, Canary Wharf, London E14 5AB, UK'
    const radius = 300

    let initialState = {
      lat,
      lng,
      location,
      radius,
      location_enable: false,
      start_time: '00:00',
      end_time: '00:00'
    }

    if (props.editMode) {
      const award = props.award
      const start = splitDate(award.start_date)
      const end = splitDate(award.end_date)
      initialState = {
        ...award,
        start_date: start.date,
        start_time: start.time,
        end_date: end.date,
        end_time: end.time,
        level: (award.level) || '',
        delivery_type: award.delivery_type || '',
        enabled: award.enabled,
        type: award.type || '',
        award_grade: award.award_data.grade || '',
        award_duration: award.award_data.duration || '',
        // award_file: award.award_data.file || '', // TODO - add this back when using input type="file"
        award_cpd_type: award.award_data.cpd_type || '',
        award_level: award.award_data.level || '',
        award_location: award.award_data.location || '',
        award_cpd_credits: award.award_data.cpd_credits || '',
        award_date: award.award_data.date || '',
        award_date_from: award.award_data.date_from || '',
        award_date_to: award.award_data.date_to || '',
        lat: parseFloat(award.lat) || lat,
        lng: parseFloat(award.lng) || lng,
        location: award.location || location,
        location_enable: (award.location_enable !== null) ? award.location_enable : false,
        radius: (award.radius) ? parseFloat(award.radius) : radius
      }
    }

    this.state = initialState
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.editMode && this.props.orgAccreditations.pending !== nextProps.orgAccreditations.pending &&
      nextProps.orgAccreditations.pending === 'saveSuccess'
    ) {
      // save done
      this.cancel()
    }
  }

  cleanDataForEdit(data) {
    const removeFields = [ 'created_at', 'updated_at', 'errorMsg', 'successMsg', 'pending', 'qrCode' ]
    // remove fields with key "award_" and in removeFields
    for (var prop in data) {
      if (prop !== 'award_data' && prop !== 'award_type' &&
        data.hasOwnProperty(prop) && prop.indexOf('award_') !== -1) {
        delete data[prop]
      } else if (data[prop] === '' || data[prop] === null) {
        delete data[prop]
      }
    }

    removeFields.map((prop) => {
      delete data[prop]
      return true
    })

    return data
  }

  getData(awardType) {
    let data = _assign({}, this.state)
    const fieldsMap = {
      award: [
        { key: 'award_date', newKey: 'date' }
      ],
      certificate: [
        { key: 'award_date', newKey: 'date' },
        { key: 'award_level', newKey: 'level' },
        { key: 'award_grade', newKey: 'grade' },
        { key: 'award_file', newKey: 'file' }
      ],
      achievement: [
        { key: 'award_date', newKey: 'date' },
        { key: 'award_grade', newKey: 'grade' }
      ],
      cpd: [
        { key: 'award_cpd_type', newKey: 'cpd_type' },
        { key: 'award_duration', newKey: 'duration' },
        { key: 'award_date_from', newKey: 'date_from' },
        { key: 'award_date_to', newKey: 'date_to' },
        { key: 'award_file', newKey: 'file' },
        { key: 'award_cpd_credits', newKey: 'cpd_credits' },
        { key: 'award_level', newKey: 'level' },
        { key: 'award_location', newKey: 'location' }
      ]
    }
    const award_data = {
      name: data.name
    }
    const fields = fieldsMap[awardType]

    fields.map((item) => {
      if (data[item.key]) {
        award_data[item.newKey] = data[item.key]
        delete data[item.key]
      }
      return true
    })

    if (_keys(award_data).length > 0) {
      data.award_data = award_data
    }

    if (this.props.editMode) {
      data = this.cleanDataForEdit(data)
    }

    if (!data.location_enable) {
      data.lat = null
      data.lng = null
      data.radius = null
      data.location = ''
    }

    return data
  }

  save = () => {
    const { award_type } = this.state
    this.props.save(this.getData(award_type))
  }

  cancel = () => {
    this.props.cancel()
  }

  renderForm() {
    const data = _assign({}, this.state)
    delete data.award_type

    switch (this.state.award_type) {
      case 'achievement':
        return <Achievements onChangeInput={this.onChangeInput} data={data} />
      case 'award':
        return <Awards onChangeInput={this.onChangeInput} data={data} />
      case 'certificate':
        return (
          <Certificates
            onChangeInput={this.onChangeInput}
            onChangeFile={this.onChangeFile}
            data={data}
          />
        )
      case 'cpd':
        return (
          <Cpd
            onChangeInput={this.onChangeInput}
            onChangeFile={this.onChangeFile}
            data={data}
          />
        )
      default:
        return null
    }
  }

  renderFormButtons() {
    const { orgAccreditations, award } = this.props
    const pending = (award && award.pending) ? award.pending : orgAccreditations.pending
    const isSaveDisabled = (pending === 'saving')

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="pull-right">
            <button className="btn gray-btn btn-cancel" onClick={this.cancel}>
              Cancel
            </button>
            <button
              className="btn blue-btn"
              disabled={isSaveDisabled}
              onClick={this.save}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderCreateNew() {
    const { award_type } = this.state
    const { orgAccreditations } = this.props
    const { awardTypes } = orgAccreditations
    const keys = _keys(awardTypes)

    if (!keys.length) {
      return null
    }

    const mappedAwardTypes = keys.map(item => {
      const obj = {
        value: item,
        label: awardTypes[item].label
      }
      return (awardTypes[item].qrcode) ? obj : false
    })

    return (
      <ContentCard title="Add new" className="AccreditationsForm">
        <div className="row">
          <div className="col-md-6">
            <SelectField
              name="select-award-type"
              label="Accreditation Type"
              placeholder="Choose Accreditation Type"
              options={mappedAwardTypes}
              value={award_type}
              onChange={(obj) => {
                this.onChangeInput({
                  target: {
                    name: 'award_type',
                    value: (obj) ? obj.value : ''
                  }
                })
              }}
            />
          </div>
        </div>

        { this.renderForm() }
        { this.renderFormButtons() }

      </ContentCard>
    )
  }

  render() {
    const { editMode } = this.props
    if (!editMode) {
      return this.renderCreateNew()
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          { this.renderForm() }
          { this.renderFormButtons() }
        </div>
      </div>
    )
  }
}

AccreditationsForm.defaultProps = {
  editMode: false
}

AccreditationsForm.propTypes = {
  orgAccreditations: PropTypes.shape({
    awardTypes: PropTypes.object.isRequired,
    pending: PropTypes.string.isRequired
  }),
  editMode: PropTypes.bool,
  award: PropTypes.object,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default AccreditationsForm
