import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ROUTE_URL } from 'containers/constants'
import ContentCard from 'components/ContentCard'
import AvatarBig from 'components/AvatarBig'

class Employees extends Component {
  renderEmployees() {
    const { employees } = this.props.organisation
    if (employees.length === 0) {
      return (
        <p>There are no employees at the moment.</p>
      )
    }

    return (
      <div className="row">
        {
          employees.map((item, index) => {
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
    )
  }

  render() {
    const { editMode } = this.props
    const css = classNames({ 'edit-mode': editMode })

    return (
      <ContentCard className={css} title="Verified Employees">
        {this.renderEmployees()}
      </ContentCard>
    )
  }
}

Employees.propTypes = {
  editMode: PropTypes.bool,
  organisation: PropTypes.shape({
    employees: PropTypes.array
  })
}

export default Employees
