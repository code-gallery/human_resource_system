import { APP_PREFIX } from 'containers/constants.js'

export const FETCH = `${APP_PREFIX}/people/FETCH`
const LOAD_SUCCESS = `${APP_PREFIX}/people/LOAD_SUCCESS`
const SET_CURRENT_PAGE = `${APP_PREFIX}/people/SET_CURRENT_PAGE`
const SET_SEARCH_QUERY = `${APP_PREFIX}/people/SET_SEARCH_QUERY`

export const ACTIONS = {
  FETCH,
  LOAD_SUCCESS,
  SET_CURRENT_PAGE,
  SET_SEARCH_QUERY
}

export const fetch = (payload) => ({
  type: FETCH,
  payload
})

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
})

export const setSearchQuery = (q) => ({
  type: SET_SEARCH_QUERY,
  q
})

const initialState = {
  total: 0,
  perPage: 24,
  currentPage: 1,
  q: '',
  data: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case SET_SEARCH_QUERY: {
      return {
        ...state,
        currentPage: 1,
        data: [],
        total: 0,
        q: action.q
      }
    }
    default:
      return state
  }
}
