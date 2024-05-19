import _reject from 'lodash/reject'
import _assign from 'lodash/assign'
import { APP_PREFIX } from 'containers/constants.js'
import { ACTIONS as authActions } from 'store/auth'

export const FETCH = `${APP_PREFIX}/accreditations/FETCH`
export const FETCH_SUCCESS = `${APP_PREFIX}/accreditations/FETCH_SUCCESS`

export const DELETE = `${APP_PREFIX}/accreditations/DELETE`
export const DELETE_SUCCESS = `${APP_PREFIX}/accreditations/DELETE_SUCCESS`
export const DELETE_ERROR = `${APP_PREFIX}/accreditations/DELETE_ERROR`

export const SAVE = `${APP_PREFIX}/accreditations/SAVE`
export const SAVE_SUCCESS = `${APP_PREFIX}/accreditations/SAVE_SUCCESS`
export const SAVE_ERROR = `${APP_PREFIX}/accreditations/SAVE_ERROR`

export const ACTIONS = {
  FETCH,
  FETCH_SUCCESS,
  DELETE,
  DELETE_SUCCESS,
  DELETE_ERROR,
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR
}

export const fetch = (payload) => ({
  type: FETCH,
  payload
})

export const deleteAccreditation = (payload) => ({
  type: DELETE,
  payload
})

export const saveAccreditation = (payload) => ({
  type: SAVE,
  payload
})

const initialState = {
  awards: [],
  pending: '',
  errorMsg: null,
  successMsg: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        pending: 'fetching',
        successMsg: null,
        errorMsg: null
      }
    case DELETE:
      return {
        ...state,
        pending: 'deleting',
        successMsg: null,
        errorMsg: null
      }
    case DELETE_ERROR:
      return {
        ...state,
        pending: 'deletingError',
        errorMsg: action.payload
      }
    case DELETE_SUCCESS: {
      return {
        ...state,
        awards: _reject(state.awards, { id: action.payload.id }),
        pending: 'deletingSuccess',
        successMsg: 'Accreditation deleted successfully'
      }
    }
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: 'fetchSuccess'
      }
    case SAVE:
      return {
        ...state,
        pending: 'saving',
        successMsg: null,
        errorMsg: null
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        pending: 'saveSuccess',
        awards: [
          ...state.awards,
          action.payload.award
        ],
        successMsg: 'Accreditation saved successfully'
      }
    case SAVE_ERROR:
      return {
        ...state,
        pending: 'savingError',
        errorMsg: action.payload
      }
    case authActions.RESET_TOKEN:
      return _assign({}, initialState)
    default:
      return state
  }
}
