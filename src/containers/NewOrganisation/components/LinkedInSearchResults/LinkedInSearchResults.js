import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/Avatar'
import './style.css'

const LinkedInSearchResults = (props) => {
  const { results, select } = props

  if (results.length === 0) {
    return (
      <p>There are no results.</p>
    )
  }

  return (
    <div className="LinkedInSearchResults">
      <h3 className="ContentCard-title">Search results</h3>
      <table className="VerificationList">
        <thead className="hidden-sm hidden-xs">
          <tr>
            <th className="col-xs-12 col-md-3">Organisation</th>
            <th className="col-xs-12 col-md-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            results.map((item) => {
              return (
                <tr className="VerificationItem" key={item.id}>
                  <td className="col-xs-12 col-md-3">
                    <Avatar
                      size="45"
                      theme="blue"
                      label={item.name}
                      imageUrl={item.logoUrl}
                    />
                  </td>
                  <td className="col-xs-12 col-md-3 text-center">
                    {
                      item.selected ?
                        <span className="selected">Organisation registered</span> :
                        <button
                          className="btn green-btn"
                          onClick={() => {
                            select(item)
                          }}
                        >
                          Select
                        </button>
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

LinkedInSearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
}

export default LinkedInSearchResults
