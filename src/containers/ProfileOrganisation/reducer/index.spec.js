import reducer, {
  ACTIONS,
  fetch,
  fetchEmployees,
  fetchAdmins,
  fetchVerifiedStudents,
  save
} from './index.js'

describe('reducer: containers/ProfileOrganisation/reducer', () => {
  describe('Action Creators', () => {
    describe('fetch', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12 }
        const action = fetch(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH,
          payload
        })
      })
    })

    describe('fetchEmployees', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12 }
        const action = fetchEmployees(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH_EMPLOYEES,
          payload
        })
      })
    })

    describe('fetchAdmins', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12 }
        const action = fetchAdmins(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH_ADMINS,
          payload
        })
      })
    })

    describe('fetchVerifiedStudents', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12 }
        const action = fetchVerifiedStudents(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH_VERIFIED_STUDENTS,
          payload
        })
      })
    })

    describe('save', () => {
      it('returns the correct action', () => {
        const payload = { orgId: 12, about_us: 'hello' }
        const action = save(payload)
        expect(action).toEqual({
          type: ACTIONS.SAVE,
          payload
        })
      })
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        employees: [],
        admins: [],
        students: [],
        loadingRequests: 0,
        pending: false,
        saveErrorMsg: null
      })
    })

    describe('@@router/LOCATION_CHANGE', () => {
      it('when state exists', () => {
        const existingState = {
          admins: [ 'admins' ],
          employees: [ 'employees' ],
          students: [ 'verifiedStudents' ],
          loadingRequests: 3,
          name: 'Applied Block'
        }
        const newState = reducer(existingState, {
          type: '@@router/LOCATION_CHANGE'
        })

        expect(newState).toEqual(expect.objectContaining({
          admins: [],
          employees: [],
          students: [],
          loadingRequests: 0,
          pending: false
        }))
      })
    })

    describe('LOAD_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          id: 12,
          name: 'Applied Block',
          loadingRequests: 0
        }
        const payload = {
          id: 1,
          name: 'Oxford Uni',
          loadingRequests: 1
        }
        const newState = reducer(state, {
          type: ACTIONS.LOAD_SUCCESS,
          payload
        })

        expect(newState).toEqual(payload)
      })

      it('when state is undefined', () => {
        const payload = {
          id: 1,
          name: 'Oxford Uni'
        }
        const newState = reducer(void 0, {
          type: ACTIONS.LOAD_SUCCESS,
          payload
        })

        expect(newState).toEqual(expect.objectContaining({
          ...payload,
          employees: [],
          admins: [],
          students: [],
          loadingRequests: 1,
          pending: false
        }))
      })
    })

    describe('LOAD_EMPLOYEES_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          id: 12,
          name: 'Applied Block',
          employees: [ '1' ],
          loadingRequests: 1
        }
        const payload = {
          employees: [ 'newEmployees' ]
        }
        const newState = reducer(state, {
          type: ACTIONS.LOAD_EMPLOYEES_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...state,
          employees: payload.employees,
          loadingRequests: 2
        })
      })

      it('when state is undefined', () => {
        const payload = {
          employees: [ 'newEmployees' ]
        }
        const newState = reducer(void 0, {
          type: ACTIONS.LOAD_EMPLOYEES_SUCCESS,
          payload
        })

        expect(newState).toEqual(expect.objectContaining({
          admins: [],
          students: [],
          employees: payload.employees,
          loadingRequests: 1,
          pending: false
        }))
      })
    })

    describe('LOAD_ADMINS_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          id: 12,
          name: 'Applied Block',
          admins: [ '1' ],
          loadingRequests: 2
        }
        const payload = {
          admins: [ 'newAdmins' ]
        }
        const newState = reducer(state, {
          type: ACTIONS.LOAD_ADMINS_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...state,
          admins: payload.admins,
          loadingRequests: 3
        })
      })

      it('when state is undefined', () => {
        const payload = {
          admins: [ 'newAdmins' ]
        }
        const newState = reducer(void 0, {
          type: ACTIONS.LOAD_ADMINS_SUCCESS,
          payload
        })

        expect(newState).toEqual(expect.objectContaining({
          employees: [],
          students: [],
          admins: payload.admins,
          loadingRequests: 1,
          pending: false
        }))
      })
    })

    describe('LOAD_VERIFIED_STUDENTS_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          id: 12,
          name: 'Applied Block',
          students: [ '1' ],
          loadingRequests: 1
        }
        const payload = {
          students: [ 'verifiedStudents' ]
        }
        const newState = reducer(state, {
          type: ACTIONS.LOAD_VERIFIED_STUDENTS_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...state,
          students: payload.students,
          loadingRequests: 2
        })
      })

      it('when state is undefined', () => {
        const payload = {
          students: [ 'verifiedStudents' ]
        }
        const newState = reducer(void 0, {
          type: ACTIONS.LOAD_VERIFIED_STUDENTS_SUCCESS,
          payload
        })

        expect(newState).toEqual(expect.objectContaining({
          employees: [],
          admins: [],
          students: payload.students,
          loadingRequests: 1,
          pending: false
        }))
      })
    })

    describe('SAVE_SUCCESS', () => {
      it('when state exists', () => {
        const state = {
          about_us: 'Applied Block',
          name: 'Applied'
        }
        const payload = {
          about_us: 'Lorem ipsum'
        }
        const newState = reducer(state, {
          type: ACTIONS.SAVE_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...state,
          about_us: payload.about_us,
          pending: false
        })
      })

      it('when state is undefined', () => {
        const payload = {
          about_us: 'lorem ipsum'
        }
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          ...payload,
          employees: [],
          admins: [],
          students: [],
          loadingRequests: 0,
          pending: false,
          saveErrorMsg: null
        })
      })
    })

    describe('SAVE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE
        })

        expect(newState).toEqual({
          employees: [],
          admins: [],
          students: [],
          loadingRequests: 0,
          pending: true,
          saveErrorMsg: null
        })
      })
    })

    describe('SAVE_ERROR', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SAVE_ERROR,
          payload: 'error message'
        })

        expect(newState).toEqual({
          employees: [],
          admins: [],
          students: [],
          loadingRequests: 0,
          pending: false,
          saveErrorMsg: 'error message'
        })
      })
    })
  })
})
