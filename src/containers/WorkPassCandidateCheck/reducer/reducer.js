import { APP_PREFIX } from "containers/constants";
import _assign from "lodash/assign";

const FETCH_CANDIDATE_CHECKS = `${APP_PREFIX}/data/FETCH_CANDIDATE_CHECKS`;
const FETCH_CANDIDATE_CHECKS_SUCCESS = `${APP_PREFIX}/data/FETCH_CANDIDATE_CHECKS_SUCCESS`;
const FETCH_CANDIDATE_CHECKS_ERROR = `${APP_PREFIX}/data/FETCH_CANDIDATE_CHECKS_ERROR`;
const FETCH_CANDIDATE_CHECKS_DETAILS = `${APP_PREFIX}/data/FETCH_CANDIDATE_CHECKS_DETAILS`;
const FETCH_CANDIDATE_CHECKS_DETAILS_SUCCESS = `${APP_PREFIX}/data/FETCH_CANDIDATE_CHECKS_DETAILS_SUCCESS`;
const FETCH_CANDIDATE_CHECKS_DETAILS_ERROR = `${APP_PREFIX}/data/FETCH_CANDIDATE_CHECKS_DETAILS_ERROR`;
const FETCH_CANDIDATE_PERSONAL_INFO = `${APP_PREFIX}/data/FETCH_CANDIDATE_PERSONAL_INFO`;
const FETCH_CANDIDATE_PERSONAL_INFO_SUCCESS = `${APP_PREFIX}/data/FETCH_CANDIDATE_PERSONAL_INFO_SUCCESS`;
const FETCH_CANDIDATE_PERSONAL_INFO_ERROR = `${APP_PREFIX}/data/FETCH_CANDIDATE_PERSONAL_INFO_ERROR`;
const SAVE_PERSONAL_INFO = `${APP_PREFIX}/data/SAVE_PERSONAL_INFO`;
const SAVE_PERSONAL_INFO_SUCCESS = `${APP_PREFIX}/data/SAVE_PERSONAL_INFO_SUCCESS`;
const SAVE_PERSONAL_INFO_ERROR = `${APP_PREFIX}/data/SAVE_PERSONAL_INFO_ERROR`;
const FETCH_CANDIDATE_ADDRESSES = `${APP_PREFIX}/data/FETCH_CANDIDATE_ADDRESSES`;
const FETCH_CANDIDATE_ADDRESSES_SUCCESS = `${APP_PREFIX}/data/FETCH_CANDIDATE_ADDRESSES_SUCCESS`;
const SUBMIT_WORK_PASS = `${APP_PREFIX}/data/SUBMIT_WORK_PASS`;
const SUBMIT_WORK_PASS_SUCCESS = `${APP_PREFIX}/data/SUBMIT_WORK_PASS_SUCCESS`;
const SUBMIT_WORK_PASS_ERROR = `${APP_PREFIX}/data/SUBMIT_WORK_PASS_ERROR`;
const SAVE_ADDRESS = `${APP_PREFIX}/data/SAVE_ADDRESS`;
const SAVE_ADDRESS_SUCCESS = `${APP_PREFIX}/data/SAVE_ADDRESS_SUCCESS`;
const EDIT_ADDRESS = `${APP_PREFIX}/data/EDIT_ADDRESS`;
const EDIT_ADDRESS_SUCCESS = `${APP_PREFIX}/data/EDIT_ADDRESS_SUCCESS`;
const DELETE_ADDRESS = `${APP_PREFIX}/data/DELETE_ADDRESS`;
const DELETE_ADDRESS_SUCCESS = `${APP_PREFIX}/data/DELETE_ADDRESS_SUCCESS`;
const SUBMIT_ADDRESS_HISTORY = `${APP_PREFIX}/data/SUBMIT_ADDRESS_HISTORY`;
const SUBMIT_ADDRESS_HISTORY_SUCCESS = `${APP_PREFIX}/data/SUBMIT_ADDRESS_HISTORY_SUCCESS`;
const SAVE_BANK_DETAILS = `${APP_PREFIX}/data/SAVE_BANK_DETAILS`;
const SAVE_BANK_DETAILS_SUCCESS = `${APP_PREFIX}/data/SAVE_BANK_DETAILS_SUCCESS`;
const FETCH_BANK_ADDRESSES = `${APP_PREFIX}/data/FETCH_BANK_ADDRESSES`;
const FETCH_BANK_ADDRESSES_SUCCESS = `${APP_PREFIX}/data/FETCH_BANK_ADDRESSES_SUCCESS`;
const DELETE_BANK_ADDRESS = `${APP_PREFIX}/data/DELETE_BANK_ADDRESS`;
const DELETE_BANK_ADDRESS_SUCCESS = `${APP_PREFIX}/data/DELETE_BANK_ADDRESS_SUCCESS`;
const SUBMIT_BANK_DETAILS = `${APP_PREFIX}/data/SUBMIT_BANK_DETAILS`
const SUBMIT_RIGHT_TO_WORK = `${APP_PREFIX}/data/SUBMIT_RIGHT_TO_WORK`
const SUBMIT_BANK_DETAILS_SUCCESS = `${APP_PREFIX}/data/SUBMIT_BANK_DETAILS_SUCCESS`
const SUBMIT_CRIMINAL_RECORD = `${APP_PREFIX}/data/SUBMIT_CRIMINAL_RECORD`
const SUBMIT_CRIMINAL_RECORD_SUCCESS = `${APP_PREFIX}/data/SUBMIT_CRIMINAL_RECORD_SUCCESS`
const SUBMIT_IMMIGRATION_DETAILS = `${APP_PREFIX}/data/SUBMIT_IMMIGRATION_DETAILS`
const SUBMIT_IMMIGRATION_DETAILS_SUCCESS = `${APP_PREFIX}/data/SUBMIT_IMMIGRATION_DETAILS_SUCCESS`

