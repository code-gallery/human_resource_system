import { APP_PREFIX } from "containers/constants";

const FETCH_ACCOUNTS = `${APP_PREFIX}/personaPermission/FETCH_ACCOUNTS`;
const FETCH_ACCOUNTS_SUCCESS = `${APP_PREFIX}/personaPermission/FETCH_ACCOUNTS_SUCCESS`;
const FETCH_PEOPLE = `${APP_PREFIX}/personaPermission/FETCH_PEOPLE`;
const FETCH_PEOPLE_SUCCESS = `${APP_PREFIX}/personaPermission/FETCH_PEOPLE_SUCCESS`;
const ENABLE_DISABLE = `${APP_PREFIX}/personaPermission/ENABLE_DISABLE`;
const ENABLE_DISABLE_SUCCESS = `${APP_PREFIX}/personaPermission/ENABLE_DISABLE_SUCCESS`;

export const ACTIONS = {
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_PEOPLE,
  FETCH_PEOPLE_SUCCESS,
  ENABLE_DISABLE,
  ENABLE_DISABLE_SUCCESS
};

export const accountsFetch = (payload) => ({
  type: FETCH_ACCOUNTS,
  payload,
});

export const peopleFetch = (payload) => ({
  type: FETCH_PEOPLE,
  payload,
});
export const enableDisable = (payload, onSuccess, onError) => ({
  type: ENABLE_DISABLE,
  payload,
  onSuccess, 
  onError
});

const initialState = {
  accounts_details: [],
  admin_details: [],
  fetchingAccounts: true,
  fetchingPeople: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return {
        ...state,
        fetchingAccounts: true,
        accounts_details: [],
      };

    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        fetchingAccounts: false,
        accounts_details: action.payload,
      };
    case FETCH_PEOPLE:
      return {
        ...state,
        fetchingPeople: true,
        admin_details: [],
      };

    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        fetchingPeople: false,
        admin_details: action.payload,
      };

      case ENABLE_DISABLE:
      return {
        ...state,
      };

    case ENABLE_DISABLE_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
