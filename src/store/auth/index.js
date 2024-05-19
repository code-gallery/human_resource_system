import _assign from 'lodash/assign'
import _find from 'lodash/find'
import _filter from 'lodash/filter'
import { APP_PREFIX, STORAGE_KEY } from 'containers/constants.js'

const LOGIN = `${APP_PREFIX}/auth/LOGIN`
const LOGIN_SUCCESS = `${APP_PREFIX}/auth/LOGIN_SUCCESS`
const LOGIN_FAILED = `${APP_PREFIX}/auth/LOGIN_FAILED`
const SET_TOKEN = `${APP_PREFIX}/auth/SET_TOKEN`
const RESET_TOKEN = `${APP_PREFIX}/auth/RESET_TOKEN`
const SET_USER = `${APP_PREFIX}/auth/SET_USER`
const FETCH_USER = `${APP_PREFIX}/auth/FETCH_USER`
const ADD_USER_AWARD = `${APP_PREFIX}/auth/ADD_USER_AWARD`
const FETCH_ORGANISATIONS = `${APP_PREFIX}/auth/FETCH_ORGANISATIONS`
const FETCH_ORGANISATIONS_MODAL = `${APP_PREFIX}/auth/FETCH_ORGANISATIONS_MODAL`
const FETCH_ORGANISATIONS_MODAL_SUCCESS = `${APP_PREFIX}/auth/FETCH_ORGANISATIONS_MODAL_SUCCESS`
const FETCH_CHECKS_MODAL = `${APP_PREFIX}/auth/FETCH_CHECKS_MODAL`
const FETCH_CHECKS_MODAL_SUCCESS = `${APP_PREFIX}/auth/FETCH_CHECKS_MODAL_SUCCESS`
const SET_ORGANISATIONS = `${APP_PREFIX}/auth/SET_ORGANISATIONS`
const FETCH_CLIENT_ORGANISATIONS = `${APP_PREFIX}/auth/FETCH_CLIENT_ORGANISATIONS`
const FETCH_CLIENT_ORGANISATIONS_FILTER = `${APP_PREFIX}/auth/FETCH_CLIENT_ORGANISATIONS_FILTER`
const SET_CLIENT_ORGANISATIONS = `${APP_PREFIX}/auth/SET_CLIENT_ORGANISATIONS`
const FETCH_PERSONA = `${APP_PREFIX}/auth/FETCH_PERSONA`
const SET_PERSONA = `${APP_PREFIX}/auth/SET_PERSONA`
const FETCH_CHECKS = `${APP_PREFIX}/auth/FETCH_CHECKS`
const SET_CHECKS = `${APP_PREFIX}/auth/SET_CHECKS`
const DELETE_COMPANY = `${APP_PREFIX}/auth/DELETE_COMPANY`
const DELETE_COMPANY_SUCCESS = `${APP_PREFIX}/auth/DELETE_COMPANY_SUCCESS`
const DELETE_PERSONA = `${APP_PREFIX}/auth/DELETE_PERSONA`
const DELETE_PERSONA_SUCCESS = `${APP_PREFIX}/auth/DELETE_PERSONA_SUCCESS`
const DELETE_CHECKS = `${APP_PREFIX}/auth/DELETE_CHECKS`
const DELETE_CHECKS_SUCCESS = `${APP_PREFIX}/auth/DELETE_CHECKS_SUCCESS`
const FETCH_USER_PROFILE = `${APP_PREFIX}/auth/FETCH_USER_PROFILE`
const SET_USER_PROFILE = `${APP_PREFIX}/auth/SET_USER_PROFILE`
const DELETE_JOB = `${APP_PREFIX}/auth/DELETE_JOB`
const DELETE_JOB_SUCCESS = `${APP_PREFIX}/auth/DELETE_JOB_SUCCESS`
const DELETE_EDUCATION = `${APP_PREFIX}/auth/DELETE_EDUCATION`
const DELETE_EDUCATION_SUCCESS = `${APP_PREFIX}/auth/DELETE_EDUCATION_SUCCESS`
const DELETE_AWARD = `${APP_PREFIX}/auth/DELETE_AWARD`
const DELETE_AWARD_SUCCESS = `${APP_PREFIX}/auth/DELETE_AWARD_SUCCESS`
const SAVE_AWARD = `${APP_PREFIX}/auth/SAVE_AWARD`
const SAVE_AWARD_SUCCESS = `${APP_PREFIX}/auth/SAVE_AWARD_SUCCESS`
const SAVE_ENTITY = `${APP_PREFIX}/profile/SAVE_ENTITY`
const SAVE_ENTITY_SUCCESS = `${APP_PREFIX}/profile/SAVE_ENTITY_SUCCESS`
const EDIT_ENTITY = `${APP_PREFIX}/profile/EDIT_ENTITY`
const EDIT_ENTITY_SUCCESS = `${APP_PREFIX}/profile/EDIT_ENTITY_SUCCESS`
const EDIT_AWARD = `${APP_PREFIX}/profile/EDIT_AWARD`
const EDIT_AWARD_SUCCESS = `${APP_PREFIX}/profile/EDIT_AWARD_SUCCESS`
const VERIFY_AWARD = `${APP_PREFIX}/profile/VERIFY_AWARD`
const VERIFY_AWARD_SUCCESS = `${APP_PREFIX}/profile/VERIFY_AWARD_SUCCESS`
const VERIFY_ENTITY = `${APP_PREFIX}/profile/VERIFY_ENTITY`
const VERIFY_ENTITY_SUCCESS = `${APP_PREFIX}/profile/VERIFY_ENTITY_SUCCESS`
const UPDATE_USER = `${APP_PREFIX}/profile/UPDATE_USER`
const UPDATE_USER_SUCCESS = `${APP_PREFIX}/profile/UPDATE_USER_SUCCESS`
const UPDATE_USER_ERROR = `${APP_PREFIX}/profile/UPDATE_USER_ERROR`
const FETCH_ACTIVITIES = `${APP_PREFIX}/auth/FETCH_ACTIVITIES`
const SET_ACTIVITIES = `${APP_PREFIX}/auth/SET_ACTIVITIES`
const VERIFY_COMPANY = `${APP_PREFIX}/company/VERIFY_COMPANY`
const VERIFY_COMPANY_SUCCESS = `${APP_PREFIX}/company/VERIFY_COMPANY_SUCCESS`
const VERIFY_CHECKS = `${APP_PREFIX}/company/VERIFY_CHECKS`
const VERIFY_CHECKS_SUCCESS = `${APP_PREFIX}/company/VERIFY_CHECKS_SUCCESS`
const VERIFY_PERSONA = `${APP_PREFIX}/company/VERIFY_PERSONA`
const VERIFY_PERSONA_SUCCESS = `${APP_PREFIX}/company/VERIFY_PERSONA_SUCCESS`

