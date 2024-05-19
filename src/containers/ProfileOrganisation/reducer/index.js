import _assign from 'lodash/assign'
import { APP_PREFIX } from 'containers/constants.js'

export const FETCH = `${APP_PREFIX}/organisation/FETCH`
export const FETCH_EMPLOYEES = `${APP_PREFIX}/organisation/FETCH_EMPLOYEES`
export const FETCH_ADMINS = `${APP_PREFIX}/organisation/FETCH_ADMINS`
export const SAVE = `${APP_PREFIX}/organisation/SAVE`
export const SAVE_SUCCESS = `${APP_PREFIX}/organisation/SAVE_SUCCESS`
export const SAVE_ERROR = `${APP_PREFIX}/organisation/SAVE_ERROR`
const LOAD_SUCCESS = `${APP_PREFIX}/organisation/LOAD_SUCCESS`
const LOAD_EMPLOYEES_SUCCESS = `${APP_PREFIX}/organisation/LOAD_EMPLOYEES_SUCCESS`
const LOAD_ADMINS_SUCCESS = `${APP_PREFIX}/organisation/LOAD_ADMINS_SUCCESS`

const FETCH_VERIFIED_STUDENTS = `${APP_PREFIX}/organisation/FETCH_VERIFIED_STUDENTS`
const LOAD_VERIFIED_STUDENTS_SUCCESS = `${APP_PREFIX}/organisation/LOAD_VERIFIED_STUDENTS_SUCCESS`

export const ACTIONS = {
  FETCH,
  FETCH_EMPLOYEES,
  FETCH_ADMINS,
  LOAD_SUCCESS,
  LOAD_EMPLOYEES_SUCCESS,
  LOAD_ADMINS_SUCCESS,
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  FETCH_VERIFIED_STUDENTS,
  LOAD_VERIFIED_STUDENTS_SUCCESS
}

export const fetch = (payload) => ({
  type: FETCH,
  payload
})

export const fetchEmployees = (payload) => ({
  type: FETCH_EMPLOYEES,
  payload
})

export const fetchAdmins = (payload) => ({
  type: FETCH_ADMINS,
  payload
})

export const fetchVerifiedStudents = (payload) => ({
  type: FETCH_VERIFIED_STUDENTS,
  payload
})

export const save = (payload) => ({
  type: SAVE,
  payload
})

const initialState = {
  employees: [],
  admins: [],
  students: [],
  loadingRequests: 0,
  pending: false,
  saveErrorMsg: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        saveErrorMsg: null,
        pending: true
      }
    case SAVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: false
      }
    case SAVE_ERROR:
      return {
        ...state,
        saveErrorMsg: action.payload,
        pending: false
      }
    case LOAD_SUCCESS:
    case LOAD_EMPLOYEES_SUCCESS:
    case LOAD_ADMINS_SUCCESS:
    case LOAD_VERIFIED_STUDENTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loadingRequests: state.loadingRequests + 1
      }
    case '@@router/LOCATION_CHANGE':
      return _assign({}, initialState)
    default:
      return state
  }
}
