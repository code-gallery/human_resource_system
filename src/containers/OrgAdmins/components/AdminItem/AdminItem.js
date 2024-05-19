import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/Avatar'
import 'containers/UserVerifications/style.css'

const AdminItem = ({ item, deleteAdmin }) => {
  const name = `${item.user.first_name} ${item.user.last_name}`

  const onClickHandler = (e) => {
    e.preventDefault()
    deleteAdmin({
      orgId: item.organisation_id,
      adminId: item.id,
      userId: item.user.id
    })
  }

  return (
    <tr className="VerificationItem">
      <td className="col-xs-12 col-md-4">
        <Avatar
          size="45"
          theme="blue"
          label={name}
          imageUrl={item.user.profile_image}
        />
      </td>
      <td className="col-xs-12 col-md-4">
        <p>{item.primary ? 'Yes' : 'No'}</p>
      </td>
      <td className="col-xs-12 col-md-4">
        <button
          data-reject="true"
          className="btn red-btn"
          onClick={onClickHandler}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

AdminItem.propTypes = {
  item: PropTypes.object,
  deleteAdmin: PropTypes.func
}

export default AdminItem