export const ACTIONS = {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_TOKEN,
  RESET_TOKEN,
  SET_USER,
  FETCH_USER,
  FETCH_USER_PROFILE,
  SET_USER_PROFILE,
  FETCH_ORGANISATIONS,
  FETCH_ORGANISATIONS_MODAL,
  FETCH_ORGANISATIONS_MODAL_SUCCESS,
  FETCH_CHECKS_MODAL,
  FETCH_CHECKS_MODAL_SUCCESS,
  SET_ORGANISATIONS,
  FETCH_CLIENT_ORGANISATIONS,
  FETCH_CLIENT_ORGANISATIONS_FILTER,
  SET_CLIENT_ORGANISATIONS,
  FETCH_PERSONA,
  SET_PERSONA,
  FETCH_CHECKS,
  SET_CHECKS,
  ADD_USER_AWARD,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_PERSONA,
  DELETE_PERSONA_SUCCESS,
  DELETE_CHECKS,
  DELETE_CHECKS_SUCCESS,
  DELETE_EDUCATION,
  DELETE_EDUCATION_SUCCESS,
  DELETE_AWARD,
  DELETE_AWARD_SUCCESS,
  SAVE_AWARD,
  SAVE_AWARD_SUCCESS,
  SAVE_ENTITY,
  SAVE_ENTITY_SUCCESS,
  EDIT_ENTITY,
  EDIT_ENTITY_SUCCESS,
  EDIT_AWARD,
  EDIT_AWARD_SUCCESS,
  VERIFY_AWARD,
  VERIFY_AWARD_SUCCESS,
  VERIFY_ENTITY,
  VERIFY_ENTITY_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  FETCH_ACTIVITIES,
  SET_ACTIVITIES,
  VERIFY_COMPANY,
  VERIFY_COMPANY_SUCCESS,
  VERIFY_CHECKS,
  VERIFY_CHECKS_SUCCESS,
  VERIFY_PERSONA,
  VERIFY_PERSONA_SUCCESS
}

// Action Creators
export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  error
})

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const fetchOrganisations = () => ({
  type: FETCH_ORGANISATIONS
})
export const fetchClientOrganisations = (id) => ({
  type: FETCH_CLIENT_ORGANISATIONS,
  id
})
export const clientOrganisationsfilter = (id) => ({
  type: FETCH_CLIENT_ORGANISATIONS_FILTER,
  id
})

