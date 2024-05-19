import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import './style.css'

class AccreditationQRCode extends Component {
  componentWillMount() {
    const { orgId, id } = this.props.match.params
    this.props.fetch({ orgId, id })
  }

  render() {
    const { pending, name, qrCode } = this.props.orgAccreditation
    if (pending === 'fetching') {
      return (
        <Layout>
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    return (
      <Layout>
        <PageTitle title={name} />
        <div className="container OrgAccreditationQRCode">
          <div className="row">
            <ContentCard className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <img src={qrCode} alt={name} />
            </ContentCard>
          </div>
          <div className="row text-center back-link">
            <Link to={ROUTE_URL.orgAccreditations.replace(':orgId', this.props.match.params.orgId)}>Back to Accreditations</Link>
          </div>
        </div>
      </Layout>
    )
  }
}

AccreditationQRCode.propTypes = {
  fetch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  orgAccreditation: PropTypes.shape({
    name: PropTypes.string,
    qrCode: PropTypes.string,
    pending: PropTypes.string
  })
}

export default AccreditationQRCode
