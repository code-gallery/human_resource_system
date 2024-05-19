import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Avatar from 'components/Avatar'
import { getRoute } from 'containers/constants'
import 'containers/UserVerifications/style.css'

const ListItem = (props) => {
  const { item } = props
  const name = `${item.user.first_name} ${item.user.last_name}`
  const created = moment(item.created_at)
  const date = created.format('MMM Do YYYY')
  const time = created.format('h:mm')

  return (
    <tr className="VerificationItem">
      <td className="col-xs-12 col-md-2">
        <Link to={getRoute('userProfile', { uid: item.user.unique_key })}>
          <Avatar
            size="45"
            theme="blue"
            label={name}
            imageUrl={item.user.profile_image}
          />
        </Link>
      </td>
      <td className="col-xs-12 col-md-2">
        {date}
      </td>
      <td className="col-xs-12 col-md-4">
        {time}
      </td>
    </tr>
  )
}

ListItem.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.object,
    date: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    time: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    location: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  })
}

export default ListItem
