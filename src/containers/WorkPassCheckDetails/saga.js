import { all, call, put, takeLatest } from "redux-saga/effects";
import httpFetch from "utils/httpFetch";
import { getApiUrl } from "containers/constants";
import { ACTIONS } from "./reducer";

export function* fetchChecksdetails(payload) {
  const { requestId, orgId, candidateId, checkId, checkType } = payload;
  if (checkType === "work_gaps") {
    const url = getApiUrl("fetchEmpGapCheckData")
      .replace(":check_id", checkId)
      .replace(":check_type", checkType)
      .replace(":web", true);
    const json = yield httpFetch(url, { method: "GET" });
    yield put({ type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS, payload: json });
  } else if (checkType === "right_to_work" || checkType === "dbs_identity") {
    const url = getApiUrl("workPassCandidateCheck").replace(
      ":request_id",
      requestId
    );
    const json = yield httpFetch(url, { method: "GET" });
    var newEntity;
    if (checkType === "dbs_identity") {
      var data = json.data.request.checks;
      newEntity = data.filter(
        (checks) =>
          checks.type === "dbs_identity" && checks.side === "candidate"
      );
      newEntity = newEntity[0].data;
    }

    if (checkType === "right_to_work") {
      var data = json.data.request.checks;
      newEntity = data.filter(
        (checks) =>
          checks.type === "right_to_work" && checks.side === "candidate"
      );
      newEntity = newEntity[0].data;
    }

    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: newEntity,
    });
  } else if (checkType === "dbs") {
    const url = getApiUrl("fetchCheckData")
      .replace(":org_id", orgId)
      .replace(":candidate_id", candidateId)
      .replace(":request_id", requestId)
      .replace(":check_id", checkId)
      .replace(":check_type", checkType);
    const dbsUrl = getApiUrl("dbsButtonStatus")
      .replace(":check_id", checkId)
    const json = yield httpFetch(url, { method: "GET" });
    const dbsData = yield httpFetch(dbsUrl, { method: "POST" });
    if (dbsData.status === 'success') {
      json.data.dbsButtonStatus = dbsData.data.success
      json.data.check_status = dbsData.data.check_status
    }
    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: json.data,
    });
  } else if (
    checkType === "employment_verification" ||
    checkType === "education_verification"
  ) {
    const url = getApiUrl("fetchEmpGapCheckData")
      .replace(":check_id", checkId)
      .replace(":check_type", checkType);
    const json = yield httpFetch(url, { method: "GET" });
    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: json.data.check_data,
    });
  } else {
    const check_type = (checkType === 'employment_eligibility_verification') ? 'employment_eligibility_documents' : checkType
    const url = getApiUrl("fetchCheckData")
      .replace(":org_id", orgId)
      .replace(":candidate_id", candidateId)
      .replace(":request_id", requestId)
      .replace(":check_id", checkId)
      .replace(":check_type", check_type);
    const json = yield httpFetch(url, { method: "GET" });
    
    if (checkType === "adverse_finance_check" || checkType === "driver_license_check") {
      if(json.hasOwnProperty("data")){
        yield put({
          type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
          payload: json.data,
        });
      }
      else{
        yield put({
          type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
          payload: json,
        });
      }
    } else if (checkType === "employment_reference") {
      let data = json.data.check_data
      data.officerData = json.data.check_data.filter(ref => ref.response_status === 'officer_edit')
      yield put({
        type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
        payload: data,
      });
    } else{
      yield put({
        type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
        payload: json.data.check_data,
      });
    }
    
  }
}
export function* watchfetchChecksdetails() {
  yield takeLatest(ACTIONS.FETCH_CHECK_DETAILS, fetchChecksdetails);
}

export function* annotationSubmit({ payload, onSuccess, onError }) {
  const url = `${getApiUrl("annotationSubmit")}`;
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.ANNOTATION_SUBMIT_SUCCESS, payload: json.data });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }

  const checkId = payload.check_id;
  const type = payload.check_type;
  const url1 = getApiUrl("annotationFetch")
    .replace(":check_id", checkId)
    .replace(":check_type", type);
  const json1 = yield httpFetch(url1, { method: "GET" });
  yield put({ type: ACTIONS.ANNOTATION_FETCH_SUCCESS, payload: json1.data });
}
export function* watchAnnotationSubmit() {
  yield takeLatest(ACTIONS.ANNOTATION_SUBMIT, annotationSubmit);
}

