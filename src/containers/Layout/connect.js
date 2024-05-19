import { connect } from 'react-redux'
import { isLoaded, belongsToOrg } from 'store/auth'
import { setMobileNavActive } from 'store/navigation'
import { setEditMode } from 'store/layout'
import { ROUTE_URL } from 'containers/constants'
import Component from './Layout.js'

export const mapState = ({
  auth,
  router,
  navigation,
  layout
}) => {
  const match = (router && router.location) ? router.location.pathname.match(/\/organisations\/[0-9]+/) : null
  const isOrgProfilePage = (router && router.location && match) ? (router.location.pathname === match[0]) : false
  const orgId = (router && router.location) ? parseInt(router.location.pathname.split('/organisations/')[1], 10) : ''
  const canEdit = (router && router.location && router.location.pathname === ROUTE_URL.profile) ||
    (belongsToOrg({ auth }, orgId) && isOrgProfilePage)

  return {
    token: auth.token || '',
    user: auth.user || {},
    organisations: auth.organisations,
    isLoggedIn: isLoaded({ auth }),
    canEdit,
    isMobileNavActive: navigation.isMobileNavActive,
    editMode: layout.editMode,
    hasNotification: layout.hasNotification
  }
}

export const mapDispatch = (dispatch) => ({
  setMobileNavActive: (...args) => dispatch(setMobileNavActive(...args)),
  setEditMode: (data) => dispatch(setEditMode(data))
})

export default connect(mapState, mapDispatch)(Component)
