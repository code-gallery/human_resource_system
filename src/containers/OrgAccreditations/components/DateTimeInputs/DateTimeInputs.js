import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Datetime from 'react-datetime'

const DateTimeInputs = (props) => {
  const { onChangeInput, start, data } = props
  const labelDate = (start) ? 'Start Date' : 'End Date'
  const nameDate = (start) ? 'start_date' : 'end_date'
  const labelTime = (start) ? 'Start Time' : 'End Time'
  const nameTime = (start) ? 'start_time' : 'end_time'
  const inputProps = {
    placeholder: 'DD/MM/YYYY'
  }
  const dateValue = (data[nameDate]) ? moment(data[nameDate]) : ''

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>{labelDate}</label>
          <Datetime
            name={nameDate}
            value={dateValue}
            dateFormat="DD/MM/YYYY"
            inputProps={inputProps}
            timeFormat={false}
            onChange={(date) => {
              if (date && date.format) {
                onChangeInput({
                  target: {
                    name: nameDate,
                    value: date.format('YYYY-MM-DD')
                  }
                })
              }
            }}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>{labelTime}</label>
          <input name={nameTime} value={data[nameTime]} type="time" onChange={onChangeInput} />
        </div>
      </div>
    </div>
  )
}

DateTimeInputs.propTypes = {
  data: PropTypes.object,
  start: PropTypes.bool.isRequired,
  onChangeInput: PropTypes.func.isRequired
}

export default DateTimeInputs
