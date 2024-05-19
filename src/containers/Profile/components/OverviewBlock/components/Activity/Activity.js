import React from 'react'
import PropTypes from 'prop-types'
import ActivityItem from '../ActivityItem'
import './style.css'

const Activity = ({ activities, editMode }) => (
  <div className={`Activity ${editMode ? 'edit-mode' : ''}`}>
    <p className="Activity-title">Activity</p>
    <ul>
      {
        activities && activities.map((activity, idx) => (
          <ActivityItem
            {...activity}
            key={idx}
          />
        ))
      }
      {!activities.length && (
        <p>No activities yet</p>
      )}
    </ul>
  </div>
)

Activity.propTypes = {
  activities: PropTypes.array,
  editMode: PropTypes.bool
}

export default Activity
