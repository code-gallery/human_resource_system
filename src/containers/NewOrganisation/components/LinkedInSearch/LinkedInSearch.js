import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isNil from 'lodash/isNil'
import _map from 'lodash/map'
import Form from 'components/Abstract/Form'
import LinkedInSearchResults from '../LinkedInSearchResults'
import Assets from './assets'
import './style.css'

class LinkedInSearch extends Form {
  constructor(props) {
    super(props)
    if (window.IN && window.IN.User) {
      window.IN.User.refresh()
    }
    this.state = {
      token: (window.IN && window.IN.ENV && window.IN.ENV.auth) ? window.IN.ENV.auth.oauth_token : '',
      showResults: false,
      pending: false,
      results: [],
      errors: []
    }
  }

  signIn = () => {
    window.IN.User.authorize(() => {
      this.setState({
        token: window.IN.ENV.auth.oauth_token
      })
    })
  }

  select = (item) => {
    const results = _map(this.state.results, (r) => {
      if (r.id === item.id) {
        r.selected = true
      }
      return r
    })

    this.setState({ results })
    this.props.save({ ...item })
  }

  search = (e) => {
    e.preventDefault()
    const { keywords, token } = this.state
    if (!_isNil(keywords) && keywords !== '') {
      this.setState({ showResults: false, pending: true })
      const fields = 'id,name,logo_url,website_url,specialties,employee-count-range,industries,twitter-id,founded-year'
      const searchBase = `company-search:(companies:(${fields}))`
      window.IN.API.Raw() // eslint-disable-line new-cap
        .url(`${searchBase}?keywords=${keywords}&oauth2_access_token=${token}&format=json&count=15`)
        .method('GET')
        .result((json) => {
          if (json.companies._total > 0) {
            this.setState({ results: json.companies.values, showResults: true, pending: false })
          } else {
            this.setState({ results: [], showResults: true, pending: false })
          }
        })
    } else {
      this.setState({
        errors: [ 'keywords' ]
      })
    }
  }

  render() {
    const { token, errors, results, showResults, pending } = this.state

    if (token === '') {
      return (
        <div className="LinkedInSearch">
          <p className="form-group">
            To use LinkedIn search, you first need to sign in and authorize APPII application.<br />
            The sign in form will open in a popup window. Please make sure your browser does not block it.
          </p>
          <p className="form-group">
            <img
              className="LinkedInSearch-signin"
              src={Assets.linkedIn}
              alt="Sign in with LinkedIn"
              onClick={this.signIn}
            />
          </p>
        </div>
      )
    }

    return (
      <div>
        <form>
          <h2 className="form-group">
            Search for an organisation
          </h2>
          <div
            className={classNames('form-group', {
              'has-error': errors.indexOf('keywords') !== -1
            })}
          >
            <input
              placeholder="Enter a name"
              name="keywords"
              type="text"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <button
              className="form-btn save"
              onClick={this.search}
              disabled={pending}
            >
              {(pending) ? 'Searching' : 'Search'}
            </button>
          </div>
        </form>
        {showResults &&
          <LinkedInSearchResults results={results} select={this.select} />
        }
      </div>
    )
  }
}

LinkedInSearch.propTypes = {
  save: PropTypes.func.isRequired
}

export default LinkedInSearch
