import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Form from 'components/Abstract/Form'
import ProfileVisibility from '../ProfileVisibility'

class SettingsSection extends Form {
  constructor(props) {
    super(props)
    this.renderSection = this.renderSection.bind(this)
    this.state = {
      ...props.settings,
      profileVisibility: (props.user) ? props.user.visibility : void 0
    }
  }

  save = (e) => {
    e.preventDefault()
    const { type, user, updateUserProfile } = this.props
    const data = { ...this.state }
    const profileVisibility = data.profileVisibility
    delete data.profileVisibility

    this.props.saveUserSettings(data)

    if (type === 'privacy' && user && profileVisibility && profileVisibility !== user.visibility) {
      updateUserProfile({ visibility: profileVisibility })
    }
  }

  renderInput(item, key) {
    if (item[key].type === 'enum') {
      const value = this.state[key] || 'registered'
      const options = []
      for (var prop in item[key].enum) {
        options.push({ value: prop, label: item[key].enum[prop] })
      }

      return (
        <div className="pull-right col-xs-12 col-md-3">
          <Select
            name={`select-${key}`}
            placeholder="Select setting"
            options={options}
            value={value}
            onChange={(obj) => {
              this.onChangeInput({
                target: {
                  name: key,
                  value: obj.value
                }
              })
            }}
          />
        </div>
      )
    } else {
      return (
        <div className="form-checkbox no-label pull-right">
          <input
            type="checkbox"
            id={key}
            name={key}
            checked={this.state[key]}
            onChange={this.onChangeInput}
          />
          <label htmlFor={key}>&nbsp;</label>
        </div>
      )
    }
  }

  renderSection(item, key) {
    const { data } = this.props

    return (
      <div className="form-group" key={key}>
        <h2 className="form-group">{data.sections[item].title}</h2>
        <ul>
          {
            Object.keys(data.sections[item].settings).map((key, index) => {
              const label = data.sections[item].settings[key].description

              return (
                <li key={index}>
                  <div className="form-group text-center">
                    <span className="pull-left settings-item-text">{label}</span>
                    {this.renderInput(data.sections[item].settings, key)}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    const { data, type } = this.props
    const sections = Object.keys(data.sections)
    const showProfileVisibility = (type === 'privacy')

    if (sections.length === 0) {
      return null
    }

    return (
      <div>
        <form>
          {sections.map(this.renderSection)}
          {showProfileVisibility &&
            <ProfileVisibility
              value={this.state.profileVisibility}
              onChangeInput={this.onChangeInput}
            />
          }
        </form>
        <button className="form-btn save" onClick={this.save}>
          Save
        </button>
      </div>
    )
  }
}

SettingsSection.propTypes = {
  type: PropTypes.string.isRequired,
  user: PropTypes.object,
  data: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  saveUserSettings: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired
}

export default SettingsSection
