import moment from 'moment'
import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { camelCase } from 'lodash'

/** :: number -> Promise<Object> */
export const getOrganisationConfig = async (orgId) => {
  const url = getApiUrl('orgWorkPassConfig')
    .replace(':orgId', orgId)

  const response = await httpFetch(url)

  if (response.status !== 'success') {
    throw new Error(response.errors[0].error)
  }

  const { check_config: checks } = response.data

  if (checks.length === 0) {
    throw new Error('Organisation does not have any work pass configuration')
  }

  const config = {}
  for (const check of checks) {
    config[camelCase(check.type)] = check
  }

  return config
}

/** :: (number, Object) -> Promise<Object> */
export const postRequest = async (orgId, candidateId, requestInfo) => {
  const url = getApiUrl('orgCandidateRequests')
    .replace(':orgId', orgId)
    .replace(':candidateId', candidateId)

  const response = await httpFetch(url, {
    method: 'POST',
    body: JSON.stringify(requestInfo)
  })

  if (response.status !== 'success') {
    throw new Error(response.errors[0].error)
  }

  const request = response.data.request
  const {
    id,
    created_at: createdAt,
    country,
    region,
    role
  } = request
  const organisationLogo = getApiUrl('logoImage').replace(':orgId', orgId)
  const checks = request.checks
    .map(({ id, type, options, price }) => ({
      id,
      type,
      options,
      price
    }))
    .filter(({ price }) => price > 0)

  return {
    id,
    country,
    region,
    createdAt: moment(createdAt),
    organisationLogo,
    checks,
    role
  }
}
