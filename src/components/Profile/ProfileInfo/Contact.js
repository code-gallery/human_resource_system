import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Contact = (props) => {
  const { active, onToggle, isMobile, editMode } = props
  const { public_email, twitter, website, mobile } = props.user

  if (!public_email && !twitter && !website && !mobile) {
    return null
  }

  let cssContainer = classNames('contact-drop-holder pull-right active', {
    'dropdown-active': active,
    'edit-mode': editMode
  })
  if (isMobile) {
    cssContainer = classNames('contact-drop-holder hidden-lg hidden-md contact-mobile-wrapper active', {
      'dropdown-active': active
    })
  }

  return (
    <div className={cssContainer}>
      <button
        className="btn blue-btn drop-btn"
        onClick={onToggle}
      >
        Contact
      </button>
      {
        active &&
        <ul className="nav-dropdown nav-dropdown-border contact-drop-nav">
          {
            public_email &&
            <li>
              <a className="c-email" href={`mailto:${public_email}`}>{public_email}</a>
            </li>
          }
          {
            twitter &&
            <li>
              <a className="c-tw" href={`https://twitter.com/${twitter}`}>{twitter}</a>
            </li>
          }
          {
            mobile &&
            <li>
              <a className="c-phone" href={`tel:${mobile}`}>{mobile}</a>
            </li>
          }
          {
            website &&
            <li>
              <a className="c-link" href={website}>{website}</a>
            </li>
          }
        </ul>
      }
    </div>
  )
}

Contact.propTypes = {
  editMode: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    twitter: PropTypes.string,
    mobile: PropTypes.string,
    website: PropTypes.string
  })
}

export default Contact
