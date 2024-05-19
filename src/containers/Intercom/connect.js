import { connect } from 'react-redux'
import Component from './Intercom.js'

export const mapState = ({
  auth,
  router
}) => ({
  user: auth.user || {},
  location: router.location
})

export const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Component)
