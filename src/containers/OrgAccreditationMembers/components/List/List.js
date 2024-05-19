import React from 'react'
import PropTypes from 'prop-types'
import _isNil from 'lodash/isNil'
import ListItem from '../ListItem'
import 'containers/UserVerifications/style.css'

const List = (props) => {
  const { data } = props

  if (_isNil(data) || (data && data.length === 0)) {
    return (
      <div>
        There are no verified users for this accreditation yet.
      </div>
    )
  }

  return (
    <table className="VerificationList">
      <thead className="hidden-sm hidden-xs">
        <tr className="row">
          <th className="col-xs-12 col-md-2 VerificationList-org">User</th>
          <th className="col-xs-12 col-md-2">Date</th>
          <th className="col-xs-12 col-md-4">Time</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            return (
              <ListItem
                key={index}
                item={item}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}

List.propTypes = {
  data: PropTypes.array
}

export default List