export const fetchOrganisationsModal = () => ({
  type: FETCH_ORGANISATIONS_MODAL
})
export const fetchChecksModal = (id) => ({
  type: FETCH_CHECKS_MODAL,
  id
})

export const fetchUserPersona = (orgId,id) => ({
  type: FETCH_PERSONA,
  orgId,
  id
})
export const fetchUserChecks = (id) => ({
  type: FETCH_CHECKS,
  id
})

export const fetchActivities = () => ({
  type: FETCH_ACTIVITIES
})

export const fetchUserProfile = () => ({
  type: FETCH_USER_PROFILE
})

export const addAward = () => ({
  type: ADD_USER_AWARD
})

export const fetchUser = () => ({
  type: FETCH_USER
})

export const updateUserProfile = (payload) => ({
  type: UPDATE_USER,
  payload
})

export const setUser = (payload) => ({
  type: SET_USER,
  payload
})

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload
})

export const resetToken = () => {
  window.localStorage.setItem(STORAGE_KEY.token, null)
  window.localStorage.setItem(STORAGE_KEY.appBanner, null)
  return ({
    type: RESET_TOKEN
  })
}

export const deleteJob = (payload, onSuccess, onError) => ({
  type: DELETE_JOB,
  payload,
  onSuccess,
  onError
})

export const deleteCompany = (payload, onSuccess, onError) => ({
  type: DELETE_COMPANY,
  payload,
  onSuccess,
  onError
})

export const deletePersona = (payload, onSuccess, onError) => ({
  type: DELETE_PERSONA,
  payload,
  onSuccess,
  onError
})

export const deleteChecks = (payload, onSuccess, onError) => ({
  type: DELETE_CHECKS,
  payload,
  onSuccess,
  onError
})


export const deleteEducation = (payload, onSuccess, onError) => ({
  type: DELETE_EDUCATION,
  payload,
  onSuccess,
  onError
})

export const deleteAward = (payload, onSuccess, onError) => ({
  type: DELETE_AWARD,
  payload,
  onSuccess,
  onError
})

export const saveAward = (payload, onSuccess, onError) => ({
  type: SAVE_AWARD,
  payload,
  onSuccess,
  onError
})

export const verifyCompany = (payload,onSuccess, onError) => ({
  type: VERIFY_COMPANY,
  payload,
  onSuccess,
  onError
})

export const verifyChecks = (payload,onSuccess, onError) => ({
  type: VERIFY_CHECKS,
  payload,
  onSuccess,
  onError
})

export const verifyPersona = (payload,onSuccess, onError) => ({
  type: VERIFY_PERSONA,
  payload,
  onSuccess,
  onError
})

export const saveEntity = (payload, onSuccess, onError) => ({
  type: SAVE_ENTITY,
  payload,
  onSuccess,
  onError
})

export const editEntity = (payload, onSuccess, onError) => ({
  type: EDIT_ENTITY,
  payload,
  onSuccess,
  onError
})

export const editAward = (payload, onSuccess, onError) => ({
  type: EDIT_AWARD,
  payload,
  onSuccess,
  onError
})

export const verifyAward = (payload) => ({
  type: VERIFY_AWARD,
  payload
})

export const verifyEntity = (payload) => ({
  type: VERIFY_ENTITY,
  payload
})

export function isLoaded(globalState) {
  return !!(globalState.auth && globalState.auth.token !== null)
}

export function isUserLoaded(globalState) {
  return !!(globalState.auth &&
    globalState.auth.token !== null &&
    globalState.auth.user !== null
  )
}

export function belongsToOrg(globalState, orgId) {
  const organisations = (globalState.auth) ? globalState.auth.organisations : []
  return !!_find(organisations, { id: orgId })
}

const mergeArray = function(list, payload) {
  if (list.length === 0) {
    return [ payload ]
  }

  var newArray = list.map((item) => {
    return (item.id === payload.id) ? { ...item, ...payload } : item
  })

  const found = _find(newArray, { id: payload.id })
  if (typeof found === 'undefined') {
    newArray.push(payload)
  }

  return newArray
}

