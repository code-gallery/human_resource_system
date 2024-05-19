import httpFetch from './httpFetch'
import { getApiUrl } from 'containers/constants'

export const organizationsAutocomplete = (q,orgId) => {
  const url = getApiUrl('refereeOrgAutocomplete')
  return httpFetch(`${url}${q}`+'&'+`orgId=${orgId}`, { method: 'GET' })
}