export function* annotationReset({ payload, onSuccess, onError, orgId }) {

  const url = `${getApiUrl("annotationReset")}`;
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.ANNOTATION_RESET_SUCCESS, payload: json.data });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }

  const checkId = payload.check_id;
  const type = payload.check_type;
  const url1 = getApiUrl("annotationFetch")
    .replace(":check_id", checkId)
    .replace(":check_type", type);
  const json1 = yield httpFetch(url1, { method: "GET" });
  yield put({ type: ACTIONS.ANNOTATION_FETCH_SUCCESS, payload: json1.data });

  if (type === 'dbs_identity') {
    const url2 = getApiUrl('workPassCandidateCheck').replace(
      ':request_id',
      payload.requestId
    );
    const json2 = yield httpFetch(url2, { method: 'GET' });
    var newEntity;
    var data = json2.data.request.checks;
    newEntity = data.filter(
      (checks) =>
        checks.type === 'dbs_identity' && checks.side === 'candidate'
    );
    newEntity = newEntity[0].data;

    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: newEntity,
    });
  } else if (type === 'work_gaps') {
    const url2 = getApiUrl('fetchEmpGapCheckData')
      .replace(':check_id', checkId)
      .replace(':check_type', type)
      .replace(":web", true);
    const json2 = yield httpFetch(url2, { method: 'GET' });
    yield put({ type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS, payload: json2 });
  } else {
    const check_type = (type === 'employment_eligibility_verification') ? 'employment_eligibility_documents' : type
    const url2 = getApiUrl('fetchCheckData')
      .replace(':org_id', payload.orgId)
      .replace(':candidate_id', payload.user_id)
      .replace(':request_id', payload.requestId)
      .replace(':check_id', checkId)
      .replace(':check_type', check_type);
    const json2 = yield httpFetch(url2, { method: 'GET' });
    if (type === 'employment_reference') {
      const res = json2.data.check_data
      res.officerData = json2.data.check_data.filter(ref => ref.response_status === 'officer_edit')
      yield put({
        type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
        payload: res,
      });
    } else {
      yield put({
        type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
        payload: json2.data.check_data,
      });
    }
  }
}

export function* watchAnnotationReset() {
  yield takeLatest(ACTIONS.ANNOTATION_RESET , annotationReset);
}
export function* uploadDocuments({ payload, onSuccess, onError, fetchData }) {
  const checktype = payload.data.referencetype;
  
  if (checktype === "directorship_checks" || checktype === "administrator_uploads" || checktype === "dbs_identity"
  || checktype === "right_to_work" || checktype === 'candidate_uploads') {
    const checkid = payload.data.checkid;
    const description = payload.data.description;
    var referencetype = payload.data.referencetype
    if (checktype === 'dbs_identity') {
      referencetype = 'identity_uploads'
    } else if (checktype === 'right_to_work') {
      referencetype = 'right_to_work_uploads'
    } else if (checktype === 'candidate_uploads') {
      referencetype = 'candidate_data_uploads'
    }
    let data = {
      checkid: checkid,
      description: description,
      referencetype: referencetype
    };

    const url = `${getApiUrl("uploadDirectorshipDocument")}`;
    const json = yield httpFetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const url2 = getApiUrl("refereeEmail").replace(":check_id", checkid);
    let data2 = {
      data: [
        {
          name: referencetype,
          attribute_ids: [
            {
              status: "success",
              message: "Image URL updated in data",
              data: { success: true, Imageurl: json.data.Imageurl },
            },
          ],
        },
      ],
    };

    const json2 = yield httpFetch(url2, {
      method: "POST",
      body: JSON.stringify(data2),
    });

    if (json.status === "success") {
      yield put({ type: ACTIONS.UPLOAD_DOCUMENTS_SUCCESS, payload: json.data });
      yield call(onSuccess);
    } else {
      yield call(onError);
    }

    const url3 = getApiUrl("refereeEmail").replace(":check_id", checkid);
    const json3 = yield httpFetch(url3, {
      method: "GET",
    });
    if (json3.status === "success") {
      yield put({ type: ACTIONS.VIEW_DOCUMENTS_SUCCESS, payload: json3.data.check_data });
    }
  } else {

    const url = `${getApiUrl("uploadEmpDocument")}`;
    const json = yield httpFetch(url, {
      method: "POST",
      body: JSON.stringify(payload.data),
    });
    if (json.status === "success") {
      yield put({ type: ACTIONS.UPLOAD_DOCUMENTS_SUCCESS, payload: json.data });
      yield call(onSuccess);
    } else {
      yield call(onError);
    }

    const url1 = getApiUrl("fetchCheckData")
      .replace(":org_id", fetchData.orgId)
      .replace(":candidate_id", fetchData.candidateId)
      .replace(":request_id", fetchData.requestId)
      .replace(":check_id", fetchData.checkId)
      .replace(":check_type", fetchData.check_type);
    const json1 = yield httpFetch(url1, { method: "GET" });
    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: json1.data.check_data,
    });
  }
}

