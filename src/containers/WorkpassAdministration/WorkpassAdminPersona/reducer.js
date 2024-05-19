import { APP_PREFIX } from 'containers/constants.js'


export const FETCH = `${APP_PREFIX}/persona/FETCH`
export const FETCH_SUCCESS = `${APP_PREFIX}/persona/FETCH_SUCCESS`
export const ADD_COMPANY = `${APP_PREFIX}/persona/ADD_COMPANY`
export const ADD_COMPANY_SUCCESS = `${APP_PREFIX}/persona/ADD_COMPANY_SUCCESS`

export const ACTIONS = {
  FETCH,
  FETCH_SUCCESS,
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS
}

export const fetch = (data) => ({
  type: FETCH,
  data
})

export const addCompany = (payload) => ({
  type: ADD_COMPANY,
  payload
})

const initialState = {
  data: null,
  payload: null,
  isFetching: false,
  isloaded: false

}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        isFetching: true,
        error: null,
        data: null,        
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        data: action.data
      }
    case ADD_COMPANY: {
        return {
        isloaded: true,
        error: null,
        payload: null,
        }
      }
    case ADD_COMPANY_SUCCESS:
        return {
          ...state,
          error: null,
          payload: action.payload,
          isloaded: false,
          successMsg: 'Company added successfully'
        }
    default:
      return state
  }

}
