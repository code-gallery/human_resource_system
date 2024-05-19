import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { VISIBILITY_OPTIONS } from 'containers/constants'

class VisibilitySetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || 'registered'
    }
  }

  handleChange = (obj) => {
    if (obj && obj.value) {
      this.props.onFieldChange('visibility', obj.value)
      this.setState({ value: obj.value })
    }
  }

  render() {
    const options = VISIBILITY_OPTIONS
    const { value } = this.state
    const uid = `select-visibility-${new Date().getTime()}`
    const cssRow = typeof this.props.cssRow === 'string' ? this.props.cssRow : 'row'

    return (
      <div className={cssRow}>
        <div className="col-xs-12 col-md-6">
          <div className="form-group">
            <label>Visibility</label>
            <Select
              name={uid}
              placeholder="Select setting"
              options={options}
              value={value}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

VisibilitySetting.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  cssRow: PropTypes.string
}

export default VisibilitySetting
