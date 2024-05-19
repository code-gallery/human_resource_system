import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

class SearchBox extends Component {
  state = {
    value: '',
    changeSearchValue: true
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.setSearchObj ? 
    this.props.onSearch({search: this.state.value}) :
    this.props.onSearch(this.state.value)
    this.setState({
      changeSearchValue: true,
    })
  }

  componentDidUpdate() {
    if(this.props.searchCandidate && this.state.changeSearchValue && this.props.setSearchObj){
      if (this.state.value !== this.props.searchCandidate) {
        this.setState({
          value: this.props.searchCandidate
        })
      }
    } else if(!this.props.searchCandidate && this.state.value && this.state.changeSearchValue && this.props.setSearchObj){
      this.setState({
        value: ''
      })
    }
    if(this.props.loading && !this.state.changeSearchValue && this.props.setSearchObj){
      this.setState({
      changeSearchValue: true,
    })
    }
  }

  handleChange = e => {
    this.setState({
      value: this.props.setSearchObj ? e.target.value : this.input.value,
      changeSearchValue: false,
    })
  }

  getInput = (elem) => {
    this.input = elem
  }

  render() {
    const { placeholder, className } = this.props
    let candidatesPath = '';
    if(this.state.value && this.props.setSearchObj) {
      candidatesPath = ROUTE_URL[this.props.closePath].replace(':orgId', this.props.organisationId)
    }

    return (
      <form className={`SearchBox ${className}`} onSubmit={this.handleSubmit}>
        <label>
          <span className="SearchBox__icon">
            <Icon type="search" color="#7F8DAA" />
          </span>
          <input
            className="SearchBox__input"
            type="text"
            value={this.state.value}
            placeholder={placeholder}
            onChange={this.handleChange}
            ref={this.getInput}
          />
          { this.state.value && this.props.setSearchObj ? 
          <span className="Close__icon" onClick={() => this.setState({
            value: ''
          })} >
            <NavLink
              to={candidatesPath}
              exact
            >
              <Icon type="close" color="#7F8DAA" />
            </NavLink>
          </span> : 
          null }
        </label>
      </form>
    )
  }
}

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string
}

SearchBox.defaultProps = {
  placeholder: 'Search',
  className: ''
}

export default SearchBox
