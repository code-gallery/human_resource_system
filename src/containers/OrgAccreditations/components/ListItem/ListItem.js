import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getRoute } from 'containers/constants'
import './style.css'

const ListItem = ({ item, deleteAccreditation, awardTypes }) => {
  const statusLabel = (item.enabled) ? 'Active' : 'Inactive'

  const params = {
    orgId: item.organisation_id,
    id: item.id
  }
  const qrCodeUrl = getRoute('orgAccreditationQRCode', params)
  const editUrl = getRoute('orgAccreditationEdit', params)
  const membersUrl = getRoute('orgAccreditationMembers', params)

  return (
    <tr className="row ListItem">
      <td className="col-xs-12 col-md-2">
        <p>{item.name}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{(awardTypes[item.award_type] || {}).label}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{item.delivery_type || '–'}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{moment(item.created_at).format('MMMM Do YYYY')}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p>{statusLabel}</p>
      </td>
      <td className="col-xs-12 col-md-2">
        <p className="table-btn-holder">
          <Link to={qrCodeUrl} className="btn yellow-btn action-btn">
            QR code
          </Link>
        </p>
        <p className="table-btn-holder">
          <Link to={editUrl} className="btn blue-btn action-btn text-center">
            Edit
          </Link>
        </p>
        <p className="table-btn-holder">
          <Link to={membersUrl} className="btn green-btn action-btn text-center">
            Verified Users
          </Link>
        </p>
        <p className="table-btn-holder">
          <button
            className="btn red-btn action-btn"
            onClick={() => deleteAccreditation(item.id)}
          >
            Delete
          </button>
        </p>
      </td>
    </tr>
  )
}

ListItem.propTypes = {
  item: PropTypes.object,
  awardTypes: PropTypes.object,
  deleteAccreditation: PropTypes.func.isRequired
}

export default ListItem
