/**
 ACTIONS
 */
import { APP_PREFIX } from '../constants'
const REQUEST_CANDIDATES = `${APP_PREFIX}/externalCandidates/REQUEST_CANDIDATES`
const REQUEST_CANDIDATES_SUCCESS = `${APP_PREFIX}/externalCandidates/REQUEST_CANDIDATES_SUCCESS`
const REQUEST_CANDIDATES_ERROR = `${APP_PREFIX}/externalCandidates/REQUEST_CANDIDATES_ERROR`
const RESET = `${APP_PREFIX}/externalCandidates/RESET`
const SEARCH_CANDIDATES = `${APP_PREFIX}/externalCandidates/SEARCH_CANDIDATES`

export const ACTIONS = {
  REQUEST_CANDIDATES,
  REQUEST_CANDIDATES_SUCCESS,
  REQUEST_CANDIDATES_ERROR,
  RESET,
  SEARCH_CANDIDATES
}

/**
 ACTION CREATORS
 */
/** :: (number) -> Object */

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

/** :: (string) -> Object */
export const searchCandidates = (search) => ({
  type: SEARCH_CANDIDATES,
  payload: {
    search
  }
})

/**
 REDUCER
 */
export const initialState = {
  isFetching: false,
  error: null,
  candidates: null,
  searchedCandidates: null,
  searchQuery: null,
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
        searchQuery: null,
        searchedCandidates: null,
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
    case SEARCH_CANDIDATES:
      let search = action.payload.search;
      let searchedCandidates = state.candidates.filter(candidate => {
        let firstName = candidate.firstName ? candidate.firstName.toLowerCase() : '';
        let lastName = candidate.lastName ? candidate.lastName.toLowerCase() : '';
        let email = candidate.email ? candidate.email.toLowerCase() : '';
        return firstName.includes(search) || lastName.includes(search) || email.includes(search);
      });
      return {
        ...state,
        isFetching: false,
        error: null,
        searchQuery: search,
        searchedCandidates
      }
    default:
      return state
  }
}