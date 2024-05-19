import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const INVITE_ACCEPT_POST = `${APP_PREFIX}/userAcceptInvite/INVITE_ACCEPT_POST`
const INVITE_ACCEPT_SUCCESS = `${APP_PREFIX}/userAcceptInvite/INVITE_ACCEPT_SUCCESS`
const REQUEST_INFO = `${APP_PREFIX}/userAcceptInvite/REQUEST_INFO`
const REQUEST_INFO_SUCCESS = `${APP_PREFIX}/userAcceptInvite/REQUEST_INFO_SUCCESS`
const API_ERROR = `${APP_PREFIX}/userAcceptInvite/API_ERROR`

export const ACTIONS = {
  REQUEST_INFO,
  REQUEST_INFO_SUCCESS,
  API_ERROR
}

/**
 ACTIONS CREATORS
 */

/** :: string -> Object */
export const acceptInvite = token => ({
  type: INVITE_ACCEPT_POST,
  payload: {
    token
  }
})

/** :: () -> Object */
export const accepted = () => ({
  type: INVITE_ACCEPT_SUCCESS
})

/** :: string -> Object */
export const requestInfo = token => ({
  type: REQUEST_INFO,
  payload: {
    token
  }
})

/** :: Object -> Object */
export const requestInfoSuccess = requestInfo => ({
  type: REQUEST_INFO_SUCCESS,
  payload: {
    requestInfo
  }
})

/** :: () -> Object */
export const apiError = () => ({
  type: API_ERROR
})

/**
 REDUCER
 */
export const initialState = {
  loading: false,
  error: null,
  inviteAccepted: false,
  requestInfo: null,
  notFound: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INFO:
      return {
        ...state,
        loading: true
      }
    case REQUEST_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        requestInfo: action.payload.requestInfo,
        notFound: !action.payload.requestInfo.invite,
        inviteAccepted: (action.payload.requestInfo.invite || {}).status === 'accepted'
      }
    default:
      return state
  }
}
