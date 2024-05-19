import { APP_PREFIX } from 'containers/constants'

/**
 ACTIONS
 */
const GET_ACTIVITIES = `${APP_PREFIX}/dashboard/GET_ACTIVITIES`
const GET_ACTIVITIES_SUCCESS = `${APP_PREFIX}/dashboard/GET_ACTIVITIES_SUCCESS`
const GET_ACTIVITIES_ERROR = `${APP_PREFIX}/dashboard/GET_ACTIVITIES_ERROR`
const GET_COMPLETED = `${APP_PREFIX}/dashboard/GET_COMPLETED`
const GET_COMPLETED_SUCCESS = `${APP_PREFIX}/dashboard/GET_COMPLETED_SUCCESS`
const GET_COMPLETED_ERROR = `${APP_PREFIX}/dashboard/GET_COMPLETED_ERROR`
const GET_OPENALERT = `${APP_PREFIX}/dashboard/GET_OPENALERT`
const GET_OPENALERT_SUCCESS = `${APP_PREFIX}/dashboard/GET_OPENALERT_SUCCESS`
const GET_OPENALERT_ERROR = `${APP_PREFIX}/dashboard/GET_OPENALERT_ERROR`
const GET_ALLOPENALERT = `${APP_PREFIX}/dashboard/GET_ALLOPENALERT`
const GET_ALLOPENALERT_SUCCESS = `${APP_PREFIX}/dashboard/GET_ALLOPENALERT_SUCCESS`
const GET_ALLOPENALERT_ERROR = `${APP_PREFIX}/dashboard/GET_ALLOPENALERT_ERROR`
const DELETE_ACTIVITIES = `${APP_PREFIX}/dashboard/DELETE_ACTIVITIES`
const DELETE_ACTIVITIES_SUCCESS = `${APP_PREFIX}/dashboard/DELETE_ACTIVITIES_SUCCESS`
const ASSIGN_ACTIVITIES = `${APP_PREFIX}/dashboard/ASSIGN_ACTIVITIES`
const ASSIGN_ACTIVITIES_SUCCESS = `${APP_PREFIX}/dashboard/ASSIGN_ACTIVITIES_SUCCESS`

export const ACTIONS = {
  GET_ACTIVITIES,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  GET_COMPLETED,
  GET_COMPLETED_SUCCESS,
  GET_COMPLETED_ERROR,
  GET_OPENALERT,
  GET_OPENALERT_SUCCESS,
  GET_OPENALERT_ERROR,
  GET_ALLOPENALERT,
  GET_ALLOPENALERT_SUCCESS,
  GET_ALLOPENALERT_ERROR,
  DELETE_ACTIVITIES,
  DELETE_ACTIVITIES_SUCCESS,
  ASSIGN_ACTIVITIES,
  ASSIGN_ACTIVITIES_SUCCESS
}

/**
 ACTION CREATORS
 */
export const getActivityData = () => ({
  type: GET_ACTIVITIES
})

export const getCompletedData = (payload) => ({
  type: GET_COMPLETED,
  payload
})

export const getOpenAlertData = () => ({
  type: GET_OPENALERT
})

export const getAllOpenAlertData = () => ({
  type: GET_ALLOPENALERT
})

export const deleteActivity = (payload) => ({
  type: DELETE_ACTIVITIES,
  payload
})

export const assignActivity = (payload) => ({
  type: ASSIGN_ACTIVITIES,
  payload
})

/**
 REDUCER
 */
export const initialState = {
  isFetching: false,
  error: null,
  activityData: [],
  completedData: [],
  openAlertData: [],
  allOpenAlertData: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
        error: null,
        activityData: []
      }
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        activityData: action.payload
      }
    case GET_ACTIVITIES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        activityData: []
      }
    case GET_COMPLETED:
      return {
        ...state,
        isFetching: true,
        error: null,
        completedData: []
      }
    case GET_COMPLETED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        completedData: action.payload
      }
    case GET_COMPLETED_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        completedData: []
      }
    case GET_OPENALERT:
      return {
        ...state,
        isFetching: true,
        error: null,
        openAlertData: []
      }
    case GET_OPENALERT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        openAlertData: action.payload
      }
    case GET_OPENALERT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        openAlertData: []
      }
    case GET_ALLOPENALERT:
      return {
        ...state,
        isFetching: true,
        error: null,
        allOpenAlertData: []
      }
    case GET_ALLOPENALERT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        allOpenAlertData: action.payload
      }
    case GET_ALLOPENALERT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        allOpenAlertData: []
      }
    default:
      return state
  }
}
