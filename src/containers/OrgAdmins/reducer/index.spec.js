import reducer, {
  ACTIONS,
  fetchOrgAdmins,
  fetchOrgEmployees,
  addAdmin,
  deleteAdmin
} from './index.js'

describe('reducer: containers/OrgAdmins/reducer', () => {
  describe('Action Creators', () => {
    describe('fetchOrgAdmins', () => {
      it('returns the correct action', () => {
        const payload = { admins: [ 'admins' ], org: { orgId: 1 } }
        const action = fetchOrgAdmins(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH,
          payload
        })
      })
    })

    describe('fetchOrgEmployees', () => {
      it('returns the correct action', () => {
        const payload = { employees: [ 'employees' ], orgId: '1' }
        const action = fetchOrgEmployees(payload)
        expect(action).toEqual({
          type: ACTIONS.FETCH_EMPLOYEES,
          payload
        })
      })
    })

    describe('addAdmin', () => {
      it('returns the correct action', () => {
        const payload = { orgAdmin: { id: 165 }, created: true }
        const action = addAdmin(payload)
        expect(action).toEqual({
          type: ACTIONS.ADD_ADMIN,
          payload
        })
      })
    })

    describe('deleteAdmin', () => {
      it('returns the correct action', () => {
        const payload = { adminId: 12, userId: 80 }
        const action = deleteAdmin(payload)
        expect(action).toEqual({
          type: ACTIONS.DELETE_ADMIN,
          payload
        })
      })
    })

    describe('Reducer', () => {
      it('returns the correct initialState', () => {
        const state = reducer(void 0)
        expect(state).toEqual({
          admins: [],
          org: {},
          employees: [],
          selectedAdmin: {},
          pending: false
        })
      })

      describe('FETCH', () => {
        it('when state is undefined', () => {
          const newState = reducer(void 0, {
            type: ACTIONS.FETCH
          })

          expect(newState.pending).toEqual(true)
        })
      })

      describe('FETCH_SUCCESS', () => {
        it('when state is undefined', () => {
          const payload = {
            admins: [ 'admins' ],
            org: {
              id: 12,
              user_id: 1
            },
            employees: [],
            selectedAdmin: {},
            pending: false
          }
          const newState = reducer(void 0, {
            type: ACTIONS.FETCH_SUCCESS,
            payload
          })

          expect(newState).toEqual({
            ...payload,
            pending: false
          })
        })
      })

      describe('DELETE_ADMIN_SUCCESS', () => {
        it('when state exists', () => {
          const state = {
            admins: [ { id: 1 }, { id: 12 } ],
            employees: [ { id: 7, admin: false }, { id: 80, admin: true } ]
          }
          const payload = { adminId: 12, userId: 80 }

          const newState = reducer(state, {
            type: ACTIONS.DELETE_ADMIN_SUCCESS,
            payload
          })

          expect(newState).toEqual({
            admins: [ { id: 1 } ],
            employees: [ { id: 7, admin: false }, { id: 80, admin: false } ]
          })
        })
      })

      describe('ADD_ADMIN_SUCCESS', () => {
        it('when state exists', () => {
          const state = {
            admins: [ { id: 1 } ],
            employees: [ { id: 7, admin: false }, { id: 80, admin: false } ]
          }
          const payload = { orgAdmin: { user_id: 80 } }

          const newState = reducer(state, {
            type: ACTIONS.ADD_ADMIN_SUCCESS,
            payload
          })

          expect(newState).toEqual({
            admins: [ { id: 1 }, { user: { admin: true, id: 80 }, user_id: 80 } ],
            employees: [ { admin: false, id: 7 }, { admin: true, id: 80 } ]
          })
        })
      })
    })
  })
})
