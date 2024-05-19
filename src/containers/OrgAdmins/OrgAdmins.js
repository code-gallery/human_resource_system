import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import ContentCard from 'components/ContentCard'
import LoadingIndicator from 'components/LoadingIndicator'
import AdminList from './components/AdminList'
import AdminForm from './components/AdminForm'
import './style.css'

class OrgAdmins extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }

  componentWillMount() {
    const { orgId } = this.props.match.params
    this.props.fetchOrgAdmins({ orgId })
    this.props.fetchOrgEmployees({ orgId })
  }

  componentWillReceiveProps(nextProps) {
    const filteredEmployees = this.filterEmployees(nextProps.orgAdmins.employees)

    if (filteredEmployees && !filteredEmployees.length) {
      this.setState({ showForm: false })
    }
  }

  filterEmployees = (employees) => {
    if (employees) {
      return employees.filter(item => {
        return item.biometrics_status === 'complete' && !item.admin
      })
    }
  }

  toggleForm = (e) => {
    e.preventDefault()
    const { showForm } = this.state
    this.setState({ showForm: !showForm })
  }

  renderPageLoading() {
    return (
      <Layout>
        <LoadingIndicator size="80" />
      </Layout>
    )
  }

  render() {
    const { showForm } = this.state
    const {
      orgAdmins: {
        admins,
        org: organisation,
        employees,
        pending
      },
      addAdmin,
      deleteAdmin
    } = this.props
    const { orgId } = this.props.match.params

    if (pending) {
      return this.renderPageLoading()
    }

    const link = ROUTE_URL.orgProfile.replace(':orgId', organisation.id)
    const filteredEmployees = this.filterEmployees(employees)

    return (
      <Layout>
        <div className="container">
          <PageTitle type="type2">
            <span>Contacts for <Link to={link}>{organisation.name}</Link></span>
          </PageTitle>

          <div className="row">
            <ContentCard>
              <div className="row">
                <div className="form-group">
                  {
                    !showForm && filteredEmployees.length > 0 &&
                    <button className="btn blue-btn" onClick={this.toggleForm}>
                      Manage Contacts
                    </button>
                  }
                </div>

                <AdminForm
                  showForm={showForm}
                  employees={filteredEmployees}
                  orgId={orgId}
                  addAdmin={addAdmin}
                  closeForm={this.toggleForm}
                />
              </div>

              <AdminList
                data={admins}
                deleteAdmin={deleteAdmin}
              />
            </ContentCard>
          </div>

        </div>
      </Layout>
    )
  }
}

OrgAdmins.propTypes = {
  orgAdmins: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  fetchOrgAdmins: PropTypes.func.isRequired,
  fetchOrgEmployees: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired,
  deleteAdmin: PropTypes.func.isRequired
}

export default OrgAdmins
