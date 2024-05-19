import { APP_PREFIX } from "containers/constants";
import _assign from "lodash/assign";

const FETCH_CHECK_DETAILS = `${APP_PREFIX}/fetchCheck/FETCH_CHECK_DETAILS`;
const FETCH_CHECK_DETAILS_SUCCESS = `${APP_PREFIX}/fetchCheck/FETCH_CHECK_DETAILS_SUCCESS`;
const RESET_FETCH_CHECK_DETAILS = `${APP_PREFIX}/fetchCheck/RESET_FETCH_CHECK_DETAILS`;
const ANNOTATION_SUBMIT = `${APP_PREFIX}/fetchCheck/ANNOTATION_SUBMIT`;
const ANNOTATION_SUBMIT_SUCCESS = `${APP_PREFIX}/fetchCheck/ANNOTATION_SUBMIT_SUCCESS`;
const ANNOTATION_RESET = `${APP_PREFIX}/fetchCheck/ANNOTATION_RESET`;
const ANNOTATION_RESET_SUCCESS = `${APP_PREFIX}/fetchCheck/ANNOTATION_RESET_SUCCESS`;
const UPLOAD_DOCUMENTS = `${APP_PREFIX}/fetchCheck/UPLOAD_DOCUMENTS`;
const UPLOAD_DOCUMENTS_SUCCESS = `${APP_PREFIX}/fetchCheck/UPLOAD_DOCUMENTS_SUCCESS`;
const ANNOTATION_FETCH = `${APP_PREFIX}/fetchCheck/ANNOTATION_FETCH`;
const ANNOTATION_FETCH_SUCCESS = `${APP_PREFIX}/fetchCheck/ANNOTATION_FETCH_SUCCESS`;
const REFREE_MAIL = `${APP_PREFIX}/fetchCheck/REFREE_MAIL`;
const REFREE_MAIL_SUCCESS = `${APP_PREFIX}/fetchCheck/REFREE_MAIL_SUCCESS`;
const VIEW_DOCUMENTS = `${APP_PREFIX}/fetchCheck/VIEW_DOCUMENTS`;
const VIEW_DOCUMENTS_SUCCESS = `${APP_PREFIX}/fetchCheck/VIEW_DOCUMENTS_SUCCESS`;
const DELETE_DOCUMENTS = `${APP_PREFIX}/fetchCheck/DELETE_DOCUMENTS`;
const DELETE_DOCUMENTS_SUCCESS = `${APP_PREFIX}/fetchCheck/DELETE_DOCUMENTS_SUCCESS`;
const CLOSE_CHECK = `${APP_PREFIX}/fetchCheck/CLOSE_CHECK`;
const CLOSE_CHECK_SUCCESS = `${APP_PREFIX}/fetchCheck/CLOSE_CHECK_SUCCESS`;
const SOFT_DELETE = `${APP_PREFIX}/fetchCheck/SOFT_DELETE`;
const SOFT_DELETE_SUCCESS = `${APP_PREFIX}/fetchCheck/SOFT_DELETE_SUCCESS`;
const DBS_CHECK = `${APP_PREFIX}/fetchCheck/DBS_CHECK`;
const DBS_CHECK_SUCCESS = `${APP_PREFIX}/fetchCheck/DBS_CHECK_SUCCESS`;
const UPDATE_DBS_TYPE = `${APP_PREFIX}/fetchCheck/UPDATE_DBS_TYPE`;
const UPDATE_DBS_TYPE_SUCCESS = `${APP_PREFIX}/fetchCheck/UPDATE_DBS_TYPE_SUCCESS`;
const SAVE_OFFICER_CHECKDATA = `${APP_PREFIX}/fetchCheck/SAVE_OFFICER_CHECKDATA`;
const SAVE_OFFICER_CHECKDATA_SUCCESS = `${APP_PREFIX}/fetchCheck/SAVE_OFFICER_CHECKDATA_SUCCESS`;
const SAVE_EMPLOYMENT_REFERENCE = `${APP_PREFIX}/fetchCheck/SAVE_EMPLOYMENT_REFERENCE`;
const SAVE_EMPLOYMENT_REFERENCE_SUCCESS = `${APP_PREFIX}/fetchCheck/SAVE_EMPLOYMENT_REFERENCE_SUCCESS`;
const COMPLETE_WORK_PASS = `${APP_PREFIX}/fetchCheck/COMPLETE_WORK_PASS`;
const COMPLETE_WORK_PASS_SUCCESS = `${APP_PREFIX}/fetchCheck/COMPLETE_WORK_PASS_SUCCESS`;
const SAVE_EMP_ELIGIBILITY = `${APP_PREFIX}/fetchCheck/SAVE_EMP_ELIGIBILITY`;
const SAVE_EMP_ELIGIBILITY_SUCCESS = `${APP_PREFIX}/fetchCheck/SAVE_EMP_ELIGIBILITY_SUCCESS`;
const EDIT_EMP_ELIGIBILITY = `${APP_PREFIX}/fetchCheck/EDIT_EMP_ELIGIBILITY`;
const EDIT_EMP_ELIGIBILITY_SUCCESS = `${APP_PREFIX}/fetchCheck/EDIT_EMP_ELIGIBILITY_SUCCESS`;
const CERTIFY_EMP_ELIGIBILITY = `${APP_PREFIX}/fetchCheck/CERTIFY_EMP_ELIGIBILITY`;
const CERTIFY_EMP_ELIGIBILITY_SUCCESS = `${APP_PREFIX}/fetchCheck/CERTIFY_EMP_ELIGIBILITY_SUCCESS`;

