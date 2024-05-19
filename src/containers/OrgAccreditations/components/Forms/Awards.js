import React from 'react'
import PropTypes from 'prop-types'
import AccreditationsForm from './Form'

const Awards = (props) => {
  return <AccreditationsForm {...props} title="Award Details" />
}

Awards.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default Awards
