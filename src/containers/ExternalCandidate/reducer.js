import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const REQUEST_CANDIDATE = `${APP_PREFIX}/externalCandidate/REQUEST_CANDIDATE`
const REQUEST_CANDIDATE_SUCCESS = `${APP_PREFIX}/externalCandidate/REQUEST_CANDIDATE_SUCCESS`
const REQUEST_CANDIDATE_ERROR = `${APP_PREFIX}/externalCandidate/REQUEST_CANDIDATE_ERROR`
const GET_REQUEST = `${APP_PREFIX}/organisationCandidate/GET_REQUEST`
const GET_REQUEST_SUCCESS = `${APP_PREFIX}/organisationCandidate/GET_REQUEST_SUCCESS`
const GET_REQUEST_ERROR = `${APP_PREFIX}/organisationCandidate/GET_REQUEST_ERROR`

export const ACTIONS = {
  REQUEST_CANDIDATE,
  REQUEST_CANDIDATE_SUCCESS,
  REQUEST_CANDIDATE_ERROR,
  GET_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_ERROR
}

/**
 ACTION CREATORS
 */
/** :: (number, number) -> Object */
export const requestCandidate = (orgId, candidateId) => ({
  type: REQUEST_CANDIDATE,
  payload: {
    orgId,
    candidateId
  }
})

/** :: Object -> Object */
export const saveCandidate = candidate => ({
  type: REQUEST_CANDIDATE_SUCCESS,
  payload: {
    candidate
  }
})

/** :: () -> Object */
export const candidateRequestError = () => ({
  type: REQUEST_CANDIDATE_ERROR
})

/** :: number -> Object */
export const getRequest = requestId => ({
  type: GET_REQUEST,
  payload: {
    requestId
  }
})

/** :: Array<check> -> Object */
export const getRequestSuccess = (requestId, request) => ({
  type: GET_REQUEST_SUCCESS,
  payload: {
    requestId,
    request,
    checks: request.checks,
    biometric_data:request.BiometricDetails
  }
})

/** :: () -> Object */
export const getRequestError = () => ({
  type: GET_REQUEST_ERROR
})

/**
 REDUCER
 */
export const initialState = {
  isFetching: false,
  error: null,
  entity: null,
  getRequest: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CANDIDATE:
      return {
        getRequest: { ...state.getRequest },
        isFetching: true,
        error: null,
        entity: null
      }
    case REQUEST_CANDIDATE_SUCCESS:
      return {
        getRequest: { ...state.getRequest },
        isFetching: false,
        error: null,
        entity: action.payload.candidate
      }
    case REQUEST_CANDIDATE_ERROR:
      return {
        getRequest: { ...state.getRequest },
        isFetching: false,
        error: true,
        entity: null
      }
    case GET_REQUEST:
      return {
        ...state,
        getRequest: {
          ...state.getRequest,
          [action.payload.requestId]: 'fetching'
        }
      }
    case GET_REQUEST_SUCCESS:
      return {
        ...state,
        getRequest: {
          ...state.getRequest,
          [action.payload.requestId]: action.payload.request
        }
      }
    case GET_REQUEST_ERROR:
      return {
        ...state,
        getRequest: {
          ...state.getRequest,
          [action.payload.requestId]: 'error'
        }
      }
    default:
      return state
  }
}
