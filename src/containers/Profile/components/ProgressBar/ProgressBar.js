import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const ProgressBar = (props) => {
  const range = parseInt(props.range, 10)
  let divider = 100 / range
  divider = (divider) || 20
  let proficiency = parseInt(props.proficiency, 10)
  if (proficiency > range) {
    // stop value getting out of range
    proficiency = range
  }
  const progressStyle = {
    width: (proficiency * divider).toString() + '%'
  }
  return (
    <div className="ProgressBar">
      <div style={progressStyle} className="progress"></div>
    </div>
  )
}

ProgressBar.defaultProps = {
  range: 5
}

ProgressBar.propTypes = {
  proficiency: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  range: PropTypes.number
}

export default ProgressBar
