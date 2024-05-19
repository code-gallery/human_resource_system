/* eslint max-len: 0 */
import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ color, className }) => (
  <svg className={className} viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
    <g id="Work-Pass-for-Orgs" fill="none" fillRule="evenodd">
      <g
        id="Candidates-/-Candidate-/-Reassign"
        transform="translate(-48 -112)"
        fill={color}
        fillRule="nonzero"
      >
        <g id="Group-2" transform="translate(26 95)">
          <path
            id="Shape"
            d="M38.8647083,32.3325833 L34.4695,27.937375 C35.296125,26.8005 35.784875,25.40225 35.784875,23.8920833 C35.784875,20.091875 32.693,17 28.8920833,17 C25.091875,17 22,20.091875 22,23.8920833 C22,27.693 25.091875,30.7841667 28.8920833,30.7841667 C30.3328333,30.7841667 31.670875,30.3400417 32.7787083,29.5814167 L37.1972917,34 L38.8647083,32.3325833 Z M24.0215833,23.8920833 C24.0215833,21.2060833 26.2067917,19.020875 28.8927917,19.020875 C31.5787917,19.020875 33.764,21.2060833 33.764,23.8920833 C33.764,26.5780833 31.5787917,28.7632917 28.8927917,28.7632917 C26.2060833,28.7632917 24.0215833,26.5780833 24.0215833,23.8920833 Z"
          />
        </g>
      </g>
    </g>
  </svg>
)

Search.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

Search.defaultProps = {
  className: ''
}

export default Search
