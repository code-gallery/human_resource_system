import React from 'react'
import PropTypes from 'prop-types'
import AccreditationsForm from './Form'

const Achievements = (props) => {
  return <AccreditationsForm {...props} title="Achievement Details" />
}

Achievements.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
}

export default Achievements
