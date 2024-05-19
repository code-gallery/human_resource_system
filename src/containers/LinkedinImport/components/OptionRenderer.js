import React from 'react'
import PropTypes from 'prop-types'

const OptionRenderer = (props) => {
  return (
    <div className="institution-select">
      <img src={props.logo_image ? props.logo_image : '/images/appii-placeholder.png'} alt={props.name} />
      <p>{props.name}</p>
      <span>{props.country}</span>
    </div>
  )
}

OptionRenderer.propTypes = {
  logo_image: PropTypes.string,
  name: PropTypes.string,
  country: PropTypes.string
}

export default OptionRenderer
