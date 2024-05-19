import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const SearchBar = (props) => {
  const { onChangeInput, onSubmit, clear,
    placeholder, name, query, q
  } = props

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 col-md-offset-2">
        <form className="SearchBar" onSubmit={onSubmit}>
          <input type="text"
            name={name}
            value={q}
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        </form>
        {
          query !== '' &&
          <div className="SearchBar-query clearfix">
            <span className="pull-left">
              Searched for &quot;{query}&quot;
            </span>
            <span className="pull-right">
              <button className="border-btn" onClick={clear}>
                Clear search
              </button>
            </span>
          </div>
        }
      </div>
    </div>
  )
}

SearchBar.defaultProps = {
  name: 'q'
}

SearchBar.propTypes = {
  clear: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  q: PropTypes.string.isRequired,
  name: PropTypes.string
}

export default SearchBar
