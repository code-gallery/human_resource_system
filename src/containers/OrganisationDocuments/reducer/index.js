import { APP_PREFIX } from 'containers/constants.js'
import _reject from 'lodash/reject'
export const POST_DOCUMENT = `${APP_PREFIX}/organisationDocument/POST_DOCUMENT`
const FETCH_DOCUMENT_TABLE_DATA = `${APP_PREFIX}/organisationDocument/FETCH_DOCUMENT_TABLE_DATA`
const FETCH_DOCUMENT_TABLE_DATA_SUCCESS = `${APP_PREFIX}/organisationDocument/FETCH_DOCUMENT_TABLE_DATA_SUCCESS`
const EDIT_DOCUMENT = `${APP_PREFIX}/organisationDocument/EDIT_DOCUMENT`
const EDIT_DOCUMENT_SUCCESS = `${APP_PREFIX}/organisationDocument/EDIT_DOCUMENT_SUCCESS`
const POST_DOCUMENT_SUCCESS = `${APP_PREFIX}/organisationDocument/POST_DOCUMENT_SUCCESS`
const SET_CURRENT_PAGE = `${APP_PREFIX}/organisationDocument/SET_CURRENT_PAGE`
const SET_SEARCH_QUERY = `${APP_PREFIX}/organisationDocument/SET_SEARCH_QUERY`
const GET_DOC_PERSONA = `${APP_PREFIX}/organisationDocument/GET_DOC_PERSONA`
const GET_DOC_PERSONA_SUCCESS = `${APP_PREFIX}/organisationDocument/GET_DOC_PERSONA_SUCCESS`
const SEARCH_DOCUMENT = `${APP_PREFIX}/organisationDocument/SEARCH_DOCUMENT`
const UPDATE_DOCUMENT = `${APP_PREFIX}/organisationDocument/UPDATE_DOCUMENT`
const UPDATE_DOCUMENT_SUCCESS = `${APP_PREFIX}/organisationDocument/UPDATE_DOCUMENT_SUCCESS`

export const ACTIONS = {
  EDIT_DOCUMENT,
  EDIT_DOCUMENT_SUCCESS,
  POST_DOCUMENT,
  POST_DOCUMENT_SUCCESS,
  FETCH_DOCUMENT_TABLE_DATA,
  FETCH_DOCUMENT_TABLE_DATA_SUCCESS,
  SET_CURRENT_PAGE,
  SET_SEARCH_QUERY,
  GET_DOC_PERSONA,
  GET_DOC_PERSONA_SUCCESS,
  SEARCH_DOCUMENT,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_SUCCESS
}

export const fetchDocumentTable = (payload) => ({
  type: FETCH_DOCUMENT_TABLE_DATA,
  payload
})

export const editDocumentTable = (payload) => ({
  type: EDIT_DOCUMENT,
  payload
})

export const addNewDocument = (payload, onSuccess, onError) => ({
  type: POST_DOCUMENT,
  payload,
  onSuccess,
  onError,
});

export const updateDocument = (payload, onSuccess, onError) => ({
  type: UPDATE_DOCUMENT,
  payload,
  onSuccess,
  onError,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
})

export const setSearchQuery = (q) => ({
  type: SET_SEARCH_QUERY,
  q
})

export const getDocPersona = (payload, onSuccess, onError) => ({
  type: GET_DOC_PERSONA,
  payload,
  onSuccess,
  onError
})

export const searchDocuments = (payload) => ({
  type: SEARCH_DOCUMENT,
  payload
})

const initialState = {
  total: 0,
  perPage: 10,
  currentPage: 1,
  q: '',
  data: [],
  loading: true,
  persona: [],
  searchedDoc: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_DOCUMENT_TABLE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        q: ''
      }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case SET_SEARCH_QUERY: {
      return {
        ...state,
        currentPage: 1,
        data: [],
        total: 0,
        q: action.q
      }
    }
    case POST_DOCUMENT:
      return {
        ...state,
      };
    case POST_DOCUMENT_SUCCESS:
      return {
        ...state,
      };
    case EDIT_DOCUMENT_SUCCESS:
      return {
        ...state,
        data: _reject(state.data, { id: action.payload.id }),
      }
    case GET_DOC_PERSONA:
      return {
        ...state,
        loading: true,
        persona: []
      }
    case GET_DOC_PERSONA_SUCCESS:
      return {
        ...state,
        persona: action.payload,
        loading: false
      }
    case SEARCH_DOCUMENT:
      const searchedDoc = state.data.filter(doc => {
        let doc_name = doc.doc_name ? doc.doc_name.toLowerCase() : '';
        return doc_name.includes(action.payload.toLowerCase());
      });
      return {
        ...state,
        q: action.payload,
        searchedDoc
      }
    case UPDATE_DOCUMENT:
      return {
        ...state
      }
    case UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        data: _reject(state.data, { document_id: action.payload.document_id }),
      }
    default:
      return state
  }
}