export function* watchUploadDocuments() {
  yield takeLatest(ACTIONS.UPLOAD_DOCUMENTS, uploadDocuments);
}

export function* viewuploadedDocuments({ payload }) {
  if (payload.payload.referencetype === "directorship_checks" || payload.payload.referencetype === "administrator_uploads"
  || payload.payload.referencetype === "dbs_identity" || payload.payload.referencetype === "right_to_work" || payload.payload.referencetype === "candidate_uploads") {
    const url = getApiUrl("refereeEmail").replace(":check_id",payload.payload.checkid
    );
    const json = yield httpFetch(url, {
      method: "GET",
    });
    if (json.status === "success") {
      yield put({ type: ACTIONS.VIEW_DOCUMENTS_SUCCESS, payload: json.data.check_data });
    }
  }
  else {
    const url = `${getApiUrl("viewUploadedDocuments")}`;
    const json = yield httpFetch(url, {
      method: "POST",
      body: JSON.stringify(payload.payload),
    });
    if (json.status === "success") {
      yield put({ type: ACTIONS.VIEW_DOCUMENTS_SUCCESS, payload: json.data });
    }
  }
}

export function* watchViewDocuments() {
  yield takeLatest(ACTIONS.VIEW_DOCUMENTS, viewuploadedDocuments);
}

export function* deleteDocument({ payload, onSuccess, onError, fetchData }) {
  if (payload.referencetype === "directorship_checks" || payload.referencetype === "administrator_uploads"
  || payload.referencetype === "dbs_identity" || payload.referencetype === "right_to_work" || payload.referencetype === 'candidate_uploads') {
    const url = `${getApiUrl("deleteDirectorshipDocument")}`;
    var referencetype = payload.referencetype
    if (payload.referencetype === 'dbs_identity') {
      referencetype = 'identity_uploads'
    } else if (payload.referencetype === 'right_to_work') {
      referencetype = 'right_to_work_uploads'
    } else if (payload.referencetype === 'candidate_uploads') {
      referencetype = 'candidate_data_uploads'
    }

    let payload1 = {
      checkid: payload.checkid,
      imageurltodelete: payload.imageurltodelete,
      name: referencetype,
    };
    const json = yield httpFetch(url, {
      method: "POST",
      body: JSON.stringify(payload1),
    });
    if (json.status === "success") {
      yield put({ type: ACTIONS.DELETE_DOCUMENTS_SUCCESS, payload: json.data });
      yield call(onSuccess);
    } else {
      yield call(onError);
    }

    const url2 = getApiUrl("refereeEmail").replace(":check_id", payload.checkid);
    const json2 = yield httpFetch(url2, {
      method: "GET",
    });
    if (json.status === "success") {
      yield put({ type: ACTIONS.VIEW_DOCUMENTS_SUCCESS, payload: json2.data.check_data });
    }
  } else {
    const url = `${getApiUrl("deleteDocument")}`;
    const json = yield httpFetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (json.status === "success") {
      yield put({ type: ACTIONS.DELETE_DOCUMENTS_SUCCESS, payload: json.data });
      yield call(onSuccess);
    } else {
      yield call(onError);
    }

    let payload1 = {
      referencetype: payload.referencetype,
      referenceversion: payload.referenceversion,
      checkid: payload.checkid,
    };

    const url2 = getApiUrl("fetchCheckData")
      .replace(":org_id", fetchData.orgId)
      .replace(":candidate_id", fetchData.candidateId)
      .replace(":request_id", fetchData.requestId)
      .replace(":check_id", fetchData.checkId)
      .replace(":check_type", fetchData.check_type);
    const json2 = yield httpFetch(url2, { method: "GET" });
    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: json2.data.check_data,
    });

    const url1 = `${getApiUrl("viewUploadedDocuments")}`;
    const json1 = yield httpFetch(url1, {
      method: "POST",
      body: JSON.stringify(payload1),
    });
    if (json1.status === "success") {
      yield put({ type: ACTIONS.VIEW_DOCUMENTS_SUCCESS, payload: json1.data });
    }
  }
}

