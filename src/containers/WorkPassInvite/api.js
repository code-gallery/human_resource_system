import httpFetch from 'utils/httpFetch'
import { getApiUrl } from 'containers/constants'

/** :: string -> */
export const getInviteInfo = async (token) => {
  let url = getApiUrl('workPassInvite')
  url += `?token=${token}`

  const {
    data
  } = await httpFetch(url)

  return data
}
