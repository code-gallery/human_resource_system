import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const REQUEST_ORGANISATION_CONFIG = `${APP_PREFIX}/organisationCandidateNewRequest/REQUEST_ORGANISATION_CONFIG`
const SAVE_ORGANISATION_CONFIG = `${APP_PREFIX}/organisationCandidateNewRequest/SAVE_ORGANISATION_CONFIG`
const POST_NEW_REQUEST = `${APP_PREFIX}/organisationCandidateNewRequest/POST_NEW_REQUEST`
const POST_NEW_REQUEST_SUCCESS = `${APP_PREFIX}/organisationCandidateNewRequest/POST_NEW_REQUEST_SUCCESS`
const REQUEST_ERROR = `${APP_PREFIX}/organisationCandidateNewRequest/REQUEST_ERROR`
const RESET_NEW_REQUEST = `${APP_PREFIX}/organisationCandidateNewRequest/RESET_NEW_REQUEST`

export const ACTIONS = {
  REQUEST_ORGANISATION_CONFIG,
  SAVE_ORGANISATION_CONFIG,
  POST_NEW_REQUEST,
  POST_NEW_REQUEST_SUCCESS,
  REQUEST_ERROR,
  RESET_NEW_REQUEST
}

/**
 ACTION CREATORS
 */
/** number -> Object */
export const requestOrganisationConfig = orgId => ({
  type: REQUEST_ORGANISATION_CONFIG,
  payload: {
    orgId
  }
})

/** number -> Object */
export const saveOrganisationConfig = checkConfig => ({
  type: SAVE_ORGANISATION_CONFIG,
  payload: {
    checkConfig
  }
})

/** Object -> Object */
export const postNewRequest = (orgId, candidateId, requestInfo) => ({
  type: POST_NEW_REQUEST,
  payload: {
    orgId,
    candidateId,
    requestInfo
  }
})

/** () -> Object */
export const requestPosted = requestInfo => ({
  type: POST_NEW_REQUEST_SUCCESS,
  payload: {
    requestInfo
  }
})

/** () -> Object */
export const requestErrored = () => ({
  type: REQUEST_ERROR
})

/** () -> Object */
export const resetNewRequest = () => ({
  type: RESET_NEW_REQUEST
})

/**
 REDUCER
 */
export const initialState = {
  loading: false,
  error: null,
  organisationChecks: {
    rightToWork: {
      price: null,
      enabled: null
    },
    dbs: {
      price: null,
      enabled: null
    },
    dbsEnhanced: {
      price: null,
      enabled: null
    },
    dbsBasic: {
      price: null,
      enabled: null
    },
    company: {
      price: null,
      enabled: null
    }
  },

  posted: false,
  postedInfo: null
}

export default function reducer(state = initialState, action) {
  const waiting = {
    price: null,
    enabled: null
  }

  switch (action.type) {
    case REQUEST_ORGANISATION_CONFIG:
      return {
        ...state,
        loading: true,
        organisationChecks: {
          rightToWork: { ...waiting },
          dbs: { ...waiting },
          dbsEnhanced: { ...waiting },
          dbsBasic: { ...waiting },
          company: { ...waiting }
        }
      }
    case SAVE_ORGANISATION_CONFIG:
      return {
        ...state,
        loading: false,
        organisationChecks: action.payload.checkConfig
      }
    case POST_NEW_REQUEST:
      return {
        ...state,
        loading: true
      }
    case POST_NEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        posted: true,
        postedInfo: action.payload.requestInfo
      }
    case REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case RESET_NEW_REQUEST:
      return initialState
    default:
      return state
  }
}
