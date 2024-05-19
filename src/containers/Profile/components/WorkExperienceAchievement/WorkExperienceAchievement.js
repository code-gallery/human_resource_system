import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _isNil from 'lodash/isNil'
import { updateObjectInArray }
  from 'containers/Profile/components/EducationList/components/EducationItemEdit/components/SchoolForm'
import './style.css'

class WorkExperienceAchievement extends Component {
  updateRow = (object, index) => {
    this.props.onFieldChange('achievements',
      updateObjectInArray(
        this.props.achievements,
        { item: object, index }
      )
    )
  }

  removeRow = (index) => {
    this.props.onFieldChange('achievements', this.props.achievements.filter((_, i) => i !== index))
  }

  addRow = () => {
    const { achievements } = this.props
    const emptyRow = { achievement: '' }
    if (achievements && achievements.length) {
      this.props.onFieldChange('achievements', [ ...this.props.achievements, emptyRow ])
    } else {
      this.props.onFieldChange('achievements', [ emptyRow ])
    }
  }

  renderAchievements() {
    const { achievements } = this.props

    if (achievements && achievements.length) {
      return achievements.map((item, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-md-8 col-xs-12">
              <div className="form-group">
                <input
                  type="text"
                  value={item.achievement}
                  onChange={e => this.updateRow({ achievement: e.target.value }, index)}
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
        )
      })
    }

    return null
  }

  render() {
    const { achievements } = this.props
    const showAdd = (_isNil(achievements) || (achievements && achievements.length) < 5)

    return (
      <div className="WorkExperienceAchievement">
        <div className="form-group">
          <p className="help-text">You can add 5 achievements</p>
        </div>

        {this.renderAchievements()}
        {showAdd &&
          <div className="form-group">
            <button className="add-row-btn" onClick={this.addRow}>Add achievement</button>
          </div>
        }
      </div>
    )
  }
}

WorkExperienceAchievement.propTypes = {
  onFieldChange: PropTypes.func,
  achievements: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

export default WorkExperienceAchievement
