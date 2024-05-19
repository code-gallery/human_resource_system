import { APP_PREFIX } from 'containers/constants.js'

const FETCH = `${APP_PREFIX}/settings/FETCH`
const FETCH_SUCCESS = `${APP_PREFIX}/settings/FETCH_SUCCESS`
const FETCH_ERROR = `${APP_PREFIX}/settings/FETCH_ERROR`

const SAVE_USER_SETTINGS = `${APP_PREFIX}/settings/SAVE_USER_SETTINGS`
const SAVE_USER_SETTINGS_SUCCESS = `${APP_PREFIX}/settings/SAVE_USER_SETTINGS_SUCCESS`
const SAVE_USER_SETTINGS_ERROR = `${APP_PREFIX}/settings/SAVE_USER_SETTINGS_ERROR`

const CHANGE_PASSWORD = `${APP_PREFIX}/settings/CHANGE_PASSWORD`
const CHANGE_PASSWORD_SUCCESS = `${APP_PREFIX}/settings/CHANGE_PASSWORD_SUCCESS`
const CHANGE_PASSWORD_ERROR = `${APP_PREFIX}/settings/CHANGE_PASSWORD_ERROR`

const DELETE_USER_ACCOUNT = `${APP_PREFIX}/settings/DELETE_USER_ACCOUNT`
const DELETE_USER_ACCOUNT_SUCCESS = `${APP_PREFIX}/settings/DELETE_USER_ACCOUNT_SUCCESS`
const DELETE_USER_ACCOUNT_ERROR = `${APP_PREFIX}/settings/DELETE_USER_ACCOUNT_ERROR`

export const ACTIONS = {
  FETCH,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SAVE_USER_SETTINGS,
  SAVE_USER_SETTINGS_SUCCESS,
  SAVE_USER_SETTINGS_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  DELETE_USER_ACCOUNT,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_ERROR
}

export const fetchUserSettings = () => ({
  type: FETCH
})

export const saveUserSettings = (payload) => ({
  type: SAVE_USER_SETTINGS,
  payload
})

export const deleteUserAccount = (payload, onSuccess, onError) => ({
  type: DELETE_USER_ACCOUNT,
  payload,
  onSuccess,
  onError
})

export const changePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload
})

const initialState = {
  settings: {},
  settingsConfig: {},
  successMsg: null,
  errorMsg: null,
  pending: false,
  isLogout: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        pending: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: false
      }
    case FETCH_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: 'Could not retrieve your settings'
      }
    case CHANGE_PASSWORD:
    case SAVE_USER_SETTINGS:
    case DELETE_USER_ACCOUNT:
      return {
        ...state,
        successMsg: null,
        errorMsg: null,
        pending: true
      }
    case SAVE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        pending: false,
        successMsg: 'Changes has been saved'
      }
    case SAVE_USER_SETTINGS_ERROR:
      return {
        ...state,
        pending: false,
        errorMsg: action.payload || 'Unable to change settings'
      }
    case DELETE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        successMsg: action.payload.message,
        isLogout: action.payload.isLogout,
        pending: false
      }
    case DELETE_USER_ACCOUNT_ERROR:
      return {
        ...state,
        errorMsg: action.payload,
        pending: false
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        successMsg: 'Password has been changed',
        pending: false
      }
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        errorMsg: action.payload || 'Unable to change password',
        pending: false
      }
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        errorMsg: null,
        successMsg: null,
        pending: false
      }
    default:
      return state
  }
}
