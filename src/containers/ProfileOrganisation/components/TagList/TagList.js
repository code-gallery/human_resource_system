import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const TagList = (props) => {
  const { tags } = props
  if (tags.length === 0) {
    return null
  }

  return (
    <ul className="TagList">
      {
        tags.map((item, key) => {
          return (
            <li key={key}>{item}</li>
          )
        })
      }
    </ul>
  )
}

TagList.propTypes = {
  tags: PropTypes.array.isRequired
}

export default TagList
