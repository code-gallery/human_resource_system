import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _truncate from 'lodash/truncate'
import Assets from './assets'
import './style.css'

const AvatarBig = (props) => {
  const { imageUrl, name, link, tagline } = props
  const image = (imageUrl && imageUrl.indexOf('https://') !== -1) ?
    imageUrl : Assets.placeholder
  const truncatedTagline = _truncate(tagline, 70)
  const truncatedName = _truncate(name, 70)
  return (
    <div className="AvatarBig">
      <img src={image} alt={name} />
      <p>
        <Link to={link} title={name}>
          {truncatedName}
        </Link>
        {tagline &&
          <span title={tagline}>
            {truncatedTagline}
          </span>
        }
      </p>
    </div>
  )
}

AvatarBig.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  tagline: PropTypes.string
}

export default AvatarBig
