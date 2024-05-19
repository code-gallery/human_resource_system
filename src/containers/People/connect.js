import { connect } from 'react-redux'
import { setSearchQuery, setCurrentPage, fetch } from './reducer'
import Component from './People.js'

export const mapState = ({ people }) => ({
  people
})

export const mapDispatch = (dispatch) => ({
  fetch: (data) => dispatch(fetch(data)),
  setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
  setSearchQuery: (query) => dispatch(setSearchQuery(query))
})

export default connect(mapState, mapDispatch)(Component)
