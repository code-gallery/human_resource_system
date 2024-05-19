import { APP_PREFIX } from 'containers/constants.js'

const FETCH_REFERENCE = `${APP_PREFIX}/reference/FETCH_REFERENCE`
const SET_REFERENCE = `${APP_PREFIX}/reference/SET_REFERENCE`

export const ACTIONS = {
  FETCH_REFERENCE,
  SET_REFERENCE
}

// Action Creators
export const fetchReference = () => ({
  type: FETCH_REFERENCE
})

const initialState = {
  awards: [],
  degrees: [],
  industries: [],
  gapsReasons:[],
  organisationSize: [],
  highSchoolDegrees: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_REFERENCE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
