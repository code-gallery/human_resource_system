import { APP_PREFIX } from 'containers/constants.js'

export const FETCH = `${APP_PREFIX}/orgAdmins/FETCH`
export const FETCH_SUCCESS = `${APP_PREFIX}/orgAdmins/FETCH_SUCCESS`
export const FETCH_EMPLOYEES = `${APP_PREFIX}/orgAdmins/FETCH_EMPLOYEES`
export const FETCH_EMPLOYEES_SUCCESS = `${APP_PREFIX}/orgAdmins/FETCH_EMPLOYEES_SUCCESS`
export const DELETE_ADMIN = `${APP_PREFIX}/orgAdmins/DELETE_ADMIN`
export const DELETE_ADMIN_SUCCESS = `${APP_PREFIX}/orgAdmins/DELETE_ADMIN_SUCCESS`
export const ADD_ADMIN = `${APP_PREFIX}/orgAdmins/ADD_ADMIN`
export const ADD_ADMIN_SUCCESS = `${APP_PREFIX}/orgAdmins/ADD_ADMIN_SUCCESS`

export const ACTIONS = {
  FETCH,
  FETCH_SUCCESS,
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  ADD_ADMIN,
  ADD_ADMIN_SUCCESS,
  DELETE_ADMIN,
  DELETE_ADMIN_SUCCESS
}

export const fetchOrgAdmins = (payload) => ({
  type: FETCH,
  payload
})

export const fetchOrgEmployees = (payload) => ({
  type: FETCH_EMPLOYEES,
  payload
})

export const deleteAdmin = (payload) => ({
  type: DELETE_ADMIN,
  payload
})

export const addAdmin = (payload) => ({
  type: ADD_ADMIN,
  payload
})

const initialState = {
  admins: [],
  org: {},
  employees: [],
  selectedAdmin: {},
  pending: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        pending: true
      }
    case FETCH_SUCCESS:
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: false
      }
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        admins: state.admins.filter(item => item.id !== action.payload.adminId),
        employees: state.employees.map(item => {
          if (item.id === action.payload.userId) {
            item.admin = false
          }
          return item
        })
      }
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        admins: state.admins.concat(action.payload.orgAdmin).map(item => {
          const addedEmployee = state.employees.filter(item => item.id === action.payload.orgAdmin.user_id)
          if (item.user_id === addedEmployee[0].id) {
            item = { ...item, user: addedEmployee[0] }
          }
          return item
        }),
        employees: state.employees.map(item => {
          if (item.id === action.payload.orgAdmin.user_id) {
            item.admin = true
          }
          return item
        })
      }
    default:
      return state
  }
}
