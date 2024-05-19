import moment from 'moment'
import isNull from 'lodash/isNull'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'

/** :: Object -> any */
const getUserInfo = ({ user }) => info => !isNull(user)
  ? (user[info] || null)
  : null

/** :: Object -> Object */
const getRequests = ({ requests }) => {
  const $requests = requests.map(({ id, role, status, created_at, checker, candidate, employerName, deletestatus, employer, nudgestatus, last_nudge, completed_checks, total_checks,latest_updated_at}) => ({
    id,
    role,
    status,
    createdAt: moment(created_at),
    checker,
    employerName,
    candidate,
    deletestatus,
    employer,
    nudgestatus,
    last_nudge,
    completed_checks,
    total_checks,
    latest_updated_at
  }))

  return $requests
}


/** :: Object -> Object */
const getCandidateInfo = (candidate) => {
  
  const id = candidate.id
  const email = candidate.email
  const user = candidate.user
  const createdAt = moment(candidate.created_at)
  const requests = getRequests(candidate)

  /** @NOTE: All User Info will be null if candidate is not a Appii user */
  const getInfo = getUserInfo(candidate)
  const userId = getInfo('id')
  const firstName = getInfo('first_name')
  const lastName = getInfo('last_name')
  const userEmail = getInfo('email')
  const profileImage = getInfo('profile_image')
  const phoneNumber = getInfo('phone_number')
  const assignStatus = candidate.assignstatus
  const candid_completed_checks = candidate.candid_completed_checks
  const candid_total_checks = candidate.candid_total_checks
  const updated_at = candidate.updated_at
  const confirm_status = candidate.confirm_status
  const userid_confirm = candidate.userid_confirm

  return {
    id,
    email,
    createdAt,
    userId,
    firstName,
    lastName,
    userEmail,
    phoneNumber,
    profileImage,
    assignStatus,
    requests,
    user,
    candid_completed_checks,
    candid_total_checks,
    updated_at,
    confirm_status,
    userid_confirm
  }
}

/** :: (number, string?) -> Promise<Object[]> */
const getCandidates = async (orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page) => {
  let url = getApiUrl('organisationCandidates').replace(':orgId', orgId)
  url += typeof search === 'undefined'
    ? '?search=null'
    : `?search=${search}`

  url += typeof officer_name === 'undefined'
    ? '&officer_name=null'
    : `&officer_name=${officer_name}`

  url += typeof latest_organization === 'undefined'
  ? '&latest_organization=null'
  : `&latest_organization=${latest_organization}`

  url += typeof candidate_status === 'undefined'
  ? '&candidate_status=null'
  : `&candidate_status=${candidate_status}`

  url += typeof last_nudge_start === 'undefined'
  ? '&last_nudge_start=null'
  : `&last_nudge_start=${last_nudge_start}`

  url += typeof last_nudge_end === 'undefined'
  ? '&last_nudge_end=null'
  : `&last_nudge_end=${last_nudge_end}`

  url += typeof latest_request_start === 'undefined'
  ? '&latest_request_start=null'
  : `&latest_request_start=${latest_request_start}`

  url += typeof latest_request_end === 'undefined'
  ? '&latest_request_end=null'
  : `&latest_request_end=${latest_request_end}`

  url += '&per_page=100'

  url += typeof page === 'undefined'
  ? '&page=1'
  : `&page=${page}`
    
  const response = await httpFetch(url)

  if (response.status !== 'success') {
    throw new Error(response.errors[0].error)
  }

  const { data } = response
  const candidates = data.candidates.map(getCandidateInfo)
  const candidatesObj = {
    candidates,
    last_page: data.last_page,
    page: data.page,
    per_page: data.per_page,
    requestArr: data.requestArr,
    total_recs: data.total_recs
  }
  return candidatesObj
}

export {
  getCandidateInfo,
  getCandidates
}