export function* watchDeleteDocuments() {
  yield takeLatest(ACTIONS.DELETE_DOCUMENTS, deleteDocument);
}

export function* refreeMail({ payload, onSuccess, onError }) {
  const checkId = payload.checkId;
  const orgId = payload.orgId;
  const candidateId = payload.candidateId;
  const requestId = payload.requestId;

  const attr = { name: payload.name };
  attr.attribute_ids = [payload.data];

  const url = getApiUrl("refereeEmail").replace(":check_id", checkId);
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify({ data: [attr] }),
  });
  const newEntity = {
    data: attr,
  };
  if (json.status === "success") {
    yield put({ type: ACTIONS.REFREE_MAIL_SUCCESS, payload: newEntity });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }

  const url1 = getApiUrl("fetchCheckData")
    .replace(":org_id", orgId)
    .replace(":candidate_id", candidateId)
    .replace(":request_id", requestId)
    .replace(":check_id", checkId)
    .replace(":check_type", "employment_reference");
  const json1 = yield httpFetch(url1, { method: "GET" });
  yield put({
    type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
    payload: json1.data.check_data,
  });
}

export function* watchRefereeMail() {
  yield takeLatest(ACTIONS.REFREE_MAIL, refreeMail);
}

export function* annotationFetch({ payload }) {
  const { checkId, type } = payload;
  const url = getApiUrl("annotationFetch")
    .replace(":check_id", checkId)
    .replace(":check_type", type);
  const json = yield httpFetch(url, { method: "GET" });
  if (json.status === "success") {
    yield put({ type: ACTIONS.ANNOTATION_FETCH_SUCCESS, payload: json.data });
    //yield call(onSuccess)
  } else {
    //yield call(onError)
  }
}

export function* watchAnnotationFetch() {
  yield takeLatest(ACTIONS.ANNOTATION_FETCH, annotationFetch);
}

export function* closeCheck({ payload, onSuccess, onError  }) {
  let {orgId,candidateId,requestId,checkId,refId} = payload
  const url = getApiUrl("closeCheck").replace(":checkid", refId);
  const json = yield httpFetch(url, {
    method: "PUT",
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.CLOSE_CHECK_SUCCESS, payload: json.data });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }

  const url1 = getApiUrl("fetchCheckData")
    .replace(":org_id", orgId)
    .replace(":candidate_id", candidateId)
    .replace(":request_id", requestId)
    .replace(":check_id", checkId)
    .replace(":check_type", "employment_reference");
  const json1 = yield httpFetch(url1, { method: "GET" });
  yield put({
    type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
    payload: json1.data.check_data,
  });

}

export function* watchcloseCheck() {
  yield takeLatest(ACTIONS.CLOSE_CHECK, closeCheck);
}

export function* softDeleteCheck({ payload, onSuccess, onError  }) {
  let {orgId,candidateId,requestId,checkId,refId} = payload
  const url = getApiUrl("softDeleteRef").replace(":checkid", refId);
  const json = yield httpFetch(url, {
    method: "PUT",
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.SOFT_DELETE_SUCCESS, payload: json.data });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }

  const url1 = getApiUrl("fetchCheckData")
    .replace(":org_id", orgId)
    .replace(":candidate_id", candidateId)
    .replace(":request_id", requestId)
    .replace(":check_id", checkId)
    .replace(":check_type", "employment_reference");
  const json1 = yield httpFetch(url1, { method: "GET" });
  yield put({
    type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
    payload: json1.data.check_data,
  });

}

