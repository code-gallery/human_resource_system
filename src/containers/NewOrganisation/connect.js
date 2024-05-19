import { connect } from 'react-redux'
import { saveStorage } from 'store/storage'
import Component from './NewOrganisation'

export const mapState = ({ storage }) => ({
  storage
})

export const mapDispatch = (dispatch) => ({
  saveStorage: (data) => dispatch(saveStorage(data))
})

export default connect(mapState, mapDispatch)(Component)