export const ACTIONS = {
  FETCH_CHECK_DETAILS,
  FETCH_CHECK_DETAILS_SUCCESS,
  RESET_FETCH_CHECK_DETAILS,
  ANNOTATION_SUBMIT,
  ANNOTATION_SUBMIT_SUCCESS,
  ANNOTATION_RESET,
  ANNOTATION_RESET_SUCCESS,
  UPLOAD_DOCUMENTS,
  UPLOAD_DOCUMENTS_SUCCESS,
  ANNOTATION_FETCH,
  ANNOTATION_FETCH_SUCCESS,
  REFREE_MAIL,
  REFREE_MAIL_SUCCESS,
  VIEW_DOCUMENTS,
  VIEW_DOCUMENTS_SUCCESS,
  DELETE_DOCUMENTS,
  DELETE_DOCUMENTS_SUCCESS,
  CLOSE_CHECK,
  CLOSE_CHECK_SUCCESS,
  SOFT_DELETE,
  SOFT_DELETE_SUCCESS,
  DBS_CHECK,
  DBS_CHECK_SUCCESS,
  UPDATE_DBS_TYPE,
  UPDATE_DBS_TYPE_SUCCESS,
  SAVE_OFFICER_CHECKDATA,
  SAVE_OFFICER_CHECKDATA_SUCCESS,
  SAVE_EMPLOYMENT_REFERENCE,
  SAVE_EMPLOYMENT_REFERENCE_SUCCESS,
  COMPLETE_WORK_PASS,
  COMPLETE_WORK_PASS_SUCCESS,
  SAVE_EMP_ELIGIBILITY,
  SAVE_EMP_ELIGIBILITY_SUCCESS,
  EDIT_EMP_ELIGIBILITY,
  EDIT_EMP_ELIGIBILITY_SUCCESS,
  CERTIFY_EMP_ELIGIBILITY,
  CERTIFY_EMP_ELIGIBILITY_SUCCESS
};

export const fetchChecksDetails = (
  requestId,
  orgId,
  candidateId,
  checkId,
  checkType
) => ({
  type: FETCH_CHECK_DETAILS,
  requestId,
  orgId,
  candidateId,
  checkId,
  checkType,
});

export const resetCheckDetails = () => {
  return {
    type: RESET_FETCH_CHECK_DETAILS,
  };
};

export const annotationSubmit = (payload, onSuccess, onError) => ({
  type: ANNOTATION_SUBMIT,
  payload,
  onSuccess,
  onError,
});
export const annotationReset = (payload, onSuccess, onError, orgId) => ({
  type: ANNOTATION_RESET,
  payload,
  onSuccess,
  onError,
  orgId
});
export const uploadDocuments = (payload, onSuccess, onError, fetchData) => ({
  type: UPLOAD_DOCUMENTS,
  payload,
  onSuccess,
  onError,
  fetchData
});
export const viewUploadedDocuments = (payload) => ({
  type: VIEW_DOCUMENTS,
  payload
});
export const deleteDocuments = (payload, onSuccess, onError, fetchData) => ({
  type: DELETE_DOCUMENTS,
  payload,
  onSuccess,
  onError,
  fetchData
});
export const refreeMail = (payload, onSuccess, onError) => ({
  type: REFREE_MAIL,
  payload,
  onSuccess,
  onError,
});

export const annotationFetch = (payload) => ({
  type: ANNOTATION_FETCH,
  payload,
});

export const closeCheck = (payload, onSuccess, onError) => ({
  type: CLOSE_CHECK,
  payload,
  onSuccess,
  onError,
});

export const softDeleteCheck = (payload, onSuccess, onError) => ({
  type: SOFT_DELETE,
  payload,
  onSuccess,
  onError,
});

