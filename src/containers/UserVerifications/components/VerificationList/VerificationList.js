import React from 'react'
import PropTypes from 'prop-types'
import VerificationItem from '../VerificationItem'
import './style.css'

const VerificationList = (props) => {
  const { data, showOrganisation } = props
  const tdLabel = (showOrganisation) ? 'Organisation' : 'User'

  if (data.length === 0) {
    return (
      <div>
        There are no verifications at the moment.
      </div>
    )
  }

  return (
    <table className="VerificationList">
      <thead className="hidden-sm hidden-xs">
        <tr className="row">
          <th className="col-xs-12 col-md-2 VerificationList-org">{tdLabel}</th>
          <th className="col-xs-12 col-md-2 text-center">Type</th>
          <th className="col-xs-12 col-md-3">Details</th>
          <th className="col-xs-12 col-md-3">Status</th>
          <th className="col-xs-12 col-md-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            return (
              <VerificationItem
                key={index}
                item={item}
                showOrganisation={showOrganisation}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}

VerificationList.defaultProps = {
  showOrganisation: true
}

VerificationList.propTypes = {
  data: PropTypes.array,
  showOrganisation: PropTypes.bool
}

export default VerificationList
