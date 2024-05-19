import React from 'react'
import PropTypes from 'prop-types'
import AdminItem from '../AdminItem'
import 'containers/UserVerifications/style.css'

const AdminList = ({ data, deleteAdmin }) => {

  if (data.length === 0) {
    return (
      <div>
        There are no admins at the moment.
      </div>
    )
  }

  return (
    <table className="VerificationList">
      <thead className="hidden-sm hidden-xs">
        <tr className="row">
          <th className="col-xs-12 col-md-4 VerificationList-org">User</th>
          <th className="col-xs-12 col-md-4">Primary Contact?</th>
          <th className="col-xs-12 col-md-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => {
            return (
              <AdminItem
                key={index}
                item={item}
                deleteAdmin={deleteAdmin}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}

AdminList.propTypes = {
  data: PropTypes.array,
  deleteAdmin: PropTypes.func
}

export default AdminList
