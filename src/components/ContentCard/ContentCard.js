import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const ContentCard = (props) => (
  <div className={`ContentCard col-xs-12 ${props.className}`}>
    <div className="ContentCard-wrapper">
      {props.title &&
        <h3 className="ContentCard-title">{props.title}</h3>
      }
      {props.children}
    </div>
  </div>
)

ContentCard.defaultProps = {
  className: ''
}

ContentCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.bool
  ])
}

export default ContentCard
