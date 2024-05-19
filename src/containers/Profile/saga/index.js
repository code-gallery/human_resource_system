import { takeEvery, put, all } from 'redux-saga/effects'
import { getApiUrl, getApiErrorMessage } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { parseAwards } from 'utils/parse'
import { ACTIONS } from 'store/auth'
import { ACTIONS as PROFILE_ACTIONS } from 'store/userProfile'
import { setNotification } from 'store/layout'

export function* fetchUserProfile() {
  const { user, allAwards, jobs, educations, userRequests } = yield all({
    user: yield httpFetch(getApiUrl('user'), { method: 'GET' }),
    allAwards: yield httpFetch(getApiUrl('userAwards'), { method: 'GET' }),
    jobs: yield httpFetch(getApiUrl('userJobs'), { method: 'GET' }),
    educations: yield httpFetch(getApiUrl('userEducations'), { method: 'GET' }),
    userRequests: yield httpFetch(getApiUrl('userWorkPassRequests'), { method: 'GET' })
  })

  const hasNotification = userRequests.data.requests.length > 0

  yield put(setNotification(hasNotification))

  yield put({
    type: ACTIONS.SET_USER_PROFILE,
    payload: {
      user: { ...user.data, ...userRequests.data },
      allAwards: parseAwards(allAwards.data),
      jobs: jobs.data,
      educations: educations.data
    }
  })
}

export function* watchFetchUserProfile() {
  yield takeEvery(ACTIONS.FETCH_USER_PROFILE, fetchUserProfile)
}

export function* fetchOtherUserProfile(action) {
  const uid = action.payload

  const { user, allAwards, jobs, educations } = yield all({
    user: yield httpFetch(getApiUrl('otherUser').replace(':uid', uid), { method: 'GET' }),
    allAwards: yield httpFetch(getApiUrl('otherUserAwards').replace(':uid', uid), { method: 'GET' }),
    jobs: yield httpFetch(getApiUrl('otherUserJobs').replace(':uid', uid), { method: 'GET' }),
    educations: yield httpFetch(getApiUrl('otherUserEducations').replace(':uid', uid), { method: 'GET' })
  })

  if (user.status === 'success') {
    yield put({
      type: PROFILE_ACTIONS.SET_OTHER_USER_PROFILE,
      payload: {
        user: user.data,
        allAwards: parseAwards(allAwards.data),
        jobs: jobs.data,
        educations: educations.data
      }
    })
  } else {
    yield put({
      type: PROFILE_ACTIONS.FETCH_OTHER_USER_PROFILE_ERROR,
      payload: {
        error: getApiErrorMessage(user)
      }
    })
  }
}

export function* watchFetchOtherUserProfile() {
  yield takeEvery(PROFILE_ACTIONS.FETCH_OTHER_USER_PROFILE, fetchOtherUserProfile)
}

export default function* rootSaga() {
  yield all([
    watchFetchUserProfile(),
    watchFetchOtherUserProfile()
  ])
}