export function* watchSoftDeleteRef() {
  yield takeLatest(ACTIONS.SOFT_DELETE, softDeleteCheck);
}

export function* dbsCheckSubmit({ payload, onSuccess, onError  }) {
  const url = getApiUrl("dbsCheckSubmit").replace(":check_id", payload.id)
  const json = yield httpFetch(url, { method: "POST" });
  const dbsUrl = getApiUrl("dbsButtonStatus").replace(":check_id", payload.id)
  const dbsData = yield httpFetch(dbsUrl, { method: "POST" });
  let payloadData = ''
  if (dbsData.status === 'success') {
    payloadData = { check_status: dbsData.data.check_status }
  }
  yield put({ type: ACTIONS.DBS_CHECK_SUCCESS, payload: payloadData });
  //yield put({ type: ACTIONS.DBS_CHECK_SUCCESS, payload: json.data });
  if (json.status === "success") {
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchDBSCheck() {
  yield takeLatest(ACTIONS.DBS_CHECK, dbsCheckSubmit);
}

export function* updateDbsType({ payload, onSuccess, onError  }) {
  const url = getApiUrl("updateDbsType")
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  yield put({ type: ACTIONS.UPDATE_DBS_TYPE_SUCCESS, payload: json.data });
  if (json.status === "success") {
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchUpdateDbsType() {
  yield takeLatest(ACTIONS.UPDATE_DBS_TYPE, updateDbsType);
}

export function* saveOfficerCheckData({ payload, onSuccess, onError }) {
  const data = {
    RefrenceType: payload.type,
    CheckId: payload.checkId,
    work_pass_id: payload.requestId,
    reference_id: payload.reference_id,
    details: payload.data
  }
  const url = getApiUrl("saveOfficerCheckData")
  const json = yield httpFetch(url, { method: "POST", body: JSON.stringify(data) });
  if (json.status === "success") {
    const getUrl = getApiUrl("getOfficerCheckData").replace(":refrenceid", payload.reference_id);
    const officer_res = yield httpFetch(getUrl, { method: "GET" });
    var officer_data = []
    if (officer_res.status === 'success') {
      officer_data = officer_res.data.data
    }
    yield put({ type: ACTIONS.SAVE_OFFICER_CHECKDATA_SUCCESS, payload: officer_data });
    yield call(onSuccess)
  } else {
    yield call(onError)
  }
}

export function* watchSaveOfficerCheckData() {
  yield takeLatest(ACTIONS.SAVE_OFFICER_CHECKDATA, saveOfficerCheckData);
}

const saveEmploymentReference = function* ({ payload, onSuccess, onError }) {
  const { checkId, requestId, name: referencetype, document_images, data, orgId, candidateId } = payload
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
    body: JSON.stringify(postData)
  });
  if (result.status === 'success') {
    yield put({ type: ACTIONS.SAVE_EMPLOYMENT_REFERENCE_SUCCESS, payload: '' });
    yield call(onSuccess);
    if (orgId && candidateId) {
      const checkUrl = getApiUrl('fetchCheckData')
        .replace(':org_id', orgId)
        .replace(':candidate_id', candidateId)
        .replace(':request_id', requestId)
        .replace(':check_id', checkId)
        .replace(':check_type', 'employment_reference');
      const checkResult = yield httpFetch(checkUrl, { method: 'GET' });
      const checkData = checkResult.data.check_data
      checkData.officerData = checkResult.data.check_data.filter(ref => ref.response_status === 'officer_edit')
      yield put({
        type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
        payload: checkData
      })
    }
  } else {
    yield put({ type: ACTIONS.SAVE_EMPLOYMENT_REFERENCE_SUCCESS, payload: '' });
    yield call(onError);
  }
}

const watchSaveEmploymentReference = function* () {
  yield takeLatest(ACTIONS.SAVE_EMPLOYMENT_REFERENCE, saveEmploymentReference);
};

export function* workpassSubmit({ payload, onSuccess, onError }) {
  const url = getApiUrl("workpassSubmit").replace(":check_id", payload.checkId)
  const result = yield httpFetch(url, { method: "POST" });
  if (result.status === "success") {
    yield put({ type: ACTIONS.COMPLETE_WORK_PASS_SUCCESS, payload: 'Workpass completed successfully' });
    yield call(onSuccess)
  } else {
    if (result.status === 'error' && result.errors.length) {
      yield put({ type: ACTIONS.COMPLETE_WORK_PASS_SUCCESS, payload: result.errors[0].error });
    }
    yield call(onError)
  }
}

const watchWorkpassSubmit = function* () {
  yield takeLatest(ACTIONS.COMPLETE_WORK_PASS, workpassSubmit);
};

export function* saveEmpEliData({ payload, onSuccess, onError }) {
  const attr = { name: payload.name };
  attr.attribute_ids = [payload.data];
  const url = getApiUrl("refereeEmail").replace(":check_id", payload.checkId);
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify({ data: [attr] }),
  });
  if (json.status === "success") {
    yield call(onSuccess);
    const checkUrl = getApiUrl('fetchCheckData')
      .replace(':org_id', payload.orgId)
      .replace(':candidate_id', payload.candidateId)
      .replace(':request_id', payload.requestId)
      .replace(':check_id', payload.checkId)
      .replace(':check_type', payload.name);
    const checkResult = yield httpFetch(checkUrl, { method: 'GET' });
    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: checkResult.data.check_data,
    });
  } else {
    yield call(onError);
  }
}