export const dbsCheckSubmit = (payload, onSuccess, onError) => ({
  type: DBS_CHECK,
  payload,
  onSuccess,
  onError,
});

export const updateDbsType = (payload, onSuccess, onError) => ({
  type: UPDATE_DBS_TYPE,
  payload,
  onSuccess,
  onError,
});

export const saveOfficerCheckData = (payload, onSuccess, onError) => ({
  type: SAVE_OFFICER_CHECKDATA,
  payload,
  onSuccess,
  onError,
});

export const saveEmploymentReferenceData = (payload, onSuccess, onError) => ({
  type: SAVE_EMPLOYMENT_REFERENCE,
  payload,
  onSuccess,
  onError,
});

export const workpassSubmit = (payload, onSuccess, onError) => ({
  type: COMPLETE_WORK_PASS,
  payload,
  onSuccess,
  onError,
});

export const saveEmpEliData = (payload, onSuccess, onError) => ({
  type: SAVE_EMP_ELIGIBILITY,
  payload,
  onSuccess,
  onError,
})

export const editEmpEliData = (payload, onSuccess, onError) => ({
  type: EDIT_EMP_ELIGIBILITY,
  payload,
  onSuccess,
  onError,
})

export const certifyEmpEliData = (payload, onSuccess, onError) => ({
  type: CERTIFY_EMP_ELIGIBILITY,
  payload,
  onSuccess,
  onError,
})

const initialState = {
  checksDetails: [],
  pendingData: true,
  annotationData: {},
  uploaded_documents: [],
  uploaded_images: [],
  resetSuccess: '',
  dbsButtonStatus: true,
  dbs_status: '',
  successMessage: '',
  loading: false,
  officerData: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CHECK_DETAILS:
      return {
        ...state,
        checksDetails: [],
        pendingData: true,
      };
    case FETCH_CHECK_DETAILS_SUCCESS:
      
      return {
        ...state,
        checksDetails: action.payload,
        dbsButtonStatus: action.payload.dbsButtonStatus,
        dbs_status: action.payload.check_status,
        pendingData: false,
        officerData: action.payload.officerData ? action.payload.officerData : []
      };
    case ANNOTATION_RESET:
      return {
        ...state,
        resetSuccess:""
      }
    case ANNOTATION_RESET_SUCCESS:
      return {
        ...state,
        resetSuccess: action.payload
      }
    case UPLOAD_DOCUMENTS:
    case ANNOTATION_SUBMIT:
      return {
        ...state,
        //annotationData: {}
      };
    case ANNOTATION_SUBMIT_SUCCESS:
    case UPLOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        //annotationData: {}
      };
    case RESET_FETCH_CHECK_DETAILS:
      return _assign({}, initialState);
    case ANNOTATION_FETCH:
      return {
        ...state,
        annotationData: {}
      };
    case ANNOTATION_FETCH_SUCCESS:
      return {
        ...state,
        annotationData: action.payload,
      };
    case VIEW_DOCUMENTS:
      return {
        ...state,
        uploaded_documents: []
      };
    case VIEW_DOCUMENTS_SUCCESS:
      return {
        ...state,
        uploaded_documents: action.payload
      };
    case DELETE_DOCUMENTS:
      return {
        ...state,
        uploaded_images: []
      };
    case DELETE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        uploaded_images: action.payload
      };
    case CLOSE_CHECK:
      return {
        ...state,
      };
    case CLOSE_CHECK_SUCCESS:
      return {
        ...state,
      };
    case SOFT_DELETE:
      return {
        ...state,
      };
    case SOFT_DELETE_SUCCESS:
      return {
        ...state,
      };
    case DBS_CHECK:
      return {
        ...state,
        loading: true
      };
    case DBS_CHECK_SUCCESS:
      return {
        ...state,
        successMessage: '',
        dbsButtonStatus: false,
        dbs_status: action.payload.check_status,
        loading: false
      };
    case UPDATE_DBS_TYPE:
      return {
        ...state
      }
    case UPDATE_DBS_TYPE_SUCCESS:
      return {
        ...state
      }
    case SAVE_OFFICER_CHECKDATA:
      return {
        ...state
      };
    case SAVE_OFFICER_CHECKDATA_SUCCESS:
      return {
        ...state,
        officerData: action.payload
      };
    case SAVE_EMPLOYMENT_REFERENCE:
      return {
        ...state,
        loading: true
      }
    case SAVE_EMPLOYMENT_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case COMPLETE_WORK_PASS:
      return {
        ...state,
        successMessage: '',
        loading: true
      }
    case COMPLETE_WORK_PASS_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
