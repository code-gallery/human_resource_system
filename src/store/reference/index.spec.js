import reducer, {
  ACTIONS,
  fetchReference
} from './index.js'

describe('reducer: store/reference', () => {
  describe('Action Creators', () => {
    describe('fetchReferences', () => {
      it('returns the correct action', () => {
        const action = fetchReference()
        expect(action.type).toEqual(ACTIONS.FETCH_REFERENCE)
        expect(action.payload).toEqual(void 0)
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        awards: [],
        degrees: [],
        industries: [],
        organisationSize: [],
        highSchoolDegrees: []
      })
    })

    describe('SET_REFERENCE', () => {
      const payload = {
        awards: [ 'award1', 'award2' ],
        degrees: [ 'degree1', 'degree2' ],
        industries: [ 'industry1', 'industry2' ],
        organisationSize: [ '1 employee' ],
        highSchoolDegrees: [ 'degree1', 'degree2' ]
      }

      it('when state exists', () => {
        const existingState = {
          industries: [],
          degrees: [ '1', '2' ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_REFERENCE,
          payload
        })

        expect(newState).toEqual(payload)
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_REFERENCE,
          payload
        })

        expect(newState).toEqual(payload)
      })
    })
  })
})