export function* watchSaveEmpEliData() {
  yield takeLatest(ACTIONS.SAVE_EMP_ELIGIBILITY, saveEmpEliData);
}

export function* editEmpEliData({ payload, onSuccess, onError }) {
  const url = getApiUrl("refereeEmail").replace(":check_id", payload.checkId) + '/edit';
  const json = yield httpFetch(url, {
    method: "PUT",
    body: JSON.stringify([payload.data]),
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.EDIT_EMP_ELIGIBILITY_SUCCESS, payload: '' });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }
}

export function* watchEditEmpEliData() {
  yield takeLatest(ACTIONS.EDIT_EMP_ELIGIBILITY, editEmpEliData);
}

export function* certifyEmpEliData({ payload, onSuccess, onError }) {
  const url = getApiUrl("refereeEmail").replace(":check_id", payload.checkId) + '/certify';
  const json = yield httpFetch(url, {
    method: "PUT",
    body: JSON.stringify([payload.data]),
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.CERTIFY_EMP_ELIGIBILITY_SUCCESS, payload: '' });
    yield call(onSuccess);
    const checkUrl = getApiUrl('fetchCheckData')
      .replace(':org_id', payload.orgId)
      .replace(':candidate_id', payload.candidateId)
      .replace(':request_id', payload.requestId)
      .replace(':check_id', payload.checkId)
      .replace(':check_type', payload.name);
    const checkResult = yield httpFetch(checkUrl, { method: 'GET' });
    yield put({
      type: ACTIONS.FETCH_CHECK_DETAILS_SUCCESS,
      payload: checkResult.data.check_data,
    });
  } else {
    yield call(onError);
  }
}

export function* watchCertifyEmpEliData() {
  yield takeLatest(ACTIONS.CERTIFY_EMP_ELIGIBILITY, certifyEmpEliData);
}

export default function* rootSaga() {
  yield all([
    watchfetchChecksdetails(),
    watchAnnotationSubmit(),
    watchAnnotationReset(),
    watchAnnotationFetch(),
    watchRefereeMail(),
    watchUploadDocuments(),
    watchViewDocuments(),
    watchDeleteDocuments(),
    watchcloseCheck(),
    watchSoftDeleteRef(),
    watchDBSCheck(),
    watchUpdateDbsType(),
    watchSaveOfficerCheckData(),
    watchSaveEmploymentReference(),
    watchWorkpassSubmit(),
    watchSaveEmpEliData(),
    watchEditEmpEliData(),
    watchCertifyEmpEliData()
  ]);
}
