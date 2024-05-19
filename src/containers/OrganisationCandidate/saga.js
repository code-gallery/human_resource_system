import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import { getCandidate } from "./api";
import { getApiUrl } from "containers/constants";
import httpFetch from "utils/httpFetch";
import {
  ACTIONS,
  saveCandidate,
  candidateRequestError,
  getRequestSuccess,
  getRequestError,
} from "./reducer";

/**
 WORKER SAGA's
 */
const deleteCandidate = function* (payload) {
  const { candidateId, userId, orgId, flag, isCandidateDelete } = payload.payload;
  let payloadData = {
    flag,
    orgId,
    isCandidateDelete
  };
  const url = getApiUrl("candidateDelete").replace(":candidateId", candidateId);
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify(payloadData),
  });
  if (json.status === "success") {
    yield put({
      type: ACTIONS.DELETE_CANDIDATE_SUCCESS,
      payload: json.data.Requestid,
    });
    if (!flag) {
      if (userId === null) {
        if(json.data.success)
          yield put(push(`/organisations/${orgId}/candidates`));
        else 
          alert("Candidate cannot be Deleted")
      } else {
        let payloadData = {
          flag: true,
        };
        const candidate = yield call(getCandidate, orgId, candidateId);
        const json1 = yield httpFetch(url, {
          method: "POST",
          body: JSON.stringify(payloadData),
        });
        yield put({
          type: ACTIONS.DELETE_CANDIDATE_SUCCESS,
          payload: json.data.Requestid,
        });
        yield put(saveCandidate(candidate));
      }
    }
  } else {
  }
};

const deleteRequest = function* (payload) {
  const { requestId, orgId, candidateId, onSuccess, onError } = payload.payload;

  const url = getApiUrl("deleteWPRequest").replace(":requestId", requestId);
  const json = yield httpFetch(url, {
    method: "POST",
  });
  if (json.status === "success") {
    yield put({
      type: ACTIONS.DELETE_REQUEST_SUCCESS,
      payload: json.message,
    });
    yield call(onSuccess);
    const candidate = yield call(getCandidate, orgId, candidateId);
    yield put(saveCandidate(candidate));
  } else {
    yield call(onError);
  }
};

const refreshRequest = function* (payload) {
  const { requestId, orgId, candidateId, onSuccess, onError } = payload.payload;

  const url = getApiUrl("refreshWPRequest").replace(":requestId", requestId);
  const json = yield httpFetch(url, { method: "POST" });
  if (json.status === "success") {
    yield put({
      type: ACTIONS.REFRESH_REQUEST_SUCCESS,
      payload: json.message
    });
    yield call(onSuccess);
    const candidate = yield call(getCandidate, orgId, candidateId);
    yield put(saveCandidate(candidate));
  } else {
    yield call(onError);
  }
  try {
    const url = getApiUrl("workPassRequest").replace(":requestId", requestId);
    const response = yield call(httpFetch, url);

    if (response.status !== "success") {
      throw new Error("Bad response");
    }

    const request = response.data.request;

    yield put(getRequestSuccess(requestId, request));
  } catch (err) {
    yield put(getRequestError());
  }
};

const fetchCandidate = function* (action) {
  try {
    const { orgId, candidateId } = action.payload;
    const candidate = yield call(getCandidate, orgId, candidateId);
    let assignButtonStatus = false
    if (!candidate.userId) {
      const url = getApiUrl('assignButtonStatus').replace(':candidateId', candidateId);
      const result = yield httpFetch(url, {
        method: 'POST',
        body: JSON.stringify({ organisation_id: orgId, email: candidate.email })
      })
      if (result.status === 'success') {
        assignButtonStatus = result.data.buttonstatus
      }
    }
    candidate.assignButtonStatus = assignButtonStatus
    yield put(saveCandidate(candidate));
  } catch (e) {
    yield put(candidateRequestError());
  }
};

const fetchRequest = function* (action) {
  try {
    const { requestId } = action.payload;
    const url = getApiUrl("workPassRequest").replace(":requestId", requestId);
    const response = yield call(httpFetch, url);

    if (response.status !== "success") {
      throw new Error("Bad response");
    }

    const request = response.data.request;

    yield put(getRequestSuccess(requestId, request));
  } catch (err) {
    yield put(getRequestError());
  }
};

const assignWorkpass = function* ({ payload, onSuccess, onError }) {
  const url = getApiUrl('assignWorkpass').replace(':candidateId', payload.candidateId);
  const result = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify({ organisation_id: payload.orgId, email: payload.email })
  })
  if (result.status === 'success') {
    yield put({
      type: ACTIONS.ASSIGN_WORKPASS_SUCCESS,
      payload: {
        message: result.message,
        workpassStatus: result.data.success
      }
    });
    yield call(onSuccess)
    // result.data.success ? yield call(onSuccess) : yield call(onError);
  } else {
    yield call(onError);
  }
};

