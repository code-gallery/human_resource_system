import { APP_PREFIX } from 'containers/constants.js'

const SAVE = `${APP_PREFIX}/storage/SAVE`
const SAVE_SUCCESS = `${APP_PREFIX}/storage/SAVE_SUCCESS`
const SAVE_ERROR = `${APP_PREFIX}/storage/SAVE_ERROR`

export const ACTIONS = {
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR
}

// Action Creators
export const saveStorage = (payload) => ({
  type: SAVE,
  payload
})

const initialState = {
  errorMsg: null,
  successMsg: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
    case SAVE:
      return {
        errorMsg: null,
        successMsg: null
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        successMsg: 'Data saved successfully'
      }
    case SAVE_ERROR:
      return {
        ...state,
        errorMsg: 'Sorry an error happened. Please try again'
      }
    default:
      return state
  }
}
