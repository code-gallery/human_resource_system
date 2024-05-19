import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _isNil from 'lodash/isNil'
import classNames from 'classnames'
import { getProfileItemEditDisplayProps } from 'utils/verification'
import VisibilitySetting from 'containers/Profile/components/VisibilitySetting'
import AwardForm from './components/Forms/AwardForm'
import CPDForm from './components/Forms/CPDForm'
import CertificateForm from './components/Forms/CertificateForm'
import AchievementForm from './components/Forms/AchievementForm'
import ProjectForm from './components/Forms/ProjectForm'
import SkillForm from './components/Forms/SkillForm'
import LanguageForm from './components/Forms/LanguageForm'

const requiredFields = {
  award: [ 'name', 'organisation', 'description', 'date' ],
  cpd: [ 'name', 'description', 'organisation', 'cpd_type', 'duration', 'location', 'date_from' ],
  certificate: [ 'name', 'organisation', 'description', 'date' ],
  achievement: [ 'name', 'description', 'date' ],
  project: [ 'name', 'organisation', 'description', 'date_from' ],
  skill: [ 'name', 'proficiency' ],
  language: [ 'name', 'proficiency' ]
}

export default class AwardItemEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...getProfileItemEditDisplayProps(
        [ 'language', 'skill', 'achievement' ].indexOf(props.awardType) === -1 ? this.props.verified_status : null
      ),
      data: props.id ? props : {},
      invalidFields: [],
      invalidDates: false,
      orgRegistered: true
    }
  }

  toggleLock = (e) => {
    e.preventDefault()
    this.setState({
      locked: !this.state.locked
    })
  }

  saveAndVerify = (verify) => {
    const { data } = this.state
    const { date_from, date_to } = data
    const invalidFields = requiredFields[this.props.awardType].filter((field) => {
      return !this.state.data[field]
    }
    )
    const sameMonthYear = moment(date_from).format('YYYY-MM') === moment(date_to).format('YYYY-MM')

    if (!invalidFields.length) {
      this.setState({
        invalidFields: []
      })
      if (this.props.awardType === 'cpd' || this.props.awardType === 'project') {
        this.setState({
          invalidDates: false
        })
        if (sameMonthYear || !date_to || date_from < date_to) {
          data.date_to = sameMonthYear ?
            moment(date_from).add(1, 'days').format('YYYY-MM-DD') :
            date_to

          this.setState({
            invalidDates: false
          })

          this.props.saveAward({
            ...data,
            type: this.props.awardType
          }, verify)
          this.props.toggleEdit()
        } else {
          this.setState({
            invalidDates: true
          })
        }
      } else {
        this.setState({
          invalidFields: []
        })
        this.props.saveAward({
          ...this.state.data,
          type: this.props.awardType
        }, verify)
        this.props.toggleEdit()
      }
    } else {
      this.setState({
        invalidFields
      })
    }
  }

  saveVerified = () => {
    const { data } = this.state
    const saveData = {
      id: data.id,
      visibility: data.visibility,
      verified: data.verified,
      verified_status: data.verified_status
    }
    this.props.saveAward(saveData, 'verified')
  }

  deleteAward = () => {
    this.props.deleteAward(this.props.id, this.props.awardType)
    this.props.toggleEdit()
  }

  onFieldChange = (field, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value || ''
      }
    })
  }

  onFieldsChange = (fields) => {
    this.setState({
      data: {
        ...this.state.data,
        ...fields
      }
    })
  }

  orgRegistered = (orgRegistered) => {
    this.setState({ orgRegistered })
  }

  getTooltipData() {
    const { data, orgRegistered } = this.state
    const { user } = this.props
    const isTooltipInfo = !user.mobile_address || user.biometrics_status !== 'complete'
    const isTooltipDanger = user.mobile_address && user.biometrics_status === 'complete' &&
      !orgRegistered && data.organisation

    const cssSaveVerifyButton = classNames('btn green-btn', {
      'tooltip-position-top tooltip-movable tooltip-info opacity-btn': isTooltipInfo,
      'tooltip-position-top tooltip-movable tooltip-danger': isTooltipDanger
    })

    let tooltipSaveVerifyButton = user.mobile_address
      ? (!orgRegistered && data.organisation ? 'Can\'t verify, this institution is not registered with APPII' : '')
      : 'Download APPII Android or iOS app to submit verification'
    if (user.biometrics_status !== 'complete') {
      tooltipSaveVerifyButton = 'Can\'t verify this, until you are biometrically identified'
    }

    const saveVerifyDisabled = !user.mobile_address ||
      user.biometrics_status !== 'complete' ||
      (!orgRegistered && data.organisation)

    return {
      cssSaveVerifyButton,
      tooltipSaveVerifyButton,
      saveVerifyDisabled
    }
  }

  renderVerifyButton() {
    const cssLock = classNames({
      'lock-block': this.state.locked
    })
    const { cssSaveVerifyButton, tooltipSaveVerifyButton, saveVerifyDisabled } = this.getTooltipData()
    if (requiredFields[this.props.awardType].indexOf('organisation') !== -1) {
      return (
        <button
          className={`${cssSaveVerifyButton} ${cssLock}`}
          onClick={() => this.saveAndVerify(true)}
          data-tooltip={tooltipSaveVerifyButton}
          disabled={saveVerifyDisabled}
        >
          Save & Verify
        </button>
      )
    }
  }

  renderForm(type, data) {
    switch (type) {
      case 'award':
        return (<AwardForm
          {...data}
          orgRegistered={this.orgRegistered}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      case 'cpd':
        return (<CPDForm
          {...data}
          orgRegistered={this.orgRegistered}
          invalidDates={this.state.invalidDates}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      case 'certificate':
        return (<CertificateForm
          {...data}
          orgRegistered={this.orgRegistered}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      case 'achievement':
        return (<AchievementForm
          {...data}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      case 'project':
        return (<ProjectForm
          {...data}
          orgRegistered={this.orgRegistered}
          invalidDates={this.state.invalidDates}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      case 'skill':
        return (<SkillForm
          {...data}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      case 'language':
        return (<LanguageForm
          {...data}
          invalidFields={this.state.invalidFields}
          onFieldChange={this.onFieldChange}
          onFieldsChange={this.onFieldsChange} />)
      default:
        return null
    }
  }

  render() {
    const {
      headingClassName,
      headingText,
      locked,
      data
    } = this.state
    const { verified_status } = this.props
    const editable = _isNil(this.props.award_id)
    const unlockLabel = (editable) ?
      'Unlock to delete verification and edit' :
      'Unlock to delete verification'
    const cssRow = classNames('row', {
      'lock-block': locked,
      'delete-only': !editable && this.props.id
    })
    const cssVisibility = classNames('row', {
      'lock-block': locked && verified_status !== 'verified'
    })
    const cssLock = classNames({
      'lock-block': locked
    })
    const canSave = editable || typeof this.props.id === 'undefined'
    const canSaveVerified = (verified_status === 'verified')

    return (
      <div className="profile-experience-editing">
        {
          this.props.edit &&
          <div className="row">
            <div className="col-xs-12">
              <p className={headingClassName}>
                <i className="edit-status-ico">&nbsp;</i>{headingText}
                {
                  locked &&
                  <span>
                    <a onClick={this.toggleLock}>
                      {unlockLabel}
                    </a>
                  </span>
                }
              </p>
            </div>
          </div>
        }
        <div className={cssRow}>
          <div className="col-xs-12">
            {this.renderForm(this.props.awardType, data)}
          </div>
        </div>
        <VisibilitySetting
          value={this.props.visibility}
          onFieldChange={this.onFieldChange}
          cssRow={cssVisibility}
        />
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group form-btn">
              <button
                className="btn dark-btn"
                onClick={this.props.toggleEdit}
              >
                  Cancel
              </button>
              {canSave &&
                <button
                  className={`${cssLock} btn dark-btn`}
                  onClick={() => this.saveAndVerify(false)}
                >
                    Save
                </button>
              }
              {canSave && this.renderVerifyButton()}
              {canSaveVerified &&
                <button
                  className="btn dark-btn hello"
                  onClick={() => this.saveVerified()}
                >
                    Save
                </button>
              }
              {this.props.edit && (
                <button
                  className={`${cssLock} delete-btn pull-right tooltip-position-top tooltip-movable tooltip-danger`}
                  onClick={this.deleteAward}
                  data-tooltip="Confirm Deletion?"
                >
                  &nbsp;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AwardItemEdit.propTypes = {
  verified_status: PropTypes.string,
  id: PropTypes.number,
  award_id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  awardType: PropTypes.string,
  visibility: PropTypes.string,
  toggleEdit: PropTypes.func.isRequired,
  pending_verification: PropTypes.bool,
  description: PropTypes.string,
  date: PropTypes.string,
  edit: PropTypes.bool,
  deleteAward: PropTypes.func,
  saveAward: PropTypes.func.isRequired,
  user: PropTypes.object
}
