import { getApiUrl } from 'containers/constants'
import httpFetch from 'utils/httpFetch'

/**
 @TODO: Use Saga's + redux. Currently this side menu is used across different
 pages. Need to implement the best strategy for getting the balance to this
 side menu without a entity based model.
 */
/** (orgId: number) -> Promise<number> */
export const getOrgBalance = async (orgId) => {
  const url = getApiUrl('organisation').replace(':orgId', orgId)
  const {
    data: {
      balance
    }
  } = await httpFetch(url)

  return balance
}
