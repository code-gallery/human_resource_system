import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable max-len */
const Appii = ({ color, className }) => (
  <svg className={className} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color}
      d="M44,156 C28.536027,156 16,143.463973 16,128 C16,112.536027 28.536027,100 44,100 C59.463973,100 72,112.536027 72,128 L72,156 L44,156 Z M44,150.105263 L66.1052632,150.105263 L66.1052632,128 C66.1052632,115.7916 56.2083997,105.894737 44,105.894737 C31.7916003,105.894737 21.8947368,115.7916 21.8947368,128 C21.8947368,140.2084 31.7916003,150.105263 44,150.105263 Z M26.3665673,127.071057 L32.1597485,125.981574 C33.7125958,134.238633 37.761277,138.092554 44.8273599,138.309665 C49.2897633,138.446777 52.4883032,136.287156 54.8218027,132.382701 C55.6587806,130.982254 56.3133349,129.459714 56.7981447,127.935549 C57.0857817,127.031264 57.2482618,126.349163 57.3089183,126.008965 L63.1121343,127.043666 C63.0085691,127.624521 62.7870996,128.554263 62.4155532,129.722346 C61.8017242,131.652128 60.9713937,133.583535 59.8817351,135.406772 C56.5383203,141.001036 51.4867554,144.4118 44.6463244,144.201622 C34.6757726,143.895268 28.4086643,137.929637 26.3665673,127.071057 Z"
      transform="translate(-16 -100)"
    />
  </svg>
)
/* eslint-enable max-len */

Appii.propTypes = {
  color: PropTypes.string.isRequired,
  className: PropTypes.string
}

Appii.defaultProps = {
  className: ''
}

export default Appii
