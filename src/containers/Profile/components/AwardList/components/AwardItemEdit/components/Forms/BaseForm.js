import React from 'react'
import PropTypes from 'prop-types'
import { organizationsAutocomplete } from 'utils/networkRequests'

class BaseForm extends React.Component {
  handleChange = (value, fieldName) => {
    this.props.onFieldChange(fieldName, value)
  }

  handleMultiChange = fields => {
    this.props.onFieldsChange(fields)
  }

  onTextChange = (fieldName, event) => {
    if (fieldName === 'location' && event && event.formatted_address) {
      this.props.onFieldChange('location', event.formatted_address)
    } else {
      this.props.onFieldChange(fieldName, event.target.value)
    }
  }

  getOptions = (q) => {
    return organizationsAutocomplete(q).then(res => {
      return { options: res }
    })
  }

  optionRenderer(option) {
    return (
      <div className="institution-select">
        <img src={option.logo_image ? option.logo_image : '/images/appii-placeholder.png'} alt={option.name} />
        <p>{option.name}</p>
        <span>{option.country}</span>
      </div>
    )
  }

  selectAsyncChange = (v) => {
    this.handleMultiChange({
      organisation: v ? v.name : '',
      organisation_id: v ? v.id : null
    })
    this.props.orgRegistered(true)
  }

  selectAsyncBlur = (event) => {
    if (event && event.target.value && event.target.value.length) {
      this.handleMultiChange({
        organisation: event.target.value,
        organisation_id: null
      })
      this.props.orgRegistered(false)
    } else {
      this.handleChange(this.props.organisation, 'organisation')
    }
  }

  render() {
    return null
  }
}

BaseForm.defaultProps = {
  orgRegistered: function() {}
}

BaseForm.propTypes = {
  organisation: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  onFieldsChange: PropTypes.func.isRequired,
  orgRegistered: PropTypes.func
}

export default BaseForm
