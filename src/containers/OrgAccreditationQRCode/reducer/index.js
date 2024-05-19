import _assign from 'lodash/assign'
import { APP_PREFIX } from 'containers/constants.js'
import { ACTIONS as authActions } from 'store/auth'
import { ACTIONS as accreditationActions } from 'containers/OrgAccreditations/reducer'

export const FETCH = `${APP_PREFIX}/accreditation/FETCH`
export const FETCH_SUCCESS = `${APP_PREFIX}/accreditation/FETCH_SUCCESS`
export const FETCH_ERROR = `${APP_PREFIX}/accreditation/FETCH_ERROR`

export const ACTIONS = {
  FETCH,
  FETCH_SUCCESS,
  FETCH_ERROR
}

export const fetch = (payload) => ({
  type: FETCH,
  payload
})

const initialState = {
  qrCode: null,
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
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: 'fetchSuccess'
      }
    case FETCH_ERROR:
      return {
        ...state,
        errorMsg: action.payload,
        pending: 'fetchError'
      }
    case authActions.RESET_TOKEN:
      return _assign({}, initialState)
    case accreditationActions.SAVE:
      return {
        ...state,
        pending: 'saving',
        successMsg: null,
        errorMsg: null
      }
    case accreditationActions.SAVE_SUCCESS:
      return {
        ...state,
        ...action.payload.award,
        pending: 'saveSuccess',
        successMsg: 'Accreditation saved successfully'
      }
    case accreditationActions.SAVE_ERROR:
      return {
        ...state,
        pending: 'savingError',
        errorMsg: action.payload
      }
    default:
      return state
  }
}