const saveEmploymentReference = function* ({ payload, onSuccess, onError }) {
  const { checkId, requestId, name: referencetype, document_images, data } = payload
  const url = getApiUrl('refereeEmail').replace(':check_id', checkId)
  const upload_url = `${getApiUrl('uploadDirectorshipDocument')}`

  if (document_images && document_images.length) {
    const upload_res = yield httpFetch(upload_url, {
      method: 'POST',
      body: JSON.stringify({
        checkid: checkId,
        description: document_images,
        referencetype
      })
    })
    if (upload_res.status === 'success') {
      const imageUrls = upload_res.data.Imageurl
      const document = []
      imageUrls.map(img => document.push({ url: img.url }))
      data.document_images = JSON.stringify(document)
    }
  }
  const postData = {
    data: [
      {
        name: referencetype,
        attribute_ids: [
          data
        ]
      }
    ]
  }
  const result = yield httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(postData),
  });
  if (result.status === 'success') {
    yield put({ type: ACTIONS.SAVE_EMP_REFERENCE_SUCCESS, payload: '' });
    yield call(onSuccess);
    try {
      const reqUrl = getApiUrl('workPassRequest').replace(':requestId', requestId);
      const response = yield call(httpFetch, reqUrl);
      if (response.status !== 'success') {
        throw new Error('Bad response');
      }
      const request = response.data.request;
      yield put(getRequestSuccess(requestId, request));
    } catch (err) {
      yield put(getRequestError());
    }
  } else {
    yield call(onError);
  }
}

const getNotes = function* ({ payload }) {
  const url = getApiUrl('candidateNotes')
    .replace(':org_id', payload.orgId)
    .replace(':candidate_id', payload.candidateId)
  const json = yield httpFetch(url, { method: 'GET' });
  if (json.status === 'success') {
    yield put({
      type: ACTIONS.GET_NOTES_SUCCESS,
      payload: json.data.notes
    })
  }
};

const watchGetNotes = function* () {
  yield takeLatest(ACTIONS.GET_NOTES, getNotes);
};

const saveNote = function* ({ payload, onSuccess, onError }) {
  let response = {}
  const url = getApiUrl('candidateNotes')
    .replace(':org_id', payload.data.org_id)
    .replace(':candidate_id', payload.data.candidate_id)
  if (payload.note_id) {
    const updateUrl = url + '/' + payload.note_id
    response = yield httpFetch(updateUrl, {
      method: 'PUT',
      body: JSON.stringify(payload.data)
    })
  } else {
    response = yield httpFetch(url, {
      method: 'POST',
      body: JSON.stringify(payload.data)
    })
  }
  if (response.status === 'success') {
    const json = yield httpFetch(url, { method: 'GET' })
    if (json.status === 'success') {
      yield put({
        type: ACTIONS.SAVE_NOTE_SUCCESS,
        payload: json.data.notes
      })
      yield call(onSuccess)
    }
  } else {
    yield call(onError)
  }
}

const watchSaveNote = function* () {
  yield takeLatest(ACTIONS.SAVE_NOTE, saveNote)
}

const deleteNote = function* ({ payload, onSuccess, onError }) {
  let response = {}
  const url = getApiUrl('candidateNotes')
    .replace(':org_id', payload.data.org_id)
    .replace(':candidate_id', payload.data.candidate_id)
  if (payload.note_id) {
    const deleteUrl = url + '/' + payload.note_id
    response = yield httpFetch(deleteUrl, {
      method: 'PUT',
      body: JSON.stringify(payload.data)
    })
  }
  if (response.status === 'success') {
    const json = yield httpFetch(url, { method: 'GET' })
    if (json.status === 'success') {
      yield put({
        type: ACTIONS.DELETE_NOTE_SUCCESS,
        payload: json.data.notes
      })
      yield call(onSuccess)
    }
  } else {
    yield call(onError)
  }
}

const watchDeleteNote = function* () {
  yield takeLatest(ACTIONS.DELETE_NOTE, deleteNote)
}

/**
 WATCHERS SAGA's
 */
const watchSaveEmploymentReference = function* () {
  yield takeLatest(ACTIONS.SAVE_EMP_REFERENCE, saveEmploymentReference);
};
const watchCandidateRequest = function* () {
  yield takeLatest(ACTIONS.REQUEST_CANDIDATE, fetchCandidate);
};

const watchChecksRequest = function* () {
  yield takeLatest(ACTIONS.GET_REQUEST, fetchRequest);
};

const watchDeleteCandidate = function* () {
  yield takeEvery(ACTIONS.DELETE_CANDIDATE, deleteCandidate);
};

const watchDeleteRequest = function* () {
  yield takeEvery(ACTIONS.DELETE_REQUEST, deleteRequest);
};

const watchRefreshRequest = function* () {
  yield takeEvery(ACTIONS.REFRESH_REQUEST, refreshRequest);
};

const watchAssignWorkpass = function* () {
  yield takeEvery(ACTIONS.ASSIGN_WORKPASS, assignWorkpass)
}
/**
 ROOT SAGA
 */
const rootSaga = function* () {
  yield all([
    watchCandidateRequest(),
    watchChecksRequest(),
    watchDeleteCandidate(),
    watchDeleteRequest(),
    watchRefreshRequest(),
    watchAssignWorkpass(),
    watchSaveEmploymentReference(),
    watchGetNotes(),
    watchSaveNote(),
    watchDeleteNote()
  ]);
};

export {
  rootSaga as default,
  watchCandidateRequest,
  fetchCandidate,
  watchChecksRequest,
  fetchRequest,
  deleteCandidate,
  deleteRequest,
  refreshRequest
};
