import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const FETCH_BALANCE = `${APP_PREFIX}/workPassSideMenu/FETCH_BALANCE`
const FETCH_BALANCE_SUCCESS = `${APP_PREFIX}/workPassSideMenu/FETCH_BALANCE_SUCCESS`

export const ACTIONS = {
  FETCH_BALANCE,
  FETCH_BALANCE_SUCCESS
}

/**
 ACTION CREATORS
 */
export const fetchBalance = orgId => ({
  type: FETCH_BALANCE,
  payload: {
    orgId
  }
})

export const setBalance = (orgId, balance) => ({
  type: FETCH_BALANCE_SUCCESS,
  payload: {
    orgId,
    balance
  }
})

/**
 REDUCER
 */
export const initialState = {
  loading: false,
  orgId: null,
  balance: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BALANCE:
      return {
        ...state,
        loading: true,
        orgId: action.payload.orgId
      }
    case FETCH_BALANCE_SUCCESS:
      return {
        loading: false,
        orgId: action.payload.orgId,
        balance: action.payload.balance
      }
    default:
      return state
  }
}
