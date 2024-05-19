import isString from 'lodash/isString'
import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const CANDIDATES_SEARCH = `${APP_PREFIX}/organisationAddCandidate/CANDIDATES_SEARCH`
const CANDIDATES_SEARCH_SUCCESS = `${APP_PREFIX}/organisationAddCandidate/CANDIDATES_SEARCH_SUCCESS`
const CANDIDATES_SEARCH_ERROR = `${APP_PREFIX}/organisationAddCandidate/CANDIDATES_SEARCH_ERROR`
const ADD_CANDIDATE = `${APP_PREFIX}/organisationAddCandidate/ADD_CANDIDATE`
const ADD_CANDIDATE_SUCCESS = `${APP_PREFIX}/organisationAddCandidate/ADD_CANDIDATE_SUCCESS`
const ADD_CANDIDATE_ERROR = `${APP_PREFIX}/organisationAddCandidate/ADD_CANDIDATE_ERROR`
const RESET = `${APP_PREFIX}/organisationAddCandidate/RESET`

export const ACTIONS = {
  CANDIDATES_SEARCH,
  CANDIDATES_SEARCH_SUCCESS,
  CANDIDATES_SEARCH_ERROR,
  ADD_CANDIDATE,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_ERROR,
  RESET
}

/**
 ACTION CREATORS
 */
/** :: () -> Object */
export const searchCandidate = (orgId, query) => ({
  type: CANDIDATES_SEARCH,
  payload: {
    orgId,
    query
  }
})

/** :: Object -> Object */
export const searchCandidateSuccess = users => ({
  type: CANDIDATES_SEARCH_SUCCESS,
  payload: {
    users
  }
})

/** :: () -> Object */
export const searchCandidateError = () => ({
  type: CANDIDATES_SEARCH_ERROR
})

/** :: (number, Object) -> Object */
export const addCandidate = (orgId, candidateInfo, onError) => ({
  type: ADD_CANDIDATE,
  payload: {
    orgId,
    candidateInfo,
    onError
  }
})

/** :: () -> Object */
export const addCandidateSuccess = candidateInfo => ({
  type: ADD_CANDIDATE_SUCCESS,
  payload: {
    candidateInfo
  }
})

/** :: () -> Object */
export const addCandidateError = () => ({
  type: ADD_CANDIDATE_ERROR
})

/** :: () -> Object */
export const resetAddCandidate = () => ({
  type: RESET
})

const getUsers = (users, candidateInfo) => {
  /**
   @NOTE: Candidate being added is not a known Appii user. Appii users are added
   using their id's.
   */
  if (isString(candidateInfo.email)) {
    return users.map((user) => {
      return { ...user }
    })
  }

  const candidateId = candidateInfo.user_id
  return users.map((user) => {
    if (user.id === candidateId) {
      return {
        ...user,
        candidate: true
      }
    }

    return { ...user }
  })
}

/**
 REDUCER
 */
export const initialState = {
  loading: false,
  error: null,
  users: null,
  unknownUser: null
}

export default function reducer(state = initialState, action) {
  const isAddingUnknown = action => isString(action.payload.candidateInfo.email)

  switch (action.type) {
    case CANDIDATES_SEARCH:
      return {
        ...initialState,
        loading: true
      }
    case CANDIDATES_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users
      }
    case CANDIDATES_SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case ADD_CANDIDATE:
      return {
        ...state,
        users: getUsers(state.users, action.payload.candidateInfo),
        unknownUser: isAddingUnknown(action) ? 'loading' : state.unknownUser
      }
    case ADD_CANDIDATE_SUCCESS:
      return {
        ...state,
        users: getUsers(state.users, action.payload.candidateInfo),
        unknownUser: state.unknownUser === 'loading'
          ? action.payload.candidateInfo
          : null
      }
    case ADD_CANDIDATE_ERROR:
      return {
        ...state,
        users: [ ...state.users ],
        unknownUser: null
      }
    case RESET:
      return { ...initialState }
    default:
      return state
  }
}
