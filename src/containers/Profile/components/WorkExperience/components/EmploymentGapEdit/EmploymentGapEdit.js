import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import moment from 'moment'
import { getProfileItemEditDisplayProps } from 'utils/verification'
import VisibilitySetting from 'containers/Profile/components/VisibilitySetting'
import GapForm from './components/GapForm'

const initialState = {
  organisation_id: null,
  company: null,
  description: null,
  end_date: null,
  industry: null,
  employment_type: null,
  level: null,
  location: null,
  position: null,
  start_date: null,
  type: null,
  verified: null,
  verified_status: null,
  achievements: null
}

const requiredFields = [ 'company', 'position', 'employment_type', 'industry', 'start_date' ]

class EmploymentGapEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...getProfileItemEditDisplayProps(this.props.verified_status),
      mode: 'uni',
      data: props,
      visibility: props.visibility,
      invalidFields: [],
      invalidDates: false,
      invalidMessage: '',
      orgRegistered: true
    }
  }

  toggleLock = (e) => {
    e.preventDefault()
    this.setState({
      locked: !this.state.locked
    })
  }

  switchMode = (e) => {
    e.preventDefault()
    this.setState({
      mode: this.state.mode === 'uni' ? 'school' : 'uni'
    })
  }


  saveAndVerify = (verify) => {
    const invalidFields = requiredFields.filter((field) => !this.state.data[field])

    if (!invalidFields.length) {
      const {
        organisation_id,
        achievements,
        company,
        description,
        end_date,
        id,
        industry,
        level,
        location,
        position,
        employment_type,
        start_date,
        visibility
      } = this.state.data

      const now = moment()
      const startDate = moment(start_date)
      const isPresent = end_date === '0000-00-00' || end_date === null
      const endDate = !isPresent && moment(end_date)

      const isFuture = endDate && now.isBefore(endDate)
      const isStartDateFuture = now.isBefore(startDate)
      const sameMonthYear = endDate && startDate.format('YYYY-MM') === endDate.format('YYYY-MM')

      if (sameMonthYear || (startDate.isBefore(endDate) && !isFuture) || (isPresent && !isStartDateFuture)) {
        let endDateFormatted
        if (isPresent) {
          endDateFormatted = null
        } else {
          endDateFormatted = sameMonthYear
            ? startDate.clone().add(1, 'days').format('YYYY-MM-DD')
            : endDate.format('YYYY-MM-DD')
        }
        this.setState({
          invalidDates: false
        })
        this.props.saveEntity({
          organisation_id,
          achievements,
          company,
          description,
          start_date: startDate.format('YYYY-MM-DD'),
          end_date: endDateFormatted,
          id,
          industry,
          employment_type,
          level,
          location,
          position,
          entity_type: 'jobs',
          visibility
        }, verify)
        this.props.toggleEdit()
      } else {
        this.setState({
          invalidDates: true,
          invalidMessage: isFuture ? 'End Date can not be in future' : 'End Date can not be earlier than Start Date'
        })
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
      entity_type: 'jobs',
      visibility: data.visibility,
      verified: data.verified,
      verified_status: data.verified_status
    }
    this.props.saveEntity(saveData, 'verified')
  }

  deleteWork = () => {
    this.props.deleteWork(this.props.id)
    this.props.toggleEdit()
  }

  onFieldChange = (field, value) => {
    this.setState({
      data: {
        ...this.state.data,
        [field]: value
      }
    })
  }

  
 

  getTooltipData() {
    const { data, orgRegistered } = this.state
    const { user } = this.props
    const isTooltipInfo = !user.mobile_address || user.biometrics_status !== 'complete'
    const isTooltipDanger = user.mobile_address && user.biometrics_status === 'complete' &&
      !orgRegistered && data.company

    const cssSaveVerifyButton = classNames('btn green-btn', {
      'tooltip-position-top tooltip-movable tooltip-info opacity-btn': isTooltipInfo,
      'tooltip-position-top tooltip-movable tooltip-danger': isTooltipDanger
    })

    let tooltipSaveVerifyButton = user.mobile_address
      ? (!orgRegistered && data.company ? 'Can\'t verify, this institution is not registered with APPII' : '')
      : 'Download APPII Android or iOS app to submit verification'
    if (user.biometrics_status !== 'complete') {
      tooltipSaveVerifyButton = 'Can\'t verify this, until you are biometrically identified'
    }

    const saveVerifyDisabled = !user.mobile_address ||
      user.biometrics_status !== 'complete' ||
      (!orgRegistered && data.company)

    return {
      cssSaveVerifyButton,
      tooltipSaveVerifyButton,
      saveVerifyDisabled
    }
  }

  render () {
    const {
      headingClassName,
      headingText,
      locked,
      data,
      invalidFields,
      invalidMessage
    } = this.state
    const { verified_status } = this.props
    const cssOrganisation = classNames({ 'required-error': invalidFields.indexOf('company') !== -1 })
    const { cssSaveVerifyButton, tooltipSaveVerifyButton, saveVerifyDisabled } = this.getTooltipData()
    const cssRow = classNames('row', {
      'lock-block': locked
    })
    const cssVisibility = classNames('row', {
      'lock-block': locked && verified_status !== 'verified'
    })
    const cssLock = classNames({
      'lock-block': locked
    })
    const canSaveVerified = (verified_status === 'verified' && locked)
    const canSave = !canSaveVerified
    const canVerify = (canSave && data.description)
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
                      Unlock to delete verification and edit
                    </a>
                  </span>
                }
              </p>
            </div>
          </div>
        }
        <div className={cssRow}>
          <div className="col-xs-12">
           
            <GapForm
              {...data}
              invalidFields={this.state.invalidFields}
              onFieldChange={this.onFieldChange}
              
              gapsReasons={this.props.gapsReasons}
              invalidDates={this.state.invalidDates}
              invalidMessage={invalidMessage}
            />
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
              {canVerify &&
                <button
                  className={`${cssSaveVerifyButton} ${cssLock}`}
                  onClick={() => this.saveAndVerify(true)}
                  data-tooltip={tooltipSaveVerifyButton}
                  disabled={saveVerifyDisabled}
                >
                  Save & Verify
                </button>
              }
              {canSaveVerified &&
                <button
                  className="btn dark-btn"
                  onClick={() => this.saveVerified()}
                >
                    Save
                </button>
              }
              {this.props.edit && (
                <button
                  className={`${cssLock} delete-btn pull-right tooltip-position-top tooltip-movable tooltip-danger`}
                  onClick={this.deleteWork} data-tooltip="Confirm Deletion?"
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

EmploymentGapEdit.propTypes = {
  achievements: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  gapsReasons: PropTypes.array.isRequired,
  edit: PropTypes.bool,
  toggleEdit: PropTypes.func.isRequired,
  verified_status: PropTypes.string,
  pending_verification: PropTypes.bool,
  id: PropTypes.number,
  deleteWork: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  user: PropTypes.object,
  visibility: PropTypes.string
}

export default EmploymentGapEdit
