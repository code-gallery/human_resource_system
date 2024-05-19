import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const REQUEST_CANDIDATE = `${APP_PREFIX}/organisationCandidate/REQUEST_CANDIDATE`
const REQUEST_CANDIDATE_SUCCESS = `${APP_PREFIX}/organisationCandidate/REQUEST_CANDIDATE_SUCCESS`
const REQUEST_CANDIDATE_ERROR = `${APP_PREFIX}/organisationCandidate/REQUEST_CANDIDATE_ERROR`
const GET_REQUEST = `${APP_PREFIX}/organisationCandidate/GET_REQUEST`
const GET_REQUEST_SUCCESS = `${APP_PREFIX}/organisationCandidate/GET_REQUEST_SUCCESS`
const GET_REQUEST_ERROR = `${APP_PREFIX}/organisationCandidate/GET_REQUEST_ERROR`

const DELETE_CANDIDATE = `${APP_PREFIX}/organisationCandidate/DELETE_CANDIDATE`
const DELETE_CANDIDATE_SUCCESS = `${APP_PREFIX}/organisationCandidate/DELETE_CANDIDATE_SUCCESS`
const DELETE_REQUEST = `${APP_PREFIX}/organisationCandidate/DELETE_REQUEST`
const DELETE_REQUEST_SUCCESS = `${APP_PREFIX}/organisationCandidate/DELETE_REQUEST_SUCCESS`
const REFRESH_REQUEST = `${APP_PREFIX}/organisationCandidate/REFRESH_REQUEST`
const REFRESH_REQUEST_SUCCESS = `${APP_PREFIX}/organisationCandidate/REFRESH_REQUEST_SUCCESS`
const ASSIGN_WORKPASS = `${APP_PREFIX}/organisationCandidate/ASSIGN_WORKPASS`
const ASSIGN_WORKPASS_SUCCESS = `${APP_PREFIX}/organisationCandidate/ASSIGN_WORKPASS_SUCCESS`
const SAVE_EMP_REFERENCE = `${APP_PREFIX}/organisationCandidate/SAVE_EMP_REFERENCE`
const SAVE_EMP_REFERENCE_SUCCESS = `${APP_PREFIX}/organisationCandidate/SAVE_EMP_REFERENCE_SUCCESS`
const GET_NOTES = `${APP_PREFIX}/organisationCandidate/GET_NOTES`
const GET_NOTES_SUCCESS = `${APP_PREFIX}/organisationCandidate/GET_NOTES_SUCCESS`
const GET_NOTE = `${APP_PREFIX}/organisationCandidate/GET_NOTE`
const GET_NOTE_SUCCESS = `${APP_PREFIX}/organisationCandidate/GET_NOTE_SUCCESS`
const SAVE_NOTE = `${APP_PREFIX}/organisationCandidate/SAVE_NOTE`
const SAVE_NOTE_SUCCESS = `${APP_PREFIX}/organisationCandidate/SAVE_NOTE_SUCCESS`
const DELETE_NOTE = `${APP_PREFIX}/organisationCandidate/DELETE_NOTE`
const DELETE_NOTE_SUCCESS = `${APP_PREFIX}/organisationCandidate/DELETE_NOTE_SUCCESS`

export const ACTIONS = {
  REQUEST_CANDIDATE,
  REQUEST_CANDIDATE_SUCCESS,
  REQUEST_CANDIDATE_ERROR,
  GET_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_ERROR,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  REFRESH_REQUEST,
  REFRESH_REQUEST_SUCCESS,
  ASSIGN_WORKPASS,
  ASSIGN_WORKPASS_SUCCESS,
  SAVE_EMP_REFERENCE,
  SAVE_EMP_REFERENCE_SUCCESS,
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_NOTE,
  GET_NOTE_SUCCESS,
  SAVE_NOTE,
  SAVE_NOTE_SUCCESS,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS
}

/**
 ACTION CREATORS
 */

