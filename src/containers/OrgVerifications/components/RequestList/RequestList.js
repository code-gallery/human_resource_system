import React from 'react'
import PropTypes from 'prop-types'
import RequestItem from '../RequestItem'
import 'containers/UserVerifications/style.css'

const RequestList = (props) => {
  const { data, onVerify, onReject } = props

  if (data.length === 0) {
    return (
      <div>
        There are no requests at the moment.
      </div>
    )
  }

  return (
    <table className="VerificationList">
      <thead className="hidden-sm hidden-xs">
        <tr className="row">
          <th className="col-xs-12 col-md-3 VerificationList-org">User</th>
          <th className="col-xs-12 col-md-2 text-center">Type</th>
          <th className="col-xs-12 col-md-4">Details</th>
          <th className="col-xs-12 col-md-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            return (
              <RequestItem
                key={index}
                item={item}
                onVerify={onVerify}
                onReject={onReject}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}

RequestList.propTypes = {
  data: PropTypes.array,
  onVerify: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
}

export default RequestList
