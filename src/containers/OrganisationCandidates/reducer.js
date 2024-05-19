import { APP_PREFIX } from '../constants'

/**
 ACTIONS
 */
const REQUEST_CANDIDATES = `${APP_PREFIX}/organisationCandidates/REQUEST_CANDIDATES`
const REQUEST_CANDIDATES_SUCCESS = `${APP_PREFIX}/organisationCandidates/REQUEST_CANDIDATES_SUCCESS`
const REQUEST_CANDIDATES_ERROR = `${APP_PREFIX}/organisationCandidates/REQUEST_CANDIDATES_ERROR`
const RESET = `${APP_PREFIX}/organisationCandidates/RESET`

export const ACTIONS = {
  REQUEST_CANDIDATES,
  REQUEST_CANDIDATES_SUCCESS,
  REQUEST_CANDIDATES_ERROR,
  RESET
}

/**
 ACTION CREATORS
 */
/** :: (number, ?string) -> Object */
export const requestCandidates = (orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page) => ({
  type: REQUEST_CANDIDATES,
  payload: {
    orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page
  }
})

/** :: Array<Object> -> Object */
export const saveCandidates = candidates => ({
  type: REQUEST_CANDIDATES_SUCCESS,
  payload: {
    candidates
  }
})

/** :: () -> Object */
export const resetCandidates = () => ({
  type: RESET
})

/** :: () -> Object */
export const candidatesRequestError = () => ({
  type: REQUEST_CANDIDATES_ERROR
})

/**
 REDUCER
 */
export const initialState = {
  isFetching: false,
  error: null,
  candidates: null,
  orgId: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CANDIDATES:
      return {
        isFetching: true,
        error: null,
        candidates: null,
        orgId: action.payload.orgId
      }
    case REQUEST_CANDIDATES_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        candidates: action.payload.candidates
      }
    case REQUEST_CANDIDATES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case RESET:
      return { ...initialState }
    default:
      return state
  }
}