export const ACTIONS = {
  FETCH_CANDIDATE_CHECKS,
  FETCH_CANDIDATE_CHECKS_SUCCESS,
  FETCH_CANDIDATE_CHECKS_ERROR,
  FETCH_CANDIDATE_CHECKS_DETAILS,
  FETCH_CANDIDATE_CHECKS_DETAILS_SUCCESS,
  FETCH_CANDIDATE_CHECKS_DETAILS_ERROR,
  FETCH_CANDIDATE_PERSONAL_INFO,
  FETCH_CANDIDATE_PERSONAL_INFO_SUCCESS,
  FETCH_CANDIDATE_PERSONAL_INFO_ERROR,
  SAVE_PERSONAL_INFO,
  SAVE_PERSONAL_INFO_SUCCESS,
  SAVE_PERSONAL_INFO_ERROR,
  SUBMIT_WORK_PASS,
  SUBMIT_WORK_PASS_SUCCESS,
  SUBMIT_WORK_PASS_ERROR,
  FETCH_CANDIDATE_ADDRESSES,
  FETCH_CANDIDATE_ADDRESSES_SUCCESS,
  SAVE_ADDRESS,
  SAVE_ADDRESS_SUCCESS,
  EDIT_ADDRESS,
  EDIT_ADDRESS_SUCCESS,
  DELETE_ADDRESS,
  DELETE_ADDRESS_SUCCESS,
  SUBMIT_ADDRESS_HISTORY,
  SUBMIT_ADDRESS_HISTORY_SUCCESS,
  SAVE_BANK_DETAILS,
  SAVE_BANK_DETAILS_SUCCESS,
  FETCH_BANK_ADDRESSES,
  FETCH_BANK_ADDRESSES_SUCCESS,
  DELETE_BANK_ADDRESS,
  DELETE_BANK_ADDRESS_SUCCESS,
  SUBMIT_BANK_DETAILS,
  SUBMIT_RIGHT_TO_WORK,
  SUBMIT_BANK_DETAILS_SUCCESS,
  SUBMIT_CRIMINAL_RECORD,
  SUBMIT_CRIMINAL_RECORD_SUCCESS,
  SUBMIT_IMMIGRATION_DETAILS,
  SUBMIT_IMMIGRATION_DETAILS_SUCCESS
};

export const fetchCandidateChecks = () => ({
  type: FETCH_CANDIDATE_CHECKS,
  payload: [],
  loading: true,
});

export const saveCandidateChecks = (action) => ({
  type: FETCH_CANDIDATE_CHECKS_SUCCESS,
  payload: action.payload,
  loading: false,
});

export const candidateChecksError = () => ({
  type: FETCH_CANDIDATE_CHECKS_ERROR,
});

export const fetchCandidateCheckDetails = (requestId) => ({
  type: FETCH_CANDIDATE_CHECKS_DETAILS,
  payload: requestId,
  loading: true,
});

export const saveCandidateCheckDetails = (action) => ({
  type: FETCH_CANDIDATE_CHECKS_DETAILS_SUCCESS,
  payload: action.payload,
  loading: false,
});

export const candidateCheckDetailsError = () => ({
  type: FETCH_CANDIDATE_CHECKS_DETAILS_ERROR,
});

export const fetchCandidatePersonalInfo = (payload) => ({
  type: FETCH_CANDIDATE_PERSONAL_INFO,
  payload
});

export const saveCandidatePersonalInfo = (action) => ({
  type: FETCH_CANDIDATE_PERSONAL_INFO_SUCCESS,
  payload: action.payload,
  loading: false,
});

export const candidatePersonalInfoError = () => ({
  type: FETCH_CANDIDATE_PERSONAL_INFO_ERROR,
});

export const savePersonalInfo = (payload, onSuccess, onError) => ({
  type: SAVE_PERSONAL_INFO,
  payload,
  onSuccess,
  onError
})
export const editPersonalInfoError = () => ({
  type: SAVE_PERSONAL_INFO_ERROR,
});

