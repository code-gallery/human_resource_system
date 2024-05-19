import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ROUTE_URL } from 'containers/constants'
import ContentCard from 'components/ContentCard'
import AvatarBig from 'components/AvatarBig'

const Students = ({ organisation, editMode }) => {
  const { students } = organisation
  const css = classNames({ 'edit-mode': editMode })

  if (students.length === 0) {
    return null
  }

  return (
    <ContentCard className={css} title="Verified Students">
      <div className="row">
        {
          students.map((item, index) => {
            const link = (item.unique_key) ?
              `${ROUTE_URL.profile}/${item.unique_key}` :
              `${ROUTE_URL.profile}/${item.id}`
            return (
              <div key={index} className="col-xs-6 col-sm-4">
                <AvatarBig
                  imageUrl={item.profile_image}
                  link={link}
                  name={`${item.first_name} ${item.last_name}`}
                  tagline={item.tagline}
                />
              </div>
            )
          })
        }
      </div>
    </ContentCard>
  )
}

Students.propTypes = {
  editMode: PropTypes.bool,
  organisation: PropTypes.shape({
    students: PropTypes.array
  })
}

export default Students
