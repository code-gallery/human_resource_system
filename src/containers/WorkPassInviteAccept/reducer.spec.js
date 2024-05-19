import {
  ACTIONS,
  acceptInvite,
  accepted
} from './reducer'

describe('Action creators', () => {
  describe('acceptInvite', () => {
    const token = '123456'
    const action = acceptInvite(token)

    it('has returns the correct action', () => {
      const expected = {
        type: ACTIONS.INVITE_ACCEPT_POST,
        payload: {
          token
        }
      }

      const actual = action

      expect(actual).toEqual(expected)
    })
  })

  describe('accepted', () => {
    const action = accepted()

    it('returns the correct action', () => {
      const expected = {
        type: ACTIONS.INVITE_ACCEPT_SUCCESS
      }
      const actual = action

      expect(actual).toEqual(expected)
    })
  })
})
