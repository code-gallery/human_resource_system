import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/lib/Pagination'
import Form from 'components/Abstract/Form'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import SearchBar from 'components/SearchBar'
import AvatarBig from 'components/AvatarBig'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

class Organisations extends Form {
  constructor(props) {
    super(props)
    this.state = {
      q: ''
    }
  }

  componentWillMount() {
    this.fetchOrganisations(this.props)

    if (this.props.location.search && this.props.location.search.indexOf('?id=') !== -1) {
      // this is for instagram integration for Profile and Org Profile page
      let organisationLink = ROUTE_URL.orgProfile
      organisationLink = organisationLink.replace(':orgId', this.props.location.search.substring(4))
      this.props.history.push(organisationLink + this.props.location.hash)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organisations } = nextProps
    const current = this.props.organisations

    if (current.currentPage !== organisations.currentPage ||
      current.q !== organisations.q
    ) {
      this.fetchOrganisations(nextProps)
    }
  }

  fetchOrganisations(props) {
    const { perPage, currentPage, q } = props.organisations
    this.props.fetch({
      perPage,
      currentPage,
      q
    })
  }

  onSearch = (event) => {
    event.preventDefault()
    const { q } = this.state
    this.props.setSearchQuery(q)
  }

  onSelectPage = (page) => {
    this.props.setCurrentPage(page)
  }

  clearSearch = () => {
    this.props.setSearchQuery('')
    this.setState({
      q: ''
    })
  }

  renderOrganisations() {
    const { q } = this.state
    const { data } = this.props.organisations

    if (q !== '' && data.length === 0) {
      return (
        <div className="Organisations-new-org col-xs-12">
          <p>Unfortunately, there are no results for your search.</p>
          <p>Do you want to <Link to={ROUTE_URL.newOrganisation}>add a new organisation?</Link></p>
        </div>
      )
    }

    return data.map((item, index) => {
      const link = `${ROUTE_URL.organisations}/${item.id}`
      return (
        <div key={index} className="col-xs-6 col-sm-4 col-md-2">
          <AvatarBig
            imageUrl={item.logo_image}
            link={link}
            name={item.name}
          />
        </div>
      )
    })
  }

  renderPagination() {
    const { total, currentPage, data, lastPage, q } = this.props.organisations
    if (q === '' && total > data.length) {
      return (
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
      )
    }
    return null
  }

  render() {
    const query = this.props.organisations.q
    const { q } = this.state
    return (
      <Layout>
        <PageTitle title="Organisations" />
        <div className="Organisations">
          <div className="container">
            <SearchBar
              placeholder="Search organisations"
              onChangeInput={this.onChangeInput}
              onSubmit={this.onSearch}
              clear={this.clearSearch}
              query={query}
              q={q}
            />
            <div className="row">
              <div className="col-xs-12">
                {this.renderOrganisations()}
              </div>
              <div className="text-center col-xs-12">
                {this.renderPagination()}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

Organisations.propTypes = {
  organisations: PropTypes.shape({
    total: PropTypes.number,
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    lastPage: PropTypes.number,
    q: PropTypes.string,
    data: PropTypes.array
  }),
  fetch: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired
}

export default Organisations
