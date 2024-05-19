import httpFetch from './httpFetch'
import { getApiUrl } from 'containers/constants'

export const organizationsAutocomplete = (q) => {
  const url = getApiUrl('orgAutocomplete')
  return httpFetch(`${url}${q}`, { method: 'GET' })
}
