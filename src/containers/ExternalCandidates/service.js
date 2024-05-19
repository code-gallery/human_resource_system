import moment from 'moment'
import isNull from 'lodash/isNull'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'

/** :: Object -> any */
const getUserInfo = ({ user }) => info => !isNull(user)
  ? (user[info] || null)
  : null

  const getOrgInfo = ({ organisation }) => info => !isNull(organisation)
  ? (organisation[info] || null)
  : null

/** :: Object -> Object */
const getCandidateInfo = ({candidate,checker,status,role,created_at,requests, candid_completed_checks, candid_total_checks}) => {
  console.log("candidate1111111",candidate)
  const id = candidate.id
  const email = candidate.email
  const createdAt = moment(created_at)
  const checkerFirstName = !isNull(checker) ? (checker['first_name'] || null) : null
  const checkerLastName =!isNull(checker) ? (checker['last_name'] || null) : null
  /** @NOTE: All User Info will be null if candidate is not a Appii user */
  const getInfo = getUserInfo(candidate)
  const firstName = getInfo('first_name')
  const lastName = getInfo('last_name')
  const profileImage = getInfo('profile_image')
  const getInfoOrg = getOrgInfo(candidate)
  const organisation = getInfoOrg('name')
  const organisationId = getInfoOrg('id')
  

  return {
    id,
    email,
    createdAt,
    status,
    role,
    firstName,
    lastName,
    profileImage,
    organisation,
    organisationId,
    checkerFirstName,
    checkerLastName,
    requests,
    candid_completed_checks,
    candid_total_checks
  }
}

/** :: (number, string?) -> Promise<Object[]> */
const getCandidates = async (orgId, search, latest_organization, officer_name, latest_request_start, latest_request_end, last_nudge_start, last_nudge_end, candidate_status, page) => {
  let url = getApiUrl('externalCandidates').replace(':org_id', orgId)
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
