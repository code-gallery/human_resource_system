import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import { getCandidateInfo } from 'containers/OrganisationCandidates/service'

/** :: (number, number) -> Promise<Object> */
export const getCandidate = async (orgId, candidateId) => {
  const url = getApiUrl('organisationCandidate')
    .replace(':orgId', orgId)
    .replace(':candidateId', candidateId)

  const response = await httpFetch(url)

  if (response.status !== 'success') {
    throw new Error(response.errors[0].error)
  }

  return getCandidateInfo(response.data.candidate)
}
