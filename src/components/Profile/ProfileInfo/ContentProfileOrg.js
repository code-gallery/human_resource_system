import React from 'react'
import PropTypes from 'prop-types'
import _trimEnd from 'lodash/trimEnd'

const ContentProfileOrg = (props) => {
  const { name, town, country, industries, company_size, year_founded, admins } = props.data
  const cssHasAdmin = (admins && admins.length > 0) ? 'organisations-verified' : ''
  let text = ''
  if (industries) {
    text += `${industries}, `
  }
  if (company_size) {
    text += `${company_size}, `
  }
  if (year_founded) {
    text += year_founded
  }
  text = _trimEnd(text.trim(), ',')

  return (
    <p>
      <em className={cssHasAdmin}>&nbsp;</em>
      {name}
      {town && country &&
        <i className="hidden-xs hidden-sm">{town}, {country}</i>
      }
      {text !== '' &&
        <span>{text}</span>
      }
      {town && country &&
        <i className="hidden-md hidden-lg">{town}, {country}</i>
      }
    </p>
  )
}

ContentProfileOrg.propTypes = {
  data: PropTypes.shape({
    admins: PropTypes.array,
    name: PropTypes.string,
    country: PropTypes.string,
    town: PropTypes.string,
    industries: PropTypes.string,
    company_size: PropTypes.string
  })
}

export default ContentProfileOrg