export const fetchCandidateAddresses = (onSuccess, onError) => ({
  type: FETCH_CANDIDATE_ADDRESSES,
  onSuccess,
  onError
});

export const saveAddress = (payload, onSuccess, onError) => ({
  type: SAVE_ADDRESS,
  payload,
  onSuccess,
  onError
})

export const editAddress = (payload, onSuccess, onError) => ({
  type: EDIT_ADDRESS,
  payload,
  onSuccess,
  onError
})

export const deleteAddress = (payload, onSuccess, onError) => ({
  type: DELETE_ADDRESS,
  payload,
  onSuccess,
  onError
})

export const submitAddressHistory = (payload, onSuccess, onError) => ({
  type: SUBMIT_ADDRESS_HISTORY,
  payload,
  onSuccess,
  onError
})

export const submitWorkPass = (payload, onSuccess, onError) => ({
  type: SUBMIT_WORK_PASS,
  payload,
  onSuccess,
  onError,
});

export const submitBankDetails = (payload, onSuccess, onError) => ({
  type: SUBMIT_BANK_DETAILS,
  payload,
  onSuccess,
  onError
})

export const submitRightToWork = (payload, onSuccess, onError) => ({
  type: SUBMIT_RIGHT_TO_WORK,
  payload,
  onSuccess,
  onError
})

export const saveBankDetails = (payload, onSuccess, onError) => ({
  type: SAVE_BANK_DETAILS,
  payload,
  onSuccess,
  onError
})

export const fetchBankAddresses = (onSuccess, onError) => ({
  type: FETCH_BANK_ADDRESSES,
  onSuccess,
  onError
});

export const deleteBankAddress = (payload, onSuccess, onError) => ({
  type: DELETE_BANK_ADDRESS,
  payload,
  onSuccess,
  onError
})

export const submitCriminalRecord = (payload, onSuccess, onError) => ({
  type: SUBMIT_CRIMINAL_RECORD,
  payload,
  onSuccess,
  onError
})

export const submitImmigrationDetails = (payload, onSuccess, onError) => ({
  type: SUBMIT_IMMIGRATION_DETAILS,
  payload,
  onSuccess,
  onError
})

export const initialState = {
  error: null,
  loading: true,
  data: {},
  requestList: {},
  personalinfo: {},
  addresses: [],
  bankAddresses: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CANDIDATE_CHECKS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CANDIDATE_CHECKS_SUCCESS:
      return {
        ...state,
        loading: false,
        requestList: action.payload,
        error: null,
      };

    case FETCH_CANDIDATE_CHECKS_ERROR:
      return {
        error: true,
      };
    case FETCH_CANDIDATE_CHECKS_DETAILS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CANDIDATE_CHECKS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case FETCH_CANDIDATE_CHECKS_DETAILS_ERROR:
      return {
        error: true,
      };
    case FETCH_CANDIDATE_PERSONAL_INFO:
      return {
        ...state,
        loading: true,
        error: null,
        personalinfo: {},
        addresses: []
      };
    case FETCH_CANDIDATE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        personalinfo: action.payload.personalinfo,
        addresses: action.payload.addresses,
        error: null
      };
    case SAVE_ADDRESS:
      return {
        ...state,
        loading: true
      };
    case SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload
      };
    case EDIT_ADDRESS:
      return {
        ...state
      };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.payload
      };
    case DELETE_ADDRESS:
      return {
        ...state
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.payload
      };
    case SUBMIT_ADDRESS_HISTORY:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_ADDRESS_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false
        //addresses: action.payload
      };
    case FETCH_CANDIDATE_ADDRESSES:
      return {
        ...state,
        addresses: []
      };
    case FETCH_CANDIDATE_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload
      };
    case SAVE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        personalinfo: action.payload,
      };
    case FETCH_CANDIDATE_PERSONAL_INFO_ERROR:
      return {
        error: true,
      };
    case SUBMIT_WORK_PASS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SUBMIT_WORK_PASS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SUBMIT_WORK_PASS_ERROR:
      return {
        error: true,
      };
    case SAVE_BANK_DETAILS:
      return {
        ...state,
        loading: true
      };
    case SAVE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SUBMIT_BANK_DETAILS:
      return {
        ...state,
        loading: true
      };
    case SUBMIT_RIGHT_TO_WORK:
      return {
        ...state,
        loading: true
      };
    case SUBMIT_CRIMINAL_RECORD:
      return {
        ...state,
        loading: true
      };
    case SUBMIT_CRIMINAL_RECORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
      case SUBMIT_IMMIGRATION_DETAILS:
        return {
          ...state,
          loading: true
        };
      case SUBMIT_IMMIGRATION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SUBMIT_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case FETCH_BANK_ADDRESSES:
      return {
        ...state,
        bankAddresses: []
      };
    case FETCH_BANK_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        bankAddresses: action.payload
      };
    case DELETE_BANK_ADDRESS:
      return {
        ...state
      };
    case DELETE_BANK_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.payload
      };

    default:
      return state;
  }
}
