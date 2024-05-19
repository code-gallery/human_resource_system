import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './style.css'

const BreadCrumb = ({ links, className, requestId }) => ( 
  <ul className={`Breadcrumb ${className}`}>
    {links.map((link, idx) => (
      <li key={idx} className="Breadcrumb__list">
        {/* <a
          href={link.url}
          className={classNames('Breadcrumb__item', { 'is-active': link.active })}
          onClick={(requestId) => passid(requestId)}
        >
          {link.name}
        </a> */}
    <Link 
    to={{
      pathname: link.url,
      state: { 'requestId': requestId,
                'redirectTo': link.redirectTo}
    }} 
    className={classNames('Breadcrumb__item', { 'is-active': link.active })}>
      {link.name}
    </Link>
      </li>
    ))}
  </ul> 
)

BreadCrumb.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  })).isRequired,
  className: PropTypes.string,
  requestId: PropTypes.number,
}

BreadCrumb.defaultProps = {
  className: ''
}

export default BreadCrumb
