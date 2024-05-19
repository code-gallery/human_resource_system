import { APP_PREFIX } from 'containers/constants.js'

const SET_EDIT_MODE = `${APP_PREFIX}/LAYOUT/SET_EDIT_MODE`
const SET_NOTIFICATION = `${APP_PREFIX}/LAYOUT/SET_NOTIFICATION`

export const ACTIONS = {
  SET_EDIT_MODE
}

export const setEditMode = (payload) => ({
  type: SET_EDIT_MODE,
  payload
})

export const setNotification = notification => ({
  type: SET_NOTIFICATION,
  payload: {
    notification
  }
})

const initialState = {
  editMode: false,
  hasNotification: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload
      }
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        editMode: false
      }
    case SET_NOTIFICATION:
      return {
        ...state,
        hasNotification: action.payload.notification
      }
    default:
      return state
  }
}
