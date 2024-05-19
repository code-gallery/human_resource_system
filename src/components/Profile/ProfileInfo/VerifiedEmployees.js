import React from 'react'
import PropTypes from 'prop-types'
import _filter from 'lodash/filter'
import _reverse from 'lodash/reverse'
import _take from 'lodash/take'
import Avatar from 'components/Avatar'

const VerifiedEmployees = (props) => {
  const { employees } = props
  const confirmedEmployees = _filter(employees, { confirmed: 1 })
  const last4Employees = _take(_reverse(confirmedEmployees), 4)

  if (confirmedEmployees.length === 0) {
    return null
  }

  return (
    <div className="col-xs-12 col-md-3 hidden-sm hidden-xs organisations-verified-employees">
      <ul className="verified-employees">
        {last4Employees.map((item, index) => {
          return (
            <li key={index}>
              <Avatar
                imageUrl={item.profile_image}
              />
            </li>
          )
        })}
      </ul>
      {confirmedEmployees.length === 1 &&
        <p>1 Verified Employee</p>
      }
      {confirmedEmployees.length > 1 &&
        <p>{confirmedEmployees.length} Verified Employees</p>
      }
    </div>
  )
}

VerifiedEmployees.propTypes = {
  employees: PropTypes.array
}

export default VerifiedEmployees
