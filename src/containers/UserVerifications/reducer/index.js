import _assign from 'lodash/assign'
import { APP_PREFIX } from 'containers/constants.js'
import { ACTIONS as authActions } from 'store/auth'

const FETCH = `${APP_PREFIX}/userVerifications/FETCH`
const LOAD_SUCCESS = `${APP_PREFIX}/userVerifications/LOAD_SUCCESS`

export const ACTIONS = {
  FETCH,
  LOAD_SUCCESS
}

export const fetch = () => ({
  type: FETCH
})

const initialState = {
  processed: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    case authActions.RESET_TOKEN: {
      return _assign({}, initialState)
    }
    default:
      return state
  }
}
