import httpFetch from 'utils/httpFetch'
import { fetchUserProfile } from './index'
import { getApiUrl } from 'containers/constants'

describe('containers/Profile/saga', () => {
  describe('fetchUserProfile', () => {
    const payload = {
      user: 'Test',
      allAwards: [],
      jobs: [],
      educations: []
    }

    describe('on success', () => {
      const gen = fetchUserProfile({ payload })

      it('calls correct API', () => {
        const url = `${getApiUrl('user')}`
        expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
      })
    })
  })
})
