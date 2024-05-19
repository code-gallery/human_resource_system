import _reject from 'lodash/reject'
import _assign from 'lodash/assign'
import { APP_PREFIX } from 'containers/constants.js'
import { ACTIONS as authActions } from 'store/auth'

export const FETCH = `${APP_PREFIX}/orgVerifications/FETCH`
export const FETCH_SUCCESS = `${APP_PREFIX}/orgVerifications/FETCH_SUCCESS`
export const ACCEPT_VERIFICATION = `${APP_PREFIX}/orgVerifications/ACCEPT_VERIFICATION`
export const ACCEPT_VERIFICATION_SUCCESS = `${APP_PREFIX}/orgVerifications/ACCEPT_VERIFICATION_SUCCESS`
export const DECLINE_VERIFICATION = `${APP_PREFIX}/orgVerifications/DECLINE_VERIFICATION`
export const DECLINE_VERIFICATION_SUCCESS = `${APP_PREFIX}/orgVerifications/DECLINE_VERIFICATION_SUCCESS`

export const ACTIONS = {
  ACCEPT_VERIFICATION,
  ACCEPT_VERIFICATION_SUCCESS,
  DECLINE_VERIFICATION,
  DECLINE_VERIFICATION_SUCCESS,
  FETCH,
  FETCH_SUCCESS
}

export const fetch = (payload) => ({
  type: FETCH,
  payload
})

export const acceptVerification = (payload) => ({
  type: ACCEPT_VERIFICATION,
  payload
})

export const declineVerification = (payload) => ({
  type: DECLINE_VERIFICATION,
  payload
})

const initialState = {
  processed: [],
  requests: [],
  organisation: {},
  pending: false
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
    case ACCEPT_VERIFICATION_SUCCESS:
    case DECLINE_VERIFICATION_SUCCESS:
      return {
        ...state,
        requests: _reject(state.requests, { id: action.payload.id })
      }
    case '@@router/LOCATION_CHANGE':
    case authActions.RESET_TOKEN:
      return _assign({}, initialState)
    default:
      return state
  }
}
