import React from 'react'
import PropTypes from 'prop-types'
import Loader from 'components/Loader'
import './style.css'

const LoadingIndicator = (props) => {
  const { size, display } = props

  return (
    <div className={`LoadingIndicator LoadingIndicator-${display}`}>
      <Loader size={size} color="#FF6700" />
    </div>
  )
}

LoadingIndicator.defaultProps = {
  size: '40',
  display: 'block'
}

LoadingIndicator.propTypes = {
  size: PropTypes.string,
  display: PropTypes.string
}

export default LoadingIndicator
