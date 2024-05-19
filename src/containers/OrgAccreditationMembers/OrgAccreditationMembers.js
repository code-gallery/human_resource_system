import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getRoute } from 'containers/constants'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import List from './components/List'

class OrgAccreditationMembers extends Component {
  componentWillMount() {
    const { orgId, id } = this.props.match.params
    this.props.fetch({ orgId, id })
  }

  render() {
    const { pending, name, userAwards } = this.props.orgAccreditation
    if (pending === 'fetching') {
      return (
        <Layout>
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    return (
      <Layout>
        <div className="container">
          <PageTitle type="type2">
            <span>Verified Users for <Link to={getRoute('orgAccreditations', { orgId: this.props.match.params.orgId })}>{name}</Link></span>
          </PageTitle>
          <div className="row">
            <ContentCard>
              <List data={userAwards} />
            </ContentCard>
          </div>
        </div>
      </Layout>
    )
  }
}

OrgAccreditationMembers.propTypes = {
  fetch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  orgAccreditation: PropTypes.shape({
    name: PropTypes.string,
    userAwards: PropTypes.array,
    pending: PropTypes.string
  })
}

export default OrgAccreditationMembers
