import {
  ACTIONS,
  requestInfo,
  requestInfoSuccess
} from './reducer'

describe('Action creators', () => {
  describe('requestInfo', () => {
    const token = '123456'
    const action = requestInfo(token)

    it('has returns the correct action', () => {
      const expected = {
        type: ACTIONS.REQUEST_INFO,
        payload: {
          token
        }
      }

      const actual = action

      expect(actual).toEqual(expected)
    })
  })

  describe('requestInfoSuccess', () => {
    const action = requestInfoSuccess({ invite: 'x' })

    it('returns the correct action', () => {
      const expected = {
        type: ACTIONS.REQUEST_INFO_SUCCESS,
        payload: {
          requestInfo: {
            invite: 'x'
          }
        }
      }
      const actual = action

      expect(actual).toEqual(expected)
    })
  })
})
