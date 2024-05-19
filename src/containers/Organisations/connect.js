import { connect } from 'react-redux'
import { fetch, setCurrentPage, setSearchQuery } from './reducer'
import Component from './Organisations.js'

export const mapState = ({
  organisations
}) => ({
  organisations
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data)),
  setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
  setSearchQuery: (query) => dispatch(setSearchQuery(query))
})

export default connect(mapState, mapDispatch)(Component)
