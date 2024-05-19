import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notifications, { notify } from 'react-notify-toast'
import Layout from 'containers/Layout'
import { NOTIFICATION_TIMEOUT, ROUTE_URL } from 'containers/constants'
import PageTitle from 'components/PageTitle'
import LoadingIndicator from 'components/LoadingIndicator'
import ContentCard from 'components/ContentCard'
import AccreditationsForm from 'containers/OrgAccreditations/components/AccreditationsForm'

class OrgAccreditationEdit extends Component {
  componentWillMount() {
    const { orgId, id } = this.props.match.params
    this.props.fetch({ orgId, id })
  }

  componentWillReceiveProps(nextProps) {
    const nextOrgAccr = nextProps.orgAccreditation
    const orgAccr = this.props.orgAccreditation
    if (orgAccr.errorMsg !== nextOrgAccr.errorMsg && nextOrgAccr.errorMsg !== null) {
      this.notifyFn(nextOrgAccr.errorMsg, 'error')
    } else if (orgAccr.successMsg !== nextOrgAccr.successMsg && nextOrgAccr.successMsg !== null) {
      this.notifyFn(nextOrgAccr.successMsg, 'success')
    }
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, NOTIFICATION_TIMEOUT)
  }

  save = (data) => {
    delete data.userAwards
    const { orgId } = this.props.match.params
    this.props.saveAccreditation({ orgId, data })
  }

  cancel = () => {
    const { orgId } = this.props.match.params
    let accrediationLink = ROUTE_URL.orgAccreditations
    accrediationLink = accrediationLink.replace(':orgId', orgId)
    this.props.history.push(accrediationLink)
  }

  render() {
    const { orgAccreditation } = this.props
    const { pending, name } = orgAccreditation
    if (pending === 'fetching') {
      return (
        <Layout>
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    if (pending !== '') {
      return (
        <Layout>
          <Notifications />
          <PageTitle title={name} />
          <div className="container">
            <div className="row">
              <ContentCard title="Edit" className="AccreditationsForm">
                <AccreditationsForm
                  editMode={true}
                  award={orgAccreditation}
                  save={this.save}
                  cancel={this.cancel}
                />
              </ContentCard>
            </div>
          </div>
        </Layout>
      )
    }

    return null
  }
}

OrgAccreditationEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  fetch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  orgAccreditation: PropTypes.shape({
    name: PropTypes.string,
    pending: PropTypes.string
  }),
  saveAccreditation: PropTypes.func.isRequired
}

export default OrgAccreditationEdit