const initialState = {
  pending: false,
  token: null,
  saveErrorMsg: null,
  error: '',
  pending_org:false,
  pending_persona: false,
  pending_checks: false,
  organisations: [],
  client_org:[],
  workPassPersonas: [],
  workPassChecks: [],
  organisationsModal: [],
  checksModal:[],
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
    case FETCH_USER_PROFILE:
    case FETCH_ORGANISATIONS:
      return {
        ...state,
        pending: true,
        workPassChecks:[],
        workPassPersonas:[],
        pending_org: true
      }
      case FETCH_CLIENT_ORGANISATIONS:
      return {
        ...state,
        pending: true,
        workPassChecks:[],
        workPassPersonas:[],
        client_org: action.payload,
        pending_org: true
      }
      case FETCH_CLIENT_ORGANISATIONS_FILTER:
      return {
        ...state,
        pending: true,
        workPassChecks:[],
        workPassPersonas:[],
        client_org: action.payload,
        pending_org: true
      }  
      case SET_CLIENT_ORGANISATIONS:
      return {
        ...state,
        client_org: action.payload.organisations,
        pending: false,
        pending_org: false
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      }
    case RESET_TOKEN:
      return _assign({}, initialState)
    case SET_USER:
      return {
        ...state,
        user: {
          ...action.payload
        }
      }
    case UPDATE_USER:
      return {
        ...state,
        saveErrorMsg: null,
        pending: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        },
        pending: false
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        saveErrorMsg: action.payload,
        pending: false
      }
    case FETCH_ORGANISATIONS_MODAL:
        return {
          ...state,
          organisationsModal: [],
        }
    case FETCH_ORGANISATIONS_MODAL_SUCCESS:
          return {
            ...state,
            organisationsModal: action.payload,  
        }
    case FETCH_CHECKS_MODAL:
          return {
            ...state,
            checksModal: [],
            
          }
    case FETCH_CHECKS_MODAL_SUCCESS:
            return {
              ...state,
              checksModal: action.payload,  
          }
    case SET_ORGANISATIONS:
      return {
        ...state,
        organisations: action.payload.organisations,
        pending: false,
        pending_org: false
      }
      case FETCH_PERSONA:
      return {
        ...state,
        pending: true,
        workPassChecks:[],
        pending_persona: true,
        workPassPersonas: action.payload,
      }
      case SET_PERSONA:
      return {
        ...state,
        workPassPersonas: action.payload.workPassPersonas,
        pending: false,
        pending_persona: false
      }
      case FETCH_CHECKS:
      return {
        ...state,
        pending: true,
        pending_checks:true,
        workPassChecks: action.payload,
      }
      case SET_CHECKS:
      return {
        ...state,
        workPassChecks: action.payload.data,
        pending: false,
        pending_checks:false
      }
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        pending: false
      }
    case SET_USER_PROFILE:
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
    case LOGIN:
      return {
        ...state,
        error: '',
        pending: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
        pending: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        pending: false,
        token: null,
        user: null,
        error: action.error
      }
    case VERIFY_COMPANY_SUCCESS:
        return {
          ...state,
          client_org: mergeArray(state.client_org, action.payload)
      }
    case VERIFY_CHECKS_SUCCESS:
        return {
          ...state,
          workPassChecks: action.payload
      }
    case VERIFY_PERSONA_SUCCESS:
      return {
        ...state,
        workPassPersonas: action.payload.workPassPersonas
    }
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobs: _filter(state.jobs, function(job) {
          return job.id !== action.payload.id
        })
      }
    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        educations: _filter(state.educations, function(item) {
          return item.id !== action.payload.id
        })
      }
      case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        workPassPersonas:[],
        workPassChecks:[],
        client_org: _filter(state.client_org, function(item) {
          return item.id.toString() !== action.payload.organisation_id
        }) 
      }
      case DELETE_PERSONA_SUCCESS:
      return {
        ...state,
        workPassChecks:[],
        workPassPersonas: _filter(state.workPassPersonas, function(item) {
          return item.id.toString() !== action.payload.persona_id.toString()
        }) 
      }
      case DELETE_CHECKS_SUCCESS:
      return {
        ...state,
        workPassChecks: _filter(state.workPassChecks, function(item) {
          return item.id.toString() !== action.payload.checks_id
        }) 
      }
    
    case DELETE_AWARD_SUCCESS:
      return {
        ...state,
        allAwards: {
          ...state.allAwards,
          [action.payload.type]: _filter(state.allAwards[action.payload.type], function(item) {
            return item.id !== action.payload.id
          })
        }
      }
    case SAVE_AWARD_SUCCESS:
    case EDIT_AWARD_SUCCESS:
    case VERIFY_AWARD_SUCCESS:
      return {
        ...state,
        allAwards: {
          ...state.allAwards,
          [action.payload.type]: mergeArray(state.allAwards[action.payload.type], action.payload)
        }
      }
    case SAVE_ENTITY_SUCCESS:
    case EDIT_ENTITY_SUCCESS:
    case VERIFY_ENTITY_SUCCESS:
      return {
        ...state,
        [action.payload.entity_type]: mergeArray(state[action.payload.entity_type], action.payload)
      }
    default:
      return state
  }
}
