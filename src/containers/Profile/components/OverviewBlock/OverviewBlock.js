import React from 'react'
import PropTypes from 'prop-types'
import Overview from './components/Overview'
import Activity from './components/Activity'
import EditProfile from './components/EditProfile'

const OverviewBlock = (props) => {
  const {
    editMode,
    user,
    onChangeProfileField,
    activities,
    ...rest
  } = props

  const invalidFields = []
  if (user.first_name === '') {
    invalidFields.push('first_name')
  }
  if (user.last_name === '') {
    invalidFields.push('last_name')
  }

  return (
    <div className="col-xs-12 col-md-4">
      <div className="hidden-sm hidden-xs">
        {editMode &&
          <EditProfile
            onChangeProfileField={onChangeProfileField}
            user={user}
            invalidFields={invalidFields}
          />
        }
      </div>
      <Overview
        {...rest}
        editMode={editMode}
      />
      <Activity
        activities={activities}
        editMode={editMode}
      />
    </div>
  )
}

OverviewBlock.propTypes = {
  editMode: PropTypes.bool,
  user: PropTypes.object,
  onChangeProfileField: PropTypes.func,
  activities: PropTypes.array
}

export default OverviewBlock
