import React from 'react'
import moment from 'moment'
import Select from 'react-select'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './style.css'

function parseDate(date) {
  if (date) {
    const check = moment(date, 'YYYY/MM/DD')
    return {
      month: {
        value: check.format('MM'),
        text: check.format('MMMM')
      },
      year: check.format('YYYY'),
      day: check.format('D')
    }
  } else {
    return {
      month: '',
      year: ''
    }
  }
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...parseDate(this.props.date),
      displayDropdown: false,
      isPresentJob: false
    }
    this.months = [
      { text: 'January', value: '01' },
      { text: 'February', value: '02' },
      { text: 'March', value: '03' },
      { text: 'April', value: '04' },
      { text: 'May', value: '05' },
      { text: 'June', value: '06' },
      { text: 'July', value: '07' },
      { text: 'August', value: '08' },
      { text: 'September', value: '09' },
      { text: 'October', value: '10' },
      { text: 'November', value: '11' },
      { text: 'December', value: '12' }
    ]
  }

  componentWillMount () {
    if (this.props.date === '0000-00-00' || !this.props.date) {
      // is only a present job when related to endDate, not startDate etc
      const isPresentJob = this.props.endDate
      this.setState({ isPresentJob }, () => {
        const now = moment()
        this.handleChange(this.months[now.month()], 'month')
        this.handleChange(now.year(), 'year')
      })
    }
  }

  handleChange = (value, title) => {
    this.setState({
      [title]: value
    }, () => {
      if (this.state.month && this.state.year) {
        const date = this.state.isPresentJob ? null : `${this.state.year}-${this.state.month.value}-01`
        this.props.handleDate(date, this.props.title)
      }
    })
  }

  onTextChange = (title, event) => {
    this.props.onFieldChange(title, event.target.value)
  }

  handleSetPresentJob = (e) => {
    const isPresentJob = e.target.checked
    this.setState({ isPresentJob }, () => {
      if (isPresentJob) {
        const now = moment()
        this.handleChange(this.months[now.month()], 'month')
        this.handleChange(now.year(), 'year')
      }
    })
  }

  renderDate = () => {
    const { year, month, isPresentJob } = this.state
    if (year && month) {
      return isPresentJob ? 'Present' : moment(`${year}-${month.value}-01`).format('MMMM YYYY')
    }
    return ''
  }

  calculateYears() {
    const array = []
    const current_year = (new Date()).getFullYear()
    for (let i = 0; i < 100; i++) {
      array.push({ text: (current_year - i).toString() })
    }
    return array
  }

  renderDropdown() {
    this.setState({
      displayDropdown: !this.state.displayDropdown
    })
  }

  render() {
    const { month, year, displayDropdown, isPresentJob } = this.state
    const years = this.calculateYears()
    const cssDateLabel = classNames({ 'required-error': this.props.invalid })
    // It is for conflicting labels
    const uniqueID = Math.random()
    return (
      <div className="form-group">
        <label className={cssDateLabel}>{this.props.label}</label>
        <div className="select double-select active" onClick={this.renderDropdown.bind(this)}>
          <span>{this.renderDate()}</span>
        </div>
        {displayDropdown && (
          <div className="form-group double-date-select">
            <Select
              name="select-content"
              options={this.months}
              labelKey="text"
              valueKey="text"
              value={{ text: month ? month.text : '' }}
              onChange={v => this.handleChange(v, 'month')}
              disabled={isPresentJob} />
            <Select
              name="select-content"
              options={years}
              labelKey="text"
              valueKey="text"
              value={{ text: year || '' }}
              onChange={v => this.handleChange(v.text, 'year')}
              disabled={isPresentJob} />
            {this.props.endDate && (
              <div className="form-checkbox DatePicker-checkbox">
                <input
                  name="present"
                  type="checkbox"
                  id={uniqueID}
                  checked={isPresentJob}
                  onChange={this.handleSetPresentJob}
                />
                <label htmlFor={uniqueID}>Present</label>
              </div>
            )}
          </div>
        )}

      </div>
    )
  }
}

DatePicker.defaultProps = {
  endDate: false
}

DatePicker.propTypes = {
  invalid: PropTypes.bool,
  label: PropTypes.string,
  title: PropTypes.string,
  onFieldChange: PropTypes.func,
  handleDate: PropTypes.func,
  date: PropTypes.string,
  endDate: PropTypes.bool
}

export default DatePicker