export const deleteCandidate = (candidateId, userId, orgId, flag, isCandidateDelete) => ({
  type: DELETE_CANDIDATE,
  payload: {
    candidateId,
    userId,
    orgId,
    flag,
    isCandidateDelete
  }
})

export const deleteRequest = (requestId, orgId, candidateId, onSuccess, onError) => ({
  type: DELETE_REQUEST,
  payload: {
    requestId,
    orgId,
    candidateId,
    onSuccess,
    onError
  }
})

export const refreshRequest = (requestId, orgId, candidateId, onSuccess, onError) => ({
  type: REFRESH_REQUEST,
  payload: {
    requestId,
    orgId,
    candidateId,
    onSuccess,
    onError
  }
})

export const assignWorkpass = (payload, onSuccess, onError) => ({
  type: ASSIGN_WORKPASS,
  payload,
  onSuccess,
  onError
})

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
    biometric_data: request.BiometricDetails
  }
})

/** :: () -> Object */
export const getRequestError = () => ({
  type: GET_REQUEST_ERROR
})

export const saveEmploymentReference = (payload, onSuccess, onError) => ({
  type: SAVE_EMP_REFERENCE,
  payload,
  onSuccess,
  onError
})

export const getNotes = (orgId, candidateId) => ({
  type: GET_NOTES,
  payload: {
    orgId,
    candidateId
  }
})

export const getNote = (payload) => ({
  type: GET_NOTE,
  payload
})

export const saveNote = (payload, onSuccess, onError) => ({
  type: SAVE_NOTE,
  payload,
  onSuccess,
  onError
})

export const deleteNote = (payload, onSuccess, onError) => ({
  type: DELETE_NOTE,
  payload,
  onSuccess,
  onError
})

/**
 REDUCER
 */
export const initialState = {
  isFetching: false,
  error: null,
  entity: null,
  notes: [],
  pendingNote: false,
  getRequest: {},
  deletedData: [],
  deleteReqStatus: '',
  refreshReqStatus: '',
  resultMessage: '',
  workpassStatus: false,
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CANDIDATE:
      return {
        ...state,
        getRequest: { ...state.getRequest },
        isFetching: true,
        error: null,
        entity: null
      }
    case REQUEST_CANDIDATE_SUCCESS:
      return {
        ...state,
        getRequest: { ...state.getRequest },
        isFetching: false,
        error: null,
        entity: action.payload.candidate
      }
    case REQUEST_CANDIDATE_ERROR:
      return {
        ...state,
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
    case DELETE_CANDIDATE:
      return {
        ...state,
        deleting: true,
        deletedData: []
      }
    case DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deletedData: action.payload
      }
    case DELETE_REQUEST:
      return {
        ...state,
        deleteReqStatus: ''
      }
    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        deleteReqStatus: action.payload
      }
    case REFRESH_REQUEST:
      return {
        ...state,
        refreshReqStatus: ''
      }
    case REFRESH_REQUEST_SUCCESS:
      return {
        ...state,
        refreshReqStatus: action.payload
      }
    case ASSIGN_WORKPASS:
      return {
        ...state,
        resultMessage: '',
        workpassStatus: false
      }
    case ASSIGN_WORKPASS_SUCCESS:
      return {
        ...state,
        resultMessage: action.payload.message,
        workpassStatus: action.payload.workpassStatus
      }
    case SAVE_EMP_REFERENCE:
      return {
        ...state,
        loading: true
      }
    case SAVE_EMP_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case GET_NOTES:
      return {
        ...state,
        notes: []
      }
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload
      }
    case SAVE_NOTE:
      return {
        ...state,
        pendingNote: true
      }
    case SAVE_NOTE_SUCCESS:
      return {
        ...state,
        pendingNote: false,
        notes: action.payload
      }
    case DELETE_NOTE:
      return {
        ...state
      }
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: action.payload
      }
    default:
      return state
  }
}
