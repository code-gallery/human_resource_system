import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentCard from 'components/ContentCard'
import LoadingIndicator from 'components/LoadingIndicator'
import ListItem from '../ListItem'

class List extends Component {
  renderTable() {
    const { awards, awardTypes, deleteAccreditation } = this.props
    return (
      <table className="VerificationList">
        <thead className="hidden-sm hidden-xs">
          <tr className="row">
            <th className="col-xs-12 col-md-2">Name</th>
            <th className="col-xs-12 col-md-2">Type</th>
            <th className="col-xs-12 col-md-2">Delivery Type</th>
            <th className="col-xs-12 col-md-2">Created</th>
            <th className="col-xs-12 col-md-2">Status</th>
            <th className="col-xs-12 col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            awards.map((item, key) => {
              return (
                <ListItem
                  key={key}
                  item={item}
                  awardTypes={awardTypes}
                  deleteAccreditation={deleteAccreditation}
                />
              )
            })
          }
        </tbody>
      </table>
    )
  }

  render() {
    const { pending, awards } = this.props
    if (pending === 'fetching') {
      return (
        <ContentCard title="Current">
          <LoadingIndicator display="inline" />
        </ContentCard>
      )
    }

    return (
      <ContentCard title="Current">
        {awards.length === 0 &&
          <p>There are no accreditations at the moment</p>
        }
        {awards.length > 0 &&
          this.renderTable()
        }
      </ContentCard>
    )
  }
}

List.propTypes = {
  awards: PropTypes.array,
  awardTypes: PropTypes.object,
  deleteAccreditation: PropTypes.func.isRequired,
  pending: PropTypes.string
}

export default List
