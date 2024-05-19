import React, { Component } from 'react'
import BreadCrumb from 'components/BreadCrumb'
import WorkPassMain from 'components/WorkPassMain'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Layout from 'containers/Layout'
import DocumentTable from './components/DocumentTable'
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import Pagination from 'react-bootstrap/lib/Pagination'
import { Set } from 'immutable'

class OrganisationDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: JSON.parse(localStorage.getItem('companyName')),
      associatedOrgs: '',
      breadCrumbs: [
        {
          name: 'Company',
          url: `/organisations/${this.props.match.params.orgId}`,
          active: false
        },
        {
          name:'Documents',
          url: `/organisations/${this.props.match.params.orgId}/documents`,
          active: true
        }
      ],
      personaModal : false
    }
  }

  componentDidMount() {
    const orgId = this.getOrganisationId();
    this.props.fetchClientOrganisations(orgId);
    // this.props.fetchDocumentTable(orgId)
    this.fetchPeople(this.props)
    let breadCopy = JSON.parse(JSON.stringify(this.state.breadCrumbs))
    breadCopy[0].name = this.state.name;
    this.setState({
      breadCrumbs: breadCopy
    })
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.organisationDocument.data.length !== this.props.organisationDocument.data.length) {
      this.fetchPeople(this.props)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.fetchPeople(this.props)
    }
  }

  getOrganisationId(props = this.props) {
    return parseInt(props.match.params.orgId, 10)
  }

  fetchPeople(props) {
    const orgId = this.getOrganisationId();
    const { perPage, currentPage } = props.organisationDocument
    this.props.fetchDocumentTable({
      perPage,
      currentPage,
      orgId
    })
  }

  onSelectPage = (page) => {
    this.props.setCurrentPage(page)
  }

  addDocument = (data) => {
    this.props.addNewDocument(data,
      () => {
        notify.show('Document added successfully!!', 'success', NOTIFICATION_TIMEOUT);
        this.fetchPeople(this.props)
      },
      () => notify.show('Failed to add document!!', 'error', NOTIFICATION_TIMEOUT))
  }

  updateDocument = data => {
    this.props.updateDocument(data,
      () => notify.show('Document updated successfully!!', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to update document!!', 'error', NOTIFICATION_TIMEOUT))
  }

  edit = (data) => {
    this.props.editDocumentTable(data)
  }

  renderPagination() {
    const { total, currentPage, data, lastPage } = this.props.organisationDocument
    if (total > data.length) {
      return (
        <div className="text-center col-xs-12">
          <Pagination
            prev
            next
            ellipsis
            boundaryLinks
            maxButtons={4}
            activePage={currentPage}
            items={lastPage}
            onSelect={this.onSelectPage}
          />
        </div>
      )
    }
    return null
  }

  handleSearch = (searchQuery) => {
    this.props.searchDocuments(searchQuery)
  }

  render() {
    const orgId = this.getOrganisationId()
    const { associatedOrgs, organisationDocument } = this.props
    if (associatedOrgs !== undefined) {
      let options = associatedOrgs.map((org)=>{
        let properties = {
          value: JSON.stringify(org.id),
          text: org.name
        };
        return properties
      })
      options.push({ value: JSON.stringify(orgId), text: this.state.name })
      let jsonObject = options.map(JSON.stringify);
      let uniqueSet = new Set(jsonObject);
      var uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      //  console.log(uniqueArray)
      // let associatedOrgsOptions= associatedOrgs.map(org=>org.name)
      // associatedOrgsOptions.push(this.state.name)
      // associatedOrgsOptions=[...new Set(associatedOrgsOptions)]
      // var orgOptions= associatedOrgsOptions.map((org) => {
      //   let properties = {
      //     value: org,
      //     label: org
      //   };
      //    return properties
      //   })
      //   console.log(orgOptions)
    }

    return (
      <Layout showFooter={false} responsive={false}>
        <Notifications />
        <WorkPassSideMenu organisationId={orgId} />
        <WorkPassMain>
          <BreadCrumb links={this.state.breadCrumbs} className="workpass__breadcrumb"/>
          <div className="row">
            <div className="col-xs-12">
              <DocumentTable
                organisationId={orgId}
                edit={this.edit}
                organisationDocument={organisationDocument}
                addDocument={this.addDocument}
                orgOptions={uniqueArray}
                fetchUserPersona={this.props.fetchUserPersona}
                workPassPersonas={this.props.workPassPersonas}
                getDocPersona={this.props.getDocPersona}
                personaModal={this.state.personaModal}
                onSearch={this.handleSearch}
                updateDocument={this.updateDocument}
              />
            </div>
            {this.renderPagination()}
          </div>
        </WorkPassMain>
      </Layout>
    )
  }
}

OrganisationDocuments.propTypes = { }

export default OrganisationDocuments
