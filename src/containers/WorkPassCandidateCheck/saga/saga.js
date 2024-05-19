import { takeLatest, put, all, call } from "redux-saga/effects";
import httpFetch from "utils/httpFetch";
import httpFetchFormData from "utils/httpFetchFormData";
import { getApiUrl } from "containers/constants";
import {
  ACTIONS,
  candidateChecksError,
  candidateCheckDetailsError,
  // candidatePersonalInfoError,
  // editPersonalInfoError
} from "../reducer/reducer";

export function* fetchCandidateChecks() {
  try {
    const url = getApiUrl("workPassCandidateChecks");
    const json = yield httpFetch(url, { method: "GET" });
    if (json.status !== "success") {
      throw new Error("Bad response");
    }
    yield put({
      type: ACTIONS.FETCH_CANDIDATE_CHECKS_SUCCESS,
      payload: json.data,
    });
  } catch (err) {
    {
      yield put(candidateChecksError());
    }
  }
}

export function* watchfetchCandidateChecks() {
  yield takeLatest(ACTIONS.FETCH_CANDIDATE_CHECKS, fetchCandidateChecks);
}

export function* fetchCandidateCheckDetails(action) {
  try {
    let requestId = action.payload
    const url = getApiUrl("workPassCandidateCheck").replace(':request_id', requestId);
    const json = yield httpFetch(url, { method: "GET" });

    if (json.status !== "success") {
      throw new Error("Bad response");
    }
    yield put({
      type: ACTIONS.FETCH_CANDIDATE_CHECKS_DETAILS_SUCCESS,
      payload: json.data,
    });
  } catch (err) {
    {
      yield put(candidateCheckDetailsError());
    }
  }
}

export function* watchfetchCandidateCheckDetails() {
  yield takeLatest(ACTIONS.FETCH_CANDIDATE_CHECKS_DETAILS, fetchCandidateCheckDetails);
}

export function* fetchCandidatePersonalInfo({ payload }) {
  try {
    let personalinfo = {}
    let addresses = []
    //let url = getApiUrl('candidatePersonalInfo')
    //let addressUrl = getApiUrl('candidateAddresses')
    if (payload.user_id) {
      const url = getApiUrl('userPersonalInfo').replace(':user_id', payload.user_id)
      const addressUrl = getApiUrl('userAddresses').replace(':user_id', payload.user_id)
      const json = yield httpFetch(url, { method: 'GET' });
      if (json.status === 'success') {
        personalinfo = json.data.personalInformation
      }
      const addressResult = yield httpFetch(addressUrl, { method: 'GET' })
      if (addressResult.status === 'success') {
        addresses = addressResult.data.addresses
      }
    }
    if (payload.candidate_id) {
      const url = getApiUrl('getCandidateInfo').replace(':candidate_id', payload.candidate_id)
      const json = yield httpFetch(url, { method: 'GET' });
      console.log('payload candidate personalinfo', json.data.candidatedata[0].snapshot[0])
      if (json.status === 'success') {
        personalinfo = json.data.candidatedata[0].snapshot[0]
        addresses = json.data.candidatedata[0].snapshot[0].addresses
      }
    }
    yield put({
      type: ACTIONS.FETCH_CANDIDATE_PERSONAL_INFO_SUCCESS,
      payload: { personalinfo, addresses }
    });
  } catch (err) {
    // yield put(candidatePersonalInfoError());
  }
}

export function* watchfetchCandidatePersonalInfo() {
  yield takeLatest(ACTIONS.FETCH_CANDIDATE_PERSONAL_INFO, fetchCandidatePersonalInfo);
}

export function* savePersonalInfo({ payload, onSuccess, onError }) {
  try {
    /* let address = payload.data.account_address
    if (payload.address_id === '') {
      const url = getApiUrl('candidateAddresses');
      const json = yield httpFetch(url, {
        method: 'POST',
        body: JSON.stringify(payload.data.account_address)
      })
      if (json.status === 'success') {
        address.id = json.data.id
      }
    }*/
    let url = ''
    const attr = { name: 'personalInformation' }
    if (payload.user_id) {
      url = getApiUrl('userPersonalInfo').replace(':user_id', payload.user_id)
    } else if(payload.candidateId) {
      url = getApiUrl('saveCandidateInfo')
      attr.candidate_id = payload.candidateId
    }
    attr.attribute_ids = [payload.data]
    const json = yield httpFetch(url, {
      method: 'POST',
      body: JSON.stringify({ data: [attr] })
    })
    if (json.status === 'success') {
      yield put({ type: ACTIONS.SAVE_PERSONAL_INFO_SUCCESS, payload: payload.data })
      yield call(onSuccess)
    } else {
      yield call(onError)
    }
  } catch (err) {
    // yield put(editPersonalInfoError());
    yield call(onError)
  }
}

