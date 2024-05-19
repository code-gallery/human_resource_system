import _assign from 'lodash/assign'
import { APP_PREFIX } from 'containers/constants.js'

const FETCH_OTHER_USER_PROFILE = `${APP_PREFIX}/userProfile/FETCH_USER_PROFILE`
const FETCH_OTHER_USER_PROFILE_ERROR = `${APP_PREFIX}/userProfile/FETCH_USER_PROFILE_ERROR`
const SET_OTHER_USER_PROFILE = `${APP_PREFIX}/userProfile/SET_USER_PROFILE`

export const ACTIONS = {
  FETCH_OTHER_USER_PROFILE,
  FETCH_OTHER_USER_PROFILE_ERROR,
  SET_OTHER_USER_PROFILE
}

export const fetchOtherUserProfile = (payload) => ({
  type: FETCH_OTHER_USER_PROFILE,
  payload
})

const initialState = {
  pending: false,
  error: '',
  organisations: [],
  allAwards: {
    award: [],
    cpd: [],
    certificate: [],
    achievement: [],
    skill: [],
    language: [],
    project: []
  },
  educations: [],
  jobs: [],
  activities: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_OTHER_USER_PROFILE:
      return _assign({}, initialState, { pending: true })
    case SET_OTHER_USER_PROFILE:
      return {
        ...state,
        pending: false,
        user: {
          ...action.payload.user
        },
        allAwards: {
          ...state.allAwards,
          ...action.payload.allAwards
        },
        educations: action.payload.educations,
        jobs: action.payload.jobs
      }
    case FETCH_OTHER_USER_PROFILE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      }
    default:
      return state
  }
}
