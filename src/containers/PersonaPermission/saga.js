import { all, call, put, takeLatest } from "redux-saga/effects";
import httpFetch from "utils/httpFetch";
import { getApiUrl } from "containers/constants";
import { ACTIONS } from "./reducer";

export function* accountsFetch({ payload}) {
  const url = getApiUrl("userClientOrganisationsPermission").replace(":org_id", payload);
  const json = yield httpFetch(url, {
    method: "GET",
  });
  if (json.status === "success") {
    yield put({
      type: ACTIONS.FETCH_ACCOUNTS_SUCCESS,
      payload: json.data.organisations,
    });
  } else {
  }
}
export function* watchaccountsFetch() {
  yield takeLatest(ACTIONS.FETCH_ACCOUNTS, accountsFetch);
}

export function* peopleFetch({ payload}) {
 
  const url = getApiUrl("organisationsAdmins").replace(":orgId", payload);
  const json = yield httpFetch(url, {
    method: "GET",
  });
  if (json.status === "success") {
    yield put({
      type: ACTIONS.FETCH_PEOPLE_SUCCESS,
      payload: json.data.admins,
    });
  } else {
  }
}
export function* watchpeopleFetch() {
  yield takeLatest(ACTIONS.FETCH_PEOPLE, peopleFetch);
}

export function* enableDisable({payload, onSuccess, onError}) {
  let {client_id, adminId, status, org_id} = payload.payload
  client_id = parseInt(client_id)
  adminId = parseInt(adminId)
  
  let body ={
    "organisation_id": org_id,
    "client_id": client_id,
    "user_id": adminId,
    "status": status
}
  const url = getApiUrl("personaPermissionEnable");
  const json = yield httpFetch(url, {
    method: "POST",
    body: JSON.stringify(body)
  });
  if (json.status === "success") {
    yield put({ type: ACTIONS.ENABLE_DISABLE_SUCCESS, payload: json.data });
    yield call(onSuccess);
  } else {
    yield call(onError);
  }

  const url2 = getApiUrl("userClientOrganisationsPermission").replace(":org_id", org_id);
  const json2 = yield httpFetch(url2, {
    method: "GET",
  });
  yield put({
      type: ACTIONS.FETCH_ACCOUNTS_SUCCESS,
      payload: json2.data.organisations,
    })

  const url3 = getApiUrl("organisationsAdmins").replace(":orgId", org_id);
  const json3 = yield httpFetch(url3, {
    method: "GET",
  });
  if (json3.status === "success") {
    yield put({
      type: ACTIONS.FETCH_PEOPLE_SUCCESS,
      payload: json3.data.admins,
    });
  } else {
  }
}
export function* watchenableDisable() {
  yield takeLatest(ACTIONS.ENABLE_DISABLE, enableDisable);
}

export default function* rootSaga() {
  yield all([
    watchaccountsFetch(),
    watchpeopleFetch(),
    watchenableDisable()
  ]);
}
