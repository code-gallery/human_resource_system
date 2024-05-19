import { Component } from 'react'
import PropTypes from 'prop-types'
import { ROUTE_URL } from 'containers/constants'

class Logout extends Component {
  componentWillMount() {
    this.props.resetToken()
    this.props.history.push(ROUTE_URL.login)
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  resetToken: PropTypes.func.isRequired
}

export default Logout
