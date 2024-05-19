import { APP_PREFIX } from 'containers/constants.js'

const SET_MOBILE_NAVIGATION_ACTIVE = `${APP_PREFIX}/navigation/SET_MOBILE_NAVIGATION_ACTIVE`

export const ACTIONS = {
  SET_MOBILE_NAVIGATION_ACTIVE
}

export const setMobileNavActive = (payload) => ({
  type: SET_MOBILE_NAVIGATION_ACTIVE,
  payload
})

const initialState = {
  isMobileNavActive: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MOBILE_NAVIGATION_ACTIVE:
      return {
        ...state,
        isMobileNavActive: action.payload
      }
    default:
      return state
  }
}
