import React from 'react'
import { renderValidation } from 'containers/Profile/utils/validation'
import Datetime from 'react-datetime'
import moment from 'moment'
import BaseForm from 'containers/Profile/components/AwardList/components/AwardItemEdit/components/Forms/BaseForm'
import LinkedButton from 'components/LinkedButton'

export default class AddressForm extends BaseForm {

  onChangeData = (fieldName, event) => {
    this.props.onAddressFieldChange(fieldName, event.target.value)
  }
  renderAuthButton =()=>{
    const { account_address:{
      line1,
      line2,
      town,
      county,
      country,
    }
    } = this.props
    if ((line1 === null|| line1 === "") || (line2 === null || line2 === "") ||
    (town === null|| town === "") ||(county === null || county === "") || (country === null || country === "")) {
      return (<LinkedButton
        className="border-btn checkButton incomplete"
        to='#'>INCOMPLETE
      </LinkedButton>)
    } else {
      return (<LinkedButton
        className="border-btn checkButton"
        color="blue"
        to='#'>Complete
      </LinkedButton>)
    }
  }
  render() {
    const {
      account_address:{
        from,
        to,
        line1,
        line2,
        town,
        county,
        country,
      },
      invalidFields,
      invalidDates,
      invalidMessage,
      onAddressFieldChange
    } = this.props
    const renderAuthButton= this.renderAuthButton()
    const dateValueTo = (to) ? moment(to) : ''
    const dateValueFrom = (from) ? moment(from) : ''
    return (
      <div className="card">
        <div className="card-header-gray">
          <div className='col-md-6'>Addresses</div>
          <div className='col-md-6 noPadding'>
            {renderAuthButton}
          </div>
        </div>
        <div className="card-body">
          <div className="form-group row">
            <label className="col-md-12 col-form-label">Please <span className="required-error">add all addresses you've had since July 2015.</span></label>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label`} >Start Date</label>
            <div className="col-md-3">
              <Datetime
                name="from"
                value={dateValueFrom}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                onChange={(date) => {
                  if (date && date.format) {
                    onAddressFieldChange('from', date.format('YYYY-MM-DD'))
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className={`col-md-3 col-form-label bolder-label`} >End Date</label>
            <div className="col-md-3">
              <Datetime
                name="to"
                value={dateValueTo}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                onChange={(date) => {
                  if (date && date.format) {
                    onAddressFieldChange('to', date.format('YYYY-MM-DD'))
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              className={`col-md-3 col-form-label bolder-label ${renderValidation(invalidFields, 'line1'),renderValidation(invalidFields, 'town'),renderValidation(invalidFields, 'county'),renderValidation(invalidFields, 'country')}`} >Current Address</label>
            <div className="col-md-4">
              <input type="text" className="form-control" name="line1" value={line1 || ''} onChange={v => this.onChangeData('line1', v)}/>
              <small className="form-text helper">Address Line 1</small>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label"></label>
            <div className="col-md-4">
              <input type="text" className="form-control" name="line2" value={line2 || ''} onChange={v => this.onChangeData('line2', v)}/>
              <small className="form-text helper">Address Line 2</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label"></label>
            <div className="col-md-4">
              <input type="text" className="form-control" name="town" value={town || ''} onChange={v => this.onChangeData('town', v)}/>
              <small className="form-text helper">City</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label"></label>
            <div className="col-md-4">
              <input type="text" className="form-control" name="county" value={county || ''} onChange={v => this.onChangeData('county', v)}/>
              <small className="form-text helper">County</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label bolder-label"></label>
            <div className="col-md-4">
              <input type="text" className="form-control" name="country" value={country || ''} onChange={v => this.onChangeData('country', v)}/>
              <small className="form-text helper">Country</small>
            </div>
          </div>
          {invalidDates || (<div className="required-error">{invalidMessage}</div>)}
        </div>
      </div>
    )
  }
}

AddressForm.propTypes = {
//   onFieldChange: PropTypes.func.isRequired,
//   achievements: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.object
//   ]),
//   position: PropTypes.string,
//   location: PropTypes.string,
//   start_date: PropTypes.string,
//   end_date: PropTypes.string,
//   industry: PropTypes.string,
//   industries: PropTypes.array,
//   invalidFields: PropTypes.array,
//   invalidDates: PropTypes.bool,
//   invalidMessage: PropTypes.string,
//   employment_type: PropTypes.string
}
