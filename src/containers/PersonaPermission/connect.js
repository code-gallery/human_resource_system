import { connect } from 'react-redux'
import Component from './PersonaPermission'
import { accountsFetch, peopleFetch, enableDisable } from "./reducer";

export const mapStateToProps = ({personaPermission}) => ({
    accounts_details : personaPermission,
})

export const mapDispatchToProps = (dispatch) => ({
    accountsFetch: (...args) => dispatch(accountsFetch(...args)),
    peopleFetch: (...args) => dispatch(peopleFetch(...args)),
    enableDisable: (...args) => dispatch(enableDisable(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)