import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-bootstrap/lib/Pagination'
import Form from 'components/Abstract/Form'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import SearchBar from 'components/SearchBar'
import AvatarBig from 'components/AvatarBig'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

class People extends Form {
  constructor(props) {
    super(props)
    this.state = {
      q: ''
    }
  }

  componentWillMount() {
    this.fetchPeople(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { people } = nextProps
    const current = this.props.people

    if (current.currentPage !== people.currentPage ||
      current.q !== people.q
    ) {
      this.fetchPeople(nextProps)
    }
  }

  fetchPeople(props) {
    const { perPage, currentPage, q } = props.people
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

  renderPeople() {
    const { data } = this.props.people
    return data.map((item, index) => {
      const link = (item.unique_key) ?
        `${ROUTE_URL.profile}/${item.unique_key}` :
        `${ROUTE_URL.profile}/${item.id}`
      return (
        <div key={index} className="col-xs-6 col-sm-4 col-md-2">
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

  renderPagination() {
    const { total, currentPage, data, lastPage, q } = this.props.people
    if (q === '' && total > data.length) {
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

  render() {
    const query = this.props.people.q
    const { q } = this.state

    return (
      <Layout>
        <PageTitle title="People" />
        <div className="People">
          <div className="container">
            <SearchBar
              placeholder="Search people"
              onChangeInput={this.onChangeInput}
              onSubmit={this.onSearch}
              clear={this.clearSearch}
              query={query}
              q={q}
            />
            <div className="row">
              <div className="col-xs-12">
                {this.renderPeople()}
              </div>
              {this.renderPagination()}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

People.propTypes = {
  people: PropTypes.shape({
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

export default People
