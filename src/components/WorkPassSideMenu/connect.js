import { connect } from 'react-redux'
import WorkPassSideMenu from './WorkPassSideMenu'
import { fetchBalance } from './reducer'
import { peopleFetch } from "../../containers/PersonaPermission/reducer";

const mapState = ({ organisationBalance, layout , personaPermission}) => ({
  balance: organisationBalance.balance,
  hasNotification: layout.hasNotification,
  admin_details: personaPermission.admin_details
})

const mapDispatch = {
  fetchBalance,
  peopleFetch,
}

export default connect(mapState, mapDispatch)(WorkPassSideMenu)
