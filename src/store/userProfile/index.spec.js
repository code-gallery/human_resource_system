import reducer, {
  ACTIONS,
  fetchOtherUserProfile
} from './index.js'

describe('reducer: store/userProfile', () => {
  describe('Action Creators', () => {
    describe('fetchOtherUserProfile', () => {
      it('returns the correct action', () => {
        const payload = 'dummy_user'
        const action = fetchOtherUserProfile(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH_OTHER_USER_PROFILE,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        pending: false,
        error: '',
        organisations: [],
        allAwards: {
          award: [],
          cpd: [],
          certificate: [],
          achievement: [],
          skill: [],
          language: [],
          project: []
        },
        educations: [],
        jobs: [],
        activities: []
      })
    })

    describe('FETCH_OTHER_USER_PROFILE', () => {
      it('when state is undefined', () => {
        const payload = 'dummy_user'
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_OTHER_USER_PROFILE,
          payload
        })

        expect(newState.error).toEqual('')
        expect(newState.pending).toEqual(true)
      })
    })

    describe('SET_USER_PROFILE', () => {
      const payload = {
        user: {
          // these are not camelCase because B/E is not
          first_name: 'Jane',
          last_name: 'Doe'
        },
        jobs: [ '1', '2' ],
        educations: [ 'edu1', 'edu2' ],
        allAwards: {
          award: [ 'a1', 'a2' ],
          cpd: [],
          certificate: [],
          achievement: [],
          skill: [],
          language: [],
          project: []
        }
      }
      it('when state exists', () => {
        const existingState = {
          error: '',
          token: 'token',
          user: null
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_OTHER_USER_PROFILE,
          payload
        })

        expect(newState.error).toEqual('')
        expect(newState.user).toEqual(payload.user)
        expect(newState.allAwards).toEqual(payload.allAwards)
        expect(newState.jobs).toEqual(payload.jobs)
        expect(newState.educations).toEqual(payload.educations)
        expect(newState.token).toEqual('token')
        expect(newState.pending).toEqual(false)
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_OTHER_USER_PROFILE,
          payload
        })

        expect(newState.error).toEqual('')
        expect(newState.user).toEqual(payload.user)
        expect(newState.allAwards).toEqual(payload.allAwards)
        expect(newState.jobs).toEqual(payload.jobs)
        expect(newState.educations).toEqual(payload.educations)
        expect(newState.pending).toEqual(false)
      })
    })

    describe('FETCH_OTHER_USER_PROFILE_ERROR', () => {
      it('when state exists', () => {
        const existingState = {
          error: '',
          pending: true,
          organisations: []
        }
        const newState = reducer(existingState, {
          type: ACTIONS.FETCH_OTHER_USER_PROFILE_ERROR,
          payload: {
            error: 'User not found'
          }
        })

        expect(newState).toEqual({
          pending: false,
          error: 'User not found',
          organisations: []
        })
      })
    })
  })
})