export function* watchSavePersonalInfo() {
  yield takeLatest(ACTIONS.SAVE_PERSONAL_INFO, savePersonalInfo)
}

export function* saveAddress({ payload, onSuccess, onError }) {
  try {
    let response = {}
    //let webaddressUrl = getApiUrl('candidateAddresses');
    //let addressUrl = getApiUrl('candidateAddresses')
    if (payload.user_id) {
      let webaddressUrl = getApiUrl('userWebAddress')
      let addressUrl = getApiUrl('userAddresses').replace(':user_id', payload.user_id)
      if (payload.address_id) {
        response = yield httpFetch(webaddressUrl + '/' + payload.address_id, {
          method: 'PUT',
          body: JSON.stringify(payload.address)
        })
      } else {
        response = yield httpFetch(webaddressUrl, {
          method: 'POST',
          body: JSON.stringify(payload.address)
        })
      }
      if (response.status === 'success') {
        const res = yield httpFetch(addressUrl, { method: 'GET' })
        if (res.status === 'success') {
          yield put({ type: ACTIONS.FETCH_CANDIDATE_ADDRESSES_SUCCESS, payload: res.data.addresses })
        }
        yield call(onSuccess)
      }
    } else {
      let url = getApiUrl('saveCandidateInfo')
      const attr = { name: 'personalInformation' }
      attr.candidate_id = payload.candidateId
      attr.attribute_ids = [payload.data]
      const json = yield httpFetch(url, {
        method: 'POST',
        body: JSON.stringify({ data:[ attr ] })
      })
      if (json.status === 'success') {
        yield put({ type: ACTIONS.SAVE_PERSONAL_INFO_SUCCESS, payload: payload.data })
        yield call(onSuccess)
      } else {
        yield call(onError)
      }
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchSaveAddress() {
  yield takeLatest(ACTIONS.SAVE_ADDRESS, saveAddress)
}

export function* deleteAddress({ payload, onSuccess, onError }) {
  try {
    if (payload.user_id) {
      // const url = getApiUrl('candidateAddresses') + '/' + payload
      const url = getApiUrl('userWebAddress') + '/' + payload.address_id
      const json = yield httpFetch(url, {
        method: 'DELETE'
      })
      if (json.status === 'success') {
        //let addressUrl = getApiUrl('candidateAddresses')
        let addressUrl = getApiUrl('userAddresses').replace(':user_id', payload.user_id)
        // const res = yield httpFetch(getApiUrl('candidateAddresses'), { method: 'GET' })
        const res = yield httpFetch(addressUrl, { method: 'GET' })
        if (res.status === 'success') {
          yield put({ type: ACTIONS.FETCH_CANDIDATE_ADDRESSES_SUCCESS, payload: res.data.addresses })
        }
      }
      yield call(onSuccess)
    } else {
      let url = getApiUrl('saveCandidateInfo')
      const attr = { name: 'personalInformation' }
      attr.candidate_id = payload.candidateId
      attr.attribute_ids = [payload.data]
      const json = yield httpFetch(url, {
        method: 'POST',
        body: JSON.stringify({ data:[ attr ] })
      })
      if (json.status === 'success') {
        yield put({ type: ACTIONS.SAVE_PERSONAL_INFO_SUCCESS, payload: payload.data })
        yield call(onSuccess)
      } else {
        yield call(onError)
      }
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchDeleteAddress() {
  yield takeLatest(ACTIONS.DELETE_ADDRESS, deleteAddress)
}

export function* editAddress({ payload, onSuccess, onError }) {
  try {
    const url = getApiUrl('candidateAddresses');
    const json = yield httpFetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload.address)
    })
    if (json.status === 'success') {
      const res = yield httpFetch(getApiUrl('candidateAddresses'), { method: 'GET' })
      if (res.status === 'success') {
        yield put({ type: ACTIONS.FETCH_CANDIDATE_ADDRESSES_SUCCESS, payload: res.data.addresses })
      }
      yield call(onSuccess)
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchEditAddress() {
  yield takeLatest(ACTIONS.EDIT_ADDRESS, editAddress)
}

export function* submitAddressHistory({ payload, onSuccess, onError }) {
  try {
    const { check_id, referencetype, document_images, addressList } = payload
    const url = `${getApiUrl('submitAddressHistory').replace(':check_id', check_id)}`

    const docResponse = yield httpFetch(getApiUrl("uploadDirectorshipDocument"), {
      method: "POST",
      body: JSON.stringify({
        checkid: check_id,
        description: document_images,
        referencetype
      }),
    });
    if (docResponse.status === 'success') {
      const Imageurl = docResponse.data.Imageurl.length ? docResponse.data.Imageurl[0].url : ''
      if (Imageurl) {
        const json = yield httpFetch(url, {
          method: 'POST',
          body: JSON.stringify({
            formArray: addressList,
            imageUploadedResponse: {
              document: { url: Imageurl }
            }
          })
        })
        if (json.status === 'success') {
          yield call(onSuccess)
        } else {
          yield call(onError)
        }
        yield put({ type: ACTIONS.SUBMIT_ADDRESS_HISTORY_SUCCESS, payload: '' })
      }
    }
    yield call(onError)
  } catch (err) {
    yield call(onError)
  }
}

export function* watchsubmitAddressHistory() {
  yield takeLatest(ACTIONS.SUBMIT_ADDRESS_HISTORY, submitAddressHistory)
}

export function* fetchCandidateAddresses({ onSuccess, onError }) {
  try {
    const url = getApiUrl('candidateAddresses');
    const json = yield httpFetch(url, { method: 'GET' })
    if (json.status === 'success') {
      yield put({ type: ACTIONS.FETCH_CANDIDATE_ADDRESSES_SUCCESS, payload: json.data.addresses })
      // yield call(onSuccess)
    } else {
      // yield call(onError)
    }
  } catch (err) {
    // yield call(onError)
  }
}

export function* watchCandidateAddresses() {
  yield takeLatest(ACTIONS.FETCH_CANDIDATE_ADDRESSES, fetchCandidateAddresses)
}

export function* submitWorkPass({ payload, onSuccess, onError }) {
  const requestId = payload
  const url = `${getApiUrl('submitWorkPassRequest').replace(':request_id', requestId)}`
  const json = yield httpFetch(url, { method: 'POST' })

  if (json.status === 'success') {
    yield put({ type: ACTIONS.SUBMIT_WORK_PASS_SUCCESS, payload: json.data.request })
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchsubmitWorkPass() {
  yield takeLatest(ACTIONS.SUBMIT_WORK_PASS, submitWorkPass)
}

export function* submitBankDetails({ payload, onSuccess, onError }) {
  try {
    const url = `${getApiUrl('submitBankDetails').replace(':check_id', payload.check_id)}`
    let response = ''
    if (payload.bankDetails) {
      response = yield httpFetch(url, {
        method: 'POST',
        body: JSON.stringify(payload.bankDetails)
      })
    } else {
      response = yield httpFetch(url, { method: 'POST' })
    }

    if (response.status === 'success') {
      yield put({ type: ACTIONS.SUBMIT_BANK_DETAILS_SUCCESS, payload: '' })
      yield call(onSuccess)
    } else {
      yield call(onError)
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchSubmitBankDetails() {
  yield takeLatest(ACTIONS.SUBMIT_BANK_DETAILS, submitBankDetails)
}

export function* submitCriminalRecord({ payload, onSuccess, onError }) {
  try {
    const url = `${getApiUrl('submitCriminalRecord').replace(':check_id', payload.check_id)}`
    let response = yield httpFetch(url, {
      method: 'POST',
      body: JSON.stringify(payload.criminalRecord)
    })
    if (response.status === 'success') {
      yield put({ type: ACTIONS.SUBMIT_CRIMINAL_RECORD_SUCCESS, payload: '' })
      yield call(onSuccess)
    } else {
      yield call(onError)
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchSubmitCriminalRecord() {
  yield takeLatest(ACTIONS.SUBMIT_CRIMINAL_RECORD, submitCriminalRecord)
}

export function* submitImmigrationDetails({ payload, onSuccess, onError }) {
  const postData = {
    data: [{
      name: "immigration_details",
      attribute_ids: [payload.data]
    }]
  }
  try {
    const url = `${getApiUrl('submitImmigrationDetails').replace(':check_id', payload.check_id)}`
    let response = yield httpFetch(url, {
      method: 'POST',
      body: JSON.stringify(postData)
    })
    if (response.status === 'success') {
      yield put({ type: ACTIONS.SUBMIT_IMMIGRATION_DETAILS_SUCCESS, payload: '' })
      yield call(onSuccess)
    } else {
      yield call(onError)
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchSubmitImmigrationDetails() {
  yield takeLatest(ACTIONS.SUBMIT_IMMIGRATION_DETAILS, submitImmigrationDetails)
}

export function* submitRightToWork({ payload, onSuccess, onError }) {
  try {
    const { check_id, fieldName, document_images } = payload
    const url = `${getApiUrl('saveRightToWorkData').replace(':check_id', check_id)}`
    let formData = new FormData()
    formData.append("type","passport");
    formData.append(
      "file",
      document_images,
    );
    const docResponse = yield httpFetchFormData(getApiUrl("uploadRightToWorkDocument"), {
      method: "POST",
      body: formData
    });
    if (docResponse.status === 'success') {
      const Imageurl = docResponse.data.document.url ? docResponse.data.document.url : ''
      if (Imageurl) {
        const documents = [{
          name: fieldName,
          document_ids: [docResponse.data.document.id]
        }]
        const json = yield httpFetch(url, {
          method: 'POST',
          body: JSON.stringify({ data: documents })
        })
        if (json.status === 'success') {
          yield call(onSuccess)
        } else {
          yield call(onError)
        }
        yield put({ type: ACTIONS.SUBMIT_RIGHT_TO_WORK_SUCCESS, payload: '' })
      }
    }
    yield call(onError)
  } catch(err) {
    yield call(onError)
  }
}

export function* watchSubmitRightToWork() {
  yield takeLatest(ACTIONS.SUBMIT_RIGHT_TO_WORK, submitRightToWork)
}

export function* saveBankDetails({ payload, onSuccess, onError }) {
  try {
    let response = {}
    let addressUrl = getApiUrl('bankAddresses')
    if (payload.bank_id) {
      response = yield httpFetch(addressUrl + '/' + payload.bank_id, {
        method: 'PUT',
        body: JSON.stringify(payload.address)
      })
    } else {
      response = yield httpFetch(addressUrl, {
        method: 'POST',
        body: JSON.stringify(payload.address)
      })
    }
    if (response.status === 'success') {
      const res = yield httpFetch(addressUrl, { method: 'GET' })
      if (res.status === 'success') {
        yield put({ type: ACTIONS.FETCH_BANK_ADDRESSES_SUCCESS, payload: res.data.banks })
      }
      yield call(onSuccess)
    }
  } catch (err) {
    yield call(onError)
  }
}

export function* watchSaveBankDetails() {
  yield takeLatest(ACTIONS.SAVE_BANK_DETAILS, saveBankDetails)
}

export function* fetchBankAddresses({ onSuccess, onError }) {
  try {
    const url = getApiUrl('bankAddresses');
    const json = yield httpFetch(url, { method: 'GET' })
    if (json.status === 'success') {
      yield put({ type: ACTIONS.FETCH_BANK_ADDRESSES_SUCCESS, payload: json.data.banks })
      // yield call(onSuccess)
    } else {
      // yield call(onError)
    }
  } catch (err) {
    // yield call(onError)
  }
}

export function* watchBankAddresses() {
  yield takeLatest(ACTIONS.FETCH_BANK_ADDRESSES, fetchBankAddresses)
}

export function* deleteBankAddress({ payload, onSuccess, onError }) {
  try {
    // const url = getApiUrl('candidateAddresses') + '/' + payload
    const url = getApiUrl('bankAddresses') + '/' + payload.bank_id
    const json = yield httpFetch(url, {
      method: 'DELETE'
    })
    if (json.status === 'success') {
      let addressUrl = getApiUrl('bankAddresses')
      const res = yield httpFetch(addressUrl, { method: 'GET' })
      if (res.status === 'success') {
        yield put({ type: ACTIONS.FETCH_BANK_ADDRESSES_SUCCESS, payload: res.data.banks })
      }
    }
    yield call(onSuccess)
  } catch (err) {
    yield call(onError)
  }
}

export function* watchBankDeleteAddress() {
  yield takeLatest(ACTIONS.DELETE_BANK_ADDRESS, deleteBankAddress)
}

export default function* rootSaga() {
  yield all([
    watchfetchCandidateChecks(),
    watchfetchCandidateCheckDetails(),
    watchfetchCandidatePersonalInfo(),
    watchCandidateAddresses(),
    watchSavePersonalInfo(),
    watchSaveAddress(),
    watchDeleteAddress(),
    watchEditAddress(),
    watchsubmitWorkPass(),
    watchsubmitAddressHistory(),
    watchSaveBankDetails(),
    watchBankAddresses(),
    watchBankDeleteAddress(),
    watchSubmitBankDetails(),
    watchSubmitRightToWork(),
    watchSubmitCriminalRecord(),
    watchSubmitImmigrationDetails()
  ]);
}
